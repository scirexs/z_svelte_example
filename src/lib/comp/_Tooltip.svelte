<script module lang="ts">
  /*** Export ***/
  export type PartTooltip = typeof PART_TOOLTIP[number];
  export const PART_TOOLTIP = [
    PART.WHOLE,
  ] as const;

  export function tooltip(node: HTMLElement, text: string): ActionReturn {
    node.ariaDescription = text;
    const unlisten = on(node, "mouseenter", showEvent(node, text));
    return { destroy: unlisten };
  }
  export function compTooltip(text: string): Action {
    return (node) => {
      node.ariaDescription = text;
      const unlisten = on(node, "mouseenter", showEvent(node, text));
      return { destroy: unlisten };
    };
  }

  /*** Others ***/
  type Unlisten = () => void;

  const DELAY = 1000;
  const OFFSET = 5;
  let lock = $state(false);
  let visible = $state(false);
  let tooltipText: string = $state("");
  const position = { x: 0, y: 0 };
  const pointer = {x: 0, y: 0};

  function showEvent(node: HTMLElement, text: string): (ev: MouseEvent) => void {
    let unlistenArray: Unlisten[] = [];

    return (ev) => {
      tooltipText = text;
      const id = setTimeout(()=>visible=true, DELAY);
      unlistenArray.push(on(node, "mouseleave", hideEvent(id, unlistenArray)));
      unlistenArray.push(on(node, "mousemove", trackPointer()));
    };
  }
  function hideEvent(id: number, unlistenArray: Unlisten[]): (ev: MouseEvent) => void {
    return (ev) => {
      clearTimeout(id);
      visible = false;
      unlisten(unlistenArray);
    };
  }
  function trackPointer(): (ev: MouseEvent) => void {
    return throttle(20, (ev) => {
      if (visible) { return; }
      pointer.x = ev.clientX;
      pointer.y = ev.clientY;
    });
  }
  function unlisten(unlistenArray: Unlisten[]) {
    for (const u of unlistenArray) { u(); }
  }

  /*** import ***/
  import { untrack, onDestroy } from "svelte";
  import { type Action, type ActionReturn } from "svelte/action";
  import { on } from "svelte/events";
  import { STATE, PART } from "$lib/const";
  import { getApplyStyle, throttle } from "$lib/util";
  import { stdTooltip } from "$lib/style";
</script>

<!---------------------------------------->

<script lang="ts">
  /*** Initialize ***/
  let elem: HTMLDivElement | undefined = $state();
  let render = $state(false);

  /*** Sync with outside ***/
  $effect.pre(() => { visible;
    untrack(() => adjustPosition());
  });
  $effect.pre(() => { lock;
    untrack(() => shouldRendered());
  });

  /*** Styling ***/
  const myStyle = getApplyStyle(stdTooltip, PART_TOOLTIP as SubTuple<PartTuple>, STATE.DEFAULT);
  let visibility = $derived(visible ? "visibility: visible;" : "visibility: hidden; z-index: -9999;");

  /*** Status ***/

  /*** Validation ***/

  /*** Others ***/
  function shouldRendered() {
    if (lock) { return; }
    render = true;
    lock = true;
  }
  function adjustPosition() {
    if (!visible) { return; }
    const size = { width: elem?.offsetWidth ?? 0, height: elem?.offsetHeight ?? 0 };
    position.x = window.innerWidth-pointer.x < size.width ? pointer.x-size.width : pointer.x + (OFFSET * 2);
    position.y = window.innerHeight-pointer.y < size.height ? pointer.y-size.height : pointer.y + OFFSET;
  }

  /*** Handle events ***/
  onDestroy(() => lock = false);
</script>

<!---------------------------------------->

{#if render}
  <div bind:this={elem} class={myStyle[PART.WHOLE]} style={`position: fixed; left: ${position.x}px; top: ${position.y}px; ${visibility}`} aria-hidden="true">
    {tooltipText}
  </div>
{/if}
