import { mount, VueWrapper } from "@vue/test-utils";
import { setMatchMedia } from "~/vitest.setup";

import Guide, { type LinkData, type Props } from "./Guide.vue";
import { createPinia, setActivePinia } from "pinia";

const getSwitchComponent = <T>(wrapper: VueWrapper<T>) => {
  return wrapper.findComponent({ name: "Switch" });
};

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
    test("should render Switch component", () => {
      const wrapper = mount(Guide, {
        props: { ...REQUIRED_PROPS },
      });

      const switchComponent = getSwitchComponent(wrapper);
      expect(switchComponent.exists()).toBeTruthy();
    });

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
});
