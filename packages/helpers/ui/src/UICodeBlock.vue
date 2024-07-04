<template>
  <pre v-if="codeBlock">
      <code :lang :class="`language-${lang}`">{{ text }}<slot></slot></code>
    </pre>
  <code v-else :lang :class="`language-${lang}`">{{ text }}<slot></slot></code>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-typescript";

interface Props {
  lang: string;
  text?: string;
  codeBlock?: boolean;
}

withDefaults(defineProps<Props>(), {
  lang: "ts",
  codeBlock: false,
});

const refCode = ref<HTMLPreElement | null>(null);

onMounted(() => {
  if (refCode.value) Prism.highlightElement(refCode.value);
});
</script>

<style scoped lang="scss">
pre {
  width: 100%;
}

code {
  white-space: break-spaces;
}
</style>
