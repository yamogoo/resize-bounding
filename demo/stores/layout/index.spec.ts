import { useLayoutStore } from ".";

import tokens from "@/tokens";

describe("useLayoutStore", () => {
  test("should set the appSize", async () => {
    const store = useLayoutStore();

    const expectedAppSize1 = {
      width: 240,
      height: 240,
    };

    store.setAppSize(expectedAppSize1);
    expect(store.appSize).toEqual(expectedAppSize1);

    const expectedAppSize2 = {
      width: 320,
      height: 320,
    };

    store.setAppSize(expectedAppSize2);
    expect(store.appSize).toEqual(expectedAppSize2);
  });

  test("should change layoutType", () => {
    const store = useLayoutStore();

    const expectedAppSize1 = {
      width: 240,
      height: 240,
    };

    store.setAppSize(expectedAppSize1);
    expect(store.layoutType).toBe("mobile");

    const expectedAppSize2 = {
      width: 1280,
      height: 240,
    };

    store.setAppSize(expectedAppSize2);
    expect(store.layoutType).toBe("desktop");
  });

  test("should detect isTabletLayout", () => {
    const store = useLayoutStore();

    const expectedAppSize1 = {
      width: tokens.breakpoints.md - 1,
      height: 240,
    };

    store.setAppSize(expectedAppSize1);
    expect(store.isTabletLayout).toBeFalsy();

    const expectedAppSize2 = {
      width: tokens.breakpoints.md + 1,
      height: 240,
    };

    store.setAppSize(expectedAppSize2);
    expect(store.isTabletLayout).toBeTruthy();

    const expectedAppSize3 = {
      width: tokens.breakpoints.lg + 1,
      height: 240,
    };

    store.setAppSize(expectedAppSize3);
    expect(store.isTabletLayout).toBeFalsy();
  });
});
