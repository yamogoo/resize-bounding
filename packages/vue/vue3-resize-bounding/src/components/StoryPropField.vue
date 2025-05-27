<script setup lang="ts">
withDefaults(defineProps<Props>(), {
  separator: "=",
});
</script>

<script lang="ts">
export interface Props {
  name?: string;
  description?: string;
  value?: string | number;
  separator?: string | null;
}
</script>

<template>
  <div class="prop-field">
    <p v-if="description" class="prop-field__description">
      {{ description }}
    </p>
    <pre class="prop-field__container">
        <span v-if="name" class="prop-field__name">{{ name }}</span>
        <span v-if="separator" class="prop-field__separator">{{ separator }}</span>
        <span v-if="value !== undefined" class="prop-field__value">{{ value }}</span>
    </pre>
  </div>
</template>

<style lang="scss" scoped>
.prop-field {
  padding: 6px 0px;

  &__container {
    display: flex;
    align-items: center;
    gap: 4px;
    font-family: monospace;
    font-size: 14px;
    margin: 0;
    margin-bottom: 4px;
  }

  &__name,
  &__description,
  &__separator,
  &__value {
    font-family: "Roboto";
    font-size: 12.5px;
    font-weight: 400;
    margin: 0;
    padding: 0;
  }

  &__name {
    color: #019cfd;
  }

  &__description {
    color: #696969;
  }

  &__separator {
    color: #ababab;
  }

  &__value {
    white-space: nowrap;
    color: #252525;
  }
}
</style>
