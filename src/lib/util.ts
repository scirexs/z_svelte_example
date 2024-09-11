/********** Export **********/
export {
  // Styling
  ThemeColor,
  StyleSet,
  StateStyle,
  Style,
  getApplyStyle,
  getPartApplyStyle,
  // Event modifier
  once,
  prevent,
  stop,
  self,
  trusted,
  // Visual behavior
  scroll,
  // Utility
  isPlainObject,
  pick,
  toPick,
  omit,
  toOmit,
  createCounter,
  genUUID,
  getRandomInt,
  trigger,
  // Async utility
  sleep,
  // Global state
  htmlId,
  emptyTest,
}

/********** Import **********/
import { browser } from '$app/environment';
import { STATE, MASK_STATE, THEME } from "$lib/const";

/********** Styling **********/
class ThemeColor {
  static VAR_PREFIX = "--color-";

  #themeset: DefineTheme;
  #theme: Theme;

  constructor(initTheme: Theme, definition: DefineTheme) {
    this.#themeset = definition;
    this.#theme = initTheme;
    this.#switch();
  }

  #switch() {
    if (!browser) { return; }
    for (const [varname, color] of Object.entries(this.#themeset[this.#theme])) {
      document.documentElement.style.setProperty(ThemeColor.VAR_PREFIX+varname, color);
    }
  }
  toLight() { this.theme = THEME.LIGHT; }
  toDark()  { this.theme = THEME.DARK; }

  get theme() { return this.#theme; }
  set theme(value: Theme) {
    this.#theme = value;
    this.#switch();
  }
}

class StyleSet {
  static EMPTY_ARG = {[STATE.DEFAULT]: {}};

  #part: Partial<Record<StylePart, StateStyle>> = {};

