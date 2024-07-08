<template>
  <div class="ui-main-info">
    <AtomsLinkBasic
      :size="'lg'"
      :icon-name="'git'"
      :to="'https://github.com/yamogoo/vue3-resize-bounding'"
      :name="'https://github.com/yamogoo/vue3-resize-bounding'"
    />
    <AtomsGroupContent :direction="'v'" :alignment="'center'">
      <p class="">
        This project is licensed under the terms of the
        <AtomsLinkBase
          to="https://github.com/yamogoo/vue3-resize-bounding/blob/main/packages/vue3-resize-bounding/LICENSE"
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

<script setup lang="ts"></script>

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
        @include use-font-size(--xs);
        @include themify($app-themes) {
          color: themed("text", "secondary");
        }
        margin: 0;
        text-align: center;
      }
    }
  }
}
</style>
