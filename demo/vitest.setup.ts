import { createPinia, setActivePinia } from "pinia";
import { beforeEach } from "vitest";

const createStorageMock = (): Storage => {
  const storage = new Map<string, string>();
  return {
    get length() {
      return storage.size;
    },
    clear() {
      storage.clear();
    },
    getItem(key: string) {
      return storage.has(key) ? storage.get(key)! : null;
    },
    key(index: number) {
      return Array.from(storage.keys())[index] ?? null;
    },
    removeItem(key: string) {
      storage.delete(key);
    },
    setItem(key: string, value: string) {
      storage.set(key, value);
    },
  };
};

if (typeof window !== "undefined") {
  if (typeof window.localStorage?.getItem !== "function") {
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: createStorageMock(),
    });
  }

  if (typeof window.sessionStorage?.getItem !== "function") {
    Object.defineProperty(window, "sessionStorage", {
      configurable: true,
      value: createStorageMock(),
    });
  }
}

beforeEach(() => {
  const pinia = createPinia();
  setActivePinia(pinia);
});

export const setMatchMedia = () => {
  window.matchMedia = vi.fn((): MediaQueryList => {
    return {
      matches: false,
      media: "",
      onchange: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
  });
};
