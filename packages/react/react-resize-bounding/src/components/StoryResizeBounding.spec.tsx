import React from "react";
import { test, expect, describe, afterEach } from "vitest";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import StoryResizeBounding from "./StoryResizeBounding";

const getResizeBounding = (container: HTMLElement) => {
  return container.querySelector('[data-testid="resize-bounding-container"]');
};

afterEach(() => {
  cleanup();
});

describe("StoryResizeBounding", () => {
  describe("elements", () => {
    test("should render ResizeBounding component", () => {
      const { container } = render(<StoryResizeBounding></StoryResizeBounding>);

      const resizeBounding = getResizeBounding(container);
      const isResizeBoundingExists = Boolean(resizeBounding);

      expect(isResizeBoundingExists).toBeTruthy();
      expect(isResizeBoundingExists).toMatchInlineSnapshot(`true`);
    });
  });
});
