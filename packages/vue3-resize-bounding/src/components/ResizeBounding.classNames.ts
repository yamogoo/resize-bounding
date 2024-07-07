import { mergeStyleSets } from "@fluentui/merge-styles";
import { ResizeBounding } from "../shared/typings.js";

export const defaultStyles = {
  container: { position: "relative" },
  pane: [
    "pane",
    {
      position: "absolute",
      display: "block",
      zIndex: 9999,
    },
  ],
  splitter: [
    "splitter",
    {
      position: "absolute",
      zIndex: 9999,
      transition: "background 125ms ease-out",
      ":hover": {
        background: "cornflowerblue",
      },
    },
  ],
  splitterContainer: [
    "splitterContainer",
    {
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
    "knob",
    {
      position: "absolute",
      width: "64px",
      height: "8px",
      background: "gray",
      borderRadius: "8px",
      transition: "background 125ms ease-out",
      [`.pane :hover &`]: {
        background: "cornflowerblue",
      },
    },
  ],
};

export const getClassNames = (
  args: Partial<ResizeBounding.IStyles>,
): ResizeBounding.IResizeBoundingClassNames => {
  return mergeStyleSets(defaultStyles, args);
};
