import {
  useMemo,
  useRef,
  useState,
  MutableRefObject,
  type PropsWithChildren,
  type CSSProperties,
  useEffect,
} from "react";

import {
  PaneDirections,
  PaneDirectionAliases,
  type PaneDirectionKey,
  type IResizeBoundingClassNames,
  type IStyles,
  type Options,
} from "../shared/typings";

import {
  paneBaseStyles,
  splitterBaseStyles,
} from "./ResizeBoundingPane.styles";

export interface PaneEmittedData {
  x: number;
  y: number;
  dir: string;
}

export interface Props extends PropsWithChildren {
  prefix: string;
  direction: PaneDirectionKey;
  options: Options;
  classNames: IResizeBoundingClassNames;
  styles?: Partial<IStyles>;
  dragStart: (data: PaneEmittedData) => void;
  dragMove: (data: PaneEmittedData) => void;
  dragEnd: (data: PaneEmittedData) => void;
  focus: (state: boolean) => void;
}

const checkIsHorizontal = (direction: string): boolean =>
  new RegExp(
    `[${PaneDirections.LEFT} | ${PaneDirections.RIGHT} | ${PaneDirectionAliases.HORIZONTAL}]`,
  ).test(direction);

const checkIsVertical = (direction: string): boolean =>
  new RegExp(
    `[${PaneDirections.TOP} | ${PaneDirections.BOTTOM} | ${PaneDirectionAliases.VERTICAL}]`,
  ).test(direction);

const ResizeBoundingPane = ({
  children,
  classNames,
  direction,
  options,
  dragStart,
  dragMove,
  dragEnd,
  focus,
}: Props) => {
  const refPane: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  let isResizing = false;

  const paneComputedStyle = useMemo(() => {
    const _width = options?.width ?? 1;

    if (refPane && _width) {
      const _areaWidth = options.activeAreaWidth ?? options.width;
      const _styles = paneBaseStyles(
        _width,
        _areaWidth,
        options?.position ?? "central",
      );
      const value: CSSProperties = _styles[direction as PaneDirections];
      return value;
    }

    return;
  }, [options.width, options.activeAreaWidth, options?.position, direction]);

  const splitterComputedStyle = useMemo(() => {
    const _width = options?.width;

    if (refPane && _width) {
      const _areaWidth = options.activeAreaWidth ?? options.width;

      const _styles = splitterBaseStyles(_width, _areaWidth);
      const value: CSSProperties = _styles[direction as PaneDirections];
      return value;
    }
  }, [options.width, options.activeAreaWidth, direction]);

  const containerComputedStyles = useMemo(() => {
    const isHorizontal = checkIsHorizontal(direction);
    return { transform: `rotate(${isHorizontal ? 90 : 0}deg)` };
  }, [direction]);

  const updateCursor = (state: boolean) => {
    let cursorActive: string;

    if (checkIsHorizontal(direction)) {
      cursorActive = options?.cursor?.horizontal ?? "auto";
    } else if (checkIsVertical(direction)) {
      cursorActive = options?.cursor?.vertical ?? "auto";
    } else cursorActive = "auto";

    if (refPane.current)
      refPane.current.style.cursor = state ? cursorActive : "auto";
  };

  /* * * Events * * */

  const emitFocus = (state: boolean) => {
    focus(state);
  };

  const onFocus = (e: PointerEvent, isFocused: boolean): void => {
    e.stopPropagation();
    onSelected(isFocused);
  };

  const onSelected = (state: boolean): void => {
    setIsFocused(state);
    updateCursor(state);
    emitFocus(state);
  };

  const onDragStart = (e: PointerEvent): void => {
    e.preventDefault();
    e.stopImmediatePropagation();

    if (!options.touchActions && e.pointerType === "touch") return;

    isResizing = true;
    setIsPressed(true);
    onSelected(isResizing);

    const el = e.currentTarget as HTMLDivElement;
    el.setPointerCapture(e.pointerId);

    dragStart({
      x: Math.round(e.clientX),
      y: Math.round(e.clientY),
      dir: direction,
    });

    const onDragMove = (e: PointerEvent): void => {
      dragMove({
        x: Math.round(e.clientX),
        y: Math.round(e.clientY),
        dir: direction,
      });
    };

    const onDragEnd = (e: PointerEvent): void => {
      isResizing = false;
      setIsPressed(false);

      const el = e.currentTarget as HTMLDivElement;
      el.releasePointerCapture(e.pointerId);

      el.removeEventListener("pointermove", onDragMove);
      el.removeEventListener("pointerup", onDragEnd);

      dragEnd({
        x: Math.round(e.clientX),
        y: Math.round(e.clientY),
        dir: direction,
      });
    };

    el.addEventListener("pointermove", onDragMove);
    el.addEventListener("pointerup", onDragEnd);
  };

  const onDragCancel = (e: PointerEvent): void => {
    const el = e.currentTarget as HTMLDivElement;

    isResizing = false;
    el.releasePointerCapture(e.pointerId);

    dragEnd({
      x: Math.round(e.clientX),
      y: Math.round(e.clientY),
      dir: direction,
    });
  };

  const addEventListeners = () => {
    const el = refPane.current;

    if (el) {
      el.addEventListener("pointerenter", (e) => onFocus(e, true));
      el.addEventListener("pointerleave", (e) => onFocus(e, false));

      el.addEventListener("pointerdown", onDragStart);
      el.addEventListener("pointercancel", onDragCancel);
    }
  };

  const removeEventListeners = () => {
    const el = refPane.current;

    if (el) {
      el.removeEventListener("pointerenter", (e) => onFocus(e, true));
      el.removeEventListener("pointerleave", (e) => onFocus(e, false));

      el.removeEventListener("pointerdown", onDragStart);
      el.addEventListener("pointercancel", onDragCancel);
    }
  };

  useEffect(() => {
    addEventListeners();

    return () => {
      removeEventListeners();
    };
  });

  return (
    <div
      ref={refPane}
      data-testid="resize-bounding-pane"
      className={`${classNames.pane}${isPressed || isFocused ? " active" : ""}${options.addStateClasses ? ` ${isPressed ? "pressed" : isFocused ? "focused" : "normal"}` : ""}`}
      style={paneComputedStyle}
    >
      <div
        data-testid="resize-bounding-splitter"
        className={classNames.splitter}
        style={splitterComputedStyle}
      >
        {(isFocused || !options?.knob?.normalHidden) && options?.knob?.show && (
          <div
            data-testid="resize-bounding-splitter-container"
            className={classNames.splitterContainer}
            style={containerComputedStyles}
          >
            <div data-testid="resize-bounding-knob" className={classNames.knob}>
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResizeBoundingPane;
