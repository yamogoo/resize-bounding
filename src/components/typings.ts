import type { HTMLAttributes } from "vue";

export namespace BBResize {
  interface Knob {
    constantlyShow: boolean;
  }

  export enum SplitterPositions {
    CENTER = "center",
    EXTERNAL = "external",
    INTERNAL = "internal",
  }

  export type PanePosition = SplitterPositions | string;

  export interface PaneOptions {
    width: number;
    position: PanePosition;
    cursor: Partial<
      Record<"horizontal" | "vertical", CSSStyleDeclaration["cursor"]>
    >;
    knob: Partial<Knob>;
  }

  export interface Options {
    prefix: string;
    pane: Partial<PaneOptions>;
  }

  export type Styles = Record<
    "container" | "pane" | "splitter" | "knob",
    HTMLAttributes["style"]
  >;
}
