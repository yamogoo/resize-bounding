<script setup lang="ts">
import { useId, ref } from "vue";

import { useClickOutside } from "@/composables/useClickOutside";

import Icon from "@/components/icons/Icon.vue";

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

<template>
  <div
    :id="id.toString()"
    ref="refIcon"
    :class="[`ui-copy-button`, { active: isActive }]"
  >
    <span v-if="isActive && showLabel" class="ui-copy-button__label"
      >Copied</span
    >
    <Icon
      :class="[`ui-copy-button__icon`]"
      :name="'copy_outline_300'"
      :size="'xxs'"
      @click="onClick"
    />
  </div>
</template>

<style lang="scss">
.ui {
  &-copy-button {
    @include themify($themes) {
      color: themed("label", "inactive");
    }

    &__label {
      margin: 0 6px;
      @extend %t__label__1;
    }

    &:hover {
      @include themify($themes) {
        color: themed("label", "primary");
      }
    }

    &.active {
      @include themify($themes) {
        color: themed("label", "accent");
      }
    }
  }
}
</style>
