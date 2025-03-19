import { describe, test, expect } from "vitest";
import { nextTick } from "vue";

import type { Theme } from "@/shared/types";

import { useTheme, type UseThemeOptions } from "./useTheme";

describe("useTheme", () => {
  const opts: UseThemeOptions = {
    prefix: "theme--",
  };

  test("should set dark theme", async () => {
    const { theme, setTheme } = useTheme("light", opts);
    const { prefix } = opts;
    setTheme("dark");
    const body = document.querySelector("body");
    await nextTick();

    if (body) {
      const classes = body.classList;
      const className = `${prefix}${theme.value}`;

      expect(classes).toContain(className);
      expect(classes).toMatchInlineSnapshot(`
        DOMTokenList {
          "0": "theme--dark",
        }
      `);
    }
  });

  test("should set light theme", async () => {
    const { theme, setTheme } = useTheme("dark", opts);
    const { prefix } = opts;
    setTheme("light");
    await nextTick();

    const body = document.querySelector("body");

    if (body) {
      const classes = body.classList;
      const className = `${prefix}${theme.value}`;

      expect(classes).toContain(className);
      expect(classes).toMatchInlineSnapshot(`
        DOMTokenList {
          "0": "theme--light",
        }
      `);
    }
  });

  test("should set selector", async () => {
    const opts: UseThemeOptions = {
      selector: "html",
    };

    useTheme("dark", opts);
    const { selector } = opts;
    await nextTick();

    if (selector) {
      const el = document.querySelector(selector);

      if (el) {
        const tagName = el.tagName.toLowerCase();
        expect(tagName).toEqual(selector);
        expect(tagName).toMatchInlineSnapshot(`"html"`);
      }
    }
  });

  describe("values", () => {
    test("should not change theme", async () => {
      const { setTheme, setIsSystemThemeEnabled } = useTheme("dark", opts);
      const { prefix } = opts;

      setIsSystemThemeEnabled(true);
      const newTheme: Theme = "light";

      setTheme("light");
      await nextTick();

      const body = document.querySelector("body");

      if (body) {
        const classes = body.classList;
        const className = `${prefix}${newTheme}`;

        let isClassExists = false;

        for (const c of classes) {
          if (c === className) isClassExists = true;
        }

        expect(isClassExists).toBeFalsy();
        expect(classes).toMatchInlineSnapshot(`
          DOMTokenList {
            "0": "theme--dark",
          }
        `);
      }
    });
  });
});
