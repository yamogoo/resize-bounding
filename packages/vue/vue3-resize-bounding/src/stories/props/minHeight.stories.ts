import { ref, watch } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import StoryResizeBounding, {
  type Props,
} from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";
import StoryValuesContainer from "../../components/StoryValuesContainer.vue";

const meta = {
  title: "Props/minHeight",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: Props = {
  minHeight: 128,
};

export const Height: Story = {
  args: defaultProps,
  render: (args) => ({
    components: { StoryResizeBounding, StoryPropField, StoryValuesContainer },
    setup() {
      const width = ref(320);
      const height = ref(320);

      const minHeight = ref(args.minHeight);

      watch(
        () => args.minHeight,
        (newValue) => {
          minHeight.value = newValue;
        }
      );

      return { width, height, minHeight, args };
    },
    template: `
    <StoryValuesContainer>
      <StoryPropField
        description="Container min height:"
        name="minHeight"
        :value="minHeight"/>
    </StoryValuesContainer>
    <StoryResizeBounding
      directions="b"
      :width="width"
      :height="height"
      :minHeight="minHeight"
      @update:width="(value) => { width = value; } "
      @update:height="(value) => { height = value; } "
    />
  `,
  }),
};

Height.storyName = "minHeight";
