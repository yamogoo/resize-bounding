import { describe, test, expect } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";

import BaseLink, {
  type BaseLinkColor,
  type BaseLinkOrientation,
  type BasicLinkSize,
} from "./BaseLink.vue";

const getRoot = <T>(wrapper: VueWrapper<T>) => {
  return wrapper.find('[data-testid="ui-link"]');
};

const getLink = <T>(wrapper: VueWrapper<T>) => {
  return wrapper.find(".ui-link__icon");
};

const getName = <T>(wrapper: VueWrapper<T>) => {
  return wrapper.find(".ui-link__name");
};

describe("BaseLink", () => {
  describe("elements", () => {
    test("should render icon", async () => {
      const wrapper = mount(BaseLink, {
        props: {
          iconName: "copy_outline_300",
        },
      });

      await vi.dynamicImportSettled();

      const link = getLink(wrapper);
      const isLinkExists = link.exists();

      expect(isLinkExists).toBeTruthy();
    });
  });

  describe("slots", () => {
    test("should render icon slot", async () => {
      const expectedSlotValue = "Slot Content";
      const expectedSlot = `<div class="slot">${expectedSlotValue}</div>`;

      const wrapper = mount(BaseLink, {
        slots: {
          icon: expectedSlot,
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

    test("should render default slot (name)", async () => {
      const expectedName = "Some Name";

      const expectedSlotValue = "Slot Content";
      const expectedSlot = `<div class="slot">${expectedSlotValue}</div>`;

      const wrapper = mount(BaseLink, {
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

  describe("classes", () => {
    test("should have size class", async () => {
      const size: BasicLinkSize = "md";

      const wrapper = mount(BaseLink, {
        props: {
          iconName: "copy_outline_300",
          size,
        },
      });

      await vi.dynamicImportSettled();

      const root = getRoot(wrapper);
      const isRootExists = root.exists();
      const hasRootClass = root.classes().includes(`ui-link_${size}`);

      expect(isRootExists).toBeTruthy();
      expect(hasRootClass).toBeTruthy();
    });

    test("should have color class", async () => {
      const color: BaseLinkColor = "accent";

      const wrapper = mount(BaseLink, {
        props: {
          color,
        },
      });

      await vi.dynamicImportSettled();

      const root = getRoot(wrapper);
      const isRootExists = root.exists();
      const hasRootClass = root.classes().includes(`ui-link_${color}`);

      expect(isRootExists).toBeTruthy();
      expect(hasRootClass).toBeTruthy();
    });

    test("should have orientation class", async () => {
      const orientation: BaseLinkOrientation = "horizontal";

      const wrapper = mount(BaseLink, {
        props: {
          orientation,
        },
      });

      await vi.dynamicImportSettled();

      const root = getRoot(wrapper);
      const isRootExists = root.exists();
      const hasRootClass = root.classes().includes(`ui-link_${orientation}`);

      expect(isRootExists).toBeTruthy();
      expect(hasRootClass).toBeTruthy();
    });
  });

  describe("values", () => {
    test("should render name", async () => {
      const expectedName = "Some Name";

      const wrapper = mount(BaseLink, {
        props: {
          name: expectedName,
        },
      });

      await vi.dynamicImportSettled();

      const name = getName(wrapper);
      const isNameExists = name.exists();
      const nameValue = name.text();

      expect(isNameExists).toBeTruthy();
      expect(nameValue).toBe(expectedName);
      expect(nameValue).toMatchInlineSnapshot(`"Some Name"`);
    });
  });
});
