import { shallowMount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import BaseBadge from "./BaseBadge.vue";

const DEFAULT_PROPS = {
  label: "Label",
  value: "Value",
};

describe("BaseBadge", () => {
  test(`should display "label" (${DEFAULT_PROPS.label}), "value" (${DEFAULT_PROPS.value})`, () => {
    const wrapper = shallowMount(BaseBadge, {
      props: {
        ...DEFAULT_PROPS,
      },
    });

    const badgeEl = wrapper.find(`[data-testid="ui-badge"]`);
    const labelText = badgeEl.find(`[data-testid="ui-badge-label"]`).text();
    const valueText = badgeEl.find(`[data-testid="ui-badge-value"]`).text();

    expect(labelText).toBe(DEFAULT_PROPS.label);
    expect(valueText).toBe(DEFAULT_PROPS.value);

    expect(labelText).toMatchSnapshot();
    expect(valueText).toMatchSnapshot();
  });
});
