import { describe, test, expect } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";

import StoryResizeBoundingCover from "./StoryResizeBoundingCover.vue";

const getLogoComponent = <T>(wrapper: VueWrapper<T>) => {
  return wrapper.findComponent({ name: "StoryCoverMainLogo" });
};

describe("StoryResizeBoundingCover", () => {
  describe("elements", () => {
    test("should render StoryCoverMainLogo component", () => {
      const wrapper = mount(StoryResizeBoundingCover);

      const logo = getLogoComponent(wrapper);
      const isLogoExists = logo.exists();

      expect(isLogoExists).toBeTruthy();
    });

    test("should render StoryVersionBadge component", () => {
      const wrapper = mount(StoryResizeBoundingCover);

      const badge = getLogoComponent(wrapper);
      const isBadgeExists = badge.exists();

      expect(isBadgeExists).toBeTruthy();
    });
  });
});
