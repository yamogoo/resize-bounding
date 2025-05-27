import { createPinia, setActivePinia } from "pinia";
import { beforeEach } from "vitest";

beforeEach(() => {
  const pinia = createPinia();
  setActivePinia(pinia);

  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });
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
