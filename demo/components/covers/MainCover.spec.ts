import { nextTick } from "vue";
import { mount, VueWrapper } from "@vue/test-utils";

import MainCover, { type Props } from "./MainCover.vue";

const REQUIRED_PROPS: Props = {
  title: "",
  description: "",
  vueVersion: "",
  reactVersion: "",
};

const getFooter = <T>(wrapper: VueWrapper<T>) => {
  return wrapper.find('[data-testid="ui-main-cover-footer"]');
};

describe("MainCover", () => {
  describe("elements", () => {
    test("should render footer element", async () => {
      const wrapper = mount(MainCover, {
        props: { ...REQUIRED_PROPS },
      });

      await nextTick();

      const footer = getFooter(wrapper);
      const isFoorerExists = footer.exists();

      expect(isFoorerExists).toBeTruthy();
      expect(isFoorerExists).toMatchInlineSnapshot(`true`);
    });
  });
});
