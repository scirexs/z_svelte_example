<script module lang="ts">
  /*** Export ***/
  export type Props = {
    children: Snippet,
    left?: Snippet,
    right?: Snippet,
    status?: State,  // bindable, [STATE.DEFAULT]
    onclick?: (ev: Event) => void,
    style?: DefineStateStyle | DefineStyle,
  };
  export type PartChip = typeof PART_CHIP[number];
  export const PART_CHIP = [
    PART.WHOLE,
    PART.MAIN,
    PART.LEFT,
    PART.RIGHT,
  ] as const;

  /*** Others ***/

  /*** import ***/
  import { type Snippet, untrack } from "svelte";
  import { STATE, PART } from "$lib/const";
  import { getApplyStyle } from "$lib/util";
  import { stdChip } from "$lib/style";
</script>

<!---------------------------------------->

<script lang="ts">
  let { children, left, right, status = $bindable(STATE.DEFAULT), onclick, style}: Props = $props();

  /*** Initialize ***/

  /*** Sync with outside ***/

  /*** Styling ***/
  const myStyleSet = style === undefined ? stdChip : stdChip.toMerge(style);
  let myStyle = $derived(getApplyStyle(myStyleSet, PART_CHIP as SubTuple<PartTuple>, status));

  /*** Status ***/

  /*** Validation ***/

  /*** Others ***/

  /*** Handle events ***/
</script>

<!---------------------------------------->

<span class={myStyle[PART.WHOLE]}>
  {#if typeof left === "function"}
    <span class={myStyle[PART.LEFT]}>{@render left()}</span>
  {/if}
  <span class={myStyle[PART.MAIN]}>
    {@render children()}
  </span>
  {#if typeof right === "function"}
    {#if typeof onclick === "function"}
      <button class={myStyle[PART.RIGHT]} type="button" {onclick}>{@render right()}</button>
    {:else}
      <span class={myStyle[PART.RIGHT]}>{@render right()}</span>
    {/if}
  {/if}
</span>
