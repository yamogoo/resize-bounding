import { mount, VueWrapper } from "@vue/test-utils";

import ThemeSwitch from "./ThemeSwitch.vue";

const getSwitch = <T>(wrapper: VueWrapper<T>) => {
  return wrapper.findComponent({ name: "Switch" });
};

describe("ThemeSwitch", () => {
  beforeEach(() => {
    window.matchMedia = vi.fn((): MediaQueryList => {
      return {
        matches: false,
        media: "",
        onchange: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    });
  });

  describe("elements", () => {
    test("should render Switch component", () => {
      const wrapper = mount(ThemeSwitch);

      const switchEl = getSwitch(wrapper);
      const isSwitchExists = switchEl.exists();

      expect(isSwitchExists).toBeTruthy();
    });
  });
});
