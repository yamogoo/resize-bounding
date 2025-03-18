import { nextTick } from "vue";
import { mount, VueWrapper } from "@vue/test-utils";

import IntroCover from "./IntroCover.vue";

const getMouseIcon = <T>(wrapper: VueWrapper<T>) => {
  return wrapper.find('[data-testid="mouse-icon"]');
};

const getTouchIcon = <T>(wrapper: VueWrapper<T>) => {
  return wrapper.find('[data-testid="touch-icon"]');
};

describe("IntroCover", () => {
  describe("elements", () => {
    test("should render description", async () => {
      const expectedDescriptionValue = "Some Description";

      const wrapper = mount(IntroCover, {
        props: {
          description: expectedDescriptionValue,
        },
      });

      await nextTick();

      const description = wrapper.find(".ui-main-intro__description");
      const descriptionValue = description.text();

      expect(descriptionValue).toBe(expectedDescriptionValue);
      expect(descriptionValue).toMatchInlineSnapshot(`"Some Description"`);
    });

    test("should render mouse icon", async () => {
      const wrapper = mount(IntroCover);

      await nextTick();

      const icon = getMouseIcon(wrapper);
      const isIconExists = icon.exists();

      expect(isIconExists).toBeTruthy();
      expect(isIconExists).toMatchInlineSnapshot(`true`);
    });

    test("should render touch icon", async () => {
      const wrapper = mount(IntroCover);

      await nextTick();

      const icon = getTouchIcon(wrapper);
      const isIconExists = icon.exists();

      expect(isIconExists).toBeTruthy();
      expect(isIconExists).toMatchInlineSnapshot(`true`);
    });
  });
});
