import { ref, watch } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import colors from "../../tokens/colors.json";

import type { IStyle } from "../../../lib/shared/typings";

import StoryResizeBounding from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";
import StoryValuesContainer from "../../components/StoryValuesContainer.vue";

const meta = {
  title: "Props/styles/splitter/color.active",
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
        splitter: {
          background: "lightgray",
          [".resize-bounding__pane.active &"]: {
            background: background,
          },
        },
        knob: {
          height: "8px",
          boxSizing: "content-box",
          border: "2px solid white",
          borderRadius: "8px",
          [".resize-bounding__pane.active &"]: {
            background: background,
          },
        },
      },
    },
    render: (args) => ({
      components: { StoryResizeBounding, StoryPropField, StoryValuesContainer },
      setup() {
        const width = ref(320);
        const height = ref(240);

        const styles = ref(args.styles?.splitter);

        watch(
          () => args.styles?.splitter,
          (newValue) => {
            styles.value = newValue;
          }
        );

        return { width, height, args, styles };
      },
      template: `
    <StoryValuesContainer>
      <StoryPropField
        description="Set splitter (pane) color in active state:"
        name="styles"
        :value="JSON.stringify(styles)"/>
    </StoryValuesContainer>
    <StoryResizeBounding
      :directions="'hv'"
      v-bind="args"
      :width="width"
      :height="height"
      :options="{
        splitterWidthNormal: 1,
        splitterWidthActive: 8,
        knob: {
          show: true,
        }
      }"
      :styles="args.styles"
      :minWidth="128"
      :maxWidth="512"
      :minHeight="128"
      :maxHeight="512"
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
