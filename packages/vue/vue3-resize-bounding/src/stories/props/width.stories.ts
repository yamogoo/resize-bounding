import { ref, watch } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import StoryResizeBounding, {
  type Props,
} from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";
import StoryValuesContainer from "../../components/StoryValuesContainer.vue";

const meta = {
  title: "Props/width",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: Props = {
  width: 320,
};

export const Width: Story = {
  args: defaultProps,
  render: (args) => ({
    components: { StoryResizeBounding, StoryPropField, StoryValuesContainer },
    setup() {
      const width = ref(args.width);

      watch(
        () => args.width,
        (newValue) => {
          width.value = newValue;
        }
      );

      return { width, args };
    },
    template: `
    <StoryValuesContainer>
      <StoryPropField
        description="Container width:"
        name="width"
        :value="width"/>
    </StoryValuesContainer>
    <StoryResizeBounding
      directions="r"
      :width="width"
      :minWidth="128"
      :height="240"
      @update:width="(value) => { width = value; } "/>
  `,
  }),
};

Width.storyName = "width";
