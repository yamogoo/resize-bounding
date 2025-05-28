import { ref, watch } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import StoryResizeBounding, {
  type Props,
} from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";
import StoryValuesContainer from "../../components/StoryValuesContainer.vue";

const meta = {
  title: "Props/maxWidth",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: Props = {
  maxWidth: 480,
};

export const Height: Story = {
  args: defaultProps,
  render: (args) => ({
    components: { StoryResizeBounding, StoryPropField, StoryValuesContainer },
    setup() {
      const width = ref(320);
      const height = ref(320);

      const maxWidth = ref(args.maxWidth);

      watch(
        () => args.maxWidth,
        (newValue) => {
          maxWidth.value = newValue;
        }
      );

      return { width, height, maxWidth, args };
    },
    template: `
    <StoryValuesContainer>
      <StoryPropField
        description="Container max width:"
        name="maxWidth"
        :value="maxWidth"/>
    </StoryValuesContainer>
    <StoryResizeBounding
      directions="r"
      :width="width"
      :height="height"
      :maxWidth="maxWidth"
      @update:width="(value) => { width = value; } "
      @update:height="(value) => { height = value; } "
    />
  `,
  }),
};

Height.storyName = "maxWidth";
