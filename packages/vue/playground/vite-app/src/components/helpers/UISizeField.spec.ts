import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import UISizeField from "./UISizeField.vue";

describe("UISizeField", () => {
  describe("selements", () => {
    test("should render 2 input fileds", () => {
      const wrapper = mount(UISizeField);

      const root = wrapper.find(".ui-size-field");
      const inputs = root.element.children;
      const inputsLength = inputs.length;

      expect(inputsLength).toBe(2);
      expect(inputsLength).toMatchInlineSnapshot(`2`);
    });
  });

  describe("events", () => {
    test("should emti update:width event", async () => {
      const wrapper = mount(UISizeField, {
        props: {
          width: 1,
          height: 1,
        },
      });

      const inputEl = wrapper.find('[data-testid="input-width"]');
      const input = inputEl.find("input");

      input.element.value = "200";
      input.trigger("change");

      const emitedEvent = wrapper.emitted("update:width");
      expect(emitedEvent).toMatchInlineSnapshot(`
        [
          [
            200,
          ],
        ]
      `);
    });

    test("should emti update:height event", async () => {
      const wrapper = mount(UISizeField, {
        props: {
          width: 1,
          height: 1,
        },
      });

      const inputEl = wrapper.find('[data-testid="input-height"]');
      const input = inputEl.find("input");

      input.element.value = "200";
      input.trigger("change");

      const emitedEvent = wrapper.emitted("update:height");
      expect(emitedEvent).toMatchInlineSnapshot(`
          [
            [
              200,
            ],
          ]
        `);
    });
  });
});
