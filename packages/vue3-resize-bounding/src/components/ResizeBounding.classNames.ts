import { mergeStyleSets } from "@fluentui/merge-styles";
import { ResizeBounding } from "../shared/typings.js";

export const PREFIX = "resize-bounding-";

export const globalClassNames = (prefix = PREFIX) => ({
  container: `${prefix}container`,
  pane: `${prefix}pane`,
  splitter: `${prefix}splitter`,
  splitterContainer: `${prefix}splitter--container`,
  knob: `${prefix}knob`,
});

export const defaultStyles = (prefix: string): ResizeBounding.IStyles => ({
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
      ":hover": {
        background: "cornflowerblue",
      },
    },
  ],
  splitterContainer: [
    globalClassNames(prefix).splitterContainer,
    {
      displayName: globalClassNames(prefix).splitterContainer,
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
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
      position: "absolute",
      width: "64px",
      height: "8px",
      background: "gray",
      borderRadius: "4px",
      transition: "background 125ms ease-out",
      [`.${globalClassNames(prefix).pane} :hover &`]: {
        background: "cornflowerblue",
      },
    },
  ],
});

export const getClassNames = (
  args: Partial<ResizeBounding.IStyles>,
  prefix = PREFIX,
): ResizeBounding.IResizeBoundingClassNames => {
  return mergeStyleSets(defaultStyles(prefix), args);
};
