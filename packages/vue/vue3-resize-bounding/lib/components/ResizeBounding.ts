import { IStyles, Options, type PaneDirectionKey } from "../shared/typings";

export interface Props
  extends Partial<{
    width: number;
    height: number;
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
    disabled: boolean;
    directions: PaneDirectionKey;
    alwaysShowKnob: boolean;
    options: Partial<Options>;
    styles: Partial<IStyles>;
    updateWidth: (width: number) => void;
    updateHeight: (height: number) => void;
    dragStart: (dir: string) => void;
    dragMove: (dir: string) => void;
    dragEnd: (dir: string) => void;
    focus: (data: { state: boolean; direction: string }) => void;
  }> {}

export enum Emits {
  FOCUS = "focus",
  UPDATE_WIDTH = "update:width",
  UPDATE_HEIGHT = "update:height",
  DRAG_START = "drag:start",
  DRAG_MOVE = "drag:move",
  DRAG_END = "drag:end",
}
