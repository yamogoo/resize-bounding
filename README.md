![image](./public/bb-resize.svg)

# Vue3 Resize Bounding ![Version](https://img.shields.io/badge/version-0.0.1-blue) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Vue3 Resize Bounding** is a highly-customizable, versatile and user-friendly component for Vue 3 that enables intuitive resizing of inner user components via draggable boundary panes. With resizable panes on the top, left, right, and bottom, users can seamlessly adjust the dimensions of the content within the default slot, providing a flexible and dynamic user experience. Ideal for applications requiring custom layout adjustments, this component enhances interactivity and control with ease.

> **Examples**
>
> - [Interactive Grid](./src/examples/Example.vue)
> - [Editor Layout](./src/examples/Example.vue)
> - [Navigator Layout](./src/examples/Example.vue)

---

## Documentation

### Installation and Usage

Using npm:

```bash
npm i vue3-bb-resize
```

Using yarn:

```bash
yarn add vue3-bb-resize
```

### Setup

The most common use case is to register the component globally.

```ts
// main.js
import App from "@/App";
import { createApp } from "vue";

const app = createApp(App);
app.use(Vue3BbResize, { name: "bb-resize" });
app.mount("#app");
```

### Usage

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
    <!-- YOUR COMPONENT START -->
    <div style="width="100%; height: 100%;>My Container</div>
    <!-- YOUR COMPONENT END -->
  </bb-resize>
</template>

<script>
  import { ref } from "vue";
  const container = ref({ width: 320, height: 480 });
