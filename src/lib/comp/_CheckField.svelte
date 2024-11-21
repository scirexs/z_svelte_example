<script module lang="ts">
  /*** Export ***/
  export type Props = {
    options: Options,  // bindable
    label?: string,
    req?: string | Snippet,
    aux?: string | Snippet,  // bindable
    bottom?: string,  // bindable
    status?: State,  // bindable, [STATE.DEFAULT]
    values?: string[],  // bindable, [[]]
    name?: string,
    multiple?: boolean  // [false]
    test?: () => boolean,  // bindable
    validation?: (values: string[]) => [boolean, string?, (string | Snippet)?],
    style?: DefineStateStyle | DefineStyle,
    action?: Action,
    events?: EventSet,
    attributes?: HTMLAttributes<HTMLInputElement>;
    elements?: HTMLInputElement[],  // bindable
  };
  export type Options = SvelteMap<string, string> | Map<string, string>;
  export type PartCheckField = typeof PART_CHECK_FIELD[number];
  export const PART_CHECK_FIELD = [
    PART.WHOLE,
    PART.MIDDLE,
    PART.MAIN,
    PART.TOP,
    PART.RIGHT,
    PART.BOTTOM,
    PART.LABEL,
    PART.REQ,
    PART.AUX,
  ] as const;

  /*** Others ***/

  /*** import ***/
  import { type Action } from "svelte/action";
  import { type HTMLAttributes } from "svelte/elements";
  import { type SvelteMap } from "svelte/reactivity";
  import { type Snippet, untrack } from "svelte";
  import { STATE, PART } from "$lib/const";
  import { htmlId, getApplyStyle, omit } from "$lib/util";
  import { stdCheckField } from "$lib/style";
</script>

<!---------------------------------------->

<script lang="ts">
  let { options = $bindable(), label, req, aux = $bindable(), bottom = $bindable(), status = $bindable(STATE.DEFAULT), values = $bindable([]), name, multiple = false, test = $bindable(), validation, style, action, events, attributes, elements = $bindable([])}: Props = $props();

  /*** Initialize ***/
  test = () => testValue();
  const lid = label === undefined ? undefined : htmlId.get();
  const opts = $derived(Array.from(options.entries(), ([val, text]) => ({ val, text, checked: values.includes(val) })));
  const type = multiple ? "checkbox" : "radio";
  const nm = name ?? htmlId.get();
  const attr = omit({...attributes}, ["class", "id", "type", "name", "disabled", "value"]);
  const ev = omit({...events}, ["onchange"]);
  const partDefault = { bottom, aux };
  let disabled = $derived(status === STATE.DISABLE);

  /*** Sync with outside ***/
  $effect.pre(() => { options;
    untrack(() => { elements = Array(options.size).fill(undefined); });
  });

  /*** Styling ***/
  const myStyleSet = style === undefined ? stdCheckField : stdCheckField.toMerge(style);
  let myStyle = $derived(getApplyStyle(myStyleSet, PART_CHECK_FIELD as SubTuple<PartTuple>, status));

  /*** Status ***/
  function setDefault() {
    if (status === STATE.DEFAULT) { return; }
    status = STATE.DEFAULT;
    ({ bottom, aux } = partDefault);
  }
  function setValidateStatus(result: boolean, bottom?: string, aux?: string | Snippet) {
    status = result ? STATE.ACTIVE : STATE.INVALID;
    bottom = (partDefault.bottom !== undefined && bottom === undefined) ? partDefault.bottom : bottom;
    aux = (partDefault.aux !== undefined && aux === undefined) ? partDefault.aux : aux;
  }

  /*** Validation ***/
  function testValue(): boolean {
    if (validation === undefined || status === STATE.DISABLE) { return true; }
    const [result, bottom, aux] = validation(values);
    setValidateStatus(result, bottom, aux);
    return result;
  }

  /*** Others ***/

  /*** Handle events ***/
  function onchange(ev: Event) {
    if (events?.["onchange"] !== undefined) { events["onchange"](ev); }
    const elem = ev.target as HTMLInputElement;
    if (!elem) { return; }
    if (elem.checked) {
      values = multiple ? opts.map(x => x.val).filter(x => [...values, elem.value].includes(x)) : [elem.value];
      setValidateStatus(true);
    } else {
      values = values.filter(x => x !== elem.value);
      if (values.length <= 0) { setDefault(); } else { setValidateStatus(true); }
    }
  }
</script>

<!---------------------------------------->

<div class={myStyle[PART.WHOLE]} role="group" aria-labelledby={lid}>
  {#if myStyle[PART.TOP] || label !== undefined || req !== undefined || aux !== undefined}
    <div class={myStyle[PART.TOP]}>
      {#if typeof label === "string"}
        <span class={myStyle[PART.LABEL]} id={lid}>{label}</span>
      {/if}
      {#if typeof req === "string"}
        <span class={myStyle[PART.REQ]}>{req}</span>
      {:else if typeof req === "function"}
        <span class={myStyle[PART.REQ]}>{@render req()}</span>
      {/if}
      {#if typeof aux === "string"}
        <span class={myStyle[PART.AUX]}>{aux}</span>
      {:else if typeof aux === "function"}
        <span class={myStyle[PART.AUX]}>{@render aux()}</span>
      {/if}
    </div>
  {/if}
  <div class={myStyle[PART.MIDDLE]} role="group" aria-label={multiple ? "Check boxes" : "Radio buttons"}>
    {#each opts as {text, val, checked}, i}
      <label class={myStyle[PART.RIGHT]}>
        {#if typeof action === "function"}
          <input bind:this={elements[i]} value={val} name={nm} {type} {checked} {onchange} {disabled} {...attr} {...ev} use:action /> {text}
        {:else}
          <input bind:this={elements[i]} value={val} name={nm} {type} {checked} {onchange} {disabled} {...attr} {...ev} /> {text}
        {/if}
      </label>
    {/each}
  </div>
  {#if typeof bottom === "string"}
    <output class={myStyle[PART.BOTTOM]}>{bottom}</output>
  {/if}
</div>
