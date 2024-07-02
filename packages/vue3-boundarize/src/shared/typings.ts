import type { HTMLAttributes } from "vue";

export namespace BBResize {
  export interface Knob {
    show: boolean;
    constantlyShow: boolean;
  }

  export enum SplitterPositions {
    CENTER = "central",
    EXTERNAL = "external",
    INTERNAL = "internal",
  }

  export type PanePosition = SplitterPositions | string;

  export interface PaneOptions {
    width: number;
    position: PanePosition;
    showBorder: boolean;
    cursor: Partial<
      Record<"horizontal" | "vertical", CSSStyleDeclaration["cursor"]>
    >;
    knob: Partial<Knob>;
  }

  export interface Options {
    prefix: string;
    pane: PaneOptions;
  }

  export interface StylingAttributes {
    class: string;
    style: HTMLAttributes["style"];
  }

  export type StylingStates = "focused";

  export type InteractiveElementStyles = Record<
    "splitter" | "knob",
    Record<StylingStates, StylingAttributes> & StylingAttributes
  >;

  export type PaneStyles = InteractiveElementStyles & StylingAttributes;

  export type Styles = Record<"container", StylingAttributes> & {
    pane: PaneStyles;
  };
}
