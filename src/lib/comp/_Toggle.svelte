<script module lang="ts">
  /*** Export ***/
  export type Props = {
    children: Snippet,
    left?: string | Snippet,
    right?: string | Snippet,
    status?: State,  // bindable, [STATE.DEFAULT]
    value?: boolean,  // bindable, [false]
    style?: DefineStateStyle | DefineStyle,
    action?: Action,
    events?: EventSet,
    attributes?: HTMLAttributes<HTMLButtonElement>;
    element?: HTMLButtonElement,  // bindable
  };
  export type PartToggle = typeof PART_TOGGLE[number];
  export const PART_TOGGLE = [
    PART.WHOLE,
    PART.MAIN,
    PART.LEFT,
    PART.RIGHT,
  ] as const;

  /*** Others ***/

  /*** import ***/
  import type { Action } from "svelte/action";
  import type { HTMLAttributes } from "svelte/elements";
  import { type Snippet, untrack } from "svelte";
  import { STATE, PART } from "$lib/const";
  import { getApplyStyle, omit } from "$lib/util";
  import { stdToggle } from "$lib/style";
</script>

<!---------------------------------------->

<script lang="ts">
  let { children, left, right, status = $bindable(STATE.DEFAULT), value = $bindable(false), style, action, events, attributes, element = $bindable()}: Props = $props();

  /*** Initialize ***/
  const attr = omit({...attributes}, ["type"]);
  const ev = omit({...events}, ["onclick"]);
  let disabled = $derived(status === STATE.DISABLE);

  /*** Sync with outside ***/
  $effect.pre(() => { value; untrack(() => setStatus()); });

  /*** Styling ***/
  const myStyleSet = style === undefined ? stdToggle : stdToggle.toMerge(style);
  let myStyle = $derived(getApplyStyle(myStyleSet, PART_TOGGLE as SubTuple<PartTuple>, status));

  /*** Status ***/
  function setStatus() {
    status = value ? STATE.ACTIVE : STATE.DEFAULT;
  }

  /*** Validation ***/

  /*** Others ***/

  /*** Handle events ***/
  function onclick(ev: Event) {
    value = !value;
    if (events?.["onclick"] !== undefined) { events["onclick"](ev); }
  }
</script>

<!---------------------------------------->

{#if typeof action === "function"}
  <button bind:this={element} class={myStyle[PART.WHOLE]} type="button" {onclick} {disabled} {...attr} {...ev} use:action>
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
  <button bind:this={element} class={myStyle[PART.WHOLE]} type="button" {onclick} {disabled} {...attr} {...ev}>
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
