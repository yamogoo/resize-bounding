import { ref, watch } from "vue";
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

        const splitterWidthNormal = ref(args.options?.splitterWidthNormal);

        watch(
          () => args.options?.splitterWidthNormal,
          (newValue) => {
            splitterWidthNormal.value = newValue;
          }
        );

        const splitterWidthActive = ref(args.options?.splitterWidthActive);

        watch(
          () => args.options?.splitterWidthActive,
          (newValue) => {
            splitterWidthActive.value = newValue;
          }
        );

        return {
          width,
          height,
          args,
          splitterWidthNormal,
          splitterWidthActive,
        };
      },
      template: `
      <StoryValuesContainer>
        <StoryPropField
        description="Pane width separately for normal and active states"
        name="width"
        :value="splitterWidthNormal"/>
        <StoryPropField
        name="splitterWidthActive"
        :value="splitterWidthActive"/>
      </StoryValuesContainer>
    <StoryResizeBounding
      :directions="'hv'"
      v-bind="args"
      :width="width"
      :height="height"
      :options="{
        width: splitterWidthNormal,
        splitterWidthNormal: splitterWidthNormal,
        splitterWidthActive: splitterWidthActive,
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

export const Thin: Story = defineStory(1, 2);
export const Regular: Story = defineStory(1, 4);
export const Bold: Story = defineStory(1, 8);
export const ExtraBold: Story = defineStory(1, 12);
