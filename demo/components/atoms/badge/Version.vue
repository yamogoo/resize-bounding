<template>
  <AtomsBadgeBase label="version" :value="version" />
</template>

<script setup lang="ts">
withDefaults(defineProps<Props>(), {
  version: "0.0.0",
});
</script>

<script lang="ts">
export interface Props {
  version?: string;
}
</script>
