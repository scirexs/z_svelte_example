<script module lang="ts">
  /*** Export ***/
  export type Props = {
    labels?: string[],  // [[]]
    children?: Snippet,
    statuses?: State[],  // bindable, [[]]
    active?: number,  // bindable, [initActive()]
    lock?: boolean,
    style?: DefineStateStyle | DefineStyle | StyleSet,
    [key: string]: unknown | Snippet,
  };
  export type PartTabs = typeof PART_TABS[number];
  export const PART_TABS = [
    PART.WHOLE,
    PART.MAIN,
    PART.TOP,
    PART.BOTTOM,
    PART.LABEL,
  ] as const;

  /*** Others ***/
  const labelRole = "label";
  const panelRole = "panel";

  /*** import ***/
  import { type Snippet, untrack } from "svelte";
  import { STATE, PART } from "$lib/const";
  import { getApplyStyle, getPartApplyStyle } from "$lib/util";
  import { stdTabs } from "$lib/style";
</script>

<!---------------------------------------->

<script lang="ts">
  let { labels = [], children, statuses = $bindable([]), active = $bindable(initActive()), lock = false, style, ...rest }: Props = $props();

  /*** Initialize ***/
  const isStrLabel = labels.length > 0;
  labels = isStrLabel ? labels : getRoleSnippet(labelRole);
  const panels = getRoleSnippet(panelRole);
  statuses = initStatuses();
  active = active;
  let disabilities = $derived(statuses.map(x => lock ? true : x === STATE.DISABLE));
  const isValidSituation = labels.length === panels.length && labels.length === statuses.length;

  /*** Sync with outside ***/
  $effect.pre(() => { active; untrack(() => switchStatus()); });

  /*** Styling ***/
  const myStyleSet = style === undefined ? stdTabs : stdTabs.toMerge(style);
  const myStyle: ApplyStyle = getApplyStyle(myStyleSet, PART_TABS.filter(x => x !== PART.LABEL) as SubTuple<PartTuple>, STATE.DEFAULT);
  let tabStyle: ApplyStyle[] = $derived(statuses.map((_,i) => getPartApplyStyle(myStyleSet, PART.LABEL, statuses[i])));

  /*** Status ***/
  function initStatuses(): State[] {
    return statuses.length <= 0 ? labels.map(_ => STATE.DEFAULT) : statuses;
  }
  function switchStatus() {
    statuses = statuses.map(x => x === STATE.ACTIVE ? STATE.DEFAULT : x);
    statuses[active] = STATE.ACTIVE;
  }

  /*** Validation ***/

  /*** Others ***/
  function initActive(): number {
    const statIndex = statuses.findIndex(x => x === STATE.ACTIVE);
    return statIndex < 0 ? 0 : statIndex;
  }
  function getRoleSnippet(role: string): string[] {
    return Object.keys(rest)
      .filter(key => key.startsWith(role) && typeof rest[key] === "function")
      .toSorted((x,y) => x.localeCompare(y))
  }

  /*** Handle events ***/
  function onclickF(index: number): ((ev: Event) => void) | undefined {
    if (lock || statuses[index] === STATE.DISABLE) { return; }
    return () => {
      active = index;
    }
  }
</script>

<!---------------------------------------->

{#if isValidSituation}
  <div class={myStyle[PART.WHOLE]}>
    <div class={myStyle[PART.TOP]}>
      {#each labels as label, i}
        <button class={tabStyle[i][PART.LABEL]} type="button" onclick={onclickF(i)} disabled={disabilities[i]}>
          {#if isStrLabel}
            {label}
          {:else}
            {@render (rest[label] as Snippet)()}
          {/if}
        </button>
      {/each}
    </div>
    <div class={myStyle[PART.MAIN]}>
      {@render (rest[panels[active]] as Snippet)()}
    </div>
    {#if typeof children === "function"}
      <div class={myStyle[PART.BOTTOM]}>
        {@render children()}
      </div>
    {/if}
  </div>
{/if}