</script>
```

### Properties

<table class="table-fonts">
  <thead>
    <tr>
	    <th style="width: 320px;">property</th>
	    <th style="width: 320px;">type</th>
	    <th>default value</th>
	    <th colspan="2" >description</th>
    </tr>
  </thead>
<tbody>
      <tr>
	<td rowspan="9"><code>directions</code></td>
	<td rowspan="9"><code>string</code></td>
	<td rowspan="9"><code>''</code></td>
    </tr>
      <tr>
        <td colspan="2">The literal <code>'trbl'</code> specifies which boundaries should be enabled for resizing. The order of the characters is not significant.</span>
        </td>
      </tr>
      <th>value</th>
      <th>description</th>
      <tr>
        <td>'t'</td>
        <td>top</td>
      </tr>
      <tr>
        <td>'r'</td>
        <td>right</td>
      </tr>
      <tr>
        <td>'b'</td>
        <td>bottom</td>
      </tr>
      <tr>
        <td>'l'</td>
        <td>left</td>
      </tr>
      <tr>
        <td>'h'</td>
        <td>horizontal alias, equivalent to <code>'lr'</code></td>
      </tr>
      <tr>
        <td>'v'</td>
        <td>vertical alias, equivalent to <code>'tb'</code></td>
      </tr>
    <tr>
      <td><code>disabled</code></td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
      <td colspan="2">Disable border selection</td> 
    </tr>
    <tr>
      <td><code>width</code></td>
      <td><code>number | undefined</code></td>
      <td><code>undefined</code></td>
      <td colspan="2">Set current container width. <code>undefiend</code> Equivalent to <code>Number.POSITIVE_INFINITY</code></td>
    </tr>
    <tr>
      <td><code>minWidth</code></td>
      <td><code>number | undefined</code></td>
      <td><code>0</code></td>
      <td colspan="2">Minimum value of the width resizing range</td>
    </tr>
    <tr>
      <td><code>maxWidth</code></td>
      <td><code>number | undefined</code></td>
      <td><code>undefined</code></td>
      <td colspan="2">Maximum resizing range value. <code>undefiend</code> Equivalent to <code>Number.POSITIVE_INFINITY</code></td>
    </tr>
    <tr>
      <td><code>height</code></td>
      <td><code>number | undefined</code></td>
      <td><code>0</code></td>
      <td colspan="2">Set current container height</td>
    </tr>
    <tr>
      <td><code>minWidth</code></td>
      <td><code>number | undefined</code></td>
      <td><code>0</code></td>
      <td colspan="2">Minimum height resizing range value</td>
    </tr>
    <tr>
      <td><code>maxWidth</code></td>
      <td><code>number | undefined</code></td>
      <td><code>undefined</code></td>
      <td colspan="2">The maximum value of the height resizing range. <code>undefiend</code> Equivalent to <code>Number.POSITIVE_INFINITY</code></td>
    </tr>
    <tr>
      <th colspan="5">additional options</th>
    </tr>
    <tr>
      <th >property</th>
      <th >type</th>
      <th colspan="3">default value</th>
    </tr>
    <tr>
      <td rowspan="4"><code>options</code></td>
      <td rowspan="4"><code>Partial &#60BBResize.Options&#62</code></td>
      <tr>
        <td colspan="3">
          Always display knob:<br>
          <code>options.pane.knob.constantlyShow: boolean</code>
        </td>
      </tr>
      <tr>
      <td colspan="3">
        Cursor style for horizontal bounding during Focus and Resize:<br>
        <code>options.pane.cursor.vertical</code>: <code>'row-resize'</code>
        </td>
      </tr>
      <tr>
      <td colspan="3">
         Cursor style for vertical bounding during Focus and Resize: <br>
        <code>options.pane.cursor.horizontal</code>: <code>'col-resize'</code>
      </td>
      </tr>
    </tr>
    <tr>
      <td rowspan="3"><code>styles</code></td>
      <td rowspan="3"><code>Partial &#60BBResize.Styles&#62</code></td>
      <tr>
        <td colspan="3">
        Sets custom styles for each component class:<br>
        <code>Record<
    "container" | "pane" | "splitter" | "knob",
    HTMLAttributes["style"]
  ></code><br><br>
  where class name is: <code>`${prefix}__${name}`</code><br>
        </td>
      </tr>
      <tr>
      </tr>
    </tr>
	</tbody>
</table>

### Events

<table class="table-fonts">
  <thead>
    <tr>
	    <th>property</th>
	    <th style="width: 280px;">type</th>
	    <th colspan="2">description</th>
    </tr>
  </thead>
	<tbody>
    <tr>
      <td><code>@update:width</code></td>
      <td><code>(width: number) => void</code></td>
      <td colspan="2">Emitted every time a container width is updated</td> 
    </tr>
    <tr>
      <td><code lang="diff">@update:height</code></td>
      <td><code lang="css">(height: number) => void</code></td>
      <td colspan="2">Emitted every time a container height is updated</td> 
    </tr>
    <tr>
      <td><code>@drag:start</code></td>
      <td><code>(direction: string) => void</code></td>
      <td colspan="2">Emitted when resizing starts. The callback function accepts an argument of current <code>direction</code></td> 
    </tr>
    <tr>
      <td><code>@drag:move</code></td>
      <td><code>(direction: string) => void</code></td>
      <td colspan="2">Emitted when resizing. The callback function accepts an argument of current <code>direction</code></td> 
    </tr>
    <tr>
      <td><code>@drag:end</code></td>
      <td><code>(direction: string) => void</code></td>
      <td colspan="2">Emitted when resizing ends. The callback function accepts an argument of current <code>direction</code></td> 
    </tr>
    <tr>
      <td><code>@focus</code></td>
      <td><code>({state: boolean, direction: string}) => void</code></td>
      <td colspan="2">Emitted when focusing on a specific boundary pane.</td> 
    </tr>
	</tbody>
</table>

---

### Overriding

#### Options:

The Options object is responsible for fine-tuning the component and setting calculated parameters.

```html
<!-- MyResizeBoundingComponent.vue -->
<template>
  <Vue3BbResize
    v-bind="$attrs"
    :directions="'hv'"
    :options="{
      prefix: 'my-bb-resize',
      pane: {
        width: 12,
        cursor: {
          horizontal: 'ew-resize',
        },
      },
    }"
  >
    <slot></slot>
  </Vue3BbResize>
</template>
```

Using typescript:

```html
<!-- MyResizeBoundingComponent.vue -->
<template>
  <Vue3BbResize v-bind="$attrs" :directions="'hv'" :options>
    <slot></slot>
  </Vue3BbResize>
</template>
```

```ts
// MyResizeBoundingComponent.vue
<script setup lang="ts">
import type { BBResize } from 'vue3-bb-resize';

const myOptions: Partial<BBResize.Options> = {
  pane: {
    prefix: 'my-bb-resize',
    width: 12,
    cursor: {
      horizontal: 'ew-resize',
    },
  },
}
```

#### Custom Styling

To customize styles, use the `styles` props object:

```ts
const styles = {
  container: { display: "flex" },
  splitter: { background: "red" },
  knob: { width: "12px", height: "120px" },
};
```

Or you may also use the inline `style` attribute to set container styles:

```html
<Vue3BbResize
  :directions="'hv'"
  :style="{ display: flex }"
  :styles="{
    splitter: { background: yellow },
    knob: { width: '12px', height: '120px' }
  }"
>
</Vue3BbResize>
```

> How you override container `styles` depends on your preferences

---

## Author

**Mikhail Grebennikov** - [yamogoo](https://github.com/yamogoo)

This project is licensed under the terms of the [MIT license](./LICENSE).
