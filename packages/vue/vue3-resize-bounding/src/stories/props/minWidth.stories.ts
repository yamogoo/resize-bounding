import { ref, watch } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import StoryResizeBounding, {
  type Props,
} from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";
import StoryValuesContainer from "../../components/StoryValuesContainer.vue";

const meta = {
  title: "Props/minWidth",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: Props = {
  minWidth: 128,
};

export const Height: Story = {
  args: defaultProps,
  render: (args) => ({
    components: { StoryResizeBounding, StoryPropField, StoryValuesContainer },
    setup() {
      const width = ref(320);
      const height = ref(320);

      const minWidth = ref(args.minWidth);

      watch(
        () => args.minWidth,
        (newValue) => {
          minWidth.value = newValue;
        }
      );

      return { width, height, minWidth, args };
    },
    template: `
    <StoryValuesContainer>
      <StoryPropField
        description="Container min width:"
        name="minWidth"
        :value="minWidth"/>
    </StoryValuesContainer>
    <StoryResizeBounding
      directions="r"
      :width="width"
      :height="height"
      :minWidth="minWidth"
      @update:width="(value) => { width = value; } "
      @update:height="(value) => { height = value; } "
    />
  `,
  }),
};

Height.storyName = "minWidth";
