import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";

import { DataTestIds } from "./setup";

import Vue3BbResize from "../components/Vue3BbResize.vue";

describe("Vue3BbResize", () => {
  describe("components", () => {
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
          .find(`[data-testid="${DataTestIds.BB_RESIZE_CONTAINER}"]`)
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

  // describe("events", () => {});
});
