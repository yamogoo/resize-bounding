![image](./public/bb-resize.svg){width=64px}

# Vue3 Resize Bounding

This project is licensed under the terms of the MIT license.

## Install

```bash
npm i vue3-bb-resize
```

## Setup

```ts
// main.ts

import App from "@/App";
import { createApp } from "vue";

const app = createApp(App);
app.use(Vue3BbResize, { name: "bb-resize" });
app.mount("#app");
```

Usage

```html
<template>
  <bb-resize
    v-if="layout.dataNavigator.show"
    :width="container.width"
    :height="container.height"
    :min-width="240"
    :max-width="480"
    :min-height="120"
    @update:width="(width) => (container.width = width)"
    @update:height="(height) => (container.height = height)"
  >
    <!-- Your Component START-->
    <nav>My Container</nav>
    <!-- Your Component END-->
  </bb-resize>
</template>

<script lang="ts">
  import { ref } from "vue";

  const container = ref({
    width: 320,
    height: 480,
  });
</script>
```
