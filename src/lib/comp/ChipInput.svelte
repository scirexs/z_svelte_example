<script module lang="ts">
  /*** Export ***/
  export type Props = {
    label?: string,
    aux?: string | Snippet,
    bottom?: string,
    values?: string[],  // bindable, [[]]
    test?: () => boolean,  // bindable
    validation?: (value: string, values: string[], auto?:boolean) => [boolean, string?, (string | Snippet)?],
  };

  /*** Others ***/

  /*** import ***/
	import type { Snippet } from "svelte";
  import { STATE } from "$lib/const";
  import TextField from "$lib/comp/_TextField.svelte";
  import Chip from "$lib/comp/_Chip.svelte";
  import Cross1 from "$lib/asset/_Cross1.svelte";
</script>

<!---------------------------------------->

<script lang="ts">
  let { label, aux = $bindable(), bottom = $bindable(), values = $bindable([]), test = $bindable(), validation }: Props = $props();

  /*** Initialize ***/
  test = () => testValue();
  const attributes = {autofocus: true};
  const events = {onkeydown: addText};
  const partDefault = { bottom, aux };
  let status: State = $state(STATE.DEFAULT);
  let value = $state("");

  /*** Sync with outside ***/

  /*** Styling ***/

  /*** Status ***/
  function setDefault() {
    if (status === STATE.DEFAULT) { return; }
    status = STATE.DEFAULT;
    ({ bottom, aux } = partDefault);
  }
  function setValidateStatus(result: boolean, msg?: string, mark?: string | Snippet) {
    status = result ? STATE.ACTIVE : STATE.INVALID;
    bottom = (partDefault.bottom !== undefined && msg === undefined) ? partDefault.bottom : msg;
    aux = (partDefault.aux !== undefined && mark === undefined) ? partDefault.aux : mark;
  }

  /*** Validation ***/
  function testValue(auto: boolean = false): boolean {
    if (validation === undefined) { return true; }
    const [result, msg, mark] = validation(value.trim(), values, auto);
    setValidateStatus(result, msg, mark);
    return result;
  }

  /*** Others ***/

  /*** Handle events ***/
  function addText(ev: Event) {
    const e = ev as KeyboardEvent;
    if (e.key !== "Enter" || e.isComposing) { return; }
    if (testValue(true)) {
      values.push(value.trim());
      value = "";
    }
  }
  function onclickF(text: string): () => void {
    return () => { values = values.filter(x => x !== text); }
  }
</script>

<!---------------------------------------->

<TextField bind:value bind:status bind:bottom {label} placeholder="Enter to confirm" {events} {attributes} />
<div class="flex gap-2 flex-wrap">
  {#each values as text}
    <Chip onclick={onclickF(text)}>
      {text}
      {#snippet right()}
        <Cross1 />
      {/snippet}
    </Chip>
  {/each}
</div>
