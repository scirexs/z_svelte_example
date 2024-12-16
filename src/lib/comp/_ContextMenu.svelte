<script module lang="ts">
  /*** Export ***/
  export type Props = {
    children: Snippet,
    status?: State,  // bindable, [STATE.DEFAULT]
    open?: boolean,  // bindable, [false]  (to observe state, not to control)
    lock?: boolean,  // bindable, [false]
    style?: DefineStateStyle | DefineStyle | StyleSet,
    element?: HTMLElement,  // bindable
  };
  export type PartContextMenu = typeof PART_CONTEXT_MENU[number];
  export const PART_CONTEXT_MENU = [
    PART.WHOLE,
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
  let { children, status = $bindable(STATE.DEFAULT), open = $bindable(false), lock = $bindable(false), style, element = $bindable() }: Props = $props();

  /*** Initialize ***/
  let position = $state({ x: 0, y: 0 });

  /*** Sync with outside ***/

  /*** Styling ***/
  const myStyleSet = style === undefined ? stdContextMenu : stdContextMenu.toMerge(style);
  let myStyle = $derived(getApplyStyle(myStyleSet, PART_CONTEXT_MENU as SubTuple<PartTuple>, status));
  let visibility = $derived(open ? "visibility: visible;" : "visibility: hidden; z-index: -9999;");

  /*** Status ***/

  /*** Validation ***/

  /*** Others ***/

  /*** Handle events ***/
  function show(ev: MouseEvent) {
    if (lock) { return; }
    ev.preventDefault();

    const menu = { width: element?.offsetWidth ?? 0, height: element?.offsetHeight ?? 0 };
    position.x = window.innerWidth-ev.clientX < menu.width ? ev.clientX-menu.width : ev.clientX;
    position.y = window.innerHeight-ev.clientY < menu.height ? (ev.clientY < menu.height ? ev.clientY : ev.clientY-menu.height) : ev.clientY;
    open = true
  }
  function hide() { open = false; }
</script>

<!---------------------------------------->
<svelte:document oncontextmenu={show} onclick={hide} />

<nav class={myStyle[PART.WHOLE]} style={`position: fixed; left:${position.x}px; top:${position.y}px; ${visibility}`} bind:this={element}>
  {@render children()}
</nav>
