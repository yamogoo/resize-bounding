import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import StoryResizeBounding from "../../components/StoryResizeBounding";
import StoryPropField from "../../components/StoryPropField";
import StoryValuesContainer from "../../components/StoryValuesContainer";

const meta = {
  title: "Props/options/activeAreaWidth",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ActiveAreaWidth: Story = {
  args: {
    options: {
      activeAreaWidth: 32,
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
            description="Set active touch area width of a splitter (if the value is not specified, the active area will be equal to the width of the splitter (pane)):"
            name="activeAreaWidth"
            value={String(args.options?.activeAreaWidth)}
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
            activeAreaWidth: args.options?.activeAreaWidth,
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

ActiveAreaWidth.storyName = "activeAreaWidth";
