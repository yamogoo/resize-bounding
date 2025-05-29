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
};

export const Disabled: Story = {
  args: defaultProps,
  render: (args) => ({
    components: { StoryResizeBounding, StoryPropField, StoryValuesContainer },
    setup() {
      const width = ref(320);
      const height = ref(320);
      const disabled = ref(args.disabled);

      watch(
        () => args.disabled,
        (newValue) => {
          disabled.value = newValue;
        }
      );

      return { width, height, disabled };
    },
    template: `
    <StoryValuesContainer>
      <StoryPropField
        description="Disabled drag actions and hide splitters (panes):"
        name="disabled"
        :value="disabled"/>
    </StoryValuesContainer>
    <StoryResizeBounding
      directions="hv"
      :width="width"
      :height="height"
      :minWidth="128"
      :maxWidth="512"
      :minHeight="128"
      :maxHeight="512"
      :disabled="disabled"
      @update:width="(value) => { width = value; }"
      @update:height="(value) => { height = value; } "/>
  `,
  }),
};

Disabled.storyName = "disabled";
