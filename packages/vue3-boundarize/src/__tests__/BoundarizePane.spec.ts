import { describe, test, expect, beforeEach, vi } from "vitest";
import { shallowMount, VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";

import { DataTestIds, DEFAULT_PREFIX } from "./setup";

import deepmerge from "deepmerge";

import BoundarizePane, {
  Emits,
  PaneDirectionAliases,
  PaneDirections,
  paneBaseStyles,
  splitterBaseStyles,
  type PaneEmittedData,
  type Props,
} from "../components/BoundarizePane.vue";
import { BBResize } from "../shared/typings";

import { defaultOptions, defaultStyles } from "../components/Boundarize.vue";
// import { deepmerge } from "../utils";

const requiredProps = {
  styles: defaultStyles.pane,
  options: defaultOptions.pane,
};

describe("Boundarize", () => {
  beforeEach(() => {
    Element.prototype.setPointerCapture = vi.fn();
    Element.prototype.releasePointerCapture = vi.fn();
  });

  describe("classes", () => {
    test.each(["my-prefix"])(
      "each element should have custom prefix (%s)",
      (prefix) => {
        const wrapper = shallowMount(BoundarizePane, {
          props: {
            prefix,
            ...requiredProps,
          },
        });

        const paneEl = wrapper.find(`[data-testid="${DataTestIds.PANE}"]`);
        const splitterEl = wrapper.find(
          `[data-testid="${DataTestIds.SPLITTER}"]`,
        );

        expect(paneEl.classes().toString()).toContain(prefix);
        expect(splitterEl.classes().toString()).toContain(prefix);

        expect(paneEl.classes()).toMatchSnapshot();
        expect(paneEl.classes()).toMatchSnapshot();
      },
    );

    test('should have "hide class by default"', () => {
      const wrapper = shallowMount(BoundarizePane, {
        props: {
          prefix: DEFAULT_PREFIX,
          ...requiredProps,
        },
      });

      const splitterEl = wrapper.find(`[data-testid="${DataTestIds.PANE}"]`);

      expect(splitterEl.classes("hide")).toBeTruthy();
      expect(splitterEl.classes("hide")).toMatchSnapshot();
    });
  });

  describe("classes", () => {
    test('should have "show class"', async () => {
      const wrapper = shallowMount(BoundarizePane, {
        props: {
          prefix: DEFAULT_PREFIX,
          ...requiredProps,
        },
      });

      const paneEl = wrapper.find(`[data-testid="${DataTestIds.PANE}"]`);
      const splitterEl = wrapper.find(
        `[data-testid="${DataTestIds.SPLITTER}"]`,
      );

      await splitterEl.trigger("pointerenter");

      expect(paneEl.classes("show")).toBeTruthy();
      expect(paneEl.classes("show")).toMatchSnapshot();
    });
  });

  describe("events", () => {
    describe("focus", async () => {
      const wrapper = shallowMount(BoundarizePane, {
        props: {
          prefix: DEFAULT_PREFIX,
          direction: PaneDirections.RIGHT,
          ...requiredProps,
        },
      });

      const rootEl = wrapper.find(`[data-testid="${DataTestIds.SPLITTER}"]`);

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
      const wrapper = shallowMount(BoundarizePane, {
        props: {
          prefix: DEFAULT_PREFIX,
          direction: PaneDirections.RIGHT,
          ...requiredProps,
        },
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

  describe("options", () => {
    describe("knob", () => {
      test("should always show knob", () => {
        const wrapper = shallowMount(BoundarizePane, {
          props: {
            prefix: DEFAULT_PREFIX,
            styles: defaultStyles.pane,
            options: deepmerge(defaultOptions.pane, {
              knob: {
                show: true,
                constantlyShow: true,
              },
            }),
          },
        });

        const knobEl = wrapper.find(`[data-testid="${DataTestIds.KNOB}"]`);

        expect(knobEl.exists()).toBeTruthy();
        expect(knobEl.attributes("data-testid")).toMatchSnapshot();
      });

      test.each([
        [PaneDirections.LEFT, 90],
        [PaneDirections.RIGHT, 90],
        [PaneDirections.TOP, 0],
        [PaneDirections.BOTTOM, 0],
      ])("pane (--%s) should rotated to (%s deg)", (direction, deg) => {
        const wrapper = shallowMount(BoundarizePane, {
          props: {
            prefix: DEFAULT_PREFIX,
            direction,
            styles: defaultStyles.pane,
            options: deepmerge(defaultOptions.pane, {
              knob: {
                show: true,
                constantlyShow: true,
              },
            }),
          },
        });

        const knobEl = wrapper.find(`[data-testid="${DataTestIds.KNOB}"]`);
        const styles = knobEl.attributes("style");

        expect(styles).toContain(`(${deg}deg)`);
        expect(styles).toMatchSnapshot();
      });
    });
  });

  describe("styles", () => {
    describe("cursor", () => {
      test('default cursor style should be "auto"', async () => {
        const wrapper = shallowMount(BoundarizePane, {
          props: {
            prefix: DEFAULT_PREFIX,
            ...requiredProps,
          },
        });
        await wrapper.setProps({
          direction: PaneDirections.RIGHT,
          prefix: DEFAULT_PREFIX,
        });

        const rootEl = wrapper.find(`[data-testid="${DataTestIds.SPLITTER}"]`);

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

        const rootEl = wrapper.find(`[data-testid="${DataTestIds.SPLITTER}"]`);
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
              const wrapper = shallowMount(BoundarizePane, {
                props: {
                  prefix: DEFAULT_PREFIX,
                  ...requiredProps,
                },
              });

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
              const wrapper = shallowMount(BoundarizePane, {
                props: {
                  prefix: DEFAULT_PREFIX,
                  ...requiredProps,
                },
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
              const wrapper = shallowMount(BoundarizePane, {
                props: {
                  prefix: DEFAULT_PREFIX,
                  ...requiredProps,
                },
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
                    position: "",
                    showBorder: false,
                    knob: undefined,
                  },
                },
                CUSTOM_ACTIVE_CURSOR,
              );
            },
          );

          const SIZE = 12;
          const paneMap = paneBaseStyles(SIZE);
          const splitterMap = splitterBaseStyles(
            SIZE,
            BBResize.SplitterPositions.CENTER,
          );

          test.each([
            [PaneDirections.LEFT, paneMap.l],
            [PaneDirections.RIGHT, paneMap.r],
            [PaneDirections.TOP, paneMap.t],
            [PaneDirections.BOTTOM, paneMap.b],
          ])(
            `the pane (--%s) should have "%s" styles`,
            async (direction, styles) => {
              const wrapper = shallowMount(BoundarizePane, {
                props: {
                  prefix: DEFAULT_PREFIX,
                  direction,
                  styles: defaultStyles.pane,
                  options: { ...defaultOptions.pane, width: SIZE },
                },
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
              const wrapper = shallowMount(BoundarizePane, {
                props: {
                  prefix: DEFAULT_PREFIX,
                  direction,
                  styles: defaultStyles.pane,
                  options: { ...defaultOptions.pane, width: SIZE },
                },
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

    describe("custom styles", () => {
      test('should apply custom styles for "pane", "splitter" and "knob" elements', async () => {
        const wrapper = shallowMount(BoundarizePane, {
          props: {
            prefix: DEFAULT_PREFIX,
            options: {
              ...defaultOptions.pane,
              knob: {
                show: true,
                constantlyShow: true,
              },
            },
            styles: deepmerge(defaultStyles.pane, {
              class: "pane",
              style: { border: "1px solid" },
              splitter: {
                class: "splitter",
                style: { background: "yellow" },
                focused: {},
                pressed: {},
              },
              knob: {
                class: "knob",
                style: { width: "320px", background: "pink" },
                focused: {},
                pressed: {},
              },
            }),
          },
        });

        const splitterEl = wrapper.find(
          `[data-testid="${DataTestIds.SPLITTER}"]`,
        );

        await splitterEl.trigger("pointerenter");
        const splitterStyles = splitterEl.attributes("style");

        const paneEl = wrapper.find(`[data-testid="${DataTestIds.PANE}"]`);
        const paneStyles = paneEl.attributes("style");

        const knobEl = wrapper.find(`[data-testid="${DataTestIds.KNOB}"]`);
        const knobStyles = knobEl.attributes("style");

        expect(paneStyles).toContain("border: 1px solid");
        // expect(splitterStyles).toContain("background: yellow"); // @!FIX
        expect(knobStyles).toContain("width: 320px");
        // expect(knobStyles).toContain("background: pink"); // @!FIX
      });

      test.each([
        [{ left: "70px", right: "70px", width: "70px" }, PaneDirections.RIGHT],
      ])(
        "inner styles of splitter should not have to overrided by customStyles",
        async (customStyles, direction) => {
          const SPLITTER_WIDTH = 12;

          const styles = splitterBaseStyles(
            SPLITTER_WIDTH,
            BBResize.SplitterPositions.CENTER,
          )[direction];

          const wrapper = shallowMount(BoundarizePane, {
            props: {
              prefix: DEFAULT_PREFIX,
              direction,
              styles: deepmerge(defaultStyles.pane, {
                splitter: {
                  style: customStyles,
                },
              }),
              options: { ...defaultOptions.pane, width: SPLITTER_WIDTH },
            },
          });

          const splitterEl = wrapper.find(
            `[data-testid="${DataTestIds.SPLITTER}"]`,
          );

          await splitterEl.trigger("pointerenter");
          const splitterStyles = splitterEl.attributes("style");

          if (styles && splitterStyles) {
            for (const [k, v] of Object.entries(styles)) {
              const value = `${k}: ${v.toString()}`.trim();
              const trimedStyles = splitterStyles.toString().trim();

              expect(trimedStyles).toContain(value);
              expect(value).toMatchSnapshot();
              expect(trimedStyles).toMatchSnapshot();
            }
            expect(splitterStyles).toMatchSnapshot();
          }
        },
      );
    });
  });
});
