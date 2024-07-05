<template>
  <AtomsLinksBaseLink :to :class="[`--${size}`]">
    <NuxtIcon v-if="iconName" class="ui-link__icon" :name="iconName" :filled />
    <span class="ui-link__name">{{ name }}</span>
  </AtomsLinksBaseLink>
</template>

<script setup lang="ts">
interface Props {
  to?: string;
  name: string;
  iconName: string;
  size?: "md" | "lg";
  filled?: boolean;
}

withDefaults(defineProps<Props>(), {
  to: "/",
  size: "lg",
});
</script>

<style lang="scss">
[class^="ui-link"] {
  .ui-link__icon {
  }

  .ui-link__name {
  }
}

.ui {
  &-link {
    &.--md {
      .ui-link__icon {
        margin: 10px;

        svg {
          @include box(24px);
        }
      }

      .ui-link__name {
        @include use-font-size(--md);
      }
    }

    &.--lg {
      .ui-link__icon {
        margin: 10px;

        svg {
          @include box(36px);
        }
      }

      .ui-link__name {
        @include use-font-size(--lg);
      }
    }
  }
}
</style>
