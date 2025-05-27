import { ref, watch } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import StoryResizeBounding, {
  type Props,
} from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";

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
    components: { StoryResizeBounding, StoryPropField },
    setup() {
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

      return { width, args };
    },
    template: `
    <StoryPropField
      name="width"
      :value="width"/>
    <StoryResizeBounding
      directions="r"
      :width="width"
      :minWidth="128"
      height="240"
      @update:width="(value) => { width = value; } "/>
  `,
  }),
};

Width.storyName = "width";
