import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import SizeField from "./SizeField.vue";

describe("SizeField", () => {
  describe("elements", () => {
    test("should render width and hight values", () => {
      const wrapper = mount(SizeField, {
        props: {
          width: 200,
          height: 300,
        },
      });

      const values = wrapper.findAll(".ui-size-field__value");
      const width = values[0].text();
      const height = values[1].text();

      expect(width).toBe("200px");
      expect(height).toBe("300px");
    });
  });
});
