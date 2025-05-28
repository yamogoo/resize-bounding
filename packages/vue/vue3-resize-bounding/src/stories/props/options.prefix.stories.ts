import { ref, watch } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import { PREFIX } from "../../../lib/components/ResizeBounding.classNames";

import StoryResizeBounding, {
  type Props,
} from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";
import StoryValuesContainer from "../../components/StoryValuesContainer.vue";

const meta = {
  title: "Props/options/prefix",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = (): Props => ({
  options: {
    prefix: PREFIX,
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

        const prefix = ref(args.options?.prefix);

        watch(
          () => args.options?.prefix,
          (newValue) => {
            prefix.value = newValue ?? "";
          }
        );

        return { width, height, args, prefix };
      },
      template: `
    <StoryValuesContainer>
      <StoryPropField
        description="Set element class name prefix:"
        name="prefix"
        :value="prefix"/>
    </StoryValuesContainer>
    <StoryResizeBounding
      :directions="'hv'"
      v-bind="args"
      :width="width"
      :height="height",
      :options="{
        prefix
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

Show.storyName = "prefix";
