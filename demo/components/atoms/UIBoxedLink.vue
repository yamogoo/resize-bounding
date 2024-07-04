<template>
  <div class="ui-boxed-link">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.ui {
  &-boxed-link {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 32px 20px;

    &:not(:last-child) {
      border-bottom: 1px solid lightgray;
    }
  }
}
</style>
