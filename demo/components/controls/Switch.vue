<script setup lang="ts">
import { useAttrs, useId, onMounted, ref, watch } from "vue";
import g from "gsap";

import tokens from "@/tokens";

defineOptions({
  inheritAttrs: false,
});

useAttrs();

const props = withDefaults(defineProps<Props>(), {
  size: "md",
});

const emits = defineEmits<{
  (e: "update:state", state: boolean): void;
}>();

const id = useId();

const refKnob = ref<HTMLDivElement | null>(null);

const onChange = (e: Event): void => {
  const state = (e.target as HTMLInputElement).checked;
  emits("update:state", state);
};

/* * * Animations * * */

const onAnimateKnob = (duration = 0.25): void => {
  if (refKnob.value) {
    const knobPosX = props.state ? 20 : 0;

    g.to(refKnob.value, {
      x: knobPosX,
      duration,
      ease: "power4.out",
    });
  }
};

onMounted(() => {
  if (refKnob.value) {
    onAnimateKnob(0.0);
  }
});

watch(
  () => props.state,
  () => {
    onAnimateKnob();
  },
);
</script>

<script lang="ts">
export type SwitchSize = keyof typeof tokens.switch;

export interface Props {
  size?: SwitchSize;
  state: boolean;
  label?: string;
}
</script>

<template>
  <label
    :for="id"
    :class="['ui-switch', state ? 'ui-switch_active' : 'ui-switch_normal']"
    aria-label="switch"
  >
    <input
      :id
      v-bind="$attrs"
      type="checkbox"
      :checked="props.state"
      @change="onChange"
    />
    <div class="ui-switch__track">
      <div class="ui-switch__track-container">
        <span ref="refKnob" class="ui-switch__knob"></span>
      </div>
    </div>
    <span v-if="label" class="ui-switch__label">{{ label }}</span>
  </label>
</template>

<style lang="scss">
@use "sass:map";

@mixin defineStyles($map: $switch) {
  @each $size, $val in $map {
    $width: px2rem(map.get($val, "width"));
    $height: px2rem(map.get($val, "height"));
    $padding: px2rem(map.get($val, "padding"));
    $knob-size: px2rem(map.get(map.get($val, "knob"), "size"));
    $label-font-name: map.get(map.get($val, "label"), "font");
    $gap: px2rem(map.get($val, "gap"));

    & {
      gap: $gap;

      &__track {
        @include box($width, $height);
        border-radius: $height;
        padding: $padding;
      }

      &__knob {
        @include box($knob-size);
        border-radius: $knob-size;
      }

      &__label {
        @extend %t__#{$label-font-name};
      }
    }
  }
}

.ui-switch {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
  @include box(max-content);

  @include defineStyles();

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  &__track {
    overflow: hidden;

    &-container {
      @include box(100%);
    }
  }

  &__knob {
    display: block;
  }

  &_active {
    .ui-switch__track {
      @include themify($themes) {
        background-color: themed("switch", "trackActive");
      }
    }

    .ui-switch__knob {
      @include themify($themes) {
        background-color: themed("switch", "knobActive");
      }
    }
  }

  &_normal {
    .ui-switch__track {
      @include themify($themes) {
        background-color: themed("switch", "trackNormal");
      }
    }

    .ui-switch__knob {
      @include themify($themes) {
        background-color: themed("switch", "knobNormal");
      }
    }
  }

  &__label {
    @include themify($themes) {
      color: themed("label", "inactive");
    }
  }
}
</style>
