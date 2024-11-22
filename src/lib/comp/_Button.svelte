<script module lang="ts">
  /*** Export ***/
  export type Props = {
    children: Snippet,
    left?: string | Snippet,
    right?: string | Snippet,
    status?: State,  // bindable, [STATE.DEFAULT]
    type?: "submit" | "reset" | "button",  // ["button"]
    onclick?: (ev: Event) => void,
    style?: DefineStateStyle | DefineStyle | StyleSet,
    action?: Action,
    events?: EventSet,
    attributes?: HTMLAttributes<HTMLButtonElement>;
    element?: HTMLButtonElement,  // bindable
  };
  export type PartButton = typeof PART_BUTTON[number];
  export const PART_BUTTON = [
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
  import { getApplyStyle, omit } from "$lib/util";
  import { stdButton } from "$lib/style";
</script>

<!---------------------------------------->

<script lang="ts">
  let { children, left, right, status = $bindable(STATE.DEFAULT), type = "button", onclick, style, action, events, attributes, element = $bindable()}: Props = $props();

  /*** Initialize ***/
  onclick = onclick ?? events?.["onclick"];
  const attr = omit({...attributes}, ["class", "type", "disabled"]);
  const ev = omit({...events}, ["onclick"]);
  let disabled = $derived(status === STATE.DISABLE);

  /*** Sync with outside ***/

  /*** Styling ***/
  const myStyleSet = style === undefined ? stdButton : stdButton.toMerge(style);
  let myStyle = $derived(getApplyStyle(myStyleSet, PART_BUTTON as SubTuple<PartTuple>, status));

  /*** Status ***/

  /*** Validation ***/

  /*** Others ***/

  /*** Handle events ***/
</script>

<!---------------------------------------->

{#if typeof action === "function"}
  <button bind:this={element} class={myStyle[PART.WHOLE]} {type} {onclick} {disabled} {...attr} {...ev} use:action>
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
  </button>
{:else}
  <button bind:this={element} class={myStyle[PART.WHOLE]} {type} {onclick} {disabled} {...attr} {...ev}>
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
  </button>
{/if}
