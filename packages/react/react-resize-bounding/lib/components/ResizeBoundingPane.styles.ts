import { CSSProperties } from "react";
import { PaneDirections, type SplitterPosition } from "../shared/typings";

export const paneBaseStyles = (
  size: number,
  areaWidth: number,
  position: SplitterPosition,
): Record<PaneDirections, CSSProperties> => {
  let _offset: string = "0px";

  switch (position) {
    case "central":
      _offset = `-${areaWidth / 2}px`;
      break;
    case "external":
      _offset = `-${(areaWidth + size) / 2}px`;
      break;
    case "internal":
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
): Record<PaneDirections, CSSProperties> => {
  const _size = `${size}px`;

  const _offset: string = `${(areaWidth - size) / 2}px`;

  return {
    l: { right: _offset, width: _size, height: "100%" },
    r: { left: _offset, width: _size, height: "100%" },
    t: { bottom: _offset, height: _size, width: "100%" },
    b: { top: _offset, height: _size, width: "100%" },
  };
};
