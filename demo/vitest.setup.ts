import { createPinia, setActivePinia } from "pinia";
import { beforeEach, vi } from "vitest";

beforeEach(() => {
  const pinia = createPinia();
  setActivePinia(pinia);
});
