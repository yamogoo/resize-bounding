import { Meta, StoryObj } from "@storybook/vue3";
import { ref, watch } from "vue";

import StoryResizeBounding, {
  type Props,
} from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";

const EVENT_NAME = "@update:height";

const meta = {
  title: "Events/@update:height",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: Props = {
  directions: "v",
  height: 240,
};

export const UpdateHeight: Story = {
  args: defaultProps,
  render: (args) => ({
    components: { StoryResizeBounding, StoryPropField },
    setup() {
      const eventCount = ref(0);

      const height = ref(args.height);

      watch(
        () => args.height,
        () => {
          height.value = args.height;
        },
        {
          immediate: true,
        }
      );

      return { height, eventCount, args };
    },
    template: `
    <StoryPropField
      name="emittedTimes"
      :description="'Number of times the ${EVENT_NAME} event was emitted'"
      :value="eventCount"/>
    <StoryPropField
      name="eventValue"
      description="Current height value"
      :value="height"/>
    <StoryResizeBounding
      :directions="args.directions"
      :width="320"
      :height="height"
      :minHeight="128"
      @update:height="(value) => { height = value; eventCount++; } "/>
  `,
  }),
};

UpdateHeight.storyName = "@update:height";
