import { shallowMount } from "@vue/test-utils";

import { getTypedEmittedEvent } from "@/utils/vitest";

import BoxedLink from "./BoxedLink.vue";

describe("BoxedLink", () => {
  describe("elements", () => {
    test("should render BaseLink", () => {
      const wrapper = shallowMount(BoxedLink, {
        props: {
          variant: "link",
        },
      });

      const link = wrapper.find('[data-testid="base-link"]');
      const isLinkExists = link.exists();

      expect(isLinkExists).toBeTruthy();
      expect(isLinkExists).toMatchInlineSnapshot(`true`);
    });

    test("should render CopyButton", () => {
      const wrapper = shallowMount(BoxedLink, {
        props: {
          variant: "link",
        },
      });

      const button = wrapper.find(".ui-boxed-link__icon");
      const isButtonExists = button.exists();

      expect(isButtonExists).toBeTruthy();
      expect(isButtonExists).toMatchInlineSnapshot(`true`);
    });
  });

  describe("events", () => {
    test("should emit 'copy' event", async () => {
      const wrapper = shallowMount(BoxedLink, {
        props: {
          variant: "link",
        },
      });

      await wrapper.trigger("click");

      const emmitedEvent = getTypedEmittedEvent(wrapper, "copy");

      expect(emmitedEvent.length).toBe(1);
    });
  });
});
