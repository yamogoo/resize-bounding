import { ref, watch } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";

import type { SplitterPosition } from "../../../lib/shared/typings";

import StoryResizeBounding from "../../components/StoryResizeBounding.vue";
import StoryPropField from "../../components/StoryPropField.vue";
import StoryValuesContainer from "../../components/StoryValuesContainer.vue";

const meta = {
  title: "Props/options/position",
  component: StoryResizeBounding,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StoryResizeBounding>;

export default meta;
type Story = StoryObj<typeof meta>;

const defineStory = (_position: SplitterPosition): Story => {
  return {
    args: {
      options: {
        splitterWidthNormal: 32,
        position: _position,
      },
    },
    render: (args) => ({
      components: { StoryResizeBounding, StoryPropField, StoryValuesContainer },
      setup() {
        const width = ref(320);
        const height = ref(240);

        const splitterWidthNormal = ref(args.options?.splitterWidthNormal);
        const position = ref(args.options?.position);

        watch(
          () => args.options?.splitterWidthNormal,
          (newValue) => {
            splitterWidthNormal.value = newValue;
          }
        );

        watch(
          () => args.options?.position,
          (newValue) => {
            position.value = newValue;
          }
        );

        return { width, height, args, splitterWidthNormal, position };
      },
      template: `
    <StoryValuesContainer>
      <StoryPropField
        description="Set pisition of a splitters inside the root container (internal, central, external):"
        name="position"
        :value="position"/>
    </StoryValuesContainer>
    <StoryResizeBounding
      :directions="'hv'"
      v-bind="args"
      :width="width"
      :height="height"
      :options="{
        splitterWidthNormal,
        position,
        knob: {
          show: true,
        }
      }"
      :styles="{
        knob: {
          height: '6px',
          borderRadius: '3px',
        }
      }"
      :minWidth="128"
      :maxWidth="512"
      :minHeight="128"
      :maxHeight="512"
      @update:width="(value) => { width = value; }"
      @update:height="(value) => { height = value; }"
      "/>
  `,
    }),
  };
};

export const Central: Story = defineStory("central");
export const External: Story = defineStory("external");
export const Internal: Story = defineStory("internal");
