import { ref } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import colors from "../../tokens/colors.json";

import type { IStyle } from "../../../lib/shared/typings";

import StoryResizeBounding from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";

const meta = {
  title: "Props/styles/splitter/color",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defineStory = (styles: IStyle): Story => {
  const { background } = styles as { background: string };
  return {
    args: {
      styles: {
        splitter: styles,
        knob: {
          height: "8px",
          boxSizing: "content-box",
          border: "2px solid white",
          borderRadius: "8px",
          background: background,
        },
      },
    },
    render: (args) => ({
      components: { StoryResizeBounding, StoryPropField },
      setup() {
        const width = ref(320);
        const height = ref(240);

        return { width, height, args };
      },
      template: `
    <StoryResizeBounding
      :directions="'hv'"
      v-bind="args"
      :width="width"
      :height="height"
      :options="{
        knob: {
          show: true,
        }
      }"
      :styles="args.styles"
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

export const Gray: Story = defineStory({
  background: colors.gray,
});

export const Red: Story = defineStory({
  background: colors.red,
});

export const Green: Story = defineStory({
  background: colors.green,
});

export const Blue: Story = defineStory({
  background: colors.blue,
});

export const Violet: Story = defineStory({
  background: colors.violet,
});
