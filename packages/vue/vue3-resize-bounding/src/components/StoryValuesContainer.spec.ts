import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";

import StoryValuesContainer from "./StoryValuesContainer.vue";

describe("StoryValuesContainer", () => {
  describe("slots", () => {
    test("should render default slot", () => {
      const expectedName = "Some Name";

      const expectedSlotValue = "Slot Content";
      const expectedSlot = `<div class="slot">${expectedSlotValue}</div>`;

      const wrapper = mount(StoryValuesContainer, {
        props: {
          name: expectedName,
        },
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
