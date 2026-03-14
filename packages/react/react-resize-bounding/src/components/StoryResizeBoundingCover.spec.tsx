import React from "react";
import { test, expect, describe, afterEach } from "vitest";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import StoryResizeBoundingCover from "./StoryResizeBoundingCover";

const VERSION = import.meta.env.APP_VERSION;

const getLogo = (container: HTMLElement) => {
  return container.querySelectorAll(
    '[data-testid="resize-bounding-cover__logo"]'
  );
};

const getBadge = (container: HTMLElement) => {
  return container.querySelectorAll(
    '[data-testid="resize-bounding-cover__badge"]'
  );
};

afterEach(() => {
  cleanup();
});

describe("StoryResizeBoundingCover", () => {
  describe("elements", () => {
    test("should render StoryCoverMainLogo component", () => {
      const { container } = render(
        <StoryResizeBoundingCover></StoryResizeBoundingCover>
      );

      const logo = getLogo(container);
      const isLogoExists = logo.length !== 0;

      expect(isLogoExists).toBeTruthy();
      expect(isLogoExists).toMatchInlineSnapshot(`true`);
    });

    test("should render StoryVersionBadge component", () => {
      const { container } = render(
        <StoryResizeBoundingCover></StoryResizeBoundingCover>
      );

      const badge = getBadge(container);
      const isBadgeExists = badge.length !== 0;

      expect(isBadgeExists).toBeTruthy();
      expect(isBadgeExists).toMatchInlineSnapshot(`true`);
    });

    test("StoryVersionBadge should render current version value", () => {
      const { container } = render(
        <StoryResizeBoundingCover></StoryResizeBoundingCover>
      );

      const badge = getBadge(container);
      const badgeValue =
        badge[0].querySelector(".ui-badge__value")?.textContent;

      expect(badgeValue).toBe(VERSION);
      expect(badgeValue).toMatchInlineSnapshot(`"1.1.3"`);
    });
  });
});
