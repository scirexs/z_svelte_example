<script module lang="ts">
  import "../app.css";
	import { type Snippet } from "svelte";

  type Props = { children: Snippet };
</script>
<script lang="ts">
  const { children }: Props = $props();
</script>

<header>
  <!-- header -->
</header>

<main>
  {@render children()}
</main>

<footer>
  <!-- footer -->
</footer>
