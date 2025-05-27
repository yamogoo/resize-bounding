import { ref } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import type { SplitterPosition } from "../../../lib/shared/typings";

import StoryResizeBounding from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";

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
        width: 8,
        position,
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
        width: ${args.options?.width},
        position: '${position}',
        knob: {
          show: true,
        }
      }"
      :styles="{
        knob: {
          height: '6px',
          borderRadius: '3px',
        }
      }"
      minWidth: 128,
      maxWidth: 512,
      minHeight: 128,
      maxHeight: 512,
      @update:width="(value) => { width = value; }"
      @update:height="(value) => { height = value; }"
      "/>
  `,
    }),
  };
};

export const Central: Story = defineStory("central");
export const External: Story = defineStory("external");
export const Internal: Story = defineStory("internal");
