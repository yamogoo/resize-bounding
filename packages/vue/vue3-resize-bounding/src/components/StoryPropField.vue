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
        <span v-if="separator && name" class="prop-field__separator">{{ separator }}</span>
        <span v-if="value !== undefined" class="prop-field__value">{{ value }}</span>
    </pre>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/utils.scss" as *;
@use "../assets/scss/colors.scss" as *;
@use "../assets/scss/typography.scss" as *;

.prop-field {
  padding: px2rem(0px) px2rem(0px);

  &__container {
    display: flex;
    align-items: center;
    gap: px2rem(4px);
    font-family: monospace;
    font-size: px2em(14px);
    margin: 0;
    margin-bottom: 0px;
  }

  &__name,
  &__description,
  &__separator,
  &__value {
    font-family: $font-family;
    font-size: px2em(12.5px);
    font-weight: 400;
    margin: 0;
    padding: 0;
  }

  &__name {
    color: #019cfd;
  }

  &__description {
    margin-top: px2rem(8px);
    color: #696969;
  }

  &__separator {
    color: #ababab;
  }

  &__value {
    white-space: nowrap;
    color: $label;
  }
}
</style>
