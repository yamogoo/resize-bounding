import { ref, watch } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import StoryResizeBounding, {
  type Props,
} from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";
import StoryValuesContainer from "../../components/StoryValuesContainer.vue";

const meta = {
  title: "Props/options/activeAreaWidth",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = (): Props => ({
  options: {
    activeAreaWidth: 32,
  },
});

const defineStory = (): Story => {
  return {
    args: defaultProps(),
    render: (args) => ({
      components: { StoryResizeBounding, StoryPropField, StoryValuesContainer },
      setup() {
        const width = ref(320);
        const height = ref(240);

        const activeAreaWidth = ref(args.options?.activeAreaWidth);

        watch(
          () => args.options?.activeAreaWidth,
          (newValue) => {
            activeAreaWidth.value = newValue;
          }
        );

        return { width, height, args, activeAreaWidth };
      },
      template: `
    <StoryValuesContainer>
      <StoryPropField
        description="Set active touch area width of a splitter (if the value is not specified, the active area will be equal to the width of the splitter (pane)):"
        name="activeAreaWidth"
        :value="activeAreaWidth"/>
    </StoryValuesContainer>
    <StoryResizeBounding
      :directions="'hv'"
      v-bind="args"
      :width="width"
      :height="height",
      :options="{
        activeAreaWidth
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

export const ActiveAreaWidth = defineStory();

ActiveAreaWidth.storyName = "activeAreaWidth";
