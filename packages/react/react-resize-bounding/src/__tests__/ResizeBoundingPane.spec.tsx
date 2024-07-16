import { test, expect, describe, beforeEach, afterEach, vi } from "vitest";
import {
  createEvent,
  fireEvent,
  render,
  screen,
  cleanup,
} from "@testing-library/react";
import deepmerge from "deepmerge";
import "@testing-library/jest-dom";

import React from "react";

import { DataTestIds, PREFIX } from "./setup";
import { PaneDirectionAliases, PaneDirections } from "../../lib/shared/typings";

import ResizeBoundingPane, {
  PaneEmittedData,
  type Props,
} from "../../lib/components/ResizeBoundingPane";

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
  direction: "r",
  options: defaultOptions,
  classNames,
  dragStart: vi.fn(),
  dragMove: vi.fn(),
  dragEnd: vi.fn(),
  focus: vi.fn(),
};

const getClassName = (el: Element, name: string): string | undefined => {
  return Object.values(el.classList).find((className) => className === name);
};

describe("ResizeBoundingPane", () => {
  beforeEach(() => {
    Element.prototype.setPointerCapture = vi.fn();
    Element.prototype.releasePointerCapture = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    cleanup();
  });

  describe("classes", () => {
    describe("states", () => {
      test(`should have ".active" class name`, async () => {
        const props: Props = requiredProps;
        render(<ResizeBoundingPane {...props} />);

        const paneEl = screen.getByTestId(DataTestIds.PANE);
        const stateInit = getClassName(paneEl, "active");

        expect(!!stateInit).toBe(false);

        const ev = createEvent.pointerEnter(paneEl);
        fireEvent(paneEl, ev);

        const state = getClassName(paneEl, "active");

        expect(!!state).toBe(true);
        expect(state).toMatchSnapshot();
      });

      test('should not have ".normal" class name by default', () => {
        const props: Props = requiredProps;
        render(<ResizeBoundingPane {...props} />);
        const splitterEl = screen.getByTestId(DataTestIds.PANE);

        const className = getClassName(splitterEl, "normal");

        expect(!!className).toBeFalsy();
        expect(className).toMatchSnapshot();
      });

      const props: Props = deepmerge(requiredProps, {
        options: {
          addStateClasses: true,
        },
      });

      test('should have ".normal" class name by default (if addStateClasses)', () => {
        render(<ResizeBoundingPane {...props} />);
        const splitterEl = screen.getByTestId(DataTestIds.PANE);

        const className = getClassName(splitterEl, "normal");

        expect(!!className).toBeTruthy();
        expect(className).toMatchSnapshot();
      });

      test('should have ".focused" class name (if addStateClasses)', async () => {
        render(<ResizeBoundingPane {...props} />);
        const paneEl = screen.getByTestId(DataTestIds.PANE);

        const ev = createEvent.pointerEnter(paneEl);
        fireEvent(paneEl, ev);

        const className = getClassName(paneEl, "focused");

        expect(!!className).toBeTruthy();
        expect(className).toMatchSnapshot();
      });

      test('should have ".pressed" class name (if addStateClasses)', async () => {
        render(<ResizeBoundingPane {...props} />);
        const paneEl = screen.getByTestId(DataTestIds.PANE);

        const ev = createEvent.pointerDown(paneEl);
        fireEvent(paneEl, ev);

        const className = getClassName(paneEl, "pressed");

        expect(!!className).toBeTruthy();
        expect(className).toMatchSnapshot();
      });
    });
  });

  describe("events", () => {
    describe("focus", async () => {
      test(`should emit "focus" event with state (true)`, async () => {
        const props: Props = deepmerge(requiredProps, {
          direction: PaneDirections.RIGHT,
        });

        render(<ResizeBoundingPane {...props} />);
        const rootEl = screen.getByTestId(DataTestIds.PANE);

        const ev = createEvent.pointerEnter(rootEl);
        fireEvent(rootEl, ev);

        expect(props.focus).toHaveBeenCalled();
        expect(props.focus).toHaveBeenCalledWith(true);
        expect(props.focus).toMatchSnapshot();
      });

      test(`should emit "focus" with state (false)`, async () => {
        const props: Props = deepmerge(requiredProps, {
          direction: PaneDirections.RIGHT,
        });

        render(<ResizeBoundingPane {...props} />);

        const rootEl = screen.getByTestId(DataTestIds.PANE);

        const ev = createEvent.pointerLeave(rootEl);
        fireEvent(rootEl, ev);

        expect(props.focus).toHaveBeenCalled();
        expect(props.focus).toHaveBeenCalledWith(false);
        expect(props.focus).toMatchSnapshot();
      });
    });

    describe("drag", () => {
      const checkEvent = async (
        node: HTMLElement,
        eventName: string,
        eventData: { clientX: number; clientY: number },
        callback: (data: PaneEmittedData) => void,
      ) => {
        const ev = createEvent[eventName](node, eventData);
        fireEvent(node, ev);

        const x = eventData.clientX,
          y = eventData.clientY;

        expect(callback).toHaveBeenCalledWith({ dir: "r", x, y });
        expect(callback).toMatchSnapshot();
      };

      test(`should emit "dragStart -> dragMove -> dragEnd" with {x, y, dir}`, async () => {
        const props = deepmerge(requiredProps, {
          direction: PaneDirections.RIGHT,
        });

        render(<ResizeBoundingPane {...props} />, {});
        const rootEl = screen.getByTestId(DataTestIds.SPLITTER);

        checkEvent(
          rootEl,
          "pointerDown",
          { clientX: 1, clientY: 1 },
          props.dragStart,
        );

        checkEvent(
          rootEl,
          "pointerMove",
          { clientX: 2, clientY: 2 },
          props.dragMove,
        );

        checkEvent(
          rootEl,
          "pointerUp",
          { clientX: 3, clientY: 3 },
          props.dragEnd,
        );
      });
    });
  });

  describe("options", () => {
    describe("knob", () => {
      test("should always show knob", () => {
        const props = deepmerge(requiredProps, {
          options: {
            knob: {
              show: true,
            },
          },
        });

        render(<ResizeBoundingPane {...props} />);

        const knobEl = screen.getByTestId(DataTestIds.KNOB);

        expect(knobEl).toBeInTheDocument();
        expect(knobEl).toMatchSnapshot();
      });

      test("should not render the knob if { normalHidden: true }", () => {
        const props = deepmerge(requiredProps, {
          options: {
            knob: {
              show: true,
              normalHidden: true,
            },
          },
        });

        const { container } = render(<ResizeBoundingPane {...props} />);

        const knobEl = container.querySelector(
          `[data-testid="${DataTestIds.KNOB}"]`,
        );

        expect(knobEl).not.toBeInTheDocument();
        expect(knobEl).toMatchSnapshot();
      });

      test.each([
        [PaneDirections.LEFT, 90],
        [PaneDirections.RIGHT, 90],
        [PaneDirections.TOP, 0],
        [PaneDirections.BOTTOM, 0],
      ])("pane (--%s) should rotated to (%s deg)", (direction, deg) => {
        const props: Props = deepmerge(requiredProps, {
          direction,
          options: {
            knob: {
              show: true,
            },
          },
        });

        render(<ResizeBoundingPane {...props} />);

        const knobEl = screen.getByTestId(DataTestIds.SPLITTER_CONTAINER);
        const styles = knobEl.getAttribute("style");

        expect(styles).toContain(`(${deg}deg)`);
        expect(styles).toMatchSnapshot();
      });
    });
  });

  describe("styles", () => {
    describe("cursor", () => {
      test('default cursor style should be "auto"', async () => {
        const props: Props = deepmerge(requiredProps, {
          direction: PaneDirections.RIGHT,
        });

        render(<ResizeBoundingPane {...props} />);

        const rootEl = screen.getByTestId(DataTestIds.PANE);

        fireEvent.pointerEnter(rootEl);
        fireEvent.pointerLeave(rootEl);

        const cursorStyle = rootEl.getAttribute("style");

        expect(cursorStyle).toContain("auto");
        expect(cursorStyle).toMatchSnapshot();
      });

      const checkCursorActive = async (
        props: Props,
        comparedCursorStyle: string,
      ): Promise<void> => {
        render(<ResizeBoundingPane {...props} />);

        const rootEl = screen.getByTestId(DataTestIds.PANE);
        fireEvent.pointerEnter(rootEl);

        const cursorStyle = rootEl.getAttribute("style");

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
              const props = deepmerge(requiredProps, { direction });
              checkCursorActive(props, "col-resize");
            },
          );

          test.each([
            PaneDirectionAliases.VERTICAL,
            PaneDirections.TOP,
            PaneDirections.BOTTOM,
          ])(
            'default cursor style should be "row-resize" (--%s)',
            async (direction) => {
              const props = deepmerge(requiredProps, { direction });
              checkCursorActive(props, "row-resize");
            },
          );
        });

        describe("custom styles (options)", () => {
          const CUSTOM_ACTIVE_CURSOR = "ew-resize";

          test.each([...Object.values(PaneDirections)])(
            `custom cursor style should be "${CUSTOM_ACTIVE_CURSOR}" (--%s)`,
            async (direction) => {
              const props = deepmerge(requiredProps, {
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
              });

              checkCursorActive(props, CUSTOM_ACTIVE_CURSOR);
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
              const props = deepmerge(requiredProps, {
                direction,
                options: { width: SIZE },
              });

              render(<ResizeBoundingPane {...props} />);

              const paneEl = screen.getByTestId(DataTestIds.PANE);
              const style = paneEl.getAttribute("style");

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
              const props = deepmerge(requiredProps, {
                direction,
                options: { width: SIZE },
              });

              render(<ResizeBoundingPane {...props} />);

              const splitterEl = screen.getByTestId(DataTestIds.SPLITTER);
              const style = splitterEl.getAttribute("style");

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
      test.each([
        [{ left: "70px", right: "70px", width: "70px" }, PaneDirections.RIGHT],
      ])(
        "inner styles of splitter should not have to overrided by customStyles",
        async (_customStyles, direction) => {
          const SPLITTER_WIDTH = 12;

          const styles = splitterBaseStyles(SPLITTER_WIDTH, SPLITTER_WIDTH)[
            direction
          ];

          const props = deepmerge(requiredProps, {
            options: { width: SPLITTER_WIDTH },
          });

          render(<ResizeBoundingPane {...props} />);

          const splitterEl = screen.getByTestId(DataTestIds.SPLITTER);

          fireEvent.pointerEnter(splitterEl);
          const splitterStyles = splitterEl.getAttribute("style");

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

  describe("slots", () => {
    test.each([<p>knob</p>])(
      `should render knob slot (<p>knob</p>)`,
      (knobSlot) => {
        const props = deepmerge(requiredProps, {
          direction: "r",
          options: {
            knob: {
              show: true,
            },
          },
        });

        render(<ResizeBoundingPane {...props} children={knobSlot} />);

        const text = screen.getByTestId(DataTestIds.KNOB).textContent;
        expect(text).toBe("knob");
        expect(text).toMatchSnapshot();
      },
    );
  });
});
