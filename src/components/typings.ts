import type { HTMLAttributes } from "vue";

export namespace BBResize {
  interface Knob {
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
    pane: Partial<PaneOptions>;
  }

  export interface StylingAttributes {
    class: string;
    style: HTMLAttributes["style"];
  }

  export type StylingStates = "focused";

  export type InteractiveElementStyles = Record<
    "splitter" | "knob",
    Partial<
      Record<StylingStates, Partial<StylingAttributes>> &
        Partial<StylingAttributes>
    >
  >;

  export type PaneStyles = Partial<InteractiveElementStyles> &
    Partial<StylingAttributes>;

  export type Styles = Partial<
    Record<"container", Partial<StylingAttributes>> & { pane: PaneStyles }
  >;
}
