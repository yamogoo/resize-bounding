import React from "react";
import { test, expect, describe, afterEach } from "vitest";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import StoryPropField from "./StoryPropField";

const getName = (container: HTMLElement) => {
  return container.querySelectorAll(".prop-field__name");
};

const getValue = (container: HTMLElement) => {
  return container.querySelectorAll(".prop-field__value");
};

const getDescription = (container: HTMLElement) => {
  return container.querySelectorAll(".prop-field__description");
};

const getSeparator = (container: HTMLElement) => {
  return container.querySelectorAll(".prop-field__separator");
};

afterEach(() => {
  cleanup();
});

describe("StoryPropField", () => {
  describe("elements", () => {
    test("should render name", () => {
      const expectedNameValue = "Some Name";

      const { container } = render(<StoryPropField name={expectedNameValue} />);

      const name = getName(container);
      const isNameExists = name.length !== 0;

      expect(isNameExists).toBeTruthy();
      expect(isNameExists).toMatchInlineSnapshot(`true`);
    });

    test("should render value", () => {
      const expectedValueValue = "Some Value";

      const { container } = render(
        <StoryPropField value={expectedValueValue} />
      );

      const value = getValue(container);
      const isValueExists = value.length !== 0;

      expect(isValueExists).toBeTruthy();
      expect(isValueExists).toMatchInlineSnapshot(`true`);
    });

    test("should render description", () => {
      const expectedDescriptionValue = "Some Description";

      const { container } = render(
        <StoryPropField description={expectedDescriptionValue} />
      );

      const description = getDescription(container);
      const isDescriptionExists = description.length !== 0;

      expect(isDescriptionExists).toBeTruthy();
      expect(isDescriptionExists).toMatchInlineSnapshot(`true`);
    });

    test("should not render separator", () => {
      const expectedSeparatorValue = "Some Separator";

      const { container } = render(
        <StoryPropField separator={expectedSeparatorValue} />
      );

      const separator = getSeparator(container);
      const isSeparatorExists = separator.length !== 0;

      expect(isSeparatorExists).toBeFalsy();
      expect(isSeparatorExists).toMatchInlineSnapshot(`false`);
    });

    test("should render separator", () => {
      const expectedNameValue = "Some Name";
      const expectedDescriptionValue = "Some Description";
      const expectedSeparatorValue = "Some Separator";

      const { container } = render(
        <StoryPropField
          name={expectedNameValue}
          value={expectedDescriptionValue}
          separator={expectedSeparatorValue}
        />
      );

      const separator = getSeparator(container);
      const isSeparatorExists = separator.length !== 0;

      expect(isSeparatorExists).toBeTruthy();
      expect(isSeparatorExists).toMatchInlineSnapshot(`true`);
    });
  });
});
