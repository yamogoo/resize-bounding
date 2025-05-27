import { ref } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import StoryResizeBounding, {
  type Props,
} from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";

const meta = {
  title: "Props/disabled",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = (): Props => ({
  disabled: false,
});

export const Disabled: Story = {
  args: defaultProps(),
  render: (args) => ({
    components: { StoryResizeBounding, StoryPropField },
    setup() {
      const width = ref(320);
      const height = ref(240);

      return { width, height, args };
    },
    template: `
    <StoryResizeBounding
      :directions="'hv'"
      v-bind="args"
      :width="width"
      :height="height"
      :disabled="args.disabled"
      minWidth: 128,
      maxWidth: 512,
      minHeight: 128,
      maxHeight: 512,
      @update:width="(value) => { width = value; }"
      @update:height="(value) => { height = value; }"
      "/>
  `,
  }),
};

Disabled.storyName = "disabled";
