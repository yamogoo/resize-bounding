import { nextTick } from "vue";
import { mount } from "@vue/test-utils";

import Code from "./Code.vue";

const CODE_VAlUE = `
const a = 2;
const b = 3;
const c = a+b;
`;

describe("Code", () => {
  describe("elements", () => {
    test("should render code", async () => {
      const wrapper = mount(Code, {
        props: {
          code: CODE_VAlUE,
        },
      });

      await nextTick();

      const code = wrapper.find("code");
      const codeLength = code.findAll("span").length;

      expect(codeLength).toBeGreaterThan(0);
    });

    test("should render CopyButton", async () => {
      const wrapper = mount(Code, {
        props: {
          code: CODE_VAlUE,
        },
      });

      await nextTick();

      const button = wrapper.find(".ui-copy-button");
      const isButtonExists = button.exists();

      expect(isButtonExists).toBeTruthy();
      expect(isButtonExists).toMatchInlineSnapshot(`true`);
    });
  });
});
