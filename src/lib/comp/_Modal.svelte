<script module lang="ts">
  /*** Export ***/
  export type Props = {
    children: Snippet,
    status?: State,  // bindable, [STATE.DEFAULT]
    open?: boolean,  // bindable, [false]
    closable?: boolean,  // [true]
    style?: DefineStateStyle | DefineStyle | StyleSet,
    element?: HTMLDialogElement,  // bindable
  };

  /*** Others ***/
  export type PartModal = typeof PART_MODAL[number];
  export const PART_MODAL = [
    PART.WHOLE,
    PART.MAIN,
  ] as const;

  /*** import ***/
  import { type Snippet, untrack } from "svelte";
  import { STATE, PART } from "$lib/const";
  import { getApplyStyle, stop } from "$lib/util";
  import { stdModal } from "$lib/style";
</script>

<!---------------------------------------->

<script lang="ts">
  let { children, status = $bindable(STATE.DEFAULT), open = $bindable(false), closable = true, style, element = $bindable() }: Props = $props();

  /*** Initialize ***/

  /*** Sync with outside ***/
  $effect.pre(() => { open;
    untrack(() => { toggleDialog(); });
  });

  /*** Styling ***/
  const myStyleSet = style === undefined ? stdModal : stdModal.toMerge(style);
  let myStyle = $derived(getApplyStyle(myStyleSet, PART_MODAL as SubTuple<PartTuple>, status));

  /*** Status ***/

  /*** Validation ***/

  /*** Others ***/
  function toggleDialog() {
    if (element === undefined) { return; }
    if (open) {
      element.showModal();
    } else {
      element.close();
    }
  }

  /*** Handle events ***/
  const closeDialog = closable ? () => { open = false; } : undefined;
  const preventClose = closable ? stop(()=>{}) : undefined;
  const preventEsc = closable ? (ev: KeyboardEvent) => { if (ev.key === "Escape") { ev.preventDefault(); }} : undefined;
</script>

<!---------------------------------------->

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog class={myStyle[PART.WHOLE]} bind:this={element} onclick={closeDialog} onkeydown={preventEsc}>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class={myStyle[PART.MAIN]} onclick={preventClose}>
    {@render children()}
  </div>
</dialog>

<!---------------------------------------->

<style>
  :global(html:has(dialog[open])) {
    overflow: hidden;
  }
</style>
