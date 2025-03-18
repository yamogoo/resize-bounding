import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";

import BlockContainer from "./BlockContainer.vue";

describe("BlockContainer", () => {
  describe("slots", () => {
    test("should render default slot", () => {
      const expectedSlotValue = "Slot Content";
      const expectedSlot = `<div class="slot">${expectedSlotValue}</div>`;

      const wrapper = mount(BlockContainer, {
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
