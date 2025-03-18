import { mount, VueWrapper } from "@vue/test-utils";

import { getTypedEmittedEvent } from "@/utils/vitest";

import type { Props } from "./Tabbar.vue";
import Tabbar from "./Tabbar.vue";

const getItems = <T>(wrapper: VueWrapper<T>) => {
  return wrapper.findAll(".ui-tabbar-menu__item");
};

const REQUIRED_PROPS: Props<string> = {
  sid: 1,
  items: [
    {
      id: 1,
      label: "First",
      value: "first",
    },
    {
      id: 2,
      label: "Second",
      value: "second",
    },
  ],
};

describe("Tabbar", () => {
  describe("elements", () => {
    test("should render items", () => {
      const wrapper = mount(Tabbar, {
        props: { ...REQUIRED_PROPS },
      });

      const items = getItems(wrapper);
      const itemsCount = items.length;

      expect(itemsCount).toBe(REQUIRED_PROPS.items.length);
      expect(itemsCount).toMatchInlineSnapshot(`2`);
    });

    test("should render item value", () => {
      const wrapper = mount(Tabbar, {
        props: { ...REQUIRED_PROPS },
      });

      const items = getItems(wrapper);

      for (let i = 0; i < items.length; i++) {
        const value = items[i].text();

        expect(value).toBe(REQUIRED_PROPS.items[i].label);
        expect(value).toMatchSnapshot();
      }
    });
  });

  describe("events", () => {
    test("should emit 'select' event", async () => {
      const wrapper = mount(Tabbar, {
        props: { ...REQUIRED_PROPS },
      });

      const items = getItems(wrapper);
      await items[0].trigger("click");

      const emmitedEvent = getTypedEmittedEvent(wrapper, "select");
      const emmitedValue = emmitedEvent[0][0];

      expect(emmitedEvent.length).toBe(1);
      expect(emmitedValue).toStrictEqual(REQUIRED_PROPS.items[0]);
    });
  });
});
