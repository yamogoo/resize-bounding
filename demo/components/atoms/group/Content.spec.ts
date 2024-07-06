import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import Content from "./Content.vue";

describe("Content", () => {
  test('should have "--h" postfix in class name by default', () => {
    const wrapper = mount(Content);

    const classes = wrapper
      .find('[data-testid="ui-content-group"]')
      .classes()
      .toString();
    expect(classes).toContain(`--h`);
    expect(classes).toMatchSnapshot();
  });

  test.each(["h", "v"])(
    "should contain %s postfix in class name",
    (direction) => {
      const wrapper = mount(Content, {
        props: {
          direction: direction as "h" | "v",
        },
      });

      const classes = wrapper
        .find('[data-testid="ui-content-group"]')
        .classes()
        .toString();
      expect(classes).toContain(`--${direction}`);
      expect(classes).toMatchSnapshot();
    },
  );

  test.each(['<p data-testid="default-content">Default Slot Content</p>'])(
    "should render default slot with content (%s)",
    (defaultSlot) => {
      const wrapper = mount(Content, {
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
