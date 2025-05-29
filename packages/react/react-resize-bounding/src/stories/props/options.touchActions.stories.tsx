import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import StoryResizeBounding from "../../components/StoryResizeBounding";
import StoryPropField from "../../components/StoryPropField";
import StoryValuesContainer from "../../components/StoryValuesContainer";

const meta = {
  title: "Props/options/touchActions",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TouchActions: Story = {
  args: {
    options: {
      touchActions: true,
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
            description="Enable touch actions (mobile/tablet devices):"
            name="touchActions"
            value={String(args.options?.touchActions)}
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
            touchActions: args.options?.touchActions,
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

TouchActions.storyName = "touchActions";
