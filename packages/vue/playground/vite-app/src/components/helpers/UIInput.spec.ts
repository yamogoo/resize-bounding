import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import UIInput from "./UIInput.vue";

const label = "some label";

describe("UIInput", () => {
  describe("elements", () => {
    test("should render label", () => {
      const wrapper = mount(UIInput, {
        props: {
          label,
          disabled: false,
        },
      });

      const input = wrapper.find("input");
      const isInputExists = input.exists();

      expect(isInputExists).toBeTruthy();
      expect(isInputExists).toMatchInlineSnapshot(`true`);
    });

    test("should not render label and input by default", () => {
      const wrapper = mount(UIInput);

      const input = wrapper.find("input");
      const isInputExists = input.exists();

      expect(isInputExists).toBeFalsy();
      expect(isInputExists).toMatchInlineSnapshot(`false`);
    });

    test("should render label and not render input", () => {
      const wrapper = mount(UIInput, {
        props: {
          label,
          disabled: true,
        },
      });

      const labelEl = wrapper.find("label");
      const isLabelExists = labelEl.exists();

      expect(isLabelExists).toBeTruthy();
      expect(isLabelExists).toMatchInlineSnapshot(`true`);

      const input = wrapper.find("input");
      const isInputExists = input.exists();

      expect(isInputExists).toBeFalsy();
      expect(isInputExists).toMatchInlineSnapshot(`false`);
    });

    test("should render span DOM element with value '--'", () => {
      const wrapper = mount(UIInput, {
        props: {
          label,
          disabled: true,
        },
      });

      const span = wrapper.find("span");
      const isSpanExists = span.exists();

      const value = span.text();

      expect(isSpanExists).toBeTruthy();
      expect(value).toBe("--");
      expect(value).toMatchInlineSnapshot(`"--"`);
    });
  });

  describe("events", () => {
    test("should emti update:value event when input changed", async () => {
      const wrapper = mount(UIInput, {
        props: {
          label,
        },
      });

      const input = wrapper.find("input");

      input.element.value = "200";
      input.trigger("change");

      const emitedEvent = wrapper.emitted("update:value");
      expect(emitedEvent).toMatchInlineSnapshot(`
          [
            [
              200,
            ],
          ]
        `);
    });
  });

  describe("values", () => {
    test("input should change value when prop value changed", async () => {
      const wrapper = mount(UIInput, {
        props: {
          label,
          value: 12,
        },
      });

      const input = wrapper.find("input");

      await wrapper.setProps({ value: 20 });

      const value = input.element.value;

      expect(value).toBe("20");
      expect(value).toMatchInlineSnapshot(`"20"`);
    });
  });
});
