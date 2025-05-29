import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import StoryResizeBounding from "../../components/StoryResizeBounding";
import StoryPropField from "../../components/StoryPropField";
import StoryValuesContainer from "../../components/StoryValuesContainer";

const meta = {
  title: "Props/options/splitterWidthActive",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defineStory = (
  paneWidthNormal: number,
  paneWidthActive: number
): Story => {
  return {
    args: {
      options: {
        splitterWidthNormal: paneWidthNormal,
        splitterWidthActive: paneWidthActive,
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
              description="Pane width separately for normal and active states"
              name="splitterWidthNormal"
              value={args.options?.splitterWidthNormal}
            ></StoryPropField>
            <StoryPropField
              name="splitterWidthActive"
              value={args.options?.splitterWidthActive}
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
              splitterWidthActive: args.options?.splitterWidthActive,
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

export const Thin: Story = defineStory(1, 2);
export const Regular: Story = defineStory(1, 4);
export const Bold: Story = defineStory(1, 8);
export const ExtraBold: Story = defineStory(1, 12);
