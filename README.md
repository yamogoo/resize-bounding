![image](/shared/images/resize-bounding-w-descriptor.svg)

**Resize Bounding** is a simple component for Vue3/React that allows you to intuitively resize nested content using draggable border panels.

|                                         | Package name                                                             | Installation                                                     | Example                                                                                                                                          | Version / License                                                                                                                             |
| --------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| ![image](/shared/images/vue-logo.svg)   | [Vue3 Resize Bounding](/packages/vue/vue3-resize-bounding/README.md)     | `npm i vue3-resize-bounding`                                     | [Interactive Grid](https://github.com/yamogoo/resize-bounding/blob/v2.0.1/packages/vue/playground/vite-app/src/components/InteractiveGrid.vue)   | ![Version](https://img.shields.io/badge/version-2.0.1-green) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE) |
| ![image](/shared/images/react-logo.svg) | [React Resize Bounding](/packages/react/react-resize-bounding/README.md) | `npm i react-resize-bounding`                                    | [Interactive Grid](https://github.com/yamogoo/resize-bounding/blob/v2.0.1/packages/react/playground/vite-app/src/components/InteractiveGrid.tsx) | ![Version](https://img.shields.io/badge/version-1.0.1-blue) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)   |
| ![image](/shared/images/figma-logo.svg) | UI Component for Figma                                                   | [link](https://www.figma.com/community/file/1392603830584852243) |                                                                                                                                                  | [![License: MIT](https://img.shields.io/badge/License-CCBY4.0-red.svg)](https://creativecommons.org/licenses/by/4.0/)                         |

[Demo](https://resize-bounding.netlify.app/)

![image](https://raw.githubusercontent.com/yamogoo/resize-bounding/v2.0.1/shared/images/resize-bounding.gif)

---

**Vue3 Usage**

```html
<!-- @filename: MyComponent.vue -->
<script>
  import { ref } from "vue";
  import ResizeBounding from "vue3-resize-bounding";

  const container = ref({ width: 320, height: 480 });
</script>

<template>
  <resize-bounding
    :width="container.width"
    :height="container.height"
    :min-width="240"
    :max-width="480"
    :min-height="120"
    :style="{ border: "1px solid gray" }"
    @update:width="(width) => (container.width = width)"
    @update:height="(height) => (container.height = height)"
  >
    <!-- CONTENT START -->
    <div :style="{ width:'100%'; height: '100%' }">My Container</div>
    <!-- CONTENT END -->
  </resize-bounding>
</template>
```

**React Usage**

```tsx
// @filename: MyComponent.tsx (.js)
import { useState } from "react";
import ResizeBounding from "react-resize-bounding";

export default function MyComponent() {
  const [width, setWidth] = useState(320);
  const [height, setHeight] = useState(480);

  return (
    <resize-bounding
      width={width}
      height={height}
      updateWidth={(width) => setWidth(width)}
      updateHeight={(height) => setHeight(height)}
      style={{ border: "1px solid gray" }}
    >
      {/* CONTENT START */}
      <div style={{ width: "100%", height: "100%" }}>My Container</div>
      {/* CONTENT END */}
    </resize-bounding>
  );
}
```

---

## Author

**Mikhail Grebennikov** - [yamogoo](https://github.com/yamogoo)
