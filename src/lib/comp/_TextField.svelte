<script module lang="ts">
  /*** Export ***/
  export type Props = {
    label?: string,
    req?: string | Snippet,
    aux?: string | Snippet,  // bindable
    left?: string | Snippet,
    right?: string | Snippet,
    bottom?: string,  // bindable
    status?: State,  // bindable, [STATE.DEFAULT]
    value?: string,  // bindable, [""]
    type?: "email" | "password" | "search" | "tel" | "text" | "url" | "number" | "area",  // bindable (to switch password / text), ["text"]
    placeholder?: string,
    options?: string[],  // bindable
    test?: () => boolean,  // bindable
    validation?: (value: string, auto?: boolean) => [boolean, string?, (string | Snippet)?],
    style?: DefineStateStyle | DefineStyle,
    action?: Action,
    events?: EventSet,
    attributes?: HTMLAttributes<HTMLInputElement> | HTMLAttributes<HTMLTextAreaElement>;
    element?: HTMLInputElement | HTMLTextAreaElement,  // bindable
  };
  export type PartTextField = typeof PART_TEXT_FIELD[number];
  export const PART_TEXT_FIELD = [
    PART.WHOLE,
    PART.MIDDLE,
    PART.MAIN,
    PART.TOP,
    PART.LEFT,
    PART.RIGHT,
    PART.BOTTOM,
    PART.LABEL,
    PART.REQ,
    PART.AUX,
  ] as const;

  /*** Others ***/

  /*** import ***/
  import { type Action } from "svelte/action";
  import { type HTMLAttributes } from "svelte/elements";
  import { type Snippet } from "svelte";
  import { STATE, PART } from "$lib/const";
  import { htmlId, getApplyStyle, omit } from "$lib/util";
  import { stdTextField } from "$lib/style";
</script>

<!---------------------------------------->

<script lang="ts">
  let { label, req, aux = $bindable(), left, right, bottom = $bindable(), status = $bindable(STATE.DEFAULT), type = $bindable("text"), value = $bindable(""), placeholder, options = $bindable(), test = $bindable(), validation, style, action, events, attributes, element = $bindable()}: Props = $props();

  /*** Initialize ***/
  test = () => testValue();
  const id = attributes?.id !== undefined ? attributes.id : label === undefined ? undefined : htmlId.get();
  const lid = label === undefined ? undefined : htmlId.get();
  const list = options === undefined ? undefined : htmlId.get();
  const attr = omit({...attributes}, ["class", "id", "disabled", "type", "value", "placeholder", "list"]);
  const ev = omit({...events}, ["onchange"]);
  const partDefault = { bottom, aux };
  let disabled = $derived(status === STATE.DISABLE);

  /*** Sync with outside ***/

  /*** Styling ***/
  const myStyleSet = style === undefined ? stdTextField : stdTextField.toMerge(style);
  let myStyle = $derived(getApplyStyle(myStyleSet, PART_TEXT_FIELD as SubTuple<PartTuple>, status));

  /*** Status ***/
  function setDefault() {
    if (status === STATE.DEFAULT) { return; }
    status = STATE.DEFAULT;
    ({ bottom, aux } = partDefault);
  }
  function setValidateStatus(result: boolean, bottom?: string, aux?: string | Snippet) {
    status = result ? STATE.ACTIVE : STATE.INVALID;
    bottom = (partDefault.bottom !== undefined && bottom === undefined) ? partDefault.bottom : bottom;
    aux = (partDefault.aux !== undefined && aux === undefined) ? partDefault.aux : aux;
  }

  /*** Validation ***/
  function testValue(auto: boolean = false): boolean {
    if (validation === undefined || status === STATE.DISABLE) { return true; }
    const [result, bottom, aux] = validation(value, auto);
    setValidateStatus(result, bottom, aux);
    return result;
  }

  /*** Others ***/

  /*** Handle events ***/
  function onchange(ev: Event) {
    if (events?.["onchange"] !== undefined) { events["onchange"](ev); }
    if (value === "") {
      setDefault();
    } else {
      testValue(true);
    }
  }
</script>

<!---------------------------------------->

<div class={myStyle[PART.WHOLE]} role="group" aria-labelledby={lid}>
  {#if myStyle[PART.TOP] || label !== undefined || req !== undefined || aux !== undefined}
    <div class={myStyle[PART.TOP]}>
      {#if typeof label === "string"}
        <label class={myStyle[PART.LABEL]} for={id} id={lid}>{label}</label>
      {/if}
      {#if typeof req === "string"}
        <span class={myStyle[PART.REQ]}>{req}</span>
      {:else if typeof req === "function"}
        <span class={myStyle[PART.REQ]}>{@render req()}</span>
      {/if}
      {#if typeof aux === "string"}
        <span class={myStyle[PART.AUX]}>{aux}</span>
      {:else if typeof aux === "function"}
        <span class={myStyle[PART.AUX]}>{@render aux()}</span>
      {/if}
    </div>
  {/if}
  <div class={myStyle[PART.MIDDLE]}>
    {#if typeof left === "string"}
      <span class={myStyle[PART.LEFT]}>{left}</span>
    {:else if typeof left === "function"}
      <span class={myStyle[PART.LEFT]}>{@render left()}</span>
    {/if}
    {#if type === "area"}
      {#if typeof action === "function"}
        <textarea bind:value bind:this={element} class={myStyle[PART.MAIN]} {id} {placeholder} {disabled} {onchange} {...attr} {...ev} use:action></textarea>
      {:else}
        <textarea bind:value bind:this={element} class={myStyle[PART.MAIN]} {id} {placeholder} {disabled} {onchange} {...attr} {...ev}></textarea>
      {/if}
    {:else}
      {#if typeof action === "function"}
        <input bind:value bind:this={element} class={myStyle[PART.MAIN]} {id} {type} {placeholder} {list} {disabled} {onchange} {...attr} {...ev} use:action />
      {:else}
        <input bind:value bind:this={element} class={myStyle[PART.MAIN]} {id} {type} {placeholder} {list} {disabled} {onchange} {...attr} {...ev} />
      {/if}
      {#if typeof options !== "undefined"}
        <datalist id={list}>
          {#each options as option}
            <option value={option}></option>
          {/each}
        </datalist>
      {/if}
    {/if}
    {#if typeof right === "string"}
      <span class={myStyle[PART.RIGHT]}>{right}</span>
    {:else if typeof right === "function"}
      <span class={myStyle[PART.RIGHT]}>{@render right()}</span>
    {/if}
  </div>
  {#if typeof bottom === "string"}
    <output class={myStyle[PART.BOTTOM]}>{bottom}</output>
  {/if}
</div>
