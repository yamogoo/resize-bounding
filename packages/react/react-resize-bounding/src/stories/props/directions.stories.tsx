import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  PaneDirectionAliases,
  PaneDirections,
} from "../../../lib/shared/typings";

import StoryResizeBounding from "../../components/StoryResizeBounding";
import StoryPropField from "../../components/StoryPropField";
import StoryValuesContainer from "../../components/StoryValuesContainer";

const meta = {
  title: "Props/directions",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defineStory = (
  directions: PaneDirections | PaneDirectionAliases | string
): Story => {
  return {
    args: {
      directions,
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
              description="Enable specific splitters (panes):"
              name="directions"
              value={directions}
            ></StoryPropField>
          </StoryValuesContainer>
          <StoryResizeBounding
            {...args}
            directions={args.directions}
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
            updateWidth={updateWidth}
            updateHeight={updateHeight}
          />
        </>
      );
    },
  };
};

export const Left = defineStory(PaneDirections.LEFT);
export const Right = defineStory(PaneDirections.RIGHT);
export const Top = defineStory(PaneDirections.TOP);
export const Bottom = defineStory(PaneDirections.BOTTOM);

export const Horizontal = defineStory(
  `${PaneDirections.LEFT}${PaneDirections.RIGHT}`
);

export const HorizontalAlias = defineStory(
  `${PaneDirectionAliases.HORIZONTAL}`
);

export const Vertical = defineStory(
  `${PaneDirections.TOP}${PaneDirections.BOTTOM}`
);

export const VerticalAlias = defineStory(`${PaneDirectionAliases.VERTICAL}`);

export const All = defineStory(
  `${PaneDirections.LEFT}${PaneDirections.RIGHT}${PaneDirections.TOP}${PaneDirections.BOTTOM}`
);

export const AllAlias = defineStory(
  `${PaneDirectionAliases.HORIZONTAL}${PaneDirectionAliases.VERTICAL}`
);
