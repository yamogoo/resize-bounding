import { ref, watch } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import StoryResizeBounding, {
  type Props,
} from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";
import StoryValuesContainer from "../../components/StoryValuesContainer.vue";

const meta = {
  title: "Props/disabled",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: Props = {
  disabled: false,
  width: 320,
  height: 320,
};

export const Disabled: Story = {
  args: defaultProps,
  render: (args) => ({
    components: { StoryResizeBounding, StoryPropField, StoryValuesContainer },
    setup() {
      const width = ref(args.width);
      const height = ref(args.height);
      const disabled = ref(args.disabled);

      watch(
        () => args.width,
        () => {
          width.value = args.width;
        }
      );

      watch(
        () => args.height,
        () => {
          height.value = args.height;
        }
      );

      watch(
        () => args.disabled,
        () => {
          disabled.value = args.disabled;
        }
      );

      return { width, height, disabled };
    },
    template: `
    <StoryValuesContainer>
      <StoryPropField
        name="height"
        :value="height"/>
    </StoryValuesContainer>
    <StoryResizeBounding
      directions="hv"
      :width="width"
      :height="height"
      minWidth="128"
      maxWidth="512"
      minHeight="128"
      maxHeight="512"
      :disabled="disabled"
      @update:width="(value) => { width = value; }"
      @update:height="(value) => { height = value; } "/>
  `,
  }),
};

Disabled.storyName = "disabled";
