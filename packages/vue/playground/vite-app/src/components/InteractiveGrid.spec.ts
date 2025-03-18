import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import InteractiveGrid from "./InteractiveGrid.vue";

type BlockName =
  | "block-a"
  | "block-b"
  | "block-c"
  | "block-d"
  | "block-e"
  | "block-f"
  | "wrapper-bottom";

const blocks: Array<BlockName> = [
  "block-a",
  "block-b",
  "block-c",
  "block-d",
  "block-e",
  "block-f",
  "wrapper-bottom",
];

describe("InteractiveGrid", () => {
  describe("elements", () => {
    test.each(blocks)("should render %s block", (blockName) => {
      const wrapper = mount(InteractiveGrid);

      const block = wrapper.find(`[data-testid="${blockName}"]`);
      const isBlockExists = block.exists();

      expect(isBlockExists).toBeTruthy();
    });
  });
});
