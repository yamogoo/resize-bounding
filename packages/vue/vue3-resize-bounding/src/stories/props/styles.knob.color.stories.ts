import { ref } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import type { IStyle } from "../../../lib/shared/typings";

import StoryResizeBounding from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";

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
