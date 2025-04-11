<script setup lang="ts">
import { ref } from "vue";
import { useElementHover } from "@vueuse/core";

import type { BaseLinkColor } from "./BaseLink.vue";
import BaseLink from "./BaseLink.vue";
import CopyButton from "@/components/controls/CopyButton.vue";

withDefaults(defineProps<Props>(), {
  variant: "info",
  color: "primary",
});

const emits = defineEmits<{
  (e: "copy"): void;
}>();

const refRoot = ref<HTMLDivElement | null>(null);

const isHovered = useElementHover(refRoot);

const isCopied = ref(false);

const onUpdateIsCopied = (value: boolean): void => {
  isCopied.value = value;
};

const onCopyToClipboard = (e: MouseEvent): void => {
  e.preventDefault();
  e.stopPropagation();

  isCopied.value = true;
  emits("copy");
};
</script>

<script lang="ts">
export type BoxedLinkColor = BaseLinkColor;

export type BoxedLinkVariant = "link" | "info";

export interface Props {
  variant?: BoxedLinkVariant;
  color?: BoxedLinkColor;
}
</script>

<template>
  <div
    ref="refRoot"
    class="ui-boxed-link"
    :class="[
      { [`ui-boxed-link_${color}`]: color },
      isHovered ? 'ui-boxed-link_hovered' : 'ui-boxed-link_normal',
    ]"
    @click="onCopyToClipboard"
  >
    <span v-if="variant === 'info'" class="ui-boxed-link__value">
      <slot></slot>
    </span>
    <BaseLink v-if="variant === 'link'" :color data-testid="base-link">
      <slot></slot>
    </BaseLink>
    <CopyButton
      v-model:is-active="isCopied"
      class="ui-boxed-link__icon"
      @click="onCopyToClipboard"
      @update:is-active="onUpdateIsCopied"
    />
  </div>
</template>

<style lang="scss">
@use "sass:map";

.ui {
  &-boxed-link {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    @include padding(top bottom, px2rem(map.get($spacing, "md")));
    @include padding(left right, px2rem(map.get($spacing, "xl")));
    text-align: center;
    cursor: pointer;
    @extend %base-transition;

    &:not(:last-child) {
      @include themify($themes) {
        border-bottom: 1px solid themed("border", "inactive");
      }
    }

    &__value {
      @extend %t__code__1;
      @extend %base-transition;
    }

    &__icon {
      position: absolute;
      right: 20px;
      cursor: pointer;
      z-index: 1;
    }

    /* * * states * * */

    &_normal {
      &.ui-boxed-link_primary {
        .ui-boxed-link__value {
          @include themify($themes) {
            color: themed("label", "inactive");
          }
        }
      }

      &.ui-boxed-link_accent {
        .ui-boxed-link__value {
          @include themify($themes) {
            color: themed("label", "accent");
          }
        }
      }
    }

    &_hovered {
      &.ui-boxed-link_primary {
        .ui-boxed-link__value {
          @include themify($themes) {
            color: themed("label", "primary") !important;
          }
        }
      }

      &.ui-boxed-link_accent {
        .ui-boxed-link__value {
          @include themify($themes) {
            color: themed("label", "primary") !important;
          }
        }
      }
    }
  }
}
</style>
