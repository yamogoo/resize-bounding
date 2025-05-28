import { ref, watch } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import StoryResizeBounding, {
  type Props,
} from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";
import StoryValuesContainer from "../../components/StoryValuesContainer.vue";

const meta = {
  title: "Props/options/addStateClasses",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = (): Props => ({
  options: {
    addStateClasses: false,
  },
});

const defineStory = (): Story => {
  return {
    args: defaultProps(),
    render: (args) => ({
      components: { StoryResizeBounding, StoryPropField, StoryValuesContainer },
      setup() {
        const width = ref(320);
        const height = ref(240);

        const addStateClasses = ref(args.options?.addStateClasses);

        watch(
          () => args.options?.addStateClasses,
          (newValue) => {
            addStateClasses.value = newValue ?? false;
          }
        );

        return { width, height, args, addStateClasses };
      },
      template: `
    <StoryValuesContainer>
      <StoryPropField
        description="Add element state class names to adjust styles from css:"
        name="addStateClasses"
        :value="String(addStateClasses)"/>
    </StoryValuesContainer>
    <StoryResizeBounding
      :directions="'hv'"
      v-bind="args"
      :width="width"
      :height="height",
      :options="{
        addStateClasses
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
};

export const Show = defineStory();

Show.storyName = "addStateClasses";
