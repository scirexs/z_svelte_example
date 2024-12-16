<script module lang="ts">
  /*** Export ***/
  export type Props = {
    status?: State,  // bindable, [STATE.DEFAULT]
    value?: string,  // bindable, ["0 0 0"]
    alpha?: number,  // bindable, [1]
    style?: DefineStateStyle | DefineStyle,
    action?: Action,
    events?: EventSet,
    attributes?: HTMLAttributes<HTMLInputElement>;
    element?: HTMLInputElement,  // bindable
  };
  export type PartColorPicker = typeof PART_COLOR_PICKER[number];
  export const PART_COLOR_PICKER = [
    PART.WHOLE,
    PART.MAIN,
  ] as const;

  export type RgbColor = [number, number, number];
  export function getRgb(hex: string): RgbColor {
    if (!hex.startsWith("#") || (hex.length !== 7 && hex.length !== 4)) { return [0, 0, 0]; }
    if (hex.length === 4) {
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, (_, r, g, b) => r+r + g+g + b+b);
    }
    const ret = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!ret) { return [0, 0, 0] }
    ret.shift();
    return ret.map(x => Number.parseInt(x, 16)) as RgbColor;
  }
  export function getHex(rgb: RgbColor): string {
    if (!isRgbColor(rgb)) { return "#000000"; }
    return "#" + (1 << 24 | rgb[0] << 16 | rgb[1] << 8 | rgb[2]).toString(16).slice(1);
  }
  export function castStringToRgbColor(str: string): RgbColor {
    const ary = str.split("/")[0].trim().split(" ").map(x => Number.parseInt(x));
    if (ary.length !== 3) { return [0,0,0]; }
    if (!isRgbColor(ary as RgbColor)) { return [0,0,0]; }
    return ary as RgbColor;
  }

  /*** Others ***/
  function isRgbColor(rgb: RgbColor): boolean {
    for (let i=0; i<rgb.length; i++) {
      if (!(rgb[i] >= 0 && rgb[i] < 256)) { return false; }
    }
    return true;
  }
  function correctAlpha(alpha: number): number {
    return alpha < 0 ? 0 : alpha > 1 ? 1 : alpha;
  }

  /*** import ***/
  import { type Action } from "svelte/action";
  import { type HTMLAttributes } from "svelte/elements";
  import { untrack } from "svelte";
  import { STATE, PART } from "$lib/const";
  import { getApplyStyle, omit } from "$lib/util";
  import { stdColorPicker } from "$lib/style";
</script>

<!---------------------------------------->

<!-- svelte-ignore state_referenced_locally -->
<script lang="ts">
  let { status = $bindable(STATE.DEFAULT), value = $bindable("0 0 0"), alpha = $bindable(1), style, action, events, attributes, element = $bindable() }: Props = $props();

  /*** Initialize ***/
  const attr = omit({...attributes}, ["type", "disabled"]);
  let disabled = $derived(status === STATE.DISABLE);
  let rgb = $derived(castStringToRgbColor(value));
  let alp = $derived(correctAlpha(alpha));
  let hex = $state(getHex(rgb));

  /*** Sync with outside ***/
  $effect.pre(() => { hex; alp;
    untrack(() => setValue());
  });
  $effect(() => { rgb;
    untrack(() => hex = getHex(rgb));
  });

  /*** Styling ***/
  const myStyleSet = style === undefined ? stdColorPicker : stdColorPicker.toMerge(style);
  let myStyle = $derived(getApplyStyle(myStyleSet, PART_COLOR_PICKER as SubTuple<PartTuple>, status));

  /*** Status ***/

  /*** Validation ***/

  /*** Others ***/
  function setValue() {
    const rgb = getRgb(hex);
    if (alp === 1) {
      value = `${rgb[0]} ${rgb[1]} ${rgb[2]}`;
    } else {
      value = `${rgb[0]} ${rgb[1]} ${rgb[2]} / ${alp}`;
    }
  }

  /*** Handle events ***/
</script>

<!---------------------------------------->

<label class={myStyle[PART.WHOLE]}>
  <!-- inline-block bg-[linear-gradient(45deg,#ccc_25%,transparent_25%),linear-gradient(-45deg,#ccc_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#ccc_75%),linear-gradient(-45deg,transparent_75%,#ccc_75%)] bg-[length:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0px] -->
  <div style="display: inline-block; background-image: linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%); background-size: 20px 20px; background-position: 0 0,0 10px,10px -10px,-10px 0px;">
    <div class={myStyle[PART.MAIN]} style={`background-color: rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alp})`}>
      {#if typeof action === "function"}
        <input bind:value={hex} bind:this={element} type="color" style="visibility: hidden;" {disabled} {...attr} {...events} use:action />
      {:else}
        <input bind:value={hex} type="color" style="visibility: hidden;" {disabled} {...attr} {...events} />
      {/if}
    </div>
  </div>
</label>
