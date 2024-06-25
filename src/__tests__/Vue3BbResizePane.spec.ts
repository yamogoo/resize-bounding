import { describe, test, expect } from "vitest";
import { mount, shallowMount, VueWrapper } from "@vue/test-utils";

import { DataTestIds } from "./setup";

import Vue3BbResizePane, {
  PaneDirections,
  type PaneEmittedData,
} from "@/components/Vue3BbResizePane.vue";

enum Emits {
  FOCUS = "focus",
  DRAG_START = "drag:start",
  DRAG_MOVE = "drag:move",
  DRAG_END = "drag:end",
}

describe("Vue3BbResize", () => {
  describe("classes", () => {
    test('should have "hide class by default"', () => {
      const wrapper = shallowMount(Vue3BbResizePane);

      const splitterEl = wrapper.find(
        `[data-testid="${DataTestIds.BB_RESIZE_PANE_SPLITTER}"]`,
      );

      expect(splitterEl.classes("hide")).toBeTruthy();
      expect(splitterEl.classes()).toMatchSnapshot();
    });
  });
  describe("events", () => {
    describe("focus", async () => {
      const wrapper = shallowMount(Vue3BbResizePane, {
        props: {
          direction: PaneDirections.RIGHT,
        },
      });

      const rootEl = wrapper.find(
        `[data-testid="${DataTestIds.BB_RESIZE_PANE_SPLITTER}"]`,
      );

      test(`should emit "${Emits.FOCUS}" with state (true)`, async () => {
        await rootEl.trigger("pointerenter");
        const isFocused: boolean = (
          wrapper.emitted(Emits.FOCUS) as boolean[][]
        )[0][0];

        expect(isFocused).toBeTruthy();
        expect(isFocused).toMatchSnapshot();
      });

      test(`should emit "${Emits.FOCUS}" with state (false)`, async () => {
        await rootEl.trigger("pointerleave");
        const isFocused = (wrapper.emitted(Emits.FOCUS) as boolean[][])[1][0];

        expect(isFocused).toBeFalsy();
        expect(isFocused).toMatchSnapshot();
      });
    });

    describe("drag", () => {
      const wrapper = shallowMount(Vue3BbResizePane, {
        props: {
          direction: PaneDirections.RIGHT,
        },
      });

      const rootEl = wrapper.find(
        `[data-testid="${DataTestIds.BB_RESIZE_PANE_SPLITTER}"]`,
      );

      test(`should emit "${Emits.DRAG_START} -> ${Emits.DRAG_MOVE} -> ${Emits.DRAG_END}" with {x, y, dir}`, async () => {
        const checkData = (eventName: string, wrapper: VueWrapper) => {
          const ev = wrapper.emitted(eventName) as PaneEmittedData[][];
          const data = ev[0][0];

          expect(data).toHaveProperty("x");
          expect(data).toHaveProperty("y");
          expect(data).toHaveProperty("dir");
          expect(data.dir).toBe(PaneDirections.RIGHT);
          expect(ev).toMatchSnapshot();
        };

        await rootEl.trigger("pointerenter");
        await rootEl.trigger("pointerdown");

        checkData(Emits.DRAG_START, wrapper);

        document.dispatchEvent(new Event("pointermove"));
        checkData(Emits.DRAG_MOVE, wrapper);

        document.dispatchEvent(new Event("pointerup"));
        checkData(Emits.DRAG_END, wrapper);
      });
    });
  });
});
