import { describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";

import Icon, { type SymbolName } from "./Icon.vue";

type IconsData = Array<SymbolName>;

const icons: IconsData = [
  "computerMouse_fill_200",
  "copy_outline_300",
  "figma-logo",
  "gestureTap_fill_200",
  "git",
];

describe("Icon", () => {
  test.each(icons)("should render %s icon from the Icons Set", async (name) => {
    const wrapper = mount(Icon, {
      props: {
        name,
      },
    });

    await vi.dynamicImportSettled();
    const res = wrapper.find("svg");
    expect(res.exists()).toBe(true);
    expect(res.exists()).toMatchSnapshot();
  });
});
