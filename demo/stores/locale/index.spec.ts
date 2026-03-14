import { useLocaleStore } from ".";

describe("useLocaleStore", () => {
  test("should set the locale", async () => {
    const store = useLocaleStore();

    store.setLocale("en");
    expect(store.currentLocale).toBe("en");

    store.setLocale("fr");
    expect(store.currentLocale).toBe("fr");
  });
});
