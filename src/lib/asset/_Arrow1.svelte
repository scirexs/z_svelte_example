<script module lang="ts">
  /*** Export ***/
  export type Props = {
    style?: string,  // bindable
    attributes?: HTMLAttributes<SVGSVGElement>,
  };

  /*** import ***/
  import type { HTMLAttributes } from "svelte/elements";
  import { stdArrow1 } from "$lib/style";
</script>

<!---------------------------------------->

<script lang="ts">
  let { style = $bindable(stdArrow1), attributes }: Props = $props();
</script>

<!---------------------------------------->

<svg class={style} viewBox="0 0 512 512" {...attributes}>
  <rect fill="transparent"></rect>
  <path d="M163.916 0 92.084 71.822l184.174 184.174L92.084 440.178 163.916 512l256-256.004z"/>
</svg>
