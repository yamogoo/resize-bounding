interface CodeBlock {
  lang: string;
  code: string;
  fileName?: string;
}

const vue3: Array<CodeBlock> = [
  {
    lang: "html",
    code: `<!-- @filename: MyComponent.vue -->
<script setup lang="ts">
  import { ref } from "vue";
  import ResizeBounding from "vue3-resize-bounding";

  const container = ref({ width: 320, height: 480 });
</script>

<template>
  <ResizeBounding
    :width="container.width"
    :height="container.height"
    :min-width="240"
    :max-width="480"
    :min-height="120"
    :directions="'hv'"
    :options="{
        knob: {
          show: true
        }
    }"
    :style="{ border: '1px solid gray' }"
    @update:width="(width) => (container.width = width)"
    @update:height="(height) => (container.height = height)"
  >
    <!-- CONTENT START -->
    <div :style="{ width: '100%', height: '100%' }">My Container</div>
    <!-- CONTENT END -->

    <!-- KNOB INNER CONTENT START -->
    <template #knob>
      <div class="some-icon"></div>
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

const setup: Array<CodeBlock> = [
  {
    lang: "ts",
    code: `import App from "@/App";
import { createApp } from "vue";

import Vue3ResizeBounding from "vue3-resize-bounding";

const app = createApp(App);
app.use(Vue3ResizeBounding, { name: "resizer" });
app.mount("#app");`,
    fileName: "main.ts",
  },
];

const usage: Array<CodeBlock> = [
  {
    lang: "html",
    code: `<template>
  <resizer
    :width="container.width"
    :height="container.height"
    :min-width="240"
    :max-width="480"
    :min-height="120"
    @update:width="(width) => (container.width = width)"
    @update:height="(height) => (container.height = height)"
  >
    <!-- CONTENT START -->
    <div style="width="100%; height: 100%;>My Container</div>
    <!-- CONTENT END -->

    <!-- KNOB INNER CONTENT START -->
    <template #knob>
      <div class="some-icon"></div>
    </template>
    <!-- KNOB INNER CONTENT END -->
  <resize-bounding>
</template>

<script lang="ts">
  import { ref } from "vue";
  const container = ref({ width: 320, height: 480 });
</script>`,
    fileName: "MyComponent.vue",
  },
];

const defaultStyles: Array<CodeBlock> = [
  {
    lang: "html",
    code: `<template>
    <resizer :options :styles>
      <!-- CONTENT START -->
      <div style="width="100%; height: 100%;>My Container</div>
      <!-- CONTENT END -->

      <!-- KNOB INNER CONTENT START -->
      <template #knob>
        <div class="some-icon"></div>
      </template>
      <!-- KNOB INNER CONTENT END -->
    </resizer>
  </template>
  
  <script lang="ts">
    import Resizer, { PREFIX } from "vue3-resize-bounding";

    /* * * Default styles and classes * * */

    const options = {
      knob: {
        show: true,
      }
    };

    const styles = {
      // "container" is element that wraps the content
      container: {
        displayName: \`\${PREFIX}container\`,
        position: 'relative'
      },

      // "pane" is element used to position the separator.
      // Consider it a supporting element. In rare cases,
      // stylization is possible
      pane: [
        \`\${PREFIX}pane\`,
        {
          displayName: \`\${PREFIX}pane\`,
          position: 'absolute',
          display: 'block',
          zIndex: 9999,
          touchAction: "none",
        }
      ],

      // "splitter" is visible container border
      splitter: [
        \`\${PREFIX}splitter\`,
        {
          displayName: \`\${PREFIX}splitter\`,
          position: 'absolute',
          zIndex: 9999,
          transition: 'background 125ms ease-out',
          ':hover': {
            background: 'cornflowerblue',
          },
        },
      ],

      // "splitterContainer" is empty element used
      // to rotating the knob
      splitterContainer: [
        \`\${PREFIX}splitter--container\`,
        {
          displayName: \`\${PREFIX}splitter--container\`,
          position: "relative",
          top: "50%",
          left: "50%",
          width: "0px",
          height: "0px",
        },
      ],

      // knob container
      knob: [
         \`\${PREFIX}knob\`,
        {
          displayName: \`\${PREFIX}knob\`,
          position: "relative",
          width: "64px",
          height: "8px",
          background: "gray",
          borderRadius: "4px",
          transform: "translate(-50%, -50%)",
          transition: "background 125ms ease-out",
          [\`.\${PREFIX}pane :hover &\`]: {
            background: "cornflowerblue",
          },
        },
      ],
    };
    
  </script>`,
    fileName: "MyComponent.vue",
  },
];

const cssStyling: Array<CodeBlock> = [
  {
    lang: "html",
    code: `<template>
  <resizer :options />
</template>

<script lang="ts">
  const options = ref({ prefix: 'ui-resizer__' });
</script>`,
    fileName: "MyComponent.vue",
  },
  {
    lang: "scss",
    code: `<style lang="scss">
$prefix: "ui-resizer__";

.#{$prefix} {
  &pane {

    // normal state:
    .#{$prefix}splitter {
      background: $accent;
    }

    .#{$prefix}knob {
      background: $knob-color;
      border: 1px solid $secondary;
    }

    // selected state:
    &.focused {
      .#{$prefix}splitter {
        background: transparentize(accent, 0);
      }
    }
  }

  &splitter {
    transition: background 125ms ease-out;
  }
}
</style>`,
  },
];

export const __DOC__: Record<
  "setup" | "install" | "usage" | string,
  Array<CodeBlock>
> = {
  vue3,
  react,
  // vue3Setup,
  // vue3Usage,
  // defaultStyles,
  // cssStyling,
};
