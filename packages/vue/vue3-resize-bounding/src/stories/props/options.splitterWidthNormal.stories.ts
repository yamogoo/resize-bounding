import { ref, watch } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import StoryResizeBounding from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";
import StoryValuesContainer from "../../components/StoryValuesContainer.vue";

const meta = {
  title: "Props/options/splitterWidthNormal",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defineStory = (paneWidth: number): Story => {
  return {
    args: {
      options: {
        splitterWidthNormal: paneWidth,
      },
    },
    render: (args) => ({
      components: { StoryResizeBounding, StoryPropField, StoryValuesContainer },
      setup() {
        const width = ref(320);
        const height = ref(240);

        const splitterWidthNormal = ref(args.options?.splitterWidthNormal);

        watch(
          () => args.options?.splitterWidthNormal,
          (newValue) => {
            splitterWidthNormal.value = newValue;
          }
        );

        return { width, height, args, splitterWidthNormal };
      },
      template: `
      <StoryValuesContainer>
        <StoryPropField
        description="Pane width for both normal and active states"
        name="splitterWidthNormal"
        :value="splitterWidthNormal"/>
        <StoryPropField
        name="splitterWidthActive"
        :value="splitterWidthNormal"/>
      </StoryValuesContainer>
    <StoryResizeBounding
      :directions="'hv'"
      v-bind="args"
      :width="width"
      :height="height"
      :options="{
        width: ${args.options?.width},
        splitterWidthNormal: ${args.options?.splitterWidthNormal},
        splitterWidthActive: ${args.options?.splitterWidthActive},
      }"
      :styles="{
        splitter: {
          background: 'lightgray'
        },
        pane: [
          {
            '&.active': {
              zIndex: 9999,
              background: 'lightblue'
            }
          }
        ]
      }"
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

export const Thin: Story = defineStory(2);
export const Regular: Story = defineStory(4);
export const Bold: Story = defineStory(8);
export const ExtraBold: Story = defineStory(12);
