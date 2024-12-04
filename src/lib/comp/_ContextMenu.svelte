<script module lang="ts">
  /*** Export ***/
  export type Props = {
    children: Snippet,
    status?: State,  // bindable, [STATE.DEFAULT]
    open?: boolean,  // bindable, [false]
    position?: { x: number, y: number },   // bindable, [{x:0, y:0}]
    auto?: boolean,  // [true]
    style?: DefineStateStyle | DefineStyle | StyleSet,
    element?: HTMLElement,  // bindable
  };
  export type PartContextMenu = typeof PART_CONTEXT_MENU[number];
  export const PART_CONTEXT_MENU = [
    PART.WHOLE,
  ] as const;

  /*** Others ***/
  let lock = $state(false);

  /*** import ***/
  import { type Snippet, untrack, onDestroy } from "svelte";
  import { STATE, PART } from "$lib/const";
  import { getApplyStyle } from "$lib/util";
  import { stdContextMenu } from "$lib/style";
</script>

<!---------------------------------------->

<script lang="ts">
  let { children, status = $bindable(STATE.DEFAULT), open = $bindable(false), position = $bindable({x:0,y:0}), auto = true, style, element = $bindable() }: Props = $props();

  /*** Initialize ***/
  let render = $state(false);

  /*** Sync with outside ***/
  $effect.pre(() => { lock;
    untrack(() => shouldRendered());
  });

  /*** Styling ***/
  const myStyleSet = style === undefined ? stdContextMenu : stdContextMenu.toMerge(style);
  let myStyle = $derived(getApplyStyle(myStyleSet, PART_CONTEXT_MENU as SubTuple<PartTuple>, status));
  let visibility = $derived(open ? "visibility: visible;" : "visibility: hidden; z-index: -9999;");

  /*** Status ***/

  /*** Validation ***/

  /*** Others ***/
  function shouldRendered() {
    if (lock) { return; }
    render = true;
    lock = true;
  }

  /*** Handle events ***/
  function show(ev: MouseEvent) {
    ev.preventDefault();

    const menu = { width: element?.offsetWidth ?? 0, height: element?.offsetHeight ?? 0 };
    position.x = window.innerWidth-ev.clientX < menu.width ? ev.clientX-menu.width : ev.clientX;
    position.y = window.innerHeight-ev.clientY < menu.height ? (ev.clientY < menu.height ? ev.clientY : ev.clientY-menu.height) : ev.clientY;
    open = true
  }
  function hide() { open = false; }
  onDestroy(() => lock = false);
</script>

<!---------------------------------------->
<svelte:document oncontextmenu={auto ? show : undefined} onclick={hide} />

{#if render}
  <nav class={myStyle[PART.WHOLE]} style={`position: fixed; left:${position.x}px; top:${position.y}px; ${visibility}`} bind:this={element}>
    {@render children()}
  </nav>
{/if}
