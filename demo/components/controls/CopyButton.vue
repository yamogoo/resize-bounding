<script setup lang="ts">
import { useId, ref, watch } from "vue";
import g from "gsap";

import { useClickOutside } from "@/composables/useClickOutside";
import { useTimeout } from "@/composables/useTimeout";

import Icon from "@/components/icons/Icon.vue";

const TOOLTIP_LIVE_TIME = 2_000;

interface Props {
  isActive?: boolean;
  showLabel?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
  showLabel: false,
});

const { isActive } = props;

const emit = defineEmits<{
  (e: "update:is-active", isActive: boolean): void;
}>();

const id = useId();

const refIcon = ref<HTMLDivElement | null>(null);

const localIsActive = ref(isActive);

watch(
  () => props.isActive,
  (updatedValue) => {
    localIsActive.value = updatedValue;
  },
);

const emitUpdatedState = (): void => {
  emit("update:is-active", localIsActive.value);
};

const onClick = (): void => {
  localIsActive.value = true;
  emitUpdatedState();
};

useClickOutside(refIcon, () => {
  localIsActive.value = false;
  emitUpdatedState();
});

const { start: startTimer } = useTimeout(() => {
  localIsActive.value = false;
  emitUpdatedState();
}, TOOLTIP_LIVE_TIME);

/* * * Animations * * */

const onTooltipEnter = (el: Element, done: () => void): void => {
  const x = el.clientWidth / 2;

  g.fromTo(
    el,
    {
      x,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: 0.35,
      ease: "power4.out",
      onComplete: () => {
        startTimer();
        done();
      },
    },
  );
};

const onTooltipLeave = (el: Element, done: () => void): void => {
  g.to(el, {
    x: 0,
    opacity: 0,
    duration: 0.35,
    ease: "power4.out",
    onComplete: done,
  });
};
</script>

<template>
  <div
    :id="id.toString()"
    ref="refIcon"
    :class="[`ui-copy-button`, { ['ui-copy-button_active']: localIsActive }]"
    @click="onClick"
  >
    <Transition :css="false" @enter="onTooltipEnter" @leave="onTooltipLeave">
      <span v-if="localIsActive && showLabel" class="ui-copy-button__label"
        >Copied</span
      >
    </Transition>
    <Icon
      class="ui-copy-button__icon"
      :name="'copy_outline_300'"
      :size="'xxs'"
      @click="onClick"
    />
  </div>
</template>

<style lang="scss">
@use "sass:map";

.ui {
  &-copy-button {
    @include themify($themes) {
      color: themed("label", "inactive");
    }
    @extend %base-transition;

    &__label {
      position: absolute;
      right: map.get($spacing, "md");
      @extend %t__label__2;
      margin: 0 map.get($spacing, "xs");
    }

    &:hover {
      @include themify($themes) {
        color: themed("label", "primary");
      }
    }

    &_active {
      @include themify($themes) {
        color: themed("label", "accent");
      }
    }
  }
}
</style>
