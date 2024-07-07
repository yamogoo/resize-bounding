<template>
  <div
    ref="refIcon"
    :class="[`ui-copy-button`, { active: isActive }]"
    :id="id.toString()"
  >
    <span v-if="isActive && showLabel" class="ui-copy-button__label"
      >Copied</span
    >
    <NuxtIcon :class="[`ui-copy-button__icon`]" name="doc" @click="onClick" />
  </div>
</template>

<script setup lang="ts">
import { useClickOutside } from "@/composables/useClickOutside.js";

interface Props {
  showLabel?: boolean;
}

withDefaults(defineProps<Props>(), {
  showLabel: false,
});

const id = useId();
const refIcon = ref<HTMLDivElement | null>(null);

const isActive = ref(false);

const onClick = (): void => {
  isActive.value = true;
};

useClickOutside(refIcon, () => {
  isActive.value = false;
});
</script>

<style lang="scss">
.ui {
  &-copy-button {
    @include themify($app-themes) {
      color: themed("text", "inactive");
    }

    &__label {
      @include use-font-size(--xs);
      margin: 0 6px;
    }

    svg {
      @include box(21px);
    }

    &.active {
      @include themify($app-themes) {
        color: themed("colors", "accent");
      }
    }
  }
}
</style>
