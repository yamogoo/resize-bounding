import { useLocalStorage } from "@vueuse/core";
import type { LocalStorageKey } from "@/shared/types/lcoalStorage";

export const useTypedLocalStorage = <V>(key: LocalStorageKey, value: V) => {
  const data = useLocalStorage<V>(key, value);
  return data;
};
