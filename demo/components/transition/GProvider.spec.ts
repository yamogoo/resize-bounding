import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";

import GProvider from "./GProvider.vue";

describe("GProvider", () => {
  describe("slots", () => {
    const expectedSlotValue = "Slot Content";

    test("should not render default slot content", () => {
      const wrapper = mount(GProvider, {
        props: {
          show: false,
        },
        slots: {
          default: `<div class="content">${expectedSlotValue}</div>`,
        },
      });

      const slot = wrapper.find(".content");
      const isSlotExists = slot.exists();

      expect(isSlotExists).toBeFalsy();
      expect(isSlotExists).toMatchInlineSnapshot(`false`);
    });
  });
});
