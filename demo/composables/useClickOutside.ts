import { onMounted, onBeforeUnmount, type Ref } from "vue";

export const useClickOutside = (component: Ref, cb: Function) => {
  if (!component) return;

  const listener = (e: Event): void => {
    if (
      e.target !== component.value &&
      e.composedPath().includes(component.value)
    )
      return;
    if (typeof cb === "function") cb();
  };

  onMounted(() => {
    window.addEventListener("click", listener);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("click", listener);
  });

  return { listener };
};
