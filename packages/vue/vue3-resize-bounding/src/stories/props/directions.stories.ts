import { ref } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import {
  PaneDirectionAliases,
  PaneDirections,
} from "../../../lib/shared/typings";

import StoryResizeBounding, {
  type Props,
} from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";

const meta = {
  title: "Props/directions",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = (directions: PaneDirections | string): Props => ({
  directions,
});

const defineStory = (directions: PaneDirections | string): Story => {
  return {
    args: defaultProps(directions),
    render: (args) => ({
      components: { StoryResizeBounding, StoryPropField },
      setup() {
        const width = ref(320);
        const height = ref(240);

        return { width, height, args, directions };
      },
      template: `
    <StoryResizeBounding
      :directions="directions"
      v-bind="args"
      :width="width"
      :height="height"
      minWidth="128"
      maxWidth="512"
      minHeight="128"
      maxHeight="512"
      @update:width="(value) => { width = value; }"
      @update:height="(value) => { height = value; }"
      "/>
  `,
    }),
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
