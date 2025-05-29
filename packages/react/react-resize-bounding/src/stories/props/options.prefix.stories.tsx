import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { PREFIX } from "../../../lib/components/ResizeBounding.classNames";

import StoryResizeBounding from "../../components/StoryResizeBounding";
import StoryPropField from "../../components/StoryPropField";
import StoryValuesContainer from "../../components/StoryValuesContainer";

const meta = {
  title: "Props/options/prefix",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Prefix: Story = {
  args: {
    options: {
      prefix: PREFIX,
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
            description="Set element class names prefix:"
            name="prefix"
            value={String(args.options?.prefix)}
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
              show: args.options?.knob?.show,
            },
          }}
          updateWidth={updateWidth}
          updateHeight={updateHeight}
        />
      </>
    );
  },
};

Prefix.storyName = "prefix";
