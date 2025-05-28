import { ref, watch } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import StoryResizeBounding, {
  type Props,
} from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";
import StoryValuesContainer from "../../components/StoryValuesContainer.vue";

const meta = {
  title: "Props/options/knob/show",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = (): Props => ({
  options: {
    knob: {
      show: true,
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

        const show = ref(args.options?.knob?.show);

        watch(
          () => args.options?.knob?.show,
          (newValue) => {
            show.value = newValue;
          }
        );

        return { width, height, args, show };
      },
      template: `
    <StoryValuesContainer>
      <StoryPropField
        description="Always show a knob of the splitter:"
        name="show"
        :value="show"/>
    </StoryValuesContainer>
    <StoryResizeBounding
      :directions="'hv'"
      v-bind="args"
      :width="width"
      :height="height"
      :oiptions="{
        knob: {
          show
        }
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

Show.storyName = "show";
