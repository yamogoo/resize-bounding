import { HTMLAttributes } from "vue";

import {
  PaneDirections,
  PanePosition,
  SplitterPositions,
} from "../shared/typings";

export const paneBaseStyles = (
  size: number,
  areaWidth: number,
  position: PanePosition,
): Record<PaneDirections, HTMLAttributes["style"]> => {
  let _offset: string = "0px";

  switch (position) {
    case SplitterPositions.CENTER:
      _offset = `-${areaWidth / 2}px`;
      break;
    case SplitterPositions.EXTERNAL:
      _offset = `-${(areaWidth + size) / 2}px`;
      break;
    case SplitterPositions.INTERNAL:
      _offset = `-${(areaWidth - size) / 2}px`;
      break;
  }

  return {
    l: { top: "0px", left: _offset, width: `${areaWidth}px`, height: "100%" },
    r: { top: "0px", right: _offset, width: `${areaWidth}px`, height: "100%" },
    t: { left: "0px", top: _offset, width: "100%", height: `${areaWidth}px` },
    b: {
      left: "0px",
      bottom: _offset,
      width: "100%",
      height: `${areaWidth}px`,
    },
  };
};

export const splitterBaseStyles = (
  size: number,
  areaWidth: number,
): Record<PaneDirections, HTMLAttributes["style"]> => {
  const _size = `${size}px`;

  const _offset: string = `${(areaWidth - size) / 2}px`;

  return {
    l: { right: _offset, width: _size, height: "100%" },
    r: { left: _offset, width: _size, height: "100%" },
    t: { bottom: _offset, height: _size, width: "100%" },
    b: { top: _offset, height: _size, width: "100%" },
  };
};