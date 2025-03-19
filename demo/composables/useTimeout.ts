import { ref, type Ref } from "vue";

export function useTimeout(cb?: () => void, ms = 1000) {
  const timeoutId: Ref<ReturnType<typeof setTimeout> | undefined> =
    ref(undefined);

  const start = (ms: number): void => {
    timeoutId.value = setTimeout(() => {
      if (typeof cb === "function") cb();
    }, ms);
  };

  const stop = () => {
    clearTimeout(timeoutId.value);
  };

  return {
    stop: () => {
      if (timeoutId.value) stop();
    },
    start: () => {
      start(ms);
    },
  };
}
