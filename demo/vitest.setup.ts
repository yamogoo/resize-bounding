import { createPinia, setActivePinia } from "pinia";
import { beforeEach } from "vitest";

beforeEach(() => {
  const pinia = createPinia();
  setActivePinia(pinia);
});
