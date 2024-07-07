import fluentui from "@fluentui/merge-styles";

export namespace ResizeBounding {
  export interface Knob {
    show: boolean;
    normalHidden: boolean;
  }

  export enum SplitterPositions {
    CENTER = "central",
    EXTERNAL = "external",
    INTERNAL = "internal",
  }

  export type PanePosition = SplitterPositions | string;

  export interface Options {
    prefix: string;
    width: number;
    position: PanePosition;
    cursor: Partial<
      Record<"horizontal" | "vertical", CSSStyleDeclaration["cursor"]>
    >;
    knob: Partial<Knob>;
  }

  export type ResizeBoundingClassNames =
    | "container"
    | "pane"
    | "splitter"
    | "splitterContainer"
    | "knob";

  export interface IResizeBoundingClassNames {
    container: string;
    pane: string;
    splitter: string;
    splitterContainer: string;
    knob: string;
  }

  export interface IStyles extends Record<ResizeBoundingClassNames, IStyle> {}
  export type IStyle = fluentui.IStyle;
  export type IStyleSet = fluentui.IStyleSet;
}
