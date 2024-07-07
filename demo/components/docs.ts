interface CodeBlock {
  lang: string;
  code: string;
  fileName?: string;
}

const setup: CodeBlock = {
  lang: "ts",
  code: `import App from "@/App";
import { createApp } from "vue";

import Vue3ResizeBounding from "vue3-resize-bounding";

const app = createApp(App);
app.use(Vue3ResizeBounding, { name: "resize-bounding" });
app.mount("#app");`,
  fileName: "main.ts",
};

const usage: CodeBlock = {
  lang: "html",
  code: `<template>
  <resize-bounding
    :width="container.width"
    :height="container.height"
    :min-width="240"
    :max-width="480"
    :min-height="120"
    @update:width="(width) => (container.width = width)"
    @update:height="(height) => (container.height = height)"
  >
    <!-- YOUR COMPONENT START -->
    <div style="width="100%; height: 100%;>My Container</div>
    <!-- YOUR COMPONENT END -->
  <resize-bounding>
</template>

<script lang="ts">
  import { ref } from "vue";
  const container = ref({ width: 320, height: 480 });
</script>`,
  fileName: "MyComponent.vue",
};

const styling: CodeBlock = {
  lang: "html",
  code: `<template>
  <resize-bounding :options />
</template>

<script lang="ts">
  const options = ref({ prefix: 'ui-resizer__', css: true });
</script>`,
  fileName: "MyComponent.vue",
};

const styling2: CodeBlock = {
  lang: "scss",
  code: `<style lang="scss">
$prefix: "ui-resizer__";

.#{$prefix} {
  &container { }
  &splitter { background: none !important; }

  &pane {
    &.normal {
      .#{$prefix}splitter {}
    }

    &.focused {
      .#{$prefix}splitter {
        background: red !important;
      }
    }
  }
}
</style>`,
};

export const __DOC__: Record<
  "setup" | "install" | "usage" | string,
  Array<CodeBlock>
> = {
  setup: [setup],
  usage: [usage],
  styling: [styling, styling2],
};
