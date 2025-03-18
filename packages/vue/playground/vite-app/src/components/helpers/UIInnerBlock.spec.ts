import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import UIInnerBlock from "./UIInnerBlock.vue";

describe("UIInnerBlock", () => {
  describe("elements", () => {
    test("should render title with value", () => {
      const expectedTitle = "Some Title";

      const wrapper = mount(UIInnerBlock, {
        props: {
          title: expectedTitle,
        },
      });

      const h1 = wrapper.find("h1");
      const title = h1.text();

      expect(title).toBe(expectedTitle);
      expect(title).toMatchInlineSnapshot(`"Some Title"`);
    });

    test("should render logo", async () => {
      const wrapper = mount(UIInnerBlock);

      expect(wrapper.find('[data-testid="logo"]').exists()).toBeFalsy();

      await wrapper.setProps({ showLogo: true });

      const logo = wrapper.find('[data-testid="logo"]');
      const isLogoExists = logo.exists();

      expect(isLogoExists).toBeTruthy();
      expect(isLogoExists).toMatchInlineSnapshot(`true`);
    });
  });

  describe("slots", () => {
    test("should render default slot", () => {
      const expectedSlotValue = "Slot Content";
      const expectedSlot = `<div class="slot">${expectedSlotValue}</div>`;

      const wrapper = mount(UIInnerBlock, {
        slots: {
          default: expectedSlot,
        },
      });

      const slot = wrapper.find(".slot");
      const isSlotExists = slot.exists();

      const slotValue = slot.text();

      expect(isSlotExists).toBeTruthy();
      expect(slotValue).toBe(expectedSlotValue);
      expect(slotValue).toMatchInlineSnapshot(`"Slot Content"`);
    });
  });
});
