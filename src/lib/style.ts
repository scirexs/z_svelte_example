export {
  // theme color
  themeColor,
  // components
  stdTextField,
  // stdCheckField,
  stdSelectField,
  stdField,
  stdButton,
  stdToggle,
  // stdSwitch,
  stdChip,
  stdAccordion,
  stdTabs,
  // asset
  stdCross1,
  stdArrow1,
}

import { STATE, THEME } from "$lib/const";
import { ThemeColor, StyleSet } from "$lib/util";

/********** Definition of standard style **********/
const themeColor = new ThemeColor(
  THEME.LIGHT, {
  [THEME.LIGHT]: {
    canvas: "#e2e8ef",
    active: "#03ab99",
    inactive: "#7fa091",
    charline: "#01413a",
    invalid: "#ab0315",
  },
  [THEME.DARK]: {
    canvas: "#1a1f24",
    active: "#04d6c1",
    inactive: "#5a7268",
    charline: "#a0f0e6",
    invalid: "#ff3b4e",
  },
});
const stdTextField = new StyleSet({
  [STATE.DEFAULT]: {
    whole: {
      margin: "mb-2.5",
    },
    middle: {
      margin: "-my-1",
      padding: "px-0.5",
      display: "flex",
      border_width: "border-b",
      border_color: "border-charline",
    },
    main: {
      padding: "pl-1",
      flex_grow: "grow",
      background_color: "bg-inherit",
      color: "text-charline placeholder:text-inactive",
      outline_style: "focus:outline-none",
    },
    label: {
      font_family: "font-nsbold",
      color: "text-charline",
    },
    req: {
      margin: "ml-1",
      font_size: "text-sm",
      color: "text-inactive",
    },
    bottom: {
      font_size: "text-sm",
      color: "text-charline",
    },
    left: {
      width: "w-fit",
      color: "text-inactive"
    },
  },
  [STATE.INVALID]: {
    label: {
      color: "text-invalid",
    },
    middle: {
      border_color: "border-invalid",
    },
    bottom: {
      color: "text-invalid",
    },
  },
});
const stdSelectField = new StyleSet({
  [STATE.DEFAULT]: {
    whole: {
      margin: "mb-2.5",
    },
    middle: {
      margin: "-my-1",
      border_width: "border-b",
      border_color: "border-charline",
    },
    main: {
      width: "w-full",
      background_color: "bg-inherit",
      color: "text-charline has-[option:checked[value='']]:text-inactive",
      outline_style: "focus:outline-none",
    },
    label: {
      font_family: "font-nsbold",
      color: "text-charline",
    },
    bottom: {
      font_size: "text-sm",
      color: "text-charline",
    },
  },
  [STATE.INVALID]: {
    label: {
      color: "text-invalid",
    },
    middle: {
      border_color: "border-invalid",
    },
    bottom: {
      color: "text-invalid",
    },
  },
});
const stdField = new StyleSet({
  [STATE.DEFAULT]: {
    whole: {
      margin: "mb-2.5",
    },
    middle: {
      padding: "px-2",
    },
    main: {
      width: "w-full",
      display: "flex",
      flex_wrap: "flex-wrap",
      gap: "gap-1.5",
      background_color: "bg-inherit",
    },
    label: {
      font_family: "font-nsbold",
      color: "text-charline",
    },
    req: {
      font_size: "text-sm",
      color: "text-inactive",
    },
    bottom: {
      font_size: "text-sm",
      color: "text-charline",
    },
  },
  [STATE.INVALID]: {
    label: {
      color: "text-invalid",
    },
    req: {
      color: "text-invalid",
    },
    bottom: {
      color: "text-invalid",
    },
  },
});
const stdButton = new StyleSet({
  [STATE.DEFAULT]: {
    whole: {
      height: "h-10",
      width: "w-full",
      display: "inline-flex",
      flex_basis: "basis-2/3",
      flex_grow: "grow",
      flex_wrap: "flex-nowrap",
      justify_content: "space-between",
      align_items: "items-center",
      border_radius: "rounded-md",
      border_width: "border-2",
      border_color: "border-active",
      background_color: "bg-active",
      user_select: "select-none",
    },
    main: {
      font_family: "font-nsbold",
      color: "text-canvas",
      text_overflow: "truncate",
      margin: "mx-auto"
    },
    left: {
      height: "h-5",
      width: "w-5",
    },
    right: {
      height: "h-5",
      width: "w-5",
    },
  },
  [STATE.INVALID]: {
    whole: {
      border_color: "border-inactive",
      background_color: "bg-inactive",
    },
  },
  [STATE.DISABLE]: {
    whole: {
      border_color: "border-inactive",
      background_color: "bg-inactive",
    },
  },
  [STATE.CUSTOM1]: {
    whole: {
      flex_basis: "basis-1/3",
      border_color: "border-inactive",
      background_color: "bg-canvas",
    },
    main: {
      color: "text-inactive",
    },
  },
  [STATE.CUSTOM2]: {  // for select all
    whole: {
      height: "h-7",
      width: "",
      flex_basis: "",
      flex_grow: "",
      justify_content: "",
      border_radius: "rounded-full",
      border_color: "border-active",
      background_color: "bg-canvas",
    },
    main: {
      margin: "",
      color: "text-active",
      padding: "px-3",
    },
  },
});
const stdToggle = new StyleSet({
  [STATE.DEFAULT]: {
    whole: {
      height: "h-7",
      display: "inline-flex",
      flex_wrap: "flex-nowrap",
      align_items: "items-center",
      border_radius: "rounded-full",
      border_width: "border-2",
      border_color: "border-inactive",
      background_color: "bg-inactive",
      user_select: "select-none",
    },
    main: {
      font_family: "font-nsbold",
      color: "text-canvas",
      text_overflow: "truncate",
      padding: "px-3",
    },
  },
  [STATE.ACTIVE]: {
    whole: {
      border_color: "border-active",
      background_color: "bg-active",
    },
  },
});
const stdChip = new StyleSet({
  [STATE.DEFAULT]: {
    whole: {
      height: "min-h-7",
      padding: "pl-3 pr-2.5",
      display: "inline-flex",
      flex_wrap: "flex-nowrap",
      justify_content: "justify-center",
      align_items: "items-center",
      gap: "gap-2",
      border_radius: "rounded-full",
      background_color: "bg-active",
      user_select: "select-none",
    },
    main: {
      font_family: "font-nsbold",
      font_size: "text-sm",
      color: "text-canvas",
      text_overflow: "truncate",
    }
  },
  [STATE.INVALID]: {
    whole: {}
  },
});
const stdAccordion = new StyleSet({
  [STATE.DEFAULT]: {
    whole: {
      width: "w-full",
      margin: "mt-5",
      border_radius: "rounded-lg",
      border_width: "border",
      border_color: "border-charline",
      overflow: "overflow-hidden",
      transition_duration: "duration-75",
    },
    label: {
      min_height: "min-h-8",
      display: "flex",
      flex_wrap: "flex-nowrap",
      justify_content: "justify-center",
      align_items: "items-center",
      font_family: "font-nsbold",
      color: "text-canvas",
      background_color: "bg-charline",
      list_style_type: "list-none",
      cursor: "cursor-pointer",
      user_select: "select-none",
      others: "[&::-webkit-details-marker]:hidden"
    },
    main: {
      display: "flex",
      padding: "py-2 px-3",
      flex_direction: "flex-col",
      gap: "gap-2",
      divide_width: "divide-y",
      divide_color: "divide-inactive",
      color: "text-charline",
    }
  },
});
const stdTabs = new StyleSet({
  [STATE.DEFAULT]: {
    whole: {
      min_width: "min-w-80", // 320px
      max_width: "max-w-[768px]",
      margin: "mx-auto",
      padding: "px-5",
    },
    top: {
      display: "flex",
      flex_direction: "flex-row",
      flex_wrap: "flex-nowrap",
      flex: "flex-auto",
      border_width: "border-b-2",
      border_color: "border-inactive",
    },
    label: {
      margin: "-mb-0.5",
      width: "w-full",
      height: "h-14",
      font_family: "font-nsbold",
      font_size: "text-xl",
      font_weight: "font-bold",
      color: "text-inactive",
      border_width: "border-b-2",
      border_color: "border-transparent",
      overflow: "truncate",
      cursor: "cursor-default",
      user_select: "select-none",
    },
    main: {
      // display: "flex",
      // flex_direction: "flex-col",
      // justify_content: "justify-center",
      // align_items: "items-center",
      padding: "pt-2",
    }
  },
  [STATE.ACTIVE]: {
    label: {
      color: "text-charline",
      border_width: "border-b-2",
      border_color: "border-charline",
    }
  },
});

const stdCross1 = "h-2.5 w-2.5 fill-white/70 hover:fill-white";
const stdArrow1 = "h-5 w-5 fill-charline";
