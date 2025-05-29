import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import StoryResizeBounding from "../../components/StoryResizeBounding";
import StoryPropField from "../../components/StoryPropField";
import StoryValuesContainer from "../../components/StoryValuesContainer";

const meta = {
  title: "Props/options/knob/normalHidden",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NormalHidden: Story = {
  args: {
    options: {
      knob: {
        normalHidden: false,
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
            description="Hide a knob in normal state of the splitter:"
            name="normalHidden"
            value={String(args.options?.knob?.normalHidden)}
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
            knob: {
              show: true,
              normalHidden: args.options?.knob?.normalHidden,
            },
          }}
          updateWidth={updateWidth}
          updateHeight={updateHeight}
        />
      </>
    );
  },
};

NormalHidden.storyName = "normalHidden";
