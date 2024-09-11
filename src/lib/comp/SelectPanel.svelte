<script module lang="ts">
  /*** Export ***/
  export type Props = {
    label?: string,
    bottom?: string,
    options: string[],  // bindable, [[]]
    values: string[],  // bindable, [[]]
    test?: () => boolean,  // bindable
    validation?: (values: string[]) => [boolean, string?],
  };

  /*** Others ***/
  type ToggleItem = {label: string, bool: boolean};

  /*** import ***/
  import { untrack } from "svelte";
  import { STATE } from "$lib/const";
  import Field from "$lib/comp/_Field.svelte";
  import Button from "$lib/comp/_Button.svelte";
  import Toggle from "$lib/comp/_Toggle.svelte";
</script>

<!---------------------------------------->

<script lang="ts">
  let { label, bottom = $bindable(), options = $bindable([]), values = $bindable([]), test = $bindable(), validation }: Props = $props();

  /*** Initialize ***/
  test = () => testValue();
  let status: State = $state(STATE.DEFAULT);
  let toggles: ToggleItem[] = $state([]);
  const toggleEvents: EventSet = { onclick: getSelected};
  const partDefault = { bottom };

  /*** Sync with outside ***/
  $effect.pre(() => { options; untrack(() => { setToggles(); }); });
  function setToggles() {
    toggles = options.map(x => ({label: x, bool: false}));
    toggles.forEach(x => x.bool = false);
    setDefault();
  }

  /*** Styling ***/
  const styleField: DefineStyle = {whole: {margin: "mb-5"}};

  /*** Status ***/
  function setDefault() {
    if (status === STATE.DEFAULT) { return; }
    status = STATE.DEFAULT;
    ({ bottom } = partDefault);
  }
  function setValidateStatus(reuslt: boolean, msg?: string) {
    if (reuslt) {
      setDefault();
    } else {
      status = STATE.INVALID;
      bottom = (partDefault.bottom !== undefined && msg === undefined) ? partDefault.bottom : msg;
    }
  }

  /*** Validation ***/
  function testValue(): boolean {
    if (validation === undefined) { return true; }
    const [result, msg] = validation(values);
    setValidateStatus(result, msg);
    return result;
 }

  /*** Others ***/
  function updateValues() {
    values = toggles.filter(x => x.bool).map(x => x.label);
    setDefault();
  }

  /*** Handle events ***/
  function onclick() {
    const bool = !toggles.every(x => x.bool);
    toggles.forEach(x => x.bool = bool);
    updateValues();
  }
  function getSelected() {
    updateValues();
  }
</script>

<!---------------------------------------->

<Field {label} bind:status bind:bottom style={styleField}>
  <Button {onclick} status={STATE.CUSTOM2}>ALL</Button>
  {#each toggles as toggle}
    <Toggle bind:value={toggle.bool} events={toggleEvents}>{toggle.label}</Toggle>
  {/each}
</Field>
