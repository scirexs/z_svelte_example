<script module lang="ts">
  /*** Export ***/
  export type Props = {
    min: number,  // bindable
    max: number,  // bindable
    step?: number | "any",  // bindable
    left?: string | Snippet,
    right?: string | Snippet,
    status?: State,  // bindable, [STATE.DEFAULT]
    value?: number,  // bindable,
    options?: number[],  // bindable
    style?: DefineStateStyle | DefineStyle,
    action?: Action,
    events?: EventSet,
    attributes?: HTMLAttributes<HTMLInputElement>,
    element?: HTMLInputElement,  // bindable
  };
  export type PartSlider = typeof PART_SLIDER[number];
  export const PART_SLIDER = [
    PART.WHOLE,
    PART.MAIN,
    PART.LEFT,
    PART.RIGHT,
  ] as const;

  /*** Others ***/

  /*** import ***/
  import { type Action } from "svelte/action";
  import { type HTMLAttributes } from "svelte/elements";
  import { type Snippet } from "svelte";
  import { STATE, PART } from "$lib/const";
  import { htmlId, getApplyStyle, omit } from "$lib/util";
  import { stdSlider } from "$lib/style";
</script>

<!---------------------------------------->

<script lang="ts">
  let { min = $bindable(), max = $bindable(), step = $bindable(1), left, right, status = $bindable(STATE.DEFAULT), value = $bindable(Math.ceil((min+max)/2)), options = $bindable(), style, action, events, attributes, element = $bindable()}: Props = $props();

  /*** Initialize ***/
  const list = options === undefined ? undefined : htmlId.get();
  const attr = omit({...attributes}, ["class", "disabled", "type", "value", "min", "max", "step", "list"]);
  let disabled = $derived(status === STATE.DISABLE);
  let rate = $derived((value-min)/(max-min)*100);
  if (typeof step === "number" && step <= 0) { step = 1; }

  /*** Sync with outside ***/

  /*** Styling ***/
  const myStyleSet = style === undefined ? stdSlider : stdSlider.toMerge(style);
  let myStyle = $derived(getApplyStyle(myStyleSet, PART_SLIDER as SubTuple<PartTuple>, status));

  /*** Status ***/

  /*** Validation ***/

  /*** Others ***/

  /*** Handle events ***/
</script>

<!---------------------------------------->

<span class={myStyle[PART.WHOLE]}>
  {#if typeof left === "string"}
    <span class={myStyle[PART.LEFT]}>{left}</span>
  {:else if typeof left === "function"}
    <span class={myStyle[PART.LEFT]}>{@render left()}</span>
  {/if}
  {#if typeof action === "function"}
    <input type="range" bind:value bind:this={element} class={myStyle[PART.MAIN]} style={`background:linear-gradient(to right, rgb(var(--color-active)) ${rate}%, rgb(var(--color-inactive)) ${rate}%);`} {min} {max} {step} {list} {disabled} {...attr} {...events} use:action />
  {:else}
    <input type="range" bind:value bind:this={element} class={myStyle[PART.MAIN]} style={`background:linear-gradient(to right, rgb(var(--color-active)) ${rate}%, rgb(var(--color-inactive)) ${rate}%);`} {min} {max} {step} {list} {disabled} {...attr} {...events} />
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
</span>
