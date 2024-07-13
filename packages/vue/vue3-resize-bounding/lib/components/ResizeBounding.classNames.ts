import { mergeStyleSets } from "@fluentui/merge-styles";
import type {
  IStyles,
  IResizeBoundingClassNames,
  Options,
} from "../shared/typings";

export const PREFIX = "resize-bounding-";

export const defaultOptions: Options = {
  prefix: PREFIX,
  width: 4,
  activeAreaWidth: undefined,
  position: "central",
  knob: {
    show: false,
    normalHidden: false,
  },
  cursor: {
    horizontal: "col-resize",
    vertical: "row-resize",
  },
  touchActions: true,
};

export const globalClassNames = (prefix = PREFIX) => ({
  container: `${prefix}container`,
  pane: `${prefix}pane`,
  splitter: `${prefix}splitter`,
  splitterContainer: `${prefix}splitter--container`,
  knob: `${prefix}knob`,
});

export const defaultStyles = (prefix: string): IStyles => ({
  container: [
    globalClassNames(prefix).container,
    { displayName: globalClassNames(prefix).container, position: "relative" },
  ],
  pane: [
    globalClassNames(prefix).pane,
    {
      displayName: globalClassNames(prefix).pane,
      position: "absolute",
      display: "block",
      zIndex: 9999,
      touchAction: "none",
    },
  ],
  splitter: [
    globalClassNames(prefix).splitter,
    {
      displayName: globalClassNames(prefix).splitter,
      position: "absolute",
      zIndex: 9999,
      transition: "background 125ms ease-out",
      [`.${globalClassNames(prefix).pane}.focused &, .${globalClassNames(prefix).pane}.pressed &`]:
        {
          background: "cornflowerblue",
        },
    },
  ],
  splitterContainer: [
    globalClassNames(prefix).splitterContainer,
    {
      displayName: globalClassNames(prefix).splitterContainer,
      position: "relative",
      top: "50%",
      left: "50%",
      width: `0px`,
      height: `0px`,
    },
  ],
  knob: [
    globalClassNames(prefix).knob,
    {
      displayName: globalClassNames(prefix).knob,
      position: "relative",
      width: "64px",
      height: "8px",
      background: "gray",
      borderRadius: "4px",
      transform: "translate(-50%, -50%)",
      transition: "background 125ms ease-out",
      [`.${globalClassNames(prefix).pane}.focused &,
        .${globalClassNames(prefix).pane}.pressed &`]: {
        background: "cornflowerblue",
      },
    },
  ],
});

export const getClassNames = (
  args: Partial<IStyles>,
  prefix = PREFIX,
): IResizeBoundingClassNames => {
  return mergeStyleSets(defaultStyles(prefix), args);
};
