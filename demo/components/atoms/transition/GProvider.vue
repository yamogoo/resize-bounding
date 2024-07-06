<template>
  <Transition :css="false" @enter="onEnter" @leave="OnLeave">
    <template v-if="show">
      <slot></slot>
    </template>
  </Transition>
</template>

<script setup lang="ts">
import { watch } from "vue";
import g from "gsap";

interface Props {
  show: boolean;
  autohide?: boolean;
  autohideTimer?: number;
  beforeEnter?: gsap.TweenVars;
  enter?: gsap.TweenVars;
  leave?: gsap.TweenVars;
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  autohide: false,
  autoHideTimer: 4000,
});

const emits = defineEmits<{
  (e: "update:show", state: boolean): void;
}>();

let timerId: ReturnType<typeof setTimeout> | undefined = undefined;

/* * * Animations * * */

const onEnterComplete = () => {
  if (props.autohideTimer) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      emits("update:show", false);
    }, props.autohideTimer);
  }
};

watch(
  () => props.show,
  () => {
    if (!props.show && props.autohideTimer) clearTimeout(timerId);
  },
);

const onEnter = (el: Element): void => {
  g.fromTo(
    el,
    {
      ...props.beforeEnter,
    },
    {
      ...props.enter,
      onComplete: onEnterComplete,
    },
  );
};

const OnLeave = (el: Element, done: () => void): void => {
  g.to(el, {
    ...props.leave,
    onComplete: done,
  });
};
</script>
