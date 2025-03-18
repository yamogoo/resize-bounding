import { mount, VueWrapper } from "@vue/test-utils";

import SetupGuide, { menuItems } from "./SetupGuide.vue";

const getTabbarComponent = <T>(wrapper: VueWrapper<T>) => {
  return wrapper.findComponent({ name: "Tabbar" });
};

const getTabbarItems = <T>(wrapper: VueWrapper<T>) => {
  return wrapper.findAll(`[data-testid="tabbar-item"]`);
};

const getCodeComponents = <T>(wrapper: VueWrapper<T>) => {
  return wrapper.findAllComponents({ name: "Code" });
};

describe("SetupGuide", () => {
  describe("elements", () => {
    test("should render Tabbar", () => {
      const wrapper = mount(SetupGuide);

      const tabbar = getTabbarComponent(wrapper);
      expect(tabbar.exists()).toBeTruthy();
    });

    test("should render Tabbar with 2 tabs", () => {
      const wrapper = mount(SetupGuide);

      const tabs = getTabbarItems(wrapper);

      expect(tabs.length).toBe(menuItems.length);
    });

    test("should render code comonent", () => {
      const wrapper = mount(SetupGuide);

      const codeComponents = getCodeComponents(wrapper);

      expect(codeComponents.length).toBeGreaterThan(0);
      expect(codeComponents.length).toMatchInlineSnapshot(`1`);
    });
  });
});
