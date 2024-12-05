<script module lang="ts">
  /*** Export ***/
  export type PartTooltip = typeof PART_TOOLTIP[number];
  export const PART_TOOLTIP = [
    PART.WHOLE,
  ] as const;

  export function tooltip(node: HTMLElement, text: string): ActionReturn {
    return tooltipAction(node, text);
  }
  export function compTooltip(text: string): Action {
    return (node) => { return tooltipAction(node, text); };
  }

  /*** Others ***/
  type Unlisten = () => void;
  const DELAY = 1000;
  const OFFSET = 5;
  const position = {
    elem: { x: 0, y: 0 },
    cursor: { x: 0, y: 0 },
  };
  const tempListener: Unlisten[] = [];
  let timeoutId = 0;
  let hrender = $state({ lock: false, visible: false, text: ""});

  function tooltipAction(node: HTMLElement, text: string): ActionReturn {
    node.ariaDescription = text;
    const unlisten = on(node, "mouseenter", showEvent(node, text));
    return { destroy: cleanup(unlisten) };
  }
  function showEvent(node: HTMLElement, text: string): (ev: MouseEvent) => void {
    return (ev) => {
      show(text);
      tempListener.push(on(node, "mouseleave", hideEvent()));
      tempListener.push(on(node, "mousemove", trackCursor()));
    };
  }
  function hideEvent(): (ev: MouseEvent) => void {
    return (ev) => { hide(); };
  }
  function trackCursor(): (ev: MouseEvent) => void {
    return throttle(20, (ev) => {
      if (hrender.visible) { return; }
      position.cursor.x = ev.clientX;
      position.cursor.y = ev.clientY;
    });
  }
  function show(text: string) {
    if (timeoutId !== 0) { clearTimeout(timeoutId); }
    hrender.text = text;
    timeoutId = setTimeout(() => hrender.visible = true, DELAY);
  }
  function hide() {
    clearTimeout(timeoutId);
    timeoutId = 0;
    hrender.visible = false;
    tempListener.forEach(x => x());
  }
  function cleanup(unlisten: Unlisten): () => void {
    return () => {
      unlisten();
      hide();
      hrender.lock = false
    };
  }

  /*** import ***/
  import { untrack } from "svelte";
  import { on } from "svelte/events";
  import { type Action, type ActionReturn } from "svelte/action";
  import { STATE, PART } from "$lib/const";
  import { getApplyStyle, throttle } from "$lib/util";
  import { stdTooltip } from "$lib/style";
</script>

<!---------------------------------------->

<script lang="ts">
  /*** Initialize ***/
  let elem: HTMLDivElement | undefined = $state();
  let appear = $state(false);

  /*** Sync with outside ***/
  $effect.pre(() => { hrender.visible;
    untrack(() => adjustPosition());
  });
  $effect.pre(() => { hrender.lock;
    untrack(() => shouldAppear());
  });

  /*** Styling ***/
  const myStyle = getApplyStyle(stdTooltip, PART_TOOLTIP as SubTuple<PartTuple>, STATE.DEFAULT);
  let visibility = $derived(hrender.visible ? "visibility: visible;" : "visibility: hidden; z-index: -9999;");

  /*** Status ***/

  /*** Validation ***/

  /*** Others ***/
  function shouldAppear() {
    if (hrender.lock) { return; }
    appear = true;
    hrender.lock = true;
  }
  function adjustPosition() {
    if (!hrender.visible) { return; }
    const size = { width: elem?.offsetWidth ?? 0, height: elem?.offsetHeight ?? 0 };
    position.elem.x = window.innerWidth-position.cursor.x < size.width ? position.cursor.x-size.width : position.cursor.x + (OFFSET * 2);
    position.elem.y = window.innerHeight-position.cursor.y < size.height ? position.cursor.y-size.height : position.cursor.y + OFFSET;
  }

  /*** Handle events ***/
</script>

<!---------------------------------------->

{#if appear}
  <div bind:this={elem} class={myStyle[PART.WHOLE]} style={`position: fixed; left: ${position.elem.x}px; top: ${position.elem.y}px; ${visibility}`} aria-hidden="true">
    {hrender.text}
  </div>
{/if}
