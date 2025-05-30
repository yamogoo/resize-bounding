import { mount } from "@vue/test-utils";

import ControlsHeader from "./ControlsHeader.vue";

describe("ControlsHeader", () => {
  describe("slots", () => {
    test("should render default slot (name)", async () => {
      const expectedName = "Some Name";

      const expectedSlotValue = "Slot Content";
      const expectedSlot = `<div class="slot">${expectedSlotValue}</div>`;

      const wrapper = mount(ControlsHeader, {
        props: {
          name: expectedName,
        },
        slots: {
          default: expectedSlot,
        },
      });

      await vi.dynamicImportSettled();

      const slot = wrapper.find(".slot");
      const isSlotExists = slot.exists();

      const slotValue = slot.text();

      expect(isSlotExists).toBeTruthy();
      expect(slotValue).toBe(expectedSlotValue);
      expect(slotValue).toMatchInlineSnapshot(`"Slot Content"`);
    });
  });
});
