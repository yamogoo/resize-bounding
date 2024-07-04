import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import UIGroup from "./UIGroup.vue";

describe("UIGroup", () => {
  test('should have "--h" postfix in class name by default', (direction) => {
    const wrapper = mount(UIGroup);

    const classes = wrapper
      .find('[data-testid="ui-group"]')
      .classes()
      .toString();
    expect(classes).toContain(`--h`);
    expect(classes).toMatchSnapshot();
  });

  test.each(["h", "v"])(
    "should contain %s postfix in class name",
    (direction) => {
      const wrapper = mount(UIGroup, {
        props: {
          direction,
        },
      });

      const classes = wrapper
        .find('[data-testid="ui-group"]')
        .classes()
        .toString();
      expect(classes).toContain(`--${direction}`);
      expect(classes).toMatchSnapshot();
    },
  );

  test.each(['<p data-testid="default-content">Default Slot Content</p>'])(
    "should render default slot with content (%s)",
    (defaultSlot) => {
      const wrapper = mount(UIGroup, {
        slots: {
          default: defaultSlot,
        },
      });

      const html = wrapper.find('[data-testid="default-content"]').html();

      expect(html).toContain(defaultSlot);
      expect(html).toMatchSnapshot();
    },
  );
});
