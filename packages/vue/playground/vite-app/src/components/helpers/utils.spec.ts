import { describe, expect, test } from "vitest";

import { strToNum } from "./utils";

describe("utils", () => {
  describe("strToNum", () => {
    test("should return 5 number", () => {
      const value = strToNum("5");

      expect(value).toBe(5);
      expect(value).toMatchInlineSnapshot(`5`);
    });

    test("should return 0 number when passing some string value", () => {
      const value = strToNum("some string");

      expect(value).toBe(0);
      expect(value).toMatchInlineSnapshot(`0`);
    });

    test('should return 0 number when value is eaual ""', () => {
      const value = strToNum("");

      expect(value).toBe(0);
      expect(value).toMatchInlineSnapshot(`0`);
    });
  });
});
