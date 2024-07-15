import { test, expect, describe, beforeEach, afterEach, vi } from "vitest";
import {
  cleanup,
  createEvent,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import React, { CSSProperties } from "react";

import { DataTestIds, PREFIX } from "./setup";
import { PaneDirectionAliases, PaneDirections } from "../../lib/shared/typings";

import ResizeBounding from "../../lib/components/ResizeBounding";
import { type PaneEmittedData } from "../../lib/components/ResizeBoundingPane";

afterEach(() => {
  cleanup();
});

const emits = {
  dragStart: vi.fn(),
  dragMove: vi.fn(),
  dragEnd: vi.fn(),
  focus: vi.fn(),
};

describe("ResizeBounding", () => {
  beforeEach(() => {
    Element.prototype.setPointerCapture = vi.fn();
    Element.prototype.releasePointerCapture = vi.fn();
  });

  afterEach(() => {
    cleanup();
  });

  describe("components", () => {
    test.each([
      ...Object.values(PaneDirections),
      ...Object.values(PaneDirectionAliases),
    ])(
      `Should not display any selected borders when set to "disabled" (--%s)`,
      async (direction) => {
        const { container } = render(
          <ResizeBounding directions={direction} disabled={true} />,
        );

        const paneEl = container.querySelectorAll(
          `[data-testid="${DataTestIds.PANE}"]`,
        );

        expect(paneEl.length).toBe(0);
        expect(paneEl.length).toMatchSnapshot();
      },
    );

    test.each(["rl", "ltrb", "bltr", "bl", "tr"])(
      "should render %s panes (panes computed value)",
      (directions) => {
        const { container } = render(
          <ResizeBounding directions={directions} />,
        );

        const panEls = container.querySelectorAll(
          `[data-testid="${DataTestIds.PANE}"]`,
        );
        expect(panEls.length).toBe(directions.length);
        expect(panEls.length).toMatchSnapshot();
      },
    );

    test.each(["sd", "wo", ""])(
      "should not render any pane element",
      (directions) => {
        const { container } = render(
          <ResizeBounding directions={directions} />,
        );

        const panEls = container.querySelectorAll(
          `[data-testid="${DataTestIds.PANE}"]`,
        );
        expect(panEls.length).toBe(0);
        expect(panEls.length).toMatchSnapshot();
      },
    );
  });

  describe("slots", () => {
    const SLOT_CONTENT = "Inner Container";

    test.each([<p>{SLOT_CONTENT}</p>])(
      `should render default slot "${SLOT_CONTENT}"`,
      (slot) => {
        render(<ResizeBounding directions="">{slot}</ResizeBounding>);

        const slotText = screen.getByTestId(DataTestIds.ROOT).textContent;
        expect(slotText).toContain(SLOT_CONTENT);
        expect(slotText).toMatchSnapshot();
      },
    );

    test.each([<p>knob</p>])("should render default slot", (slot) => {
      const { container } = render(
        <ResizeBounding
          directions="r"
          options={{
            knob: {
              show: true,
            },
          }}
          knob={slot}
        />,
      );

      const text = container.querySelector(
        `[data-testid="${DataTestIds.KNOB}"]`,
      )?.textContent;

      expect(text).toBe("knob");
      expect(text).toMatchSnapshot();
    });
  });

  describe("classes", () => {
    describe("prefix", () => {
      test.each(["my-prefix"])("should have custom prefix (%s)", (prefix) => {
        render(<ResizeBounding options={{ prefix }} />);

        const rootEl = screen.getByTestId(DataTestIds.ROOT);
        const classes = rootEl.classList;

        expect(classes.toString()).toContain(prefix);
        expect(classes).toMatchSnapshot();
      });

      test("should have default prefix (%s)", () => {
        render(<ResizeBounding />);

        const rootEl = screen.getByTestId(DataTestIds.ROOT);
        const classes = rootEl.classList;

        expect(classes.toString()).toContain(PREFIX);
        expect(classes).toMatchSnapshot();
      });
    });
  });

  describe("events", () => {
    describe("drag", () => {
      test.each(Object.values(PaneDirections))(
        `should emit the "dragStart -> dragMove -> dragEnd" event, which takes a direction argument "%s"`,
        async (direction) => {
          const props = { ...emits, directions: direction };

          const checkEvent = async (
            node: HTMLElement,
            eventName: string,
            eventData: { clientX: number; clientY: number },
            callback: (data: PaneEmittedData) => void,
          ) => {
            const ev = createEvent[eventName](node, eventData);
            fireEvent(node, ev);

            expect(callback).toHaveBeenCalledWith(direction);
          };

          render(<ResizeBounding {...props} />);
          const paneEl = screen.getByTestId(DataTestIds.SPLITTER);

          checkEvent(
            paneEl,
            "pointerDown",
            { clientX: 1, clientY: 1 },
            props.dragStart,
          );

          checkEvent(
            paneEl,
            "pointerMove",
            { clientX: 2, clientY: 2 },
            props.dragMove,
          );

          const callback = checkEvent(
            paneEl,
            "pointerUp",
            { clientX: 3, clientY: 3 },
            props.dragEnd,
          );

          expect(callback).toMatchSnapshot();
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
        `check aliases: should emit "dragStart" with direction argument "%o"`,
        ({ alias, directions }) => {
          const props = { directions: alias, ...emits };
          render(<ResizeBounding {...props} />);

          directions.map((_d, idx) => {
            const paneEls = screen.getAllByTestId(DataTestIds.SPLITTER);
            const pos = { x: 1, y: 1 };

            fireEvent.pointerDown(paneEls[idx], {
              clientX: pos.x,
              clientY: pos.y,
            });

            expect(props.dragStart).toHaveBeenCalledWith(_d);
          });
        },
      );
    });
  });

  describe("styles", () => {
    describe("container", () => {
      test.each([{ background: "blue", display: "flex" }])(
        "should apply inline styles (%s)",
        (containerStyles: CSSProperties) => {
          render(<ResizeBounding style={containerStyles} />);

          const containerEl = screen.getByTestId(DataTestIds.ROOT);

          const styles = containerEl.getAttribute("style");

          expect(styles).toContain("display: flex");
          expect(styles).toContain("background: blue");
          expect(styles).toMatchSnapshot();
        },
      );
    });
  });
});
