import {
  CSSProperties,
  useMemo,
  useRef,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import deepmerge from "deepmerge";

import {
  PaneDirectionAliases,
  PaneDirections,
  type PaneDirectionKey,
  type IStyles,
  type Options,
} from "../shared/typings";
import {
  defaultOptions,
  getClassNames,
  PREFIX,
} from "./ResizeBounding.classNames";

import ResizeBoundingPane, { PaneEmittedData } from "./ResizeBoundingPane";
export interface Props
  extends PropsWithChildren,
    Partial<{
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
      style: CSSProperties;
      styles: Partial<IStyles>;
      knob: ReactNode;
      updateWidth: (width: number) => void;
      updateHeight: (height: number) => void;
      dragStart: (dir: string) => void;
      dragMove: (dir: string) => void;
      dragEnd: (dir: string) => void;
      focus: (data: { state: boolean; direction: string }) => void;
    }> {}

const ResizeBounding = (props: Partial<Props>) => {
  const {
    width,
    minWidth = 0,
    maxWidth,
    height,
    minHeight = 0,
    maxHeight,
    styles,
    children,
    style,
    disabled,
    knob,
    updateWidth,
    updateHeight,
    dragStart,
    dragMove,
    dragEnd,
    focus,
  } = props;

  let { width: newWidth, height: newHeight } = props;

  const refRoot = useRef<HTMLDivElement | null>(null);

  let prevWidth = newWidth,
    prevHeight = newHeight;

  const options = useMemo(() => {
    return deepmerge(defaultOptions, props.options ?? {});
  }, [props.options]);

  const classNames = getClassNames(styles ?? {}, options.prefix ?? PREFIX);

  const computedStyle = useMemo(() => {
    const _width = {
      width: `${width}px`,
      minWidth: `${width}px`,
    };

    const _height = {
      height: `${height}px`,
      minHeight: `${height}px`,
    };

    return {
      ...(width && _width),
      ...(height && _height),
    };
  }, [width, height]);

  const getDirectionAlias = (d: PaneDirections): PaneDirectionAliases => {
    if (d === PaneDirections.LEFT || d === PaneDirections.RIGHT)
      return PaneDirectionAliases.HORIZONTAL;
    return PaneDirectionAliases.VERTICAL;
  };

  const panes = useMemo(() => {
    const directions = props.directions ?? "";

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return Object.entries(PaneDirections).map(([_, v]) => {
      return {
        show:
          RegExp(v).test(directions) ||
          RegExp(getDirectionAlias(v)).test(directions),
        direction: v,
      };
    });
  }, [props.directions]);

  /* * * Events * * */

  let startWidth = props.width ?? 0,
    startHeight = props.height ?? 0;

  let startX = 0,
    startY = 0;

  const onDragStart = ({ x, y, dir }: PaneEmittedData): void => {
    startWidth = props.width ?? 0;
    startHeight = props.height ?? 0;

    (startX = x), (startY = y);

    typeof dragStart === "function" && dragStart(dir);
  };

  const truncateInRange = (
    min: number,
    max: number | undefined,
    next: number,
  ): number => {
    const _max = max ?? Number.POSITIVE_INFINITY;

    if (next <= min) return min;
    else if (next >= _max) return _max;
    return next;
  };

  const onDragMove = ({ x, y, dir }: PaneEmittedData): void => {
    if (!refRoot.current) return;
    typeof dragMove === "function" && dragMove(dir);

    if (dir === PaneDirections.LEFT) {
      newWidth = startWidth + (startX - x);

      if (prevWidth === newWidth) return;

      const truncated = truncateInRange(minWidth, maxWidth, newWidth);

      typeof updateWidth === "function" && updateWidth(truncated);
      prevWidth = truncated;
    } else if (dir === PaneDirections.RIGHT) {
      newWidth = startWidth + (x - startX);

      if (prevWidth === newWidth) return;

      const truncated = truncateInRange(minWidth, maxWidth, newWidth);

      typeof updateWidth === "function" && updateWidth(truncated);
      prevWidth = truncated;
    } else if (dir === PaneDirections.TOP) {
      newHeight = startHeight + (startY - y);

      if (prevHeight === newHeight) return;

      const truncated = truncateInRange(minHeight, maxHeight, newHeight);

      typeof updateHeight === "function" && updateHeight(truncated);
      prevHeight = truncated;
    } else if (dir === PaneDirections.BOTTOM) {
      newHeight = startHeight + (y - startY);

      if (prevHeight === newHeight) return;

      const truncated = truncateInRange(minHeight, maxHeight, newHeight);

      typeof updateHeight === "function" && updateHeight(truncated);
      prevHeight = truncated;
    }
  };

  return (
    <div
      ref={refRoot}
      data-testid="resize-bounding-container"
      className={classNames.container}
      style={{ ...style, ...computedStyle }}
    >
      {children}
      {Object.values(panes).map(({ show, direction }) => {
        return (
          !disabled &&
          show && (
            <ResizeBoundingPane
              key={direction}
              prefix={options.prefix ?? ""}
              direction={direction}
              options={options}
              styles={styles}
              classNames={classNames}
              focus={(state) => {
                typeof focus === "function" && focus({ state, direction });
              }}
              dragStart={onDragStart}
              dragMove={onDragMove}
              dragEnd={({ dir }) =>
                typeof dragEnd === "function" && dragEnd(dir)
              }
            >
              {knob}
            </ResizeBoundingPane>
          )
        );
      })}
    </div>
  );
};

export default ResizeBounding;
