import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import type { IStyle } from "../../../lib/shared/typings";

import StoryResizeBounding from "../../components/StoryResizeBounding";
import StoryPropField from "../../components/StoryPropField";
import StoryValuesContainer from "../../components/StoryValuesContainer";
import StoryResizeBoundingKnobIconDots from "../../components/icons/StoryResizeBoundingKnobIconDots";
import StoryResizeBoundingKnobIconLines from "../../components/icons/StoryResizeBoundingKnobIconLines";

const meta = {
  title: "Props/slots/knob",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
  decorators: [
    (story) => (
      <>
        <StoryValuesContainer>
          <StoryPropField name="slot" value={"#knob"}></StoryPropField>
        </StoryValuesContainer>
        {story()}
      </>
    ),
  ],
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defineStory = (
  styles: IStyle,
  component: () => React.JSX.Element
): Story => {
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
            },
          }}
          knob={component()}
          updateWidth={updateWidth}
          updateHeight={updateHeight}
        />
      );
    },
  };
};

export const IconEllipsis: Story = defineStory(
  {
    width: "44px",
    height: "14px",
    borderRadius: "12px",
  },
  StoryResizeBoundingKnobIconDots
);

export const IconSeparator: Story = defineStory(
  {
    width: "36px",
    height: "8px",
    borderRadius: "6px",
  },
  StoryResizeBoundingKnobIconLines
);
