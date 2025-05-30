<script setup lang="ts" generic="T">
const props = withDefaults(defineProps<Props<T>>(), {
  isCurrentOptionShown: false,
});

const emit = defineEmits<{
  (e: "select", option: T): void;
}>();

const onSelect = (option: T): void => {
  emit("select", option);
};

const showCurrentOption = (key: T) => {
  if (!props.isCurrentOptionShown) {
    return key !== props.value;
  }

  return true;
};
</script>

<script lang="ts">
export type Items<T> = Array<T>;

export interface Props<T> {
  value: T;
  items: Items<T>;
  isCurrentOptionShown?: boolean;
}
</script>

<template>
  <ul class="options">
    <template v-for="key in items" :key="key">
      <li
        v-if="showCurrentOption(key)"
        class="options__option"
        data-testid="options__option"
        @click="onSelect(key)"
      >
        {{ `${typeof key === "string" && !$slots.default ? key : ""}` }}
        <slot :value="key"></slot>
      </li>
    </template>
  </ul>
</template>

<style lang="scss">
@use "sass:map";

.options {
  margin: 0;
  padding: 0;

  &__option {
    @extend %t__label__1;
    min-height: px2rem(map.get(map.get($options, "option"), "minHeight"));
    @include themify($themes) {
      color: themed("label", "primary");
    }
    list-style: none;
    cursor: pointer;

    @include transition(
      color background background-color fill stroke opacity,
      150ms,
      ease-out
    );

    &:hover {
      opacity: 0.5;
    }
  }
}
</style>
