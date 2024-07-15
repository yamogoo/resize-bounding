<template>
  <div class="ui-main-info">
    <AtomsLinkBasic
      :size="'lg'"
      :icon-name="'git'"
      :to="'https://github.com/yamogoo/resize-bounding'"
      :name="'https://github.com/yamogoo/resize-bounding'"
    />
    <AtomsGroupContent :direction="'v'" :alignment="'center'">
      <p class="">
        This project is licensed under the terms of the
        <AtomsLinkBase
          :to="`https://github.com/yamogoo/vue3-resize-bounding/blob/v${assetsVersion}/LICENSE`"
          >MIT license
        </AtomsLinkBase>
      </p>
      <p>
        Author:
        <AtomsLinkBase to="https://github.com/yamogoo">yamogoo </AtomsLinkBase>
        /Mikhail Grebennikov/
      </p>
    </AtomsGroupContent>
  </div>
</template>

<script setup lang="ts">
const assetsVersion = useRuntimeConfig().public.productVueVersion;
</script>

<style lang="scss">
.ui {
  &-main-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;

    .ui-content-group {
      gap: 10px;

      p {
        letter-spacing: 0.025em;
        margin: 0;
        text-align: center;

        @include use-font-size(--xs);
        @include themify($app-themes) {
          color: themed("text", "secondary");
        }
      }
    }
  }
}
</style>
