import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { SplitterPosition } from "../../../lib/shared/typings";

import StoryResizeBounding from "../../components/StoryResizeBounding";
import StoryPropField from "../../components/StoryPropField";
import StoryValuesContainer from "../../components/StoryValuesContainer";

const meta = {
  title: "Props/options/position",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defineStory = (position: SplitterPosition): Story => {
  return {
    args: {
      options: {
        position,
        splitterWidthNormal: 32,
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
              description="Set pisition of a splitters inside the root container (internal, central, external):"
              name="position"
              value={args.options?.position}
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
              position: args.options?.position,
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

export const Central: Story = defineStory("central");
export const External: Story = defineStory("external");
export const Internal: Story = defineStory("internal");
