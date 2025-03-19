import { mount } from "@vue/test-utils";

import MainLogo from "./MainLogo.vue";

describe("MainLogo", () => {
  describe("elements", () => {
    test("should render descriptor value", () => {
      const expectedDescriptorValue = "Some Value";

      const wrapper = mount(MainLogo, {
        props: {
          descriptor: expectedDescriptorValue,
        },
      });

      const descriptor = wrapper.find(".main-logo__descriptor");
      const descriptorValue = descriptor.text();

      expect(descriptorValue).toBe(expectedDescriptorValue);
      expect(descriptorValue).toMatchInlineSnapshot(`"Some Value"`);
    });
  });
});
