import { ref, watch } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import StoryResizeBounding, {
  type Props,
} from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";
import StoryValuesContainer from "../../components/StoryValuesContainer.vue";

const meta = {
  title: "Props/options/touchActions",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = (): Props => ({
  options: {
    touchActions: true,
  },
});

const TouchAction: Story = {
  args: defaultProps(),
  render: (args) => ({
    components: { StoryResizeBounding, StoryPropField, StoryValuesContainer },
    setup() {
      const width = ref(320);
      const height = ref(240);

      const touchActions = ref(args.options?.touchActions);

      watch(
        () => args.options?.touchActions,
        (newValue) => {
          touchActions.value = newValue;
        }
      );

      return { width, height, args, touchActions };
    },
    template: `
    <StoryValuesContainer>
      <StoryPropField
        description="Enable touch actions (mobile/tablet devices):"
        name="touchActions"
        :value="touchActions"/>
    </StoryValuesContainer>
    <StoryResizeBounding
      :directions="'hv'"
      v-bind="args"
      :width="width"
      :height="height",
      :options="{
        touchActions
      }"
      minWidth="128"
      maxWidth="512"
      minHeight="128"
      maxHeight="512"
      @update:width="(value) => { width = value; }"
      @update:height="(value) => { height = value; }"
      "/>
  `,
  }),
};

TouchAction.storyName = "touchActions";
