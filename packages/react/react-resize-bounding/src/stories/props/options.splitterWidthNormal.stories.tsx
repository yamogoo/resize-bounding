import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import StoryResizeBounding from "../../components/StoryResizeBounding";
import StoryPropField from "../../components/StoryPropField";
import StoryValuesContainer from "../../components/StoryValuesContainer";

const meta = {
  title: "Props/options/splitterWidthNormal",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defineStory = (paneWidthNormal: number): Story => {
  return {
    args: {
      options: {
        splitterWidthNormal: paneWidthNormal,
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
              description="Pane width for both normal and active states"
              name="splitterWidthNormal"
              value={args.options?.splitterWidthNormal}
            ></StoryPropField>
            <StoryPropField
              name="splitterWidthActive"
              value={args.options?.splitterWidthNormal}
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
              splitterWidthNormal: args.options?.splitterWidthNormal,
              knob: {
                show: true,
              },
            }}
            updateWidth={updateWidth}
            updateHeight={updateHeight}
          />
        </>
      );
    },
  };
};

export const Thin: Story = defineStory(2);
export const Regular: Story = defineStory(4);
export const Bold: Story = defineStory(8);
export const ExtraBold: Story = defineStory(12);
