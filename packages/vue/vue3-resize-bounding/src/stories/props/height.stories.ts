import { ref, watch } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import StoryResizeBounding, {
  type Props,
} from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";
import StoryValuesContainer from "../../components/StoryValuesContainer.vue";

const meta = {
  title: "Props/height",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: Props = {
  height: 320,
};

export const Height: Story = {
  args: defaultProps,
  render: (args) => ({
    components: { StoryResizeBounding, StoryPropField, StoryValuesContainer },
    setup() {
      const height = ref(args.height);

      watch(
        () => args.height,
        (newValue) => {
          height.value = newValue;
        }
      );

      return { height, args };
    },
    template: `
    <StoryValuesContainer>
      <StoryPropField
        description="Container heigh:"
        name="height"
        :value="height"/>
    </StoryValuesContainer>
    <StoryResizeBounding
      directions="b"
      :width="320"
      :height="height"
      :minHeight="128"
      @update:height="(value) => { height = value; } "/>
  `,
  }),
};

Height.storyName = "height";
