<script module lang="ts">
  /*** Export ***/
  export type Props = {
    min: number,  // bindable
    max: number,  // bindable
    step?: number | "any",  // bindable
    label?: string,
    req?: string | Snippet,
    aux?: string | Snippet,  // bindable
    left?: string | Snippet,
    right?: string | Snippet,
    bottom?: string,  // bindable
    status?: State,  // bindable, [STATE.DEFAULT]
    value?: number,  // bindable,
    options?: number[],  // bindable
    test?: () => boolean,  // bindable
    validation?: (value: number) => [boolean, string?, (string | Snippet)?],
    style?: DefineStateStyle | DefineStyle,
    action?: Action,
    events?: EventSet,
    attributes?: HTMLAttributes<HTMLInputElement>;
    element?: HTMLInputElement,  // bindable
  };
  export type PartSlider = typeof PART_SLIDER[number];
  export const PART_SLIDER = [
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
  import { stdSlider } from "$lib/style";
</script>

<!---------------------------------------->

<script lang="ts">
  let { min = $bindable(), max = $bindable(), step = $bindable(1), label, req, aux = $bindable(), left, right, bottom = $bindable(), status = $bindable(STATE.DEFAULT), value = $bindable(Math.ceil((min+max)/2)), options = $bindable(), test = $bindable(), validation, style, action, events, attributes, element = $bindable()}: Props = $props();

  /*** Initialize ***/
  test = () => testValue();
  const id = attributes?.id ?? htmlId.get();
  const lid = label === undefined ? undefined : htmlId.get();
  const list = options === undefined ? undefined : htmlId.get();
  const attr = omit({...attributes}, ["id", "disabled", "type", "value", "min", "max", "step", "list"]);
  const ev = omit({...events}, ["onchange"]);
  const partDefault = { bottom, aux };
  let disabled = $derived(status === STATE.DISABLE);
  if (typeof step === "number" && step <= 0) { step = 1; }

  /*** Sync with outside ***/

  /*** Styling ***/
  const myStyleSet = style === undefined ? stdSlider : stdSlider.toMerge(style);
  let myStyle = $derived(getApplyStyle(myStyleSet, PART_SLIDER as SubTuple<PartTuple>, status));

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
    const [result, bottom, aux] = validation(value);
    setValidateStatus(result, bottom, aux);
    return result;
  }

  /*** Others ***/

  /*** Handle events ***/
  function onchange(ev: Event) {
    if (events?.["onchange"] !== undefined) { events["onchange"](ev); }
    setDefault();
  }
</script>

<!---------------------------------------->

<div class={myStyle[PART.WHOLE]} role="group" aria-labelledby={lid}>
  {#if myStyle[PART.TOP] || label !== undefined || req !== undefined || aux !== undefined}
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
  {/if}
  <div class={myStyle[PART.MIDDLE]}>
    {#if typeof left === "string"}
      <span class={myStyle[PART.LEFT]}>{left}</span>
    {:else if typeof left === "function"}
      <span class={myStyle[PART.LEFT]}>{@render left()}</span>
    {/if}
    {#if typeof action === "function"}
      <input type="range" bind:value bind:this={element} class={myStyle[PART.MAIN]} {id} {min} {max} {step} {list} {disabled} {onchange} {...attr} {...ev} use:action style="--rate:{(value-min)/(max-min)*100}%;" />
    {:else}
      <input type="range" bind:value bind:this={element} class={myStyle[PART.MAIN]} {id} {min} {max} {step} {list} {disabled} {onchange} {...attr} {...ev} style="--rate:{(value-min)/(max-min)*100}%;" />
    {/if}
    {#if typeof options !== "undefined"}
      <datalist id={list}>
        {#each options as option}
          <option value={option}></option>
        {/each}
      </datalist>
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

<!---------------------------------------->

<style>
  input[type="range"] {
    background: linear-gradient(to right, var(--bgcolor-left) var(--rate), var(--bgcolor-right) var(--rate));
  }
</style>
