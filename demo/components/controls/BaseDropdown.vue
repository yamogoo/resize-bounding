<script setup lang="ts">
import { onMounted, ref, watch, toValue } from "vue";
import g from "gsap";

import { useClickOutside } from "@/composables/useClickOutside";

import Icon from "@/components/icons/Icon.vue";

// import BaseSymbol from "@/components/base/icons/BaseSymbol.vue";

const props = withDefaults(defineProps<Props>(), {
  isResetButtonShown: false,
});

const refRoot = ref<HTMLDivElement | null>(null);

const isExpanded = ref(false);

useClickOutside(refRoot, () => {
  isExpanded.value = false;
});

const onExpand = (): void => {
  isExpanded.value = !isExpanded.value;
};

/* * * Animations * * */

const ARROW_ICON_ROTATION_EXPANDED = 0,
  ARROW_ICON_ROTATION_SHRINKED = 90;

const getIcon = (): HTMLDivElement | null => {
  if (!refRoot.value) return null;
  return refRoot.value.getElementsByClassName(
    "dropdown__expand-icon",
  )[0] as HTMLDivElement;
};

const setIconState = (isExpanded: boolean, isAnimate = true): void => {
  const el = getIcon();
  if (el)
    isExpanded
      ? onAnimExpandIconIn(el, isAnimate ? 0.25 : 0)
      : onAnimExpandIconOut(el, isAnimate ? 0.15 : 0);
};

const onAnimExpandIconIn = (el: HTMLDivElement, duration: number): void => {
  g.fromTo(
    el,
    {
      rotate: ARROW_ICON_ROTATION_SHRINKED,
    },
    {
      rotate: ARROW_ICON_ROTATION_EXPANDED,
      duration,
      ease: "power4.out",
    },
  );
};

const onAnimExpandIconOut = (el: HTMLDivElement, duration: number): void => {
  g.to(el, {
    rotate: ARROW_ICON_ROTATION_SHRINKED,
    duration,
    ease: "power4.in",
  });
};

/* * * Options * * */

onMounted(() => {
  setIconState(toValue(isExpanded), false);
});

watch(
  isExpanded,
  (newIsExpanded) => {
    setIconState(newIsExpanded);
  },
  { immediate: true },
);

const onOptionClick = (): void => {
  if (props.closeOnOptionClick) isExpanded.value = false;
};
</script>

<script lang="ts">
export interface Props {
  value: string;
  valuePostfix?: string;
  isResetButtonShown?: boolean;
  closeOnOptionClick?: boolean;
}
</script>

<template>
  <div
    ref="refRoot"
    class="dropdown"
    data-testid="dropdown"
    :class="[{ dropdown_expanded: isExpanded }]"
  >
    <div class="dropdown__value" data-testid="dropdown-value" @click="onExpand">
      <div class="dropdown__value-container">
        <div class="dropdown__value-content">
          <span class="dropdown__value-label">{{ value }}</span
          ><span v-if="valuePostfix" class="dropdown__value-postfix">{{
            valuePostfix
          }}</span>
        </div>
        <Icon
          ref="refArrow"
          class="dropdown__expand-icon"
          :name="'down_outline_400'"
          :size="'xxxxs'"
          :color="'accent'"
        ></Icon>
      </div>
    </div>
    <Transition :css="false">
      <div v-if="isExpanded" class="dropdown__options" @click="onOptionClick">
        <div v-if="$slots.controlbar" class="dropdown__controlbar">
          <slot name="controlbar"></slot>
        </div>
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
@use "sass:map";

.dropdown {
  $padding-v: px2rem(map.get($spacing, "xs"));
  $padding-h: px2rem(map.get($spacing, "sm"));
  $roundness: px2rem(map.get($roundness, "xs"));

  position: relative;
  min-width: px2rem(48px);
  width: px2rem(76px);
  box-sizing: border-box;

  &__value {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    gap: px2rem(map.get($gap, "xs"));
    width: 100%;
    padding: $padding-v $padding-h;
    border-radius: $roundness;
    cursor: pointer;
    @include themify($themes) {
      @include border(
        left top right bottom,
        1px solid themed("border", "inactive")
      );
    }

    &:hover {
      .dropdown__value-label {
        opacity: 0.5;
      }
    }

    &-label {
      display: block;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      line-clamp: 1;
      flex: 1 0 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    span,
    .dropdown__expand-icon,
    .dropdown__reset-icon {
      @extend %base-transition;
    }

    span {
      @extend %t__label__1;
      @include themify($themes) {
        color: themed("label", "primary");
      }
    }

    .dropdown__expand-icon {
      @include themify($themes) {
        fill: themed("label", "primary");
      }
    }

    .dropdown__reset-icon {
      @include themify($themes) {
        fill: themed("label", "disabled");
      }
    }
  }

  &__value-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: px2rem(map.get($spacing, "xs"));
    overflow: hidden;
  }

  &__value-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: px2rem(map.get($spacing, "xs"));
  }

  &__controlbar {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-bottom: px2rem(map.get($spacing, "xs"));
    @include themify($themes) {
      @include border(
        bottom,
        1px solid rgba(themed("border", "inactive"), 0.5)
      );
    }
  }

  &__options {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-sizing: border-box;
    width: 100%;
    max-height: 332px;
    padding: 0 $padding-h $padding-v $padding-h;
    @include themify($themes) {
      @include border(
        left bottom right,
        1px solid rgba(themed("border", "inactive"), 0)
      );
    }
    border-radius: 0 0 $roundness $roundness;
    overflow: auto;
    z-index: 9999;

    &__content {
      overflow: hidden;
    }
  }

  .dropdown__value,
  .dropdown__options {
    @include transition(
      color background background-color fill stroke opacity,
      150ms,
      ease-out
    );
  }

  /* * * states * * */

  &_expanded {
    .dropdown__value {
      @include themify($themes) {
        background-color: themed("background", "base");
        @include border(left top right, 1px solid themed("border", "inactive"));
        @include border(
          bottom,
          1px solid rgba(themed("border", "inactive"), 0)
        );
      }

      &-label {
        opacity: 0.5;
      }
    }

    .dropdown__options {
      @include themify($themes) {
        background-color: themed("background", "base");
        @include border(
          left bottom right,
          1px solid themed("border", "inactive")
        );
      }
    }
  }
}
</style>
