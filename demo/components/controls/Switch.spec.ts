import { describe, expect, test } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";

import { getTypedEmittedEvent } from "@/utils/vitest";

import Switch from "./Switch.vue";

const getInput = <T>(wrapper: VueWrapper<T>) => {
  return wrapper.find('input[type="checkbox"]');
};

describe("Switch", () => {
  describe("values", () => {
    test.each([true])(
      'should add class attribute "active" to container DOM if "state" prop equals %s',
      (state) => {
        const wrapper = mount(Switch, {
          props: {
            state,
          },
        });

        const className = wrapper.classes("ui-switch_active");
        expect(className).toBe(true);
        expect(wrapper.classes("ui-switch_normal")).toBe(false);
        expect(className).toMatchSnapshot();
      },
    );

    test.each([false])(
      'should add class attribute "normal" to container DOM if "state" prop equals %s',
      (state) => {
        const wrapper = mount(Switch, {
          props: {
            state,
          },
        });

        const className = wrapper.classes("ui-switch_normal");
        expect(className).toBe(true);
        expect(wrapper.classes("ui-switch_active")).toBe(false);
        expect(className).toMatchSnapshot();
      },
    );
  });

  describe("events", () => {
    test('should emit "update:state" when clicking on the wrapper', async () => {
      const wrapper = mount(Switch, {
        props: {
          state: true,
        },
      });

      const inputEl = getInput(wrapper);
      await inputEl.trigger("change");

      const emittedEvent = getTypedEmittedEvent(wrapper, "update:state");

      expect(emittedEvent).toHaveLength(1);
      expect(wrapper.emitted()).toHaveProperty("update:state");
      expect(emittedEvent).toMatchSnapshot();
    });
  });
});
