import { describe, test, expect } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";

import { DataTestIds } from "./setup";

import Vue3BbResize, { Emits } from "@/components/Vue3BbResize.vue";
import {
  PaneDirectionAliases,
  PaneDirections,
  type PaneEmittedData,
} from "@/components/Vue3BbResizePane.vue";

import Vue3BbResizePane from "@/components/Vue3BbResizePane.vue";

describe("Vue3BbResize", () => {
  beforeEach(() => {
    Element.prototype.setPointerCapture = vi.fn();
    Element.prototype.releasePointerCapture = vi.fn();
  });

  describe("components", () => {
    test.each(["r", "l", "t", "b", "h", "v"])(
      `Should not display any selected borders when set to "disabled" (--%s)`,
      (direction) => {
        const wrapper = mount(Vue3BbResize, {
          props: {
            directions: direction,
            disabled: true,
          },
        });

        const panEl = wrapper.findAll(
          `[data-testid="${DataTestIds.BB_RESIZE_PANE}"]`,
        );

        expect(panEl.length).toBe(0);
        expect(panEl.length).toMatchSnapshot();
      },
    );

    test.each(["rl", "ltrb", "bltr", "bl", "tr"])(
      "should render %s panes (panes computed value)",
      (directions) => {
        const wrapper = mount(Vue3BbResize, {
          props: {
            directions,
          },
        });

        const panEls = wrapper.findAll(
          `[data-testid="${DataTestIds.BB_RESIZE_PANE}"]`,
        );
        expect(panEls.length).toBe(directions.length);
        expect(panEls.length).toMatchSnapshot();
      },
    );

    test.each(["sd", "wo", ""])(
      "should not render any pane element",
      (directions) => {
        const wrapper = mount(Vue3BbResize, {
          props: {
            directions,
          },
        });

        const panEls = wrapper.findAll(
          `[data-testid="${DataTestIds.BB_RESIZE_PANE}"]`,
        );
        expect(panEls.length).toBe(0);
        expect(panEls.length).toMatchSnapshot();
      },
    );
  });

  describe("slots", () => {
    test.each(["<p>Inner Container</p>"])(
      "should render default slot",
      (slot) => {
        const wrapper = mount(Vue3BbResize, {
          slots: {
            default: slot,
          },
        });

        const html = wrapper
          .find(`[data-testid="${DataTestIds.BB_RESIZE}"]`)
          .html();
        expect(html).toContain(slot);
        expect(html).toMatchSnapshot();
      },
    );
  });

  describe("classes", () => {
    test.each(["r", "l", "t", "b"])('should have "--%s" class', (direction) => {
      const wrapper = mount(Vue3BbResize, {
        props: {
          directions: direction,
        },
      });

      const panEl = wrapper.findAll(
        `[data-testid="${DataTestIds.BB_RESIZE_PANE}"]`,
      );

      expect(panEl[0].classes(`--${direction}`)).toBeTruthy();
      expect(panEl[0].classes(`--${direction}`)).toMatchSnapshot();
    });
  });

  describe("events", () => {
    describe("drag", () => {
      const checkData = (
        eventName: string,
        wrapper: VueWrapper,
        direction: string,
      ): PaneEmittedData => {
        const ev = wrapper.emitted(eventName) as PaneEmittedData[][];
        const data = ev[0][0];
        expect(data).toBe(direction);
        return data;
      };

      test.each(Object.values(PaneDirections))(
        `should emit the "${Emits.DRAG_START} -> ${Emits.DRAG_MOVE} -> ${Emits.DRAG_END}" event, which takes a direction argument "%s"`,
        async (direction) => {
          const wrapper = mount(Vue3BbResize, {
            props: {
              directions: direction,
            },
          });
          await wrapper.setProps({ directions: direction });

          const paneWrapper = wrapper.findComponent(Vue3BbResizePane);
          expect(paneWrapper.exists()).toBeTruthy();

          const pane = paneWrapper.find(
            `[data-testid="${DataTestIds.BB_RESIZE_PANE_SPLITTER}"]`,
          );

          let events: PaneEmittedData[] = [];

          const makeTrigger = async (
            event: string,
            eventData: { clientX: number; clientY: number },
            emittedEventName: string,
          ) => {
            await pane.trigger(event, eventData);
            paneWrapper.emitted(emittedEventName) as PaneEmittedData[][];
            events.push(checkData(emittedEventName, wrapper, direction));
          };

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
        },
      );

      test.each([
        [
          {
            alias: PaneDirectionAliases.HORIZONTAL,
            directions: [PaneDirections.RIGHT, PaneDirections.LEFT],
          },
        ],
        [
          {
            alias: PaneDirectionAliases.VERTICAL,
            directions: [PaneDirections.TOP, PaneDirections.BOTTOM],
          },
        ],
      ])(
        `check aliases: should emit "${Emits.DRAG_START}" with direction argument "%o"`,
        async ({ alias, directions }) => {
          const wrapper = mount(Vue3BbResize, {
            props: {
              directions: alias,
            },
          });

          const paneEls = wrapper.findAll(
            `[data-testid="${DataTestIds.BB_RESIZE_PANE_SPLITTER}"]`,
          );

          directions.map(async (_d, idx) => {
            await paneEls[idx].trigger("pointerdown", {
              clientX: 1,
              clientY: 1,
            });
          });

          const ev = wrapper.emitted(Emits.DRAG_START) as PaneEmittedData[][];

          let _directions = [];
          for (const direction of directions) _directions.push(direction);

          expect(ev.length).toBe(directions.length);
          expect(_directions).toMatchObject(directions);
          expect(_directions).toMatchSnapshot();
        },
      );
    });
  });

  // describe("styles", () => {});

  // describe("options", () => {});
});
