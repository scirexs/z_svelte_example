<script module lang="ts">
  /*** Export ***/
  export type Props = {
    style?: string,  // bindable
    attributes?: HTMLAttributes<SVGSVGElement>,
  };

  /*** import ***/
  import type { HTMLAttributes } from "svelte/elements";
  import { stdCross1 } from "$lib/style";
</script>

<!---------------------------------------->

<script lang="ts">
  let { style = $bindable(stdCross1), attributes }: Props = $props();
</script>

<!---------------------------------------->

<svg class={style} viewBox="0 0 512 512" {...attributes}>
  <rect fill="transparent"></rect>
  <path d="M511.998 70.682 441.315 0 256.002 185.313 70.685 0 .002 70.692l185.314 185.314L.002 441.318 70.69 512l185.312-185.312L441.315 512l70.683-70.682-185.314-185.312z"/>
</svg>
