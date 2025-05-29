import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import type { IStyle } from "../../../lib/shared/typings";

import StoryResizeBounding from "../../components/StoryResizeBounding";
import StoryPropField from "../../components/StoryPropField";
import StoryValuesContainer from "../../components/StoryValuesContainer";

const meta = {
  title: "Props/styles/knob/color",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defineStory = (styles: IStyle): Story => {
  return {
    args: {
      styles: {
        knob: styles,
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
              description="Set a knob color:"
              name="background"
              value={(args.styles?.knob as { background: string })?.background}
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
  background: "gray",
});

export const Red: Story = defineStory({
  background: "red",
});

export const Green: Story = defineStory({
  background: "#12e767",
});

export const Blue: Story = defineStory({
  background: "cornflowerblue",
});

export const Violet: Story = defineStory({
  background: "violet",
});
