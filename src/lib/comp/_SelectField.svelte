<script module lang="ts">
  /*** Export ***/
  export type Props = {
    options: SelectOption,  // bindable
    label?: string,
    req?: string | Snippet,
    aux?: string | Snippet,  // bindable
    left?: string | Snippet,
    right?: string | Snippet,
    bottom?: string,  // bindable
    status?: State,  // bindable, [STATE.DEFAULT]
    value?: string,  // bindable, [""]
    placeholder?: string,
    test?: () => boolean,  // bindable
    validation?: (value: string) => [boolean, string?, (string | Snippet)?],
    style?: DefineStateStyle | DefineStyle,
    action?: Action,
    events?: EventSet,
    attributes?: HTMLAttributes<HTMLSelectElement>;
    element?: HTMLSelectElement,  // bindable
  };
  export type SelectOption = Map<string, string>;
  export type PartSelectField = typeof PART_SELECT_FIELD[number];
  export const PART_SELECT_FIELD = [
    PART.WHOLE,
    PART.MIDDLE,
    PART.MAIN,
    PART.TOP,
    PART.LEFT,
    PART.RIGHT,
    PART.BOTTOM,
    PART.LABEL,
    PART.REQ,
    PART.AUX,
  ] as const;

  /*** Others ***/

  /*** import ***/
  import type { Action } from "svelte/action";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { STATE, PART } from "$lib/const";
  import { htmlId, getApplyStyle, omit } from "$lib/util";
  import { stdSelectField } from "$lib/style";
</script>

<!---------------------------------------->

<script lang="ts">
  let { options = $bindable(), label, req, aux = $bindable(), left, right, bottom = $bindable(), status = $bindable(STATE.DEFAULT), value = $bindable(""), placeholder, test = $bindable(), validation, style, action, events, attributes, element = $bindable()}: Props = $props();

  /*** Initialize ***/
  test = () => testValue();
  const id = attributes?.id ?? htmlId.get();
  const lid = label === undefined ? undefined : htmlId.get();
  const opts = $derived(Array.from(options.entries(), ([label, val]) => ({ label, val, select: val===value })));
  const attr = omit({...attributes}, ["id"]);
  const ev = omit({...events}, ["onchange"]);
  const partDefault = { bottom, aux };
  let disabled = $derived(status === STATE.DISABLE);

  /*** Sync with outside ***/

  /*** Styling ***/
  const myStyleSet = style === undefined ? stdSelectField : stdSelectField.toMerge(style);
  let myStyle = $derived(getApplyStyle(myStyleSet, PART_SELECT_FIELD as SubTuple<PartTuple>, status));

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
  function testValue(): boolean {
    if (validation === undefined || status === STATE.DISABLE) { return true; }
    const [result, msg, mark] = validation(value);
    setValidateStatus(result, msg, mark);
    return result;
  }

  /*** Others ***/

  /*** Handle events ***/
  function onchange(ev: Event) {
    if (events?.["onchange"] !== undefined) { events["onchange"](ev); }
    if (value === "") {
      setDefault();
    } else {
      setValidateStatus(true);
    }
  }
</script>

<!---------------------------------------->

<div class={myStyle[PART.WHOLE]} role="group" aria-labelledby={lid}>
  <div class={myStyle[PART.TOP]}>
    {#if typeof label === "string"}
      <label class={myStyle[PART.LABEL]} for={id} id={lid}>{label}</label>
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
  <div class={myStyle[PART.MIDDLE]}>
    {#if typeof left === "string"}
      <span class={myStyle[PART.LEFT]}>{left}</span>
    {:else if typeof left === "function"}
      <span class={myStyle[PART.LEFT]}>{@render left()}</span>
    {/if}
    {#if typeof action === "function"}
      <select bind:value bind:this={element} class={myStyle[PART.MAIN]} {id} {onchange} {disabled} {...attr} {...ev} use:action>
        {#if typeof placeholder === "string"}
          <option value="">{placeholder}</option>
        {/if}
        {#each opts as opt}
          <option value={opt.val} selected={opt.select}>{opt.label}</option>
        {/each}
      </select>
    {:else}
      <select bind:value bind:this={element} class={myStyle[PART.MAIN]} {id} {onchange} {disabled} {...attr} {...ev}>
        {#if typeof placeholder === "string"}
          <option value="">{placeholder}</option>
        {/if}
        {#each opts as opt}
          <option value={opt.val} selected={opt.select}>{opt.label}</option>
        {/each}
      </select>
    {/if}
    {#if typeof right === "string"}
      <span class={myStyle[PART.RIGHT]}>{right}</span>
    {:else if typeof right === "function"}
      <span class={myStyle[PART.RIGHT]}>{@render right()}</span>
    {/if}
  </div>
  {#if typeof bottom === "string"}
    <output class={myStyle[PART.BOTTOM]}>{bottom}</output>
  {/if}
</div>
