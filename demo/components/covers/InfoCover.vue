<script setup lang="ts">
import { useRuntimeConfig } from "#imports";

import BaseLink from "@/components/controls/BaseLink.vue";

const runtimeConfig = useRuntimeConfig();
</script>

<template>
  <div class="ui-main-info">
    <div class="ui-main-info__body">
      <BaseLink
        :orientation="'vertical'"
        :size="'lg'"
        :icon-name="'github-logo'"
        :to="'https://github.com/yamogoo/resize-bounding'"
        :name="'https://github.com/yamogoo/resize-bounding'"
      />
    </div>
    <div class="ui-main-info__footer">
      <p>
        This project is licensed under the terms of the
        <BaseLink
          :color="'accent'"
          :to="`https://github.com/yamogoo/vue3-resize-bounding/blob/${runtimeConfig.public.productVueVersion}/LICENSE`"
        >
          MIT license
        </BaseLink>
      </p>
      <p>
        Author:
        <BaseLink :color="'accent'" to="https://github.com/yamogoo">
          {{ runtimeConfig.public.authorName }}
        </BaseLink>
      </p>
    </div>
  </div>
</template>

<style lang="scss">
@use "sass:map";

.ui {
  &-main-info {
    display: grid;
    grid-template-rows: 1fr auto;
    justify-content: center;
    @include box(100%);

    &__body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: px2rem(map.get(map.get($layout, "info"), "minContentWidth"));
      max-width: px2rem(map.get(map.get($layout, "info"), "maxContentWidth"));
    }

    &__footer {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      @include respond-above(lg) {
        @include padding(
          left bottom right,
          px2rem(
            map.get(
              map.get(map.get(map.get($layout, "cover"), "respond"), "desktop"),
              "padding"
            )
          )
        );
      }

      @include respond-between(md, lg) {
        @include padding(
          left bottom right,
          px2rem(
            map.get(
              map.get(map.get(map.get($layout, "cover"), "respond"), "tablet"),
              "padding"
            )
          )
        );
      }

      @include respond-below(md) {
        @include padding(
          left bottom right,
          px2rem(
            map.get(
              map.get(map.get(map.get($layout, "cover"), "respond"), "mobile"),
              "padding"
            )
          )
        );
      }

      p {
        text-align: center;
        padding: 0;
        margin: 0;
        @extend %t__body__2;
        @include themify($themes) {
          color: themed("label", "disabled");
        }
      }
    }
  }
}
</style>
