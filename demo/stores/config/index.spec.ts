import { useConfigStore } from ".";

describe("useConfigStore", () => {
  test("shuld set a theme", async () => {
    const store = useConfigStore();

    store.setTheme("dark");
    expect(store.currentTheme).toBe("dark");
    expect(store.getSid).toBe(1);

    store.setTheme("light");
    expect(store.currentTheme).toBe("light");
    expect(store.getSid).toBe(0);
  });
});
