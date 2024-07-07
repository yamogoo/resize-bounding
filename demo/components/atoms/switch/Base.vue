<template>
  <label :class="['ui-switch', state ? 'active' : 'normal']">
    <input
      v-bind="$attrs"
      type="checkbox"
      :checked="props.state"
      @change="onChange"
    />
    <div class="ui-switch__track">
      <div class="ui-switch__track--container">
        <span class="ui-switch__knob" ref="refKnob"></span>
      </div>
    </div>
    <span v-if="label" class="ui-switch__label">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import { onMounted, ref, useAttrs, watch } from "vue";
import g from "gsap";

defineOptions({
  inheritAttrs: false,
});

useAttrs();

interface Props {
  state: boolean;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {});

const emits = defineEmits<{
  (e: "update:state", state: any): void;
}>();

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

<style lang="scss">
$__width: 40px;
$__height: 20px;
$__knob-size: 16px;

.ui-switch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  box-sizing: border-box;

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
    @include box($__width, $__height);
    border-radius: $__height;
    padding: 2px;
    overflow: hidden;
    // @extend %transition;

    &--container {
      @include box(100%);
    }
  }

  &__knob {
    display: block;
    @include box($__knob-size);
    border-radius: $__knob-size;
    // @extend %transition;

    @include themify($app-themes) {
      background-color: themed("background", "primary");
    }
  }

  &.active {
    .ui-switch__track {
      @include themify($app-themes) {
        background-color: themed("switch", "track");
      }
    }
  }

  &.normal {
    .ui-switch__track {
      @include themify($app-themes) {
        background-color: themed("switch", "track");
      }
    }
  }

  &__label {
    font-size: 12px;

    @include themify($app-themes) {
      color: themed("text", "inactive");
    }
  }
}
</style>
