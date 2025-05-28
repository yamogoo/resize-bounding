import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import colors from "../tokens/colors.json";

import { defaultStyles } from "../../lib/components/ResizeBounding.classNames";

import StoryResizeBounding, { Props } from "../components/StoryResizeBounding";

const defaultProps = (prefix = "resize-bounding__"): Props => ({
  width: 320,
  minWidth: 280,
  maxWidth: 960,
  height: 480,
  minHeight: 280,
  maxHeight: 960,
  directions: "rtlb",
  disabled: false,
  options: {
    prefix,
    activeAreaWidth: 24,
    splitterWidthNormal: 1,
    splitterWidthActive: 4,
    position: "central",
    cursor: {
      horizontal: "col-resize",
      vertical: "row-resize",
    },
    knob: {
      show: true,
      normalHidden: false,
    },
    touchActions: true,
  },
  styles: {
    ...defaultStyles(prefix),
    splitter: { background: colors.border },
  },
});

const meta = {
  title: "Sandbox/examples",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
  args: defaultProps(),
  decorators: [(story) => <div style={{ margin: "1rem" }}>{story()}</div>],
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defineStory = (showCover: boolean): Story => {
  return {
    render: (args) => {
      const [width, setWidth] = useState(args.width);
      const [height, setHeight] = useState(args.height);

      const updateWidth = (width: number) => {
        setWidth(width);
      };

      const updateHeight = (height: number) => {
        setHeight(height);
      };
      return (
        <StoryResizeBounding
          {...args}
          width={width}
          height={height}
          showCover={showCover}
          updateWidth={updateWidth}
          updateHeight={updateHeight}
        />
      );
    },
  };
};

export const Cover = defineStory(true);
Cover.storyName = "with cover";

export const Slot = defineStory(false);
Slot.storyName = "with slot";
