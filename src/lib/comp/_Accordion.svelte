<script module lang="ts">
  /*** Export ***/
  export type Props = {
    label: string | Snippet,
    children: Snippet,
    status?: State,  // bindable, [STATE.DEFAULT]
    open?: boolean,  // bindable, [false]
    group?: boolean[],  // bindable (to work accordions together), [[]]
    duration?: number,  // [400]
    style?: DefineStateStyle | DefineStyle,
  };
  export type PartAccordion = typeof PART_ACCORDION[number];
  export const PART_ACCORDION = [
    PART.WHOLE,
    PART.MAIN,
    PART.LABEL
  ] as const;

  /*** Others ***/

  /*** import ***/
  import { type Snippet, untrack } from "svelte";
  import { slide } from "svelte/transition";
  import { STATE, PART } from "$lib/const";
  import { getApplyStyle, prevent, sleep } from "$lib/util";
  import { stdAccordion } from "$lib/style";
</script>

<!---------------------------------------->

<script lang="ts">
  let { label, children, status = $bindable(STATE.DEFAULT), open = $bindable(false), group = $bindable([]), duration = 400, style}: Props = $props();

  /*** Initialize ***/
  let actual = $state(open);
  let _guard = false;

  /*** Sync with outside ***/
  $effect.pre(() => { open;
    untrack(() => {
      setStatus();
      toggleOpen();
    });
  });

  /*** Styling ***/
  const myStyleSet = style === undefined ? stdAccordion : stdAccordion.toMerge(style);
  let myStyle = $derived(getApplyStyle(myStyleSet, PART_ACCORDION as SubTuple<PartTuple>, status));

  /*** Status ***/
  function setStatus() {
    status = open ? STATE.ACTIVE : STATE.DEFAULT;
  }

  /*** Validation ***/

  /*** Others ***/
  function toggleOpen(): void {
    if (_guard) { return; }
    _guard = true;
    if (open) {
      actual = true;
    } else {
      sleep(duration).then(() => actual = false);
    }
    sleep(duration).then(() => _guard = false);
  }

  /*** Handle events ***/
  function onclick(ev: Event) {
    if (status === STATE.DISABLE) { return; }
    const temp = !open;
    group.forEach((_,i) => group[i] = false);
    open = temp;
  }
</script>

<!---------------------------------------->

<details class={myStyle[PART.WHOLE]} open={actual}>
  <summary class={myStyle[PART.LABEL]} onclick={prevent(onclick)}>
    {#if typeof label === "string"}
      {label}
    {:else if typeof label === "function"}
      {@render label()}
    {/if}
  </summary>
  {#if open}
    <div class={myStyle[PART.MAIN]} transition:slide={{ duration: duration }}>
      {@render children()}
    </div>
  {/if}
</details>
