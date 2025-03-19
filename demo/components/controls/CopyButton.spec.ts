import { describe, expect, test } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";

import { getTypedEmittedEvent } from "@/utils/vitest";

import CopyButton from "./CopyButton.vue";

describe("CopyButton", () => {
  describe("elements", () => {
    test("should render icon", () => {
      const wrapper = mount(CopyButton);

      const icon = wrapper.find(".ui-copy-button__icon");
      const isIconExists = icon.exists();

      expect(isIconExists).toBeTruthy();
      expect(isIconExists).toMatchInlineSnapshot(`true`);
    });
  });

  describe("events", () => {
    test("should emit 'update:is-active' event", async () => {
      const wrapper = shallowMount(CopyButton);

      await wrapper.trigger("click");

      const emmitedEvent = getTypedEmittedEvent(wrapper, "update:is-active");

      expect(emmitedEvent.length).toBe(1);
    });
  });
});
