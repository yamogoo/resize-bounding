import type { Meta, StoryObj } from "@storybook/vue3";

import { storyThemeDecorator } from "@/stories/decorators";

import DropdownOptionsMenu, { type Props } from "./DropdownOptionsMenu.vue";

const meta = {
  title: "Components/Base/DropdownOptionsMenu",
  tags: ["autodocs", "dropdown"],
  args: {},
  argTypes: {
    defaultValues: {
      description: "Equals $value",
    },
    value: {
      description: "Current value",
    },
    options: {
      description: "Options: Array",
    },
    resetButton: {
      description: "Enable reset button",
    },
  },
} satisfies Meta<typeof DropdownOptionsMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

const props: Props<string> = {
  defaultValues: [],
  value: ["First"],
  options: ["First", "Second", "Third"],
  resetButton: false,
};

export const Primary: Story = {
  args: { ...props },
  render: (args) => ({
    components: { DropdownOptionsMenu },
    template: '<DropdownOptionsMenu v-bind="args"/>',
    setup: () => {
      return {
        args,
      };
    },
  }),
  decorators: [() => ({ template: storyThemeDecorator() })],
};
