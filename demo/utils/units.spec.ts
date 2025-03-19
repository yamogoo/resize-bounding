import { describe, test, expect } from "vitest";
import { px2rem } from "./units";

describe("px2rem", () => {
  test("should devided with base=16", () => {
    const result = px2rem(20, 16);
    const expected = 20 / 16;

    expect(result).toBe(expected);
    expect(result).toMatchInlineSnapshot(`1.25`);
  });

  test("should devided on 1 if base=0", () => {
    const result = px2rem(20, 0);
    const expected = 20 / 1;

    expect(result).toBe(expected);
    expect(result).toMatchInlineSnapshot(`20`);
  });
});
