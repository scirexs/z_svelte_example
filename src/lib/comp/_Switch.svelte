<script module lang="ts">
  /*** Export ***/
  export type Props = {
    label?: string,  // for aria-label
    left?: string | Snippet,
    right?: string | Snippet,
    status?: State,  // bindable, [STATE.DEFAULT]
    value?: boolean,  // bindable, [false]
    style?: DefineStateStyle | DefineStyle | StyleSet,
    action?: Action,
    events?: EventSet,
    attributes?: HTMLAttributes<HTMLButtonElement>;
    element?: HTMLButtonElement,  // bindable
    children?: Snippet,
  };
  export type PartSwitch = typeof PART_SWITCH[number];
  export const PART_SWITCH = [
    PART.WHOLE,
    PART.MAIN,
    PART.LEFT,
    PART.RIGHT,
    PART.AUX,
  ] as const;

  /*** Others ***/

  /*** import ***/
  import { type Snippet, untrack } from "svelte";
  import { type Action } from "svelte/action";
  import { type HTMLAttributes } from "svelte/elements";
  import { STATE, PART } from "$lib/const";
  import { getApplyStyle, omit } from "$lib/util";
  import { stdSwitch } from "$lib/style";
</script>

<!---------------------------------------->

<script lang="ts">
  let { label, left, right, status = $bindable(STATE.DEFAULT), value = $bindable(false), style, action, events, attributes, element = $bindable(), children }: Props = $props();

  /*** Initialize ***/
  const attr = omit({...attributes}, ["class", "id", "type", "disabled", "role", "aria-checked"]);
  const ev = omit({...events}, ["onclick"]);
  let disabled = $derived(status === STATE.DISABLE);

  /*** Sync with outside ***/
  $effect.pre(() => { value; untrack(() => setStatus()); });

  /*** Styling ***/
  const myStyleSet = style === undefined ? stdSwitch : stdSwitch.toMerge(style);
  let myStyle = $derived(getApplyStyle(myStyleSet, PART_SWITCH as SubTuple<PartTuple>, status));

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

<span class={myStyle[PART.WHOLE]} style="display: inline-flex" role="group">
  {#if typeof left === "string"}
    <span class={myStyle[PART.LEFT]}>{left}</span>
  {:else if typeof left === "function"}
    <span class={myStyle[PART.LEFT]}>{@render left()}</span>
  {/if}
  {#if typeof action === "function"}
    <button bind:this={element} class={myStyle[PART.MAIN]} style="position: relative;" type="button" role="switch" aria-checked={value} aria-label={label} {onclick} {disabled} {...attr} {...ev} use:action>
      {@render thumb()}
    </button>
  {:else}
    <button bind:this={element} class={myStyle[PART.MAIN]} style="position: relative;" type="button" role="switch" aria-checked={value} aria-label={label} {onclick} {disabled} {...attr} {...ev}>
      {@render thumb()}
    </button>
  {/if}
  {#if typeof right === "string"}
    <span class={myStyle[PART.RIGHT]}>{right}</span>
  {:else if typeof right === "function"}
    <span class={myStyle[PART.RIGHT]}>{@render right()}</span>
  {/if}
</span>

{#snippet thumb()}
  <span class={myStyle[PART.AUX]} style="position: absolute;">
    {#if typeof children === "function"}
      {@render children()}
    {:else}
      <!-- svelte-ignore block_empty -->
    {/if}
  </span>
{/snippet}
