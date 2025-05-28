import { ref, watch } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import StoryResizeBounding, {
  type Props,
} from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";
import StoryValuesContainer from "../../components/StoryValuesContainer.vue";

const meta = {
  title: "Props/options/cursor",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = (): Props => ({
  options: {
    cursor: {
      horizontal: "col-resize",
      vertical: "row-resize",
    },
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

        const cursor = ref(args.options?.cursor);

        watch(
          () => args.options?.cursor,
          (newValue) => {
            cursor.value = newValue;
          }
        );

        return { width, height, args, cursor };
      },
      template: `
    <StoryValuesContainer>
      <StoryPropField
        description="Set cursor style for normal/focused states of a splitter:"
        name="cursor"
        :value="JSON.stringify(cursor)"/>
    </StoryValuesContainer>
    <StoryResizeBounding
      :directions="'hv'"
      v-bind="args"
      :width="width"
      :height="height",
      :options="{
        cursor
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

Show.storyName = "cursor";
