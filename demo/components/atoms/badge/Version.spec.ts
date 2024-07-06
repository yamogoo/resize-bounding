import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import Version from "./Version.vue";

const DEFAULT_PROPS = {
  version: "0.0.1",
};

describe("Version", () => {
  test(`should display "version" (${DEFAULT_PROPS.version})`, () => {
    const wrapper = mount(Version, {
      props: {
        ...DEFAULT_PROPS,
      },
    });

    const badgeEl = wrapper.find(`[data-testid="ui-badge"]`);
    const versionText = badgeEl.find(`[data-testid="ui-badge-value"]`).text();

    expect(versionText).toBe(DEFAULT_PROPS.version);
    expect(versionText).toMatchSnapshot();
  });
});
