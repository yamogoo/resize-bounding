import { ref, watch } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import StoryResizeBounding, {
  type Props,
} from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";
import StoryValuesContainer from "../../components/StoryValuesContainer.vue";

const EVENT_NAME = "@update:width";

const meta = {
  title: "Events/@update:width",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: Props = {
  width: 320,
};

export const UpdateWidth: Story = {
  args: defaultProps,
  render: (args) => ({
    components: { StoryResizeBounding, StoryPropField, StoryValuesContainer },
    setup() {
      const eventCount = ref(0);

      const width = ref(args.width);

      watch(
        () => args.width,
        () => {
          width.value = args.width;
        },
        {
          immediate: true,
        }
      );

      return { width, eventCount, args };
    },
    template: `
    <StoryValuesContainer>
      <StoryPropField
        name="emittedTimes"
        :description="'Number of times the ${EVENT_NAME} event was emitted'"
        :value="eventCount"/>
      <StoryPropField
        name="eventValue"
        description="Current width value"
        :value="width"/>
    </StoryValuesContainer>
    <StoryResizeBounding
      directions="h"
      :width="width"
      :minWidth="128"
      height="240"
      @update:width="(value) => { width = value; eventCount++; } "/>
  `,
  }),
};

UpdateWidth.storyName = "@update:width";
