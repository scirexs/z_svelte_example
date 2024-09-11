import type { THEME, STATE, PART, PART_TUPLE } from "$lib/const";
declare global {
  type valueof<T> = T[keyof T];
  type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]; };
  type SubTuple<T extends readonly unknown[]> = T extends readonly [unknown, ...infer Rest] ? [...SubTuple<Rest>] | [T[0], ...SubTuple<Rest>] : [];

  type ThemeType = typeof THEME;
  type StateType = typeof STATE;
  type PartType = typeof PART;
  type PartTuple = typeof PART_TUPLE;

  import type { StyleSet } from "$lib/util";
  type StyleSet = StyleSet;
  type Theme = valueof<ThemeType>;
  type State = valueof<StateType>;
  type StyleKey = "others" | "aspect_ratio" | "columns" | "break_after" | "break_before" | "break_inside" | "box_decoration_break" | "box_sizing" | "display" | "float" | "clear" | "isolation" | "object_fit" | "object_position" | "overflow" | "overscroll_behavior" | "position" | "visibility" | "z_index" | "flex_basis" | "flex_direction" | "flex_wrap" | "flex" | "flex_grow" | "flex_shrink" | "order" | "grid_template_columns" | "grid_column" | "grid_template_rows" | "grid_row" | "grid_auto_flow" | "grid_auto_columns" | "grid_auto_rows" | "gap" | "justify_content" | "justify_items" | "justify_self" | "align_content" | "align_items" | "align_self" | "place_content" | "place_items" | "place_self" | "padding" | "margin" | "space_between" | "width" | "min_width" | "max_width" | "height" | "min_height" | "max_height" | "font_family" | "font_size" | "font_smoothing" | "font_style" | "font_weight" | "font_variant_numeric" | "letter_spacing" | "line_clamp" | "line_height" | "list_style_image" | "list_style_position" | "list_style_type" | "text_align" | "color" | "text_decoration_line" | "text_decoration_color" | "text_decoration_style" | "text_decoration_thickness" | "text_underline_offset" | "text_transform" | "text_overflow" | "text_wrap" | "text_indent" | "vertical_align" | "white_space" | "word_break" | "hyphens" | "content" | "background_attachment" | "background_clip" | "background_color" | "background_origin" | "background_position" | "background_repeat" | "background_size" | "background_image" | "border_radius" | "border_width" | "border_color" | "border_style" | "divide_width" | "divide_color" | "divide_style" | "outline_width" | "outline_color" | "outline_style" | "outline_offset" | "ring_width" | "ring_color" | "ring_offset_width" | "ring_offset_color" | "box_shadow" | "box_shadow_color" | "opacity" | "mix_blend_mode" | "background_blend_mode" | "filter" | "backdrop_filter" | "border_collapse" | "border_spacing" | "table_layout" | "caption_side" | "transition_property" | "transition_duration" | "transition_timing_function" | "transition_delay" | "animation" | "transform" | "transform_origin" | "accent_color" | "appearance" | "cursor" | "caret_color" | "pointer_events" | "resize" | "scroll_behavior" | "scroll_margin" | "scroll_padding" | "scroll_snap_align" | "scroll_snap_stop" | "scroll_snap_type" | "touch_action" | "user_select" | "will_change" | "fill" | "stroke" | "stroke_width" | "screen_readers" | "forced_color_adjust";
  type StylePart = valueof<PartType>;
  type StyleRaw = Partial<{[key in StyleKey]: string}>;
  type DefineTheme = Record<Theme, Record<string, string>>;
  type DefineStyle = Partial<Record<StylePart, StyleRaw>>;
  type DefineStateStyle = Partial<Record<State, DefineStyle>> & Record<typeof STATE.DEFAULT, DefineStyle>;
  type ApplyStyle = Partial<{[key in StylePart]: string | undefined}>;

  type EventKey = "onanimationcancel" | "onanimationend" | "onanimationiteration" | "onanimationstart" | "onauxclick" | "onbeforeinput" | "onbeforematch" | "onbeforexrselect" | "onblur" | "onclick" | "oncompositionend" | "oncompositionstart" | "oncompositionupdate" | "oncontentvisibilityautostatechange" | "oncontextmenu" | "oncopy" | "oncut" | "ondblclick" | "onfocus" | "onfocusin" | "onfocusout" | "onfullscreenchange" | "onfullscreenerror" | "ongotpointercapture" | "oninput" | "onkeydown" | "onkeyup" | "onlostpointercapture" | "onmousedown" | "onmouseenter" | "onmouseleave" | "onmousemove" | "onmouseout" | "onmouseover" | "onmouseup" | "onpaste" | "onpointercancel" | "onpointerdown" | "onpointerenter" | "onpointerleave" | "onpointermove" | "onpointerout" | "onpointerover" | "onpointerrawupdate" | "onpointerup" | "onscroll" | "onscrollend" | "onsecuritypolicyviolation" | "ontouchcancel" | "ontouchend" | "ontouchmove" | "ontouchstart" | "ontransitioncancel" | "ontransitionend" | "ontransitionrun" | "ontransitionstart" | "onwheel" | "onbeforetoggle" | "oncancel" | "onchange" | "ondrag" | "ondragend" | "ondragenter" | "ondragleave" | "ondragover" | "ondragstart" | "ondrop" | "onerror" | "onload" | "ontoggle" | "onformdata" | "onreset" | "onsubmit" | "oncontextlost" | "oncontextrestored" | "onwebglcontextcreationerror" | "onwebglcontextlost" | "onwebglcontextrestored" | "onabort" | "oncanplay" | "oncanplaythrough" | "ondurationchange" | "onemptied" | "onencrypted" | "onended" | "onloadeddata" | "onloadedmetadata" | "onloadstart" | "onpause" | "onplay" | "onplaying" | "onprogress" | "onratechange" | "onseeked" | "onseeking" | "onstalled" | "onsuspend" | "ontimeupdate" | "onvolumechange" | "onwaiting";
  type EventSet = Partial<{[key in EventKey]: (ev: Event) => void}>;
}

export {};
