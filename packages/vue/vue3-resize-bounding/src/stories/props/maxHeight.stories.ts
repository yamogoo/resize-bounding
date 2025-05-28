import { ref } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import StoryResizeBounding, {
  type Props,
} from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";
import StoryValuesContainer from "../../components/StoryValuesContainer.vue";

const meta = {
  title: "Props/maxHeight",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: Props = {
  maxHeight: 480,
};

export const Height: Story = {
  args: defaultProps,
  render: (args) => ({
    components: { StoryResizeBounding, StoryPropField, StoryValuesContainer },
    setup() {
      const width = ref(320);
      const height = ref(320);

      return { width, height, args };
    },
    template: `
    <StoryValuesContainer>
      <StoryPropField
        description="Container max height:"
        name="maxHeight"
        :value="args.maxHeight"/>
    </StoryValuesContainer>
    <StoryResizeBounding
      directions="b"
      :width="width"
      :height="height"
      :maxHeight="args.maxHeight"
      @update:width="(value) => { width = value; } "
      @update:height="(value) => { height = value; } "
    />
  `,
  }),
};

Height.storyName = "maxHeight";
