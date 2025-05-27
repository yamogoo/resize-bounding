import { ref, watchEffect } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import StoryResizeBounding, {
  type Props,
} from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";

const EVENT_NAME = "@drag:move";

const meta = {
  title: "Events/@drag:move",
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

export const DragMove: Story = {
  args: defaultProps,
  render: (args) => ({
    components: { StoryResizeBounding, StoryPropField },
    setup() {
      const eventValue = ref<null | string>(null);
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
    <StoryPropField
      name="emittedTimes"
      :description="'Number of times the ${EVENT_NAME} event was emitted'"
      :value="eventCount"/>
    <StoryPropField
      name="eventValue"
      :description="'Value of the ${EVENT_NAME} event'"
      :value="String(JSON.stringify(eventValue))"/>
    <StoryResizeBounding
      :directions="'vh'"
      :width="width"
      :height="height"
      :minWidth="128"
      :minHeight="128"
      @update:width="(value) => { width = value; }"
      @update:height="(value) => { height = value; }"
      @drag:move="(dir) => { eventCount++; eventValue = dir; }"
      "/>
  `,
  }),
};

DragMove.storyName = "@drag:move";
