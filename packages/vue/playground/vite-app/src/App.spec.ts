import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import App from "./App.vue";

describe("App", () => {
  test("should render InteractiveGrid", () => {
    const wrapper = mount(App);

    const interactiveGrid = wrapper.find('[data-testid="interactive-grid"]');
    const isInteractiveGridExists = interactiveGrid.exists();

    expect(isInteractiveGridExists).toBeTruthy();
    expect(isInteractiveGridExists).toMatchInlineSnapshot(`true`);
  });
});
