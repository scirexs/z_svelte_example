<script module lang="ts">
  /*** Export ***/
  export type Props = {
    children: Snippet,
    status?: State,  // bindable, [STATE.DEFAULT]
    open?: boolean,  // bindable, [false]
    posX?: number,   // bindable, [0]
    posY?: number,   // bindable, [0]
    style?: DefineStateStyle | DefineStyle,
    element?: HTMLElement,  // bindable
  };
  export type PartContextMenu = typeof PART_CONTEXT_MENU[number];
  export const PART_CONTEXT_MENU = [
    PART.WHOLE,
    PART.MAIN,
  ] as const;

  /*** Others ***/

  /*** import ***/
  import { type Snippet } from "svelte";
  import { STATE, PART } from "$lib/const";
  import { getApplyStyle } from "$lib/util";
  import { stdContextMenu } from "$lib/style";
</script>

<!---------------------------------------->

<script lang="ts">
  let { children, status = $bindable(STATE.DEFAULT), open = $bindable(false), posX = $bindable(0), posY = $bindable(0), style, element = $bindable() }: Props = $props();

  /*** Initialize ***/

  /*** Sync with outside ***/

  /*** Styling ***/
  const myStyleSet = style === undefined ? stdContextMenu : stdContextMenu.toMerge(style);
  let myStyle = $derived(getApplyStyle(myStyleSet, PART_CONTEXT_MENU as SubTuple<PartTuple>, status));

  /*** Status ***/

  /*** Validation ***/

  /*** Others ***/

  /*** Handle events ***/
  function show(ev: MouseEvent) {
    ev.preventDefault();
    open = true
    posX = ev.clientX;
    posY = ev.clientY;
  }
  function hide() { open = false; }
</script>

<!---------------------------------------->
<svelte:document oncontextmenu={show} onclick={hide} />

{#if open}
<nav class={myStyle[PART.WHOLE]} style={`position: absolute; left:${posX}px; top:${posY}px`} bind:this={element}>
  <div class={myStyle[PART.MAIN]}>
    {@render children()}
  </div>
</nav>
{/if}
