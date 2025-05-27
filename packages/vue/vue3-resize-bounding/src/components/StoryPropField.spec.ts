import { describe, test, expect } from "vitest";
import { shallowMount, VueWrapper } from "@vue/test-utils";

import StoryPropField from "./StoryPropField.vue";

const getDescription = <T>(wrapper: VueWrapper<T>) => {
  return wrapper.find(".prop-field__description");
};

const getName = <T>(wrapper: VueWrapper<T>) => {
  return wrapper.find(".prop-field__name");
};

const getSeparator = <T>(wrapper: VueWrapper<T>) => {
  return wrapper.find(".prop-field__separator");
};

const getValue = <T>(wrapper: VueWrapper<T>) => {
  return wrapper.find(".prop-field__value");
};

describe("StoryPropField", () => {
  describe("elements", () => {
    test("should render description", () => {
      const expectedDescriptionValue = "Some Description";
      const wrapper = shallowMount(StoryPropField, {
        props: {
          description: expectedDescriptionValue,
        },
      });

      const description = getDescription(wrapper);
      const isDescriptionExists = description.exists();
      const descriptionValue = description.text();

      expect(isDescriptionExists).toBeTruthy();
      expect(descriptionValue).toBe(expectedDescriptionValue);
      expect(descriptionValue).toMatchInlineSnapshot(`"Some Description"`);
    });

    test("should not render description", () => {
      const wrapper = shallowMount(StoryPropField);

      const description = getDescription(wrapper);
      const isDescriptionExists = description.exists();

      expect(isDescriptionExists).toBeFalsy();
    });

    test("should render name", () => {
      const expectedNameValue = "Some Name";
      const wrapper = shallowMount(StoryPropField, {
        props: {
          name: expectedNameValue,
        },
      });

      const name = getName(wrapper);
      const isNameExists = name.exists();
      const nameValue = name.text();

      expect(isNameExists).toBeTruthy();
      expect(nameValue).toBe(expectedNameValue);
      expect(nameValue).toMatchInlineSnapshot(`"Some Name"`);
    });

    test("should not render name", () => {
      const wrapper = shallowMount(StoryPropField);

      const name = getName(wrapper);
      const isNameExists = name.exists();

      expect(isNameExists).toBeFalsy();
    });

    test("should render separator", () => {
      const expectedSeparatorValue = "Some Separator";
      const wrapper = shallowMount(StoryPropField, {
        props: {
          separator: expectedSeparatorValue,
        },
      });

      const separator = getSeparator(wrapper);
      const isSeparatorExists = separator.exists();
      const separatorValue = separator.text();

      expect(isSeparatorExists).toBeTruthy();
      expect(separatorValue).toBe(expectedSeparatorValue);
      expect(separatorValue).toMatchInlineSnapshot(`"Some Separator"`);
    });

    test("should not render separator", () => {
      const wrapper = shallowMount(StoryPropField, {
        props: {
          separator: null,
        },
      });

      const separator = getSeparator(wrapper);
      const isSeparatorExists = separator.exists();

      expect(isSeparatorExists).toBeFalsy();
    });

    test("should render value", () => {
      const expectedValue = "Some Value";
      const wrapper = shallowMount(StoryPropField, {
        props: {
          value: expectedValue,
        },
      });

      const value = getValue(wrapper);
      const isValueExists = value.exists();
      const valueContent = value.text();

      expect(isValueExists).toBeTruthy();
      expect(valueContent).toBe(expectedValue);
      expect(valueContent).toMatchInlineSnapshot(`"Some Value"`);
    });

    test("should not render value", () => {
      const wrapper = shallowMount(StoryPropField);

      const value = getValue(wrapper);
      const isValueExists = value.exists();

      expect(isValueExists).toBeFalsy();
    });
  });
});
