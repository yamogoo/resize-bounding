interface CodeBlock {
  lang: string;
  code: string;
  fileName?: string;
}

const vue3: Array<CodeBlock> = [
  {
    lang: "html",
    code: `<script setup lang="ts">
import { ref } from "vue";
import ResizeBounding from "vue3-resize-bounding";

const container = ref({
  width: 320,
  height: 480,
});

const options = {
  knob: {
    show: true,
  },
};
</script>

<template>
  <ResizeBounding
    v-model:width="container.width"
    v-model:height="container.height"
    :min-width="240"
    :max-width="480"
    :min-height="120"
    directions="hv"
    :options="options"
    :style="{ border: '1px solid gray' }"
  >
    <!-- CONTENT START -->
    <div :style="{ width: '100%', height: '100%' }">
      My Container
    </div>
    <!-- CONTENT END -->

    <!-- KNOB INNER CONTENT START -->
    <template #knob>
      <div class="some-icon" />
    </template>
    <!-- KNOB INNER CONTENT END -->
  </ResizeBounding>
</template>`,
    fileName: "App.vue",
  },
];

const react: Array<CodeBlock> = [
  {
    lang: "ts",
    code: `import { useState } from "react";
import ResizeBounding from "react-resize-bounding";

export default function App() {
  const [width, setWidth] = useState(320);
  const [height, setHeight] = useState(480);

  return (
    <ResizeBounding
      width={width}
      height={height}
      directions="hv"
      updateWidth={(width) => setWidth(width)}
      updateHeight={(height) => setHeight(height)}
      style={{ border: "1px solid gray" }}
      options={{
        knob: {
          show: true,
        },
      }}
    >
      {/* CONTENT START */}
      <div style={{ width: "100%", height: "100%" }}>My Container</div>
      {/* CONTENT END */}
    </ResizeBounding>
  );
}`,
    fileName: "App.tsx",
  },
];

export const __DOC__: Record<
  "setup" | "install" | "usage" | string,
  Array<CodeBlock>
> = {
  vue3,
  react,
};
