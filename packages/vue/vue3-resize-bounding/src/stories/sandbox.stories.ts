import { ref, watchEffect } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import colors from "../tokens/colors.json";

import { defaultStyles } from "../../lib/components/ResizeBounding.classNames";

import StoryResizeBounding, {
  type Props,
} from "../components/StoryResizeBounding.vue";
import StoryPropField from "../components/StoryPropField.vue";

const meta = {
  title: "Sandbox/examples",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = (prefix = "resize-bounding__"): Props => ({
  width: 320,
  minWidth: 320,
  maxWidth: 800,
  height: 480,
  minHeight: 128,
  maxHeight: 480,
  directions: "rtlb",
  disabled: false,
  options: {
    prefix,
    activeAreaWidth: 24,
    splitterWidthNormal: 1,
    splitterWidthActive: 4,
    position: "central",
    cursor: {
      horizontal: "col-resize",
      vertical: "row-resize",
    },
    knob: {
      show: true,
      normalHidden: false,
    },
    touchActions: true,
  },
  styles: {
    ...defaultStyles(prefix),
    splitter: { background: colors.border },
  },
});

const defineStory = (showCover: boolean): Story => {
  return {
    args: defaultProps(),
    render: (args) => ({
      components: { StoryResizeBounding, StoryPropField },
      setup() {
        const width = ref(args.width);
        const height = ref(args.height);

        watchEffect(() => {
          width.value = args.width;
        });

        watchEffect(() => {
          height.value = args.height;
        });

        return { width, height, args };
      },
      template: `
    <StoryResizeBounding
      :directions="'vh'"
      :show-cover="${showCover}"
      v-bind="args"
      :width="width"
      :height="height"
      @update:width="(value) => { width = value; }"
      @update:height="(value) => { height = value; }"
      "/>
  `,
    }),
  };
};

export const Cover = defineStory(true);
Cover.storyName = "with cover";

export const Slot = defineStory(false);
Slot.storyName = "with slot";
