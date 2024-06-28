import { test, expect } from "vitest";
import { deepMerge } from "@/components/utils";

describe("deepMerge", () => {
  /* * * Deep Merge * * */

  test("Deep merge", () => {
    const a = { a: "a", b: { a: "a", b: "b" } },
      b = { b: { c: "c" } };

    const res = deepMerge(a, b);

    expect(res).toEqual({ a: "a", b: { a: "a", b: "b", c: "c" } });
    expect(res).toMatchSnapshot();
  });

  test.fails("Throw errors on merging with different types", () => {
    const result = deepMerge({ c: "c" }, ["a", "b"]);
    expect(() => result);
  });
});
