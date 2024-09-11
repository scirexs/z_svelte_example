<script module lang="ts">
  /*** Export ***/
  export type Props = {
    children: Snippet,
    label?: string,
    req?: string | Snippet,
    aux?: string | Snippet,  // bindable
    left?: string | Snippet,
    right?: string | Snippet,
    bottom?: string,  // bindable
    status?: State,  // bindable, [STATE.DEFAULT]
    style?: DefineStateStyle | DefineStyle,
  };
  export type PartField = typeof PART_FIELD[number];
  export const PART_FIELD = [
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
  import { type Snippet, untrack } from "svelte";
  import { STATE, PART } from "$lib/const";
  import { htmlId, getApplyStyle } from "$lib/util";
  import { stdField } from "$lib/style";
</script>

<!---------------------------------------->

<script lang="ts">
  let { children, label, req, aux = $bindable(), left, right, bottom = $bindable(), status = $bindable(STATE.DEFAULT), style}: Props = $props();

  /*** Initialize ***/
  const lid = label === undefined ? undefined : htmlId.get();
  const defaultBottom = bottom;

  /*** Sync with outside ***/
  $effect.pre(() => { status;
    untrack(() => { bottom = status === STATE.DEFAULT ? defaultBottom : bottom; });
  });

  /*** Styling ***/
  const myStyleSet = style === undefined ? stdField : stdField.toMerge(style);
  let myStyle = $derived(getApplyStyle(myStyleSet, PART_FIELD as SubTuple<PartTuple>, status));

  /*** Status ***/

  /*** Validation ***/

  /*** Others ***/

  /*** Handle events ***/
</script>

<!---------------------------------------->

<div class={myStyle[PART.WHOLE]} role="group" aria-labelledby={lid}>
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
  <div class={myStyle[PART.MIDDLE]}>
    {#if typeof left === "string"}
      <span class={myStyle[PART.LEFT]}>{left}</span>
    {:else if typeof left === "function"}
      <span class={myStyle[PART.LEFT]}>{@render left()}</span>
    {/if}
    <span class={myStyle[PART.MAIN]}>
      {@render children()}
    </span>
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
