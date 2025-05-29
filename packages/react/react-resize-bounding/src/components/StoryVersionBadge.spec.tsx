import React from "react";
import { test, expect, describe, afterEach } from "vitest";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import StoryVersionBadge from "./StoryVersionBadge";

const getLabel = (container: HTMLElement) => {
  return container.querySelectorAll('[data-testid="ui-badge-label"]');
};

const getValue = (container: HTMLElement) => {
  return container.querySelectorAll('[data-testid="ui-badge-value"]');
};

afterEach(() => {
  cleanup();
});

describe("StoryVersionBadge", () => {
  describe("values", () => {
    const expectedLabelValue = "Some Label";
    const expectedValue = "Some Value";

    test("should render label", () => {
      const { container } = render(
        <StoryVersionBadge label={expectedLabelValue} value={expectedValue} />
      );

      const label = getLabel(container);
      const isLabelExists = label.length !== 0;
      const labelValue = label[0].innerHTML;

      expect(isLabelExists).toBeTruthy();
      expect(labelValue).toBe(expectedLabelValue);
    });

    test("should render value", () => {
      const { container } = render(
        <StoryVersionBadge label={expectedLabelValue} value={expectedValue} />
      );

      const value = getValue(container);
      const isValueExists = value.length !== 0;
      const valueContent = value[0].innerHTML;

      expect(isValueExists).toBeTruthy();
      expect(valueContent).toBe(expectedValue);
    });
  });
});
