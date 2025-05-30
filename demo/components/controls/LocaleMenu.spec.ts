import { mount, VueWrapper } from "@vue/test-utils";

import LocaleMenu from "./LocaleMenu.vue";
import { createPinia, setActivePinia } from "pinia";

const getDropdown = <T>(wrapper: VueWrapper<T>) => {
  return wrapper.findComponent({ name: "BaseDropdown" });
};

describe("LocaleMenu", () => {
  const pinia = createPinia();
  setActivePinia(pinia);

  describe("elements", () => {
    test("should render BaseDropdown component", () => {
      const wrapper = mount(LocaleMenu);

      const dropdown = getDropdown(wrapper);
      const isDropdownExists = dropdown.exists();

      expect(isDropdownExists).toBeTruthy();
    });
  });
});
