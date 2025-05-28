import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import StoryResizeBounding from "../../components/StoryResizeBounding";
import StoryPropField from "../../components/StoryPropField";
import StoryValuesContainer from "../../components/StoryValuesContainer";

const EVENT_NAME = "updateWidth";

const meta = {
  title: "Events/updateWidth",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UpdateWidth: Story = {
  render: (args) => {
    const [eventValue, setEventValue] = useState<number | null>(null);
    const [eventCount, setEventCount] = useState<number>(0);

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
            description={`Number of times the ${EVENT_NAME} event was emitted`}
            name="emittedTimes"
            value={String(eventCount)}
          ></StoryPropField>
          <StoryPropField
            description={`Current width value`}
            name="eventValue"
            value={String(JSON.stringify(eventValue))}
          ></StoryPropField>
        </StoryValuesContainer>
        <StoryResizeBounding
          {...args}
          directions={"h"}
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
          updateWidth={(width) => {
            updateWidth(width);
            setEventCount((prevCount) => prevCount + 1);
            setEventValue(width);
          }}
          updateHeight={updateHeight}
        />
      </>
    );
  },
};

UpdateWidth.storyName = "updateWidth";
