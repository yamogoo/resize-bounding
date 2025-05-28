import { ref, watch } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import type { IStyle } from "../../../lib/shared/typings";

import StoryResizeBounding from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";
import StoryValuesContainer from "../../components/StoryValuesContainer.vue";

const meta = {
  title: "Props/styles/knob/size",
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
      components: { StoryResizeBounding, StoryPropField, StoryValuesContainer },
      setup() {
        const width = ref(320);
        const height = ref(240);

        const size = ref(args.styles?.knob);

        watch(
          () => args.styles?.knob,
          (newValue) => {
            size.value = newValue;
          }
        );

        return { width, height, args, size };
      },
      template: `
    <StoryValuesContainer>
      <StoryPropField
        description="Set custon knob size:"
        name="size"
        :value="JSON.stringify(size)"/>
    </StoryValuesContainer>
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

export const Small: Story = defineStory({
  width: "36px",
  height: "3px",
  borderRadius: "2px",
});

export const Medium: Story = defineStory({
  width: "48px",
  height: "6px",
  borderRadius: "3px",
});

export const Bold: Story = defineStory({
  width: "64px",
  height: "8px",
  borderRadius: "4px",
});
