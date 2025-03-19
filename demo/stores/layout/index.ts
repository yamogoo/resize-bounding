import { ref, type Ref } from "vue";
import { defineStore } from "pinia";

import type { ISize } from "@/shared/types";

export const useLayoutStore = defineStore("layout-store", () => {
  const appSize: Ref<ISize> = ref({
    width: 0,
    height: 0,
  });

  const setAppSize = (size: ISize): void => {
    appSize.value = size;
  };

  return {
    appSize,
    setAppSize,
  };
});