  constructor(definition: DefineStateStyle) {
    this.#setPartOfDefault(definition);
    (Object.keys(this.#part) as StylePart[]).forEach(part => {
      this.#setStyleOfState(part, definition);
    });
  }
  #setPartOfDefault(definition: DefineStateStyle) {
    for (const part of StyleSet.getPartFromDefinition(definition, STATE.DEFAULT)) {
      if (definition[STATE.DEFAULT]?.[part] !== undefined) {
        this.#part[part] = new StateStyle(new Style(definition[STATE.DEFAULT][part]!));
      }
    }
  }
  #setStyleOfState(part: StylePart, definition: DefineStateStyle) {
    for (const state of StyleSet.getStateFromDefinition(definition).filter(x => x !== STATE.DEFAULT)) {
      if (definition[state]?.[part] !== undefined) {
        this.#part[part]?.setStyle(state, new Style(definition[state][part]));
      }
    }
  }
  #mergeStyleSet(target: StyleSet): StyleSet {
    const clone = this.clone();
    for (const part of target.getPartArray()) {
      if (this.hasPart(part)) {
        clone.setPart(part, this.#part[part]!.toMerge(target.getPart(part)));
      } else {
        clone.setPart(part, target.getPart(part));
      }
    }
    return clone;
  }
  #mergeDefineStateStyle(target: DefineStateStyle): StyleSet {
    return this.#mergeStyleSet(new StyleSet(target));
  }
  #mergeDefineStyle(target: DefineStyle): StyleSet {
    return this.#mergeStyleSet(new StyleSet({[STATE.DEFAULT]: target}));
  }
  hasPart(part: StylePart): boolean {
    return Object.hasOwn(this.#part, part);
  }
  setPart(part: StylePart, StateStyle?: StateStyle): StyleSet {
    if (StateStyle === undefined) { return this; }
    this.#part[part] = StateStyle;
    return this;
  }
  getPart(part: StylePart): StateStyle | undefined {
    return this.#part[part];
  }
  getPartArray(): StylePart[] {
    return Object.keys(this.#part) as StylePart[]
  }
  clone(): StyleSet {
    const clone = new StyleSet(StyleSet.EMPTY_ARG);
    this.getPartArray().forEach(part => {
      clone.setPart(part, this.#part[part]!.clone());
    });
    return clone;
  }
  toMerge(target: StyleSet | DefineStateStyle | DefineStyle): StyleSet {
    if (target instanceof StyleSet) {
      return this.#mergeStyleSet(target);
    } else if (StyleSet.isDefineStateStyle(target)) {
      return this.#mergeDefineStateStyle(target as DefineStateStyle);
    } else {
      return this.#mergeDefineStyle(target as DefineStyle);
    }
  }

  static getPartFromDefinition(definition: DefineStateStyle, state: State): StylePart[] {
    if (!Object.hasOwn(definition, state)) { return []; }
    return Object.keys(definition[state]!) as StylePart[];
  }
  static getStateFromDefinition(definition: DefineStateStyle): State[] {
    return Object.keys(definition).map(key => Number(key) as State);
  }
  static isDefineStateStyle(definition: DefineStateStyle | DefineStyle): boolean {
    return Object.keys(definition).every(key => Object.values(STATE).includes(Number(key) as State));
  }
}

class StateStyle {
  #raw: Partial<Record<State, Style>> = {};
  #static: Partial<Record<State, string>> = {};

  constructor(style: Style) {
    this.#raw[STATE.DEFAULT] = style;
    this.#static[STATE.DEFAULT] = style.style;
  }
  #setStatic(state: State) {
    this.#static[state] = this.#raw[STATE.DEFAULT]!.toMerge(this.#raw[state]).style;
  }
  hasState(state: State): boolean {
    return Object.hasOwn(this.#raw, state);
  }
  setStyle(state: State, style?: Style): StateStyle {
    if (style === undefined) { return this; }
    this.#raw[state] = style;
    return this;
  }
  mergeStyle(state: State, style?: Style): StateStyle {
    if (style === undefined) { return this; }
    if (this.hasState(state)) {
      this.#raw[state] = this.#raw[state]!.toMerge(style);
      delete this.#static[state];
    } else {
      this.#raw[state] = style;
    }
    return this;
  }
  getStyle(state: State): string {
    if (this.hasState(state)) {
      if (!Object.hasOwn(this.#static, state)) { this.#setStatic(state); }
      return this.#static[state]!;
    } else {
      return this.#static[STATE.DEFAULT]!;
    }
  }
  getRawStyle(state: State): Style {
    if (!this.hasState(state)) { return new Style({}); }
    return this.#raw[state]!.clone();
  }
  getStateArray(): State[] {
    return Object.keys(this.#raw).map(key => Number(key) as State);
  }
  clone(): StateStyle {
    const clone = new StateStyle(this.#raw[STATE.DEFAULT]!.clone());
    for (const state of this.getStateArray().filter(key => key !== STATE.DEFAULT)) {
      clone.setStyle(state, this.#raw[state]!.clone());
    }
    return clone;
  }
  toMerge(target?: StateStyle): StateStyle {
    const clone = this.clone();
    if (target === undefined) { return clone; }
    for (const state of target.getStateArray()) {
      clone.mergeStyle(state, target.getRawStyle(state));
    }
    return clone;
  }
  getLayeredStyle(combState: number): string {
    if (combState <= MASK_STATE.NONE || combState > MASK_STATE.ALL) { return ""; }
    let style = new Style({});
    StateStyle.getCombStateArray(combState).forEach(x => style = style.toMerge(this.#raw[x]));
    return style.style;
  }

  static getCombStateArray(combState: number): State[] {
    const ary: State[] = [];
    let mask = MASK_STATE.BIT1;
    while (mask <= combState) {
      const state: State = (combState & mask) as State;
      if (state !== 0) { ary.push(state); }
      mask = mask << 1;
    }
    return ary;
  }
}

class Style {
  #raw: StyleRaw;
  #static?: string;

  constructor(style: StyleRaw) {
    this.#raw = style;
  }
  #setStatic() { this.#static = Object.values(this.#raw).filter(x => x).join(" "); }
  has(key: StyleKey): boolean {
    return Object.hasOwn(this.#raw, key);
  }
  merge(target?: Style): Style {
    if (target === undefined) { return this; }
    const ow = target.raw;
    (Object.keys(ow) as StyleKey[]).forEach(key => this.#raw[key] = ow[key]);
    this.#static = undefined;
    return this;
  }
  clone(): Style {
    return new Style({...this.#raw});
  }
  toMerge(target?: Style): Style {
    if (target === undefined) { return this.clone(); }
    return this.clone().merge(target);
  }

  get raw() { return this.#raw; }
  get style(): string {
    if (this.#static === undefined) { this.#setStatic(); }
    return this.#static!;
  }
}

function getApplyStyle(style: StyleSet, part: SubTuple<PartTuple>, status: State): ApplyStyle {
  return Object.fromEntries(Object.values(part).map(x => [x, style.getPart(x)?.getStyle(status)]));
}
function getPartApplyStyle(style: StyleSet, part: StylePart, status: State): ApplyStyle {
  return Object.fromEntries([[part, style.getPart(part)?.getStyle(status)]]);
}

/********** Event modifier **********/
function once<T extends Element>(func?: (this: T, evt: Event) => void) {
  return function(this: T, evt: Event) {
    if (func !== undefined) { func.call(this, evt); }
    func = undefined;
  };
}
function prevent<T extends Element>(func?: (this: T, evt: Event) => void) {
  return function(this: T, evt: Event) {
    if (func !== undefined) {
      evt.preventDefault();
      func.call(this, evt);
    }
  };
}
function stop<T extends Element>(func?: (this: T, evt: Event) => void) {
  return function(this: T, evt: Event) {
    if (func !== undefined) {
      evt.stopPropagation();
      func.call(this, evt);
    }
  };
}
function self<T extends Element>(func?: (this: T, evt: Event) => void) {
  return function(this: T, evt: Event) {
    if (func !== undefined && evt.target === this) {
      func.call(this, evt);
    }
  };
}
function trusted<T extends Element>(func?: (this: T, evt: Event) => void) {
  return function(this: T, evt: Event) {
    if (func !== undefined && evt.isTrusted) {
      func.call(this, evt);
    }
  };
}

/********** Visual behavior **********/
function scroll<T extends Element>(this: T, evt: Event): void {
  if (!(evt.target instanceof HTMLElement)) { return; }
  const selector = evt.target.getAttribute("href");
  if (!selector) { return; }
  const elem = document.querySelector(selector);
  if (!elem) { return; };
  evt.preventDefault();
  elem.scrollIntoView({
    behavior: "smooth"
  });
}

/********** Utility **********/
function isPlainObject(target: unknown): boolean {
  return (typeof target === "object" && target !== null && target!.constructor == Object);
}
function pick<T extends Record<string, any>, K extends keyof T>(obj: Pick<T, K>, keys: K[]): Pick<T, K> {
  const ret = {} as Pick<T, K>;
  for (const key of keys) {
    ret[key] = obj[key];
  }
  obj = ret;
  return obj;
}
function toPick<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const ret = {} as Pick<T, K>;
  for (const key of keys) {
    ret[key] = obj[key];
  }
  return ret;
}
function omit<T extends {[key: string]:any}>(obj: T, keys: string[]): Partial<T> {
  for (const key of keys) {
    delete obj[key];
  }
  return obj;
}
function toOmit<T extends {[key: string]:any}>(obj: T, keys: string[]): Partial<T> {
  const ret = { ...obj };
  for (const key of keys) {
    delete ret[key];
  }
  return ret;
}
function createCounter(init: number = 1) {
  let n = init - 1;
  function next(): number {
    n += 1;
    return n;
  }
  return next;
}
function genUUID(): string {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c => (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16));
}
function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}
function trigger(target: boolean): boolean {
  return !target;
}

/********** Async utility **********/
async function sleep(msec: number) {
  return new Promise(resolve => setTimeout(resolve, msec));
}

/********** Global state **********/
class HtmlIds {
  #limit = Number.POSITIVE_INFINITY;
  #length;
  #store = new Set<string>();
  constructor(len: number, limit: number = 0) {
    if (limit > 0) { this.#limit = limit; }
    this.#length = len;
  }
  get(): string {
    if (this.#store.size > this.#limit) { this.#store.clear(); }
    let id = HtmlIds.#gen(this.#length);
    while (this.#store.has(id)) { id = HtmlIds.#gen(this.#length); }
    this.#store.add(id);
    return id;
  }

  static #gen(len: number): string {
    function getRandChar(nodigit: boolean) {
      const ALPHABETIC = [[65, 25],[97, 25]];  // [A-Y],[a-y]
      const ALPHANUMERIC = [...ALPHABETIC, [48, 10]];  // [A-Y],[a-y],[0-9]
      const baseAry = nodigit ? ALPHABETIC : ALPHANUMERIC;
      const [base, rate] = baseAry[Math.trunc(Math.random() * baseAry.length)];
      return Math.trunc(base + (Math.random() * rate));
    }
    return String.fromCharCode(...Array(len).fill(null).map((_,i) => getRandChar(!i)));
  }
}
const htmlId = new HtmlIds(4, 2000);
const emptyTest = () => { return true; };

/********** Private function **********/

