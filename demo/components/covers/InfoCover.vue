<script setup lang="ts">
import BaseLink from "@/components/controls/BaseLink.vue";
</script>

<template>
  <div class="ui-main-info">
    <BaseLink
      :size="'lg'"
      :icon-name="'git'"
      :to="'https://github.com/yamogoo/resize-bounding'"
      :name="'https://github.com/yamogoo/resize-bounding'"
    />
    <div class="ui-main-info--container">
      <p>
        Author:
        <BaseLink to="https://github.com/yamogoo">
          Mikhail Grebennikov
        </BaseLink>
      </p>
    </div>
  </div>
</template>

<style lang="scss">
@use "sass:map";

.ui {
  &-main-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;

    &--container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .ui-content-group {
      gap: px2rem(map.get($gap, "xs"));

      p {
        letter-spacing: 0.025em;
        margin: 0;
        text-align: center;
        @extend %t__body__1;
        @include themify($themes) {
          color: themed("label", "secondary");
        }
      }
    }
  }
}
</style>
