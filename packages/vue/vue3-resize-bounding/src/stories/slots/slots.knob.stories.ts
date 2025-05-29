import { Component, ref } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import type { IStyle } from "../../../lib/shared/typings";

import StoryResizeBounding from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";
import StoryValuesContainer from "../../components/StoryValuesContainer.vue";
import StoryResizeBoundingKnobIconDots from "../../components/icons/StoryResizeBoundingKnobIconDots.vue";
import StoryResizeBoundingKnobIconLines from "../../components/icons/StoryResizeBoundingKnobIconLines.vue";

const meta = {
  title: "Props/slots/knob",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defineStory = (styles: IStyle, component: Component): Story => {
  return {
    args: {
      styles: {
        knob: styles,
      },
    },
    render: (args) => ({
      components: {
        StoryResizeBounding,
        StoryPropField,
        StoryValuesContainer,
        StoryResizeBoundingKnobIconDots,
        StoryResizeBoundingKnobIconLines,
      },
      setup() {
        const width = ref(320);
        const height = ref(240);

        return { width, height, args, component };
      },
      template: `
    <StoryValuesContainer>
      <StoryPropField
        description="Slot for customizing the contents of the knob"
        name="slot"
        value="#knob"/>
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
      minWidth="128"
      maxWidth="512"
      minHeight="128"
      maxHeight="512"
      @update:width="(value) => { width = value; }"
      @update:height="(value) => { height = value; }"
      ">
        <template #knob>
            <component :is="component" />
        </template>
      </StoryResizeBounding>
  `,
    }),
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
