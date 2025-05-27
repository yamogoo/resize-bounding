import { mount, type VueWrapper } from "@vue/test-utils";
import DocumentationLink from "./DocumentationLink.vue";

const getBaseLink = <T>(wrapper: VueWrapper<T>) => {
  return wrapper.findComponent({ name: "BaseLink" });
};

describe("DocumentationLink", () => {
  describe("elements", () => {
    test("should render BaseLink component", async () => {
      const wrapper = mount(DocumentationLink);

      await vi.dynamicImportSettled();

      const baseLink = getBaseLink(wrapper);
      const isBaseLinkExists = baseLink.exists();

      expect(isBaseLinkExists).toBeTruthy();
    });
  });
});
