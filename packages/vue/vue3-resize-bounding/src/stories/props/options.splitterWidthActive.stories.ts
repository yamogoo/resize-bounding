import { ref } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import StoryResizeBounding from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";
import StoryValuesContainer from "../../components/StoryValuesContainer.vue";

const meta = {
  title: "Props/options/splitterWidthActive",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defineStory = (
  paneWidthNormal: number,
  paneWidthActive: number
): Story => {
  return {
    args: {
      options: {
        splitterWidthNormal: paneWidthNormal,
        splitterWidthActive: paneWidthActive,
      },
    },
    render: (args) => ({
      components: { StoryResizeBounding, StoryPropField, StoryValuesContainer },
      setup() {
        const width = ref(320);
        const height = ref(240);

        return { width, height, args };
      },
      template: `
      <StoryValuesContainer>
        <StoryPropField
        name="width"
        :description="'Pane width separately for normal and active states'"
        :value="${args.options?.splitterWidthNormal}"/>
        <StoryPropField
        name="splitterWidthActive"
        :value="${args.options?.splitterWidthActive}"/>
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

export const Thin: Story = defineStory(1, 2);
export const Regular: Story = defineStory(1, 4);
export const Bold: Story = defineStory(1, 8);
export const ExtraBold: Story = defineStory(1, 12);
