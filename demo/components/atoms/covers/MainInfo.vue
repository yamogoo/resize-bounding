<template>
  <div class="ui-main-info">
    <AtomsLinksLink
      :size="'lg'"
      :icon-name="'git'"
      :to="'https://github.com/yamogoo/vue3-resize-bounding'"
      :name="'~/yamogoo/vue3-resize-bounding'"
    />
    <AtomsGroupsContentGroup :direction="'v'" :alignment="'center'">
      <p class="">
        This project is licensed under the terms of the
        <AtomsLinksBaseLink
          to="https://github.com/yamogoo/vue3-boundarize/blob/main/packages/vue3-boundarize/LICENSE"
          ><b>MIT license</b></AtomsLinksBaseLink
        >
      </p>
      <!-- <p>
        Author:
        <AtomsLinksBaseLink to="https://github.com/yamogoo"
          ><b>yamogoo</b></AtomsLinksBaseLink
        >
      </p> -->
    </AtomsGroupsContentGroup>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.ui {
  &-main-info {
    display: flex;
    flex-direction: column;
    gap: 32px;

    .ui-content-group {
      gap: 10px;

      p {
        letter-spacing: 0.025em;
        @include use-font-size(--sm);
        margin: 0;
        text-align: center;
      }
    }
  }
}
</style>
