import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import colors from "../../tokens/colors.json";

import type { IStyle } from "../../../lib/shared/typings";

import StoryResizeBounding from "../../components/StoryResizeBounding";
import StoryPropField from "../../components/StoryPropField";
import StoryValuesContainer from "../../components/StoryValuesContainer";

const meta = {
  title: "Props/styles/splitter/color.active",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defineStory = (styles: IStyle): Story => {
  const { background } = styles as { background: string };

  return {
    args: {
      styles: {
        splitter: {
          background: "lightgray",
          [".resize-bounding__pane.active &"]: {
            background: background,
          },
        },
        knob: {
          height: "8px",
          boxSizing: "content-box",
          border: "2px solid white",
          borderRadius: "8px",
          [".resize-bounding__pane.active &"]: {
            background: background,
          },
        },
      },
    },
    render: (args) => {
      const [width, setWidth] = useState(320);
      const [height, setHeight] = useState(240);

      const updateWidth = (width: number) => {
        setWidth(width);
      };

      const updateHeight = (height: number) => {
        setHeight(height);
      };
      return (
        <>
          <StoryValuesContainer>
            <StoryPropField
              description="Set splitter (pane) color in active state:"
              name="styles"
              value={JSON.stringify(args.styles)}
            ></StoryPropField>
          </StoryValuesContainer>
          <StoryResizeBounding
            {...args}
            directions={"hv"}
            width={width}
            height={height}
            minWidth={128}
            maxWidth={512}
            minHeight={128}
            maxHeight={512}
            options={{
              splitterWidthNormal: 1,
              splitterWidthActive: 8,
              knob: {
                show: true,
              },
            }}
            styles={args.styles}
            updateWidth={updateWidth}
            updateHeight={updateHeight}
          />
        </>
      );
    },
  };
};

export const Gray: Story = defineStory({
  background: colors.gray,
});

export const Red: Story = defineStory({
  background: colors.red,
});

export const Green: Story = defineStory({
  background: colors.green,
});

export const Blue: Story = defineStory({
  background: colors.blue,
});

export const Violet: Story = defineStory({
  background: colors.violet,
});
