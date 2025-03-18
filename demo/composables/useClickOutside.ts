import { onMounted, onBeforeUnmount, type Ref } from "vue";

export const useClickOutside = (el: Ref, cb: (...args: unknown[]) => void) => {
  if (!el) return;

  const listener = (e: Event): void => {
    if (e.target !== el.value && e.composedPath().includes(el.value)) return;
    if (typeof cb === "function") cb();
  };

  onMounted(() => {
    window.addEventListener("pointerdown", listener);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("pointerdown", listener);
  });

  return { listener };
};
