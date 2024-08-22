import { describe, test, expect, beforeEach, vi } from "vitest";
import { mount, shallowMount, VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";

import { DataTestIds, PREFIX } from "./setup";

import deepmerge from "deepmerge";

import ResizeBoundingPane, {
  Emits,
  type PaneEmittedData,
  type Props,
} from "../../lib/components/ResizeBoundingPane.vue";
import { PaneDirections } from "../../lib/shared/typings";

import {
  defaultOptions,
  getClassNames,
} from "../../lib/components/ResizeBounding.classNames";

import {
  paneBaseStyles,
  splitterBaseStyles,
} from "../../lib/components/ResizeBoundingPane.styles";

const classNames = getClassNames({});

const requiredProps: Props = {
  prefix: PREFIX,
  direction: PaneDirections.LEFT, //PaneDirectionAliases.HORIZONTAL,
  options: defaultOptions,
  classNames,
};

describe("ResizeBoundingPane", () => {
  beforeEach(() => {
    Element.prototype.setPointerCapture = vi.fn();
    Element.prototype.releasePointerCapture = vi.fn();
  });

  describe("classes", () => {
    describe("states", async () => {
      test(`should have ."active" class name`, async () => {
        const wrapper = shallowMount(ResizeBoundingPane, {
          props: requiredProps,
        });

        const paneEl = wrapper.find(`[data-testid="${DataTestIds.PANE}"]`);
        const stateInit = paneEl.classes("active");

        expect(stateInit).toBe(false);

        await paneEl.trigger("pointerenter");
        const state = paneEl.classes("active");

        expect(state).toBe(true);
        expect(state).toMatchSnapshot();
      });

      test('should not have ".normal" class name by default', async () => {
        const wrapper = shallowMount(ResizeBoundingPane, {
          props: requiredProps,
        });

        const splitterEl = wrapper.find(`[data-testid="${DataTestIds.PANE}"]`);

        expect(splitterEl.classes("normal")).toBeFalsy();
        expect(splitterEl.classes("normal")).toMatchSnapshot();
      });

      const props: Props = deepmerge(requiredProps, {
        options: { addStateClasses: true },
      });

      const wrapper = shallowMount(ResizeBoundingPane, { props });

      test('should have ".normal" class name by default (if addStateClasses)', () => {
        const splitterEl = wrapper.find(`[data-testid="${DataTestIds.PANE}"]`);

        expect(splitterEl.classes("normal")).toBeTruthy();
        expect(splitterEl.classes("normal")).toMatchSnapshot();
      });

      test('should have ".focused" class name (if addStateClasses)', async () => {
        const paneEl = wrapper.find(`[data-testid="${DataTestIds.PANE}"]`);

        await paneEl.trigger("pointerenter");

        expect(paneEl.classes("focused")).toBeTruthy();
        expect(paneEl.classes("focused")).toMatchSnapshot();
      });

      test('should have ".pressed" class name (if addStateClasses)', async () => {
        const paneEl = wrapper.find(`[data-testid="${DataTestIds.PANE}"]`);

        await paneEl.trigger("pointerdown");

        expect(paneEl.classes("pressed")).toBeTruthy();
        expect(paneEl.classes("pressed")).toMatchSnapshot();
      });
    });
  });

  describe("events", () => {
    describe("focus", async () => {
      const wrapper = shallowMount(ResizeBoundingPane, {
        props: deepmerge(requiredProps, { direction: PaneDirections.RIGHT }),
      });

      const rootEl = wrapper.find(`[data-testid="${DataTestIds.PANE}"]`);

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
      const wrapper = shallowMount(ResizeBoundingPane, {
        props: deepmerge(requiredProps, { direction: PaneDirections.RIGHT }),
      });

      const rootEl = wrapper.find(`[data-testid="${DataTestIds.SPLITTER}"]`);

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

        const events: PaneEmittedData[] = [];

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

  describe("options", () => {
    describe("knob", () => {
      test("should always show knob", () => {
        const props: Props = deepmerge(requiredProps, {
          options: { knob: { show: true } },
        });

        const wrapper = shallowMount(ResizeBoundingPane, { props });

        const knobEl = wrapper.find(`[data-testid="${DataTestIds.KNOB}"]`);

        expect(knobEl.exists()).toBeTruthy();
        expect(knobEl.attributes("data-testid")).toMatchSnapshot();
      });

      test("should not render the knob if { normalHidden: true }", () => {
        const wrapper = shallowMount(ResizeBoundingPane, {
          props: deepmerge(requiredProps, {
            options: { knob: { show: true, normalHidden: true } },
          }),
        });

        const knobEl = wrapper.find(`[data-testid="${DataTestIds.KNOB}"]`);
        const isKnobExists = knobEl.exists();

        expect(isKnobExists).toBeFalsy();
        expect(isKnobExists).toMatchSnapshot();
      });

      test.each([
        [PaneDirections.LEFT, 90],
        [PaneDirections.RIGHT, 90],
        [PaneDirections.TOP, 0],
        [PaneDirections.BOTTOM, 0],
      ])("pane (--%s) should rotated to (%s deg)", (direction, deg) => {
        const props: Props = deepmerge(requiredProps, {
          direction,
          options: { knob: { show: true } },
        });

        const wrapper = shallowMount(ResizeBoundingPane, { props });

        const knobEl = wrapper.find(
          `[data-testid="${DataTestIds.SPLITTER_CONTAINER}"]`,
        );
        const styles = knobEl.attributes("style");

        expect(styles).toContain(`(${deg}deg)`);
        expect(styles).toMatchSnapshot();
      });
    });
  });

  describe("styles", () => {
    describe("cursor", () => {
      test('default cursor style should be "auto"', async () => {
        const props: Props = requiredProps;

        const wrapper = shallowMount(ResizeBoundingPane, { props });
        await wrapper.setProps({ direction: PaneDirections.RIGHT });

        const rootEl = wrapper.find(`[data-testid="${DataTestIds.PANE}"]`);

        await rootEl.trigger("pointerenter");
        await rootEl.trigger("pointerleave");

        const cursorStyle = rootEl.attributes("style");

        expect(cursorStyle).toContain("auto");
        expect(cursorStyle).toMatchSnapshot();
      });

      const checkCursorActive = async (
        wrapper: VueWrapper,
        props: Partial<Props>,
        comparedCursorStyle: string,
      ): Promise<void> => {
        await wrapper.setProps(props);

        const rootEl = wrapper.find(`[data-testid="${DataTestIds.PANE}"]`);
        await rootEl.trigger("pointerenter");

        const cursorStyle = rootEl.attributes("style");

        expect(cursorStyle).toContain(comparedCursorStyle);
        expect(cursorStyle).toMatchSnapshot();
      };

      describe("active", () => {
        describe("default styles", () => {
          test.each([PaneDirections.RIGHT, PaneDirections.LEFT])(
            'default cursor style should be "col-resize" (--%s)',
            async (direction) => {
              const wrapper = shallowMount(ResizeBoundingPane, {
                props: requiredProps,
              });

              checkCursorActive(wrapper, { direction }, "col-resize");
            },
          );

          test.each([PaneDirections.TOP, PaneDirections.BOTTOM])(
            'default cursor style should be "row-resize" (--%s)',
            async (direction) => {
              const wrapper = shallowMount(ResizeBoundingPane, {
                props: requiredProps,
              });

              checkCursorActive(wrapper, { direction }, "row-resize");
            },
          );
        });

        describe("custom styles (options)", () => {
          const CUSTOM_ACTIVE_CURSOR = "ew-resize";

          test.each([...Object.values(PaneDirections)])(
            `custom cursor style should be "${CUSTOM_ACTIVE_CURSOR}" (--%s)`,
            async (direction) => {
              const wrapper = shallowMount(ResizeBoundingPane, {
                props: requiredProps,
              });

              checkCursorActive(
                wrapper,
                {
                  direction,
                  options: {
                    cursor: {
                      vertical: CUSTOM_ACTIVE_CURSOR,
                      horizontal: CUSTOM_ACTIVE_CURSOR,
                    },
                    width: 0,
                    position: "central",
                    knob: {},
                    prefix: "",
                    touchActions: false,
                  },
                },
                CUSTOM_ACTIVE_CURSOR,
              );
            },
          );

          const SIZE = 12;
          const paneMap = paneBaseStyles(SIZE, SIZE, "central");
          const splitterMap = splitterBaseStyles(SIZE, SIZE);

          test.each([
            [PaneDirections.LEFT, paneMap.l],
            [PaneDirections.RIGHT, paneMap.r],
            [PaneDirections.TOP, paneMap.t],
            [PaneDirections.BOTTOM, paneMap.b],
          ])(
            `the pane (--%s) should have "%s" styles`,
            async (direction, styles) => {
              const wrapper = shallowMount(ResizeBoundingPane, {
                props: deepmerge(requiredProps, {
                  direction,
                  options: { width: SIZE },
                }),
              });

              await nextTick();

              const paneEl = wrapper.find(
                `[data-testid="${DataTestIds.PANE}"]`,
              );
              const style = paneEl.attributes("style");

              if (styles) {
                for (const [k, v] of Object.entries(styles)) {
                  expect(style).toContain(`${k}: ${v}`);
                }

                expect(style).toMatchSnapshot();
              }
            },
          );

          test.each([
            [PaneDirections.LEFT, splitterMap.l],
            [PaneDirections.RIGHT, splitterMap.r],
            [PaneDirections.TOP, splitterMap.t],
            [PaneDirections.BOTTOM, splitterMap.b],
          ])(
            `the pane splitter (--%s) should have "%s" styles`,
            async (direction, styles) => {
              const wrapper = shallowMount(ResizeBoundingPane, {
                props: deepmerge(requiredProps, {
                  direction,
                  options: { width: SIZE },
                }),
              });

              await nextTick();

              const splitterEl = wrapper.find(
                `[data-testid="${DataTestIds.SPLITTER}"]`,
              );
              const style = splitterEl.attributes("style");

              if (styles) {
                for (const [k, v] of Object.entries(styles)) {
                  expect(style).toContain(`${k}: ${v}`);
                }

                expect(style).toMatchSnapshot();
              }
            },
          );
        });
      });
    });
  });

  describe("slots", () => {
    test.each(["<p>knob</p>"])("should render knob slot (%s)>", (knobSlot) => {
      const wrapper = mount(ResizeBoundingPane, {
        props: deepmerge(requiredProps, {
          direction: "r",
          options: {
            knob: {
              show: true,
            },
          },
        }),
        slots: {
          default: knobSlot,
        },
      });

      const text = wrapper.find(`[data-testid="${DataTestIds.KNOB}"]`).text();
      expect(text).toBe("knob");
      expect(text).toMatchSnapshot();
    });
  });
});
