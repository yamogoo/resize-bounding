import { ref, watchEffect } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import StoryResizeBounding, {
  type Props,
} from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";
import StoryValuesContainer from "../../components/StoryValuesContainer.vue";

const EVENT_NAME = "@focus";

const meta = {
  title: "Events/@focus",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: Props = {
  width: 320,
  height: 240,
};

export const Focus: Story = {
  args: defaultProps,
  render: (args) => ({
    components: { StoryResizeBounding, StoryPropField, StoryValuesContainer },
    setup() {
      const eventValue = ref<null>(null);
      const eventCount = ref(0);

      const width = ref(args.width);
      const height = ref(args.height);

      watchEffect(() => {
        width.value = args.width;
      });

      watchEffect(() => {
        height.value = args.height;
      });

      return { width, height, eventValue, eventCount };
    },
    template: `
    <StoryValuesContainer>
      <StoryPropField
        name="emittedTimes"
        :description="'Number of times the ${EVENT_NAME} event was emitted'"
        :value="eventCount"/>
      <StoryPropField
        name="eventValue"
        description="Value of the ${EVENT_NAME} event"
        :value="String(eventValue)"/>
    </StoryValuesContainer>
    <StoryResizeBounding
      :directions="'vh'"
      :width="width"
      :height="height"
      :minWidth="128"
      :minHeight="128"
      @update:width="(value) => { width = value; }"
      @update:height="(value) => { height = value; }"
      @focus="(value) => { eventCount++; eventValue = JSON.stringify(value); }"
      "/>
  `,
  }),
};

Focus.storyName = "@focus";
