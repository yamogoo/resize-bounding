import ResizeBoundingComponent, {
  globalClassNames,
  PREFIX,
  type Props,
  type IStyles,
} from "react-resize-bounding";

import { colors } from "./colors";

const styles: Partial<IStyles> = {
  splitter: [
    globalClassNames(PREFIX).splitter,
    {
      [`.${globalClassNames(PREFIX).pane}.active &`]: {
        background: `${colors.accent}`,
      },
    },
  ],
  knob: [
    globalClassNames(PREFIX).knob,
    {
      height: "10px",
      borderRadius: "5px",
      background: `${colors.resizerKnobNormal}`,
      border: `2px solid ${colors.backgroundSecondary}`,
      [`.${globalClassNames(PREFIX).pane}.active &`]: {
        background: `${colors.accent}`,
      },
    },
  ],
};

const ResizeBounding = (props: Props) => {
  return (
    <ResizeBoundingComponent
      {...props}
      options={{
        width: 6,
        activeAreaWidth: 16,
        knob: {
          show: true,
        },
      }}
      styles={styles}
    >
      {props.children}
    </ResizeBoundingComponent>
  );
};

export default ResizeBounding;
