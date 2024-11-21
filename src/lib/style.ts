export {
  themeColor,
  stdTextField,
  stdSelectField,
  stdCheckField,
  stdField,
  stdButton,
  stdToggle,
  stdSwitch,
  stdThemeSwitch,
  stdSlider,
  stdColorPicker,
  stdChip,
  stdAccordion,
  stdTabs,
  stdModal,
  stdContextMenu,
}

import { STATE, THEME } from "$lib/const";
import { ThemeColor, StyleSet } from "$lib/util";

/********** Definition of standard style **********/
const themeColor = new ThemeColor({
  [THEME.LIGHT]: {
    system: "243 243 243",  // #f3f3f3
    canvas: "226 232 239",  // #e2e8ef
    txtbdr: "1 65 58",      // #01413a
    active: "3 171 153",    // #03ab99
    inactive: "127 160 145",// #7fa091
    invalid: "171 3 21",    // #ab0315
    bright: "0.9",
  },
  [THEME.DARK]: {
    system: "31 31 31",     // #1f1f1f
    canvas: "26 31 36",     // #1a1f24
    txtbdr: "160 240 230",  // #a0f0e6
    active: "4 214 193",    // #04d6c1
    inactive: "90 114 104", // #5a7268
    invalid: "255 59 78",   // #ff3b4e
    bright: "1.5",
  },
},THEME.DARK);  // initial theme, if no value, auto detect
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
      border_color: "border-txtbdr",
    },
    main: {
      padding: "pl-1",
      flex_grow: "grow",
      background_color: "bg-inherit",
      color: "text-txtbdr placeholder:text-inactive",
      outline_style: "focus:outline-none",
    },
    label: {
      font_family: "font-nsbold",
      color: "text-txtbdr",
    },
    req: {
      margin: "ml-1",
      font_size: "text-sm",
      color: "text-inactive",
    },
    bottom: {
      font_size: "text-sm",
      color: "text-txtbdr",
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
      border_color: "border-txtbdr",
    },
    main: {
      width: "w-full",
      background_color: "bg-inherit",
      color: "text-txtbdr has-[option:checked[value='']]:text-inactive",
      outline_style: "focus:outline-none",
    },
    label: {
      font_family: "font-nsbold",
      color: "text-txtbdr",
    },
    bottom: {
      font_size: "text-sm",
      color: "text-txtbdr",
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
const stdCheckField = new StyleSet({
  [STATE.DEFAULT]: {
    whole: {
      margin: "mb-2.5",
    },
    middle: {
      margin: "-my-1",
      border_width: "border-b",
      border_color: "border-txtbdr",
    },
    main: {
      width: "w-full",
      background_color: "bg-inherit",
      color: "text-txtbdr has-[option:checked[value='']]:text-inactive",
      outline_style: "focus:outline-none",
    },
    label: {
      font_family: "font-nsbold",
      color: "text-txtbdr",
    },
    bottom: {
      font_size: "text-sm",
      color: "text-txtbdr",
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
      color: "text-txtbdr",
    },
    req: {
      font_size: "text-sm",
      color: "text-inactive",
    },
    bottom: {
      font_size: "text-sm",
      color: "text-txtbdr",
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
const stdSwitch = new StyleSet({
  [STATE.DEFAULT]: {
    whole: {
      margin: "m-5",
    },
    main: {
      width: "w-12",
      height: "h-6",
      border_radius: "rounded-2xl",
      background_color: "bg-inactive",
    },
    aux: {
      width: "w-2/5",
      height: "h-4/5",
      position: "top-[9%] left-[9%]",
      border_radius: "rounded-full",
      background_color: "bg-white",
      transition_property: "transition",
      transition_duration: "duration-300",
    },
  },
  [STATE.ACTIVE]: {
    main: {
      background_color: "bg-active",
    },
    aux: {
      transform: "translate-x-[110%]"
    },
  },
});
const stdThemeSwitch = new StyleSet({
  [STATE.DEFAULT]: {
    whole: {
      margin: "m-5",
    },
    main: {
      width: "w-12",
      height: "h-6",
      border_radius: "rounded-2xl",
      background_color: "bg-inactive",
    },
    aux: {
      width: "w-2/5",
      height: "h-4/5",
      position: "top-[9%] left-[9%]",
      border_radius: "rounded-full",
      background_color: "bg-white",
      transition_property: "transition",
      transition_duration: "duration-300",
    },
  },
  [STATE.ACTIVE]: {
    main: {
      background_color: "bg-active",
    },
    aux: {
      transform: "translate-x-[110%]"
    },
  },
});
const stdSlider = new StyleSet({
  [STATE.DEFAULT]: {
    whole: {
      margin: "",
    },
    main: {
      appearance: "appearance-none [&::-webkit-slider-thumb]:appearance-none",
      outline_style: "outline-none",
      width: "[&::-webkit-slider-thumb]:w-4 [&::-moz-range-thumb]:w-4",
      height: "h-1.5 [&::-webkit-slider-thumb]:h-4 [&::-moz-range-thumb]:h-4",
      background_color: "[&::-webkit-slider-thumb]:bg-active [&::-moz-range-thumb]:bg-active",
      border_width: "[&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:active:border-2 [&::-webkit-slider-thumb]:hover:border-2 [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-2",
      border_color: "[&::-webkit-slider-thumb]:border-txtbdr [&::-moz-range-thumb]:border-txtbdr",
      border_style: "[&::-webkit-slider-thumb]:border-solid [&::-moz-range-thumb]:border-solid" ,
      border_radius: "rounded-full [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:rounded-full",
      others: "[--bgcolor-left:--color-active] [--bgcolor-right:--color-txtbdr]",
    }
  },
});
const stdColorPicker = new StyleSet({
  [STATE.DEFAULT]: {
    whole: {
      margin: "m-2",
    },
    main: {
      width: "w-10",
      height: "h-10",
    }
  }
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
      border_color: "border-txtbdr",
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
      background_color: "bg-txtbdr",
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
      color: "text-txtbdr",
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
      color: "text-txtbdr",
      border_width: "border-b-2",
      border_color: "border-txtbdr",
    }
  },
});
const stdModal = new StyleSet({
  [STATE.DEFAULT]: {
    whole: {
      margin: "",
    },
  },
});
const stdContextMenu = new StyleSet({
  [STATE.DEFAULT]: {
    whole: {
      width: "w-fit",
      height: "h-fit",
      background_color: "bg-canvas/90",
      border_radius: "rounded-sm",
      overflow: "overflow-hidden",
      z_index: "z-40",
    },
    main: {
      display: "flex",
      flex_direction: "flex-col",
      flex_wrap: "flex-nowrap",
    }
  },
});
