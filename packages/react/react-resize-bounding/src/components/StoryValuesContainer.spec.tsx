import React from "react";
import { test, expect, describe, afterEach } from "vitest";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import StoryValuesContainer from "./StoryValuesContainer";

afterEach(() => {
  cleanup();
});

describe("StoryValuesContainer", () => {
  describe("slots", () => {
    const SLOT_CONTENT = "Some Content";

    test.each([<p>{SLOT_CONTENT}</p>])(
      `should render default slot "${SLOT_CONTENT}"`,
      (slot) => {
        const { container } = render(
          <StoryValuesContainer>{slot}</StoryValuesContainer>
        );

        const slotEl = container.querySelector(".story-values-container");

        if (slotEl) {
          const slotContent = slotEl.textContent;

          expect(slotContent).toContain(SLOT_CONTENT);
          expect(slotContent).toMatchSnapshot();
        }
      }
    );
  });
});
