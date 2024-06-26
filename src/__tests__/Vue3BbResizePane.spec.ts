import { describe, test, expect } from "vitest";
import { shallowMount, VueWrapper } from "@vue/test-utils";

import { DataTestIds } from "./setup";

import Vue3BbResizePane, {
  Emits,
  PaneDirectionAliases,
  PaneDirections,
  type PaneEmittedData,
  type Props,
} from "@/components/Vue3BbResizePane.vue";

describe("Vue3BbResize", () => {
  beforeEach(() => {
    Element.prototype.setPointerCapture = vi.fn();
    Element.prototype.releasePointerCapture = vi.fn();
  });

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
        const checkData = (
          eventName: string,
          wrapper: VueWrapper,
          eventData: { clientX: number; clientY: number },
        ): PaneEmittedData => {
          const ev = wrapper.emitted(eventName) as PaneEmittedData[][];
          const data = ev[0][0];
          const { x, y } = data;

          const { clientX, clientY } = eventData;

          expect(data).toHaveProperty("x");
          expect(x).toBe(clientX);
          expect(data).toHaveProperty("y");
          expect(y).toBe(clientY);
          expect(data).toHaveProperty("dir");
          expect(data.dir).toBe(PaneDirections.RIGHT);
          return data;
        };

        let events: PaneEmittedData[] = [];

        const makeTrigger = async (
          event: string,
          eventData: { clientX: number; clientY: number },
          emittedEventName: string,
        ) => {
          await rootEl.trigger(event, eventData);
          events.push(checkData(emittedEventName, wrapper, eventData));
        };

        await rootEl.trigger("pointerenter", { clientX: 1, clientY: 1 });
        await makeTrigger(
          "pointerdown",
          { clientX: 1, clientY: 1 },
          Emits.DRAG_START,
        );
        await makeTrigger(
          "pointermove",
          { clientX: 2, clientY: 2 },
          Emits.DRAG_MOVE,
        );
        await makeTrigger(
          "pointerup",
          { clientX: 3, clientY: 3 },
          Emits.DRAG_END,
        );

        expect(events.length).toBe(3);
        expect(events).toMatchSnapshot();
      });
    });
  });

  describe("styles", () => {
    test('default cursor style should be "auto"', async () => {
      const wrapper = shallowMount(Vue3BbResizePane);
      await wrapper.setProps({ direction: PaneDirections.RIGHT });

      const rootEl = wrapper.find(
        `[data-testid="${DataTestIds.BB_RESIZE_PANE_SPLITTER}"]`,
      );

      await rootEl.trigger("pointerenter");
      await rootEl.trigger("pointerleave");

      const cursorStyle = rootEl.attributes("style");

      expect(cursorStyle).toContain("auto");
      expect(cursorStyle).toMatchSnapshot();
    });

    const checkCursorActive = async (
      wrapper: VueWrapper,
      props: Props,
      comparedCursorStyle: string,
    ): Promise<void> => {
      await wrapper.setProps(props);

      const rootEl = wrapper.find(
        `[data-testid="${DataTestIds.BB_RESIZE_PANE_SPLITTER}"]`,
      );
      await rootEl.trigger("pointerenter");

      const cursorStyle = rootEl.attributes("style");

      expect(cursorStyle).toContain(comparedCursorStyle);
      expect(cursorStyle).toMatchSnapshot();
    };

    describe("active", () => {
      describe("default styles", () => {
        test.each([
          PaneDirectionAliases.HORIZONTAL,
          PaneDirections.RIGHT,
          PaneDirections.LEFT,
        ])(
          'default cursor style should be "col-resize" (--%s)',
          async (direction) => {
            const wrapper = shallowMount(Vue3BbResizePane);
            checkCursorActive(wrapper, { direction }, "col-resize");
          },
        );

        test.each([
          PaneDirectionAliases.VERTICAL,
          PaneDirections.TOP,
          PaneDirections.BOTTOM,
        ])(
          'default cursor style should be "row-resize" (--%s)',
          async (direction) => {
            const wrapper = shallowMount(Vue3BbResizePane);
            checkCursorActive(wrapper, { direction }, "row-resize");
          },
        );
      });

      describe("custom styles", () => {
        const CUSTOM_ACTIVE_CURSOR = "ew-resize";

        test.each([...Object.values(PaneDirections)])(
          `custom cursor style should be "${CUSTOM_ACTIVE_CURSOR}" (--%s)`,
          async (direction) => {
            const wrapper = shallowMount(Vue3BbResizePane, {
              props: {
                styles: {
                  cursor: {
                    active: {
                      vertical: CUSTOM_ACTIVE_CURSOR,
                      horizontal: CUSTOM_ACTIVE_CURSOR,
                    },
                  },
                },
              },
            });
            checkCursorActive(
              wrapper,
              {
                direction,
              },
              CUSTOM_ACTIVE_CURSOR,
            );
          },
        );
      });
    });
  });
});
