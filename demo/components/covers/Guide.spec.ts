import { mount, VueWrapper } from "@vue/test-utils";
import { setMatchMedia } from "~/vitest.setup";

import Guide, { type LinkData, type Props } from "./Guide.vue";
import { createPinia, setActivePinia } from "pinia";

const getBoxedLink = <T>(wrapper: VueWrapper<T>) => {
  return wrapper.findAll(`[data-testid="boxed-link"]`);
};

const getFigmaLink = <T>(wrapper: VueWrapper<T>) => {
  return wrapper.find(`[data-testid="figma-link"]`);
};

const REQUIRED_PROPS: Props = {
  links: [],
};

const LINKS: Array<LinkData> = [
  {
    name: "Link 1",
    url: "https://example.com/link1",
  },
  {
    name: "Link 2",
    url: "https://example.com/link2",
  },
];

describe("Guide", () => {
  const pinia = createPinia();
  setActivePinia(pinia);

  beforeEach(() => {
    setMatchMedia();
  });

  describe("elements", () => {
    test("should render BoxedLink component(s)", () => {
      const wrapper = mount(Guide, {
        props: { ...REQUIRED_PROPS, links: LINKS },
      });

      const boxedLinks = getBoxedLink(wrapper);
      expect(boxedLinks[0].exists()).toBeTruthy();
      expect(boxedLinks.length).toBe(LINKS.length);
    });

    test("should render Figma link", () => {
      const wrapper = mount(Guide, {
        props: { ...REQUIRED_PROPS, links: LINKS },
      });

      const figmaLink = getFigmaLink(wrapper);
      expect(figmaLink.exists()).toBeTruthy();
    });
  });

  describe("slots", () => {
    test("should render controls slot (name)", async () => {
      const expectedSlotValue = "Slot Content";
      const expectedSlot = `<div class="slot">${expectedSlotValue}</div>`;

      const wrapper = mount(Guide, {
        slots: {
          controls: expectedSlot,
        },
      });

      await vi.dynamicImportSettled();

      const slot = wrapper.find(".slot");
      const isSlotExists = slot.exists();

      const slotValue = slot.text();

      expect(isSlotExists).toBeTruthy();
      expect(slotValue).toBe(expectedSlotValue);
      expect(slotValue).toMatchInlineSnapshot(`"Slot Content"`);
    });
  });
});
