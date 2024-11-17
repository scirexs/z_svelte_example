<script module lang="ts">
  /*** Export ***/
  export type Props = {
    children: Snippet,
    status?: State,  // bindable, [STATE.DEFAULT]
    open?: boolean,  // bindable, [false]
    pos?: { x: number, y: number },   // bindable, [{x:0, y:0}]
    auto?: boolean,  // [true]
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
  import { type Snippet, untrack } from "svelte";
  import { STATE, PART } from "$lib/const";
  import { getApplyStyle } from "$lib/util";
  import { stdContextMenu } from "$lib/style";
</script>

<!---------------------------------------->

<script lang="ts">
  let { children, status = $bindable(STATE.DEFAULT), open = $bindable(false), pos = $bindable({x:0,y:0}), auto = true, style, element = $bindable() }: Props = $props();

  /*** Initialize ***/
  let visibility = $derived(open ? "visibility: visible;" : "visibility: hidden; z-index: -9999;");

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

    const menu = { width: element?.offsetWidth ?? 0, height: element?.offsetHeight ?? 0 };
    pos.x = window.innerWidth-ev.clientX < menu.width ? ev.clientX-menu.width : ev.clientX;
    pos.y = window.innerHeight-ev.clientY < menu.height ? (ev.clientY < menu.height ? ev.clientY : ev.clientY-menu.height) : ev.clientY;
    open = true
  }
  function hide() { open = false; }
</script>

<!---------------------------------------->
<svelte:document oncontextmenu={auto ? show : undefined} onclick={hide} />

<nav class={myStyle[PART.WHOLE]} style={`position: absolute; left:${pos.x}px; top:${pos.y}px; ${visibility}`} bind:this={element}>
  <div class={myStyle[PART.MAIN]}>
    {@render children()}
  </div>
</nav>
