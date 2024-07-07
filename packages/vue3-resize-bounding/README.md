![image](../../demo/public/resize-bounding.svg)

# Vue3 Resize Bounding ![Version](https://img.shields.io/badge/version-1.0.0-blue) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Vue3 Resize Bounding** is a customizable, versatile and user-friendly component for Vue 3 that enables intuitive resizing of inner user components via draggable boundary panes. With resizable panes on the top, left, right, and bottom, users can seamlessly adjust the dimensions of the content within the default slot, providing a flexible and dynamic user experience. Ideal for applications requiring custom layout adjustments, this component enhances interactivity and control with ease.

> **Examples**
>
> - [Interactive Grid](./src/examples/Example.vue)
> - [Overriding](./src/examples/MyResizeBounding.vue)

---

## Documentation

### Installation and Usage

Using npm:

```bash
npm i vue3-resize-bounding
```

Using yarn:

```bash
yarn add vue3-resize-bounding
```

### Setup

The most common use case is to register the component globally.

```ts
// @filename: main.js

import App from "@/App";
import { createApp } from "vue";

const app = createApp(App);
app.use(Vue3BbResize, { name: "bb-resize" });
app.mount("#app");
```

### Usage

```html
<!-- @filename: MyComponent.vue -->

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

> **Styling/Overriding**
>
> Descriptions and examples of overriding `options` and customization `styles` are described at the end of this documentation.

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
      <td rowspan="9"><code><b>directions</b></code></td>
      <td rowspan="9"><code>string</code></td>
      <td rowspan="9" align="center"><code>'hv'</code></td>
    </tr>
    <tr>
      <td colspan="2">The literal <code>'hv'</code> specifies which boundaries should be enabled for resizing.<br><br>
      The order of the characters is not significant.
      <br>
      <sub><code>'hv'</code> is equivalent to <code>'tblr'</code></sub>
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
      <td ><code><b>disabled</b></code></td>
      <td><code>boolean</code></td>
      <td align="center"><code>false</code></td>
      <td colspan="2">Disable border selection</td> 
    </tr>
    <tr>
      <td><code><b>width</b></code></td>
      <td><code>number | undefined</code></td>
      <td align="center"><code>undefined</code></td>
      <td colspan="2">Set current container width
      </td>
    </tr>
    <tr>
      <td><code><b>minWidth</b></code></td>
      <td><code>number | undefined</code></td>
      <td align="center"><code>0</code></td>
      <td colspan="2">Minimum value of the width resizing range</td>
    </tr>
    <tr>
      <td><code><b>maxWidth</b></code></td>
      <td><code>number | undefined</code></td>
      <td align="center"><code>undefined</code></td>
      <td colspan="2">Maximum resizing range value. <code>undefiend</code>
        <br>
       <sub>Equivalent to <code>Number.POSITIVE_INFINITY</code></sub>
      </td>
    </tr>
    <tr>
      <td><code><b>height</b></code></td>
      <td><code>number | undefined</code></td>
      <td align="center"><code>0</code></td>
      <td colspan="2">Set current container height</td>
    </tr>
    <tr>
      <td><code><b>minWidth</b></code></td>
      <td><code>number | undefined</code></td>
      <td align="center"><code>0</code></td>
      <td colspan="2">Minimum height resizing range value</td>
    </tr>
    <tr>
      <td><code><b>maxWidth</b></code></td>
      <td><code>number | undefined</code></td>
      <td><code>undefined</code></td>
      <td colspan="2">The maximum value of the height resizing range. 
        <br>
       <sub>Equivalent to <code>Number.POSITIVE_INFINITY</code></sub>
      </td>
    </tr>
    <tr>
      <th colspan="5">additional options</th>
    </tr>
    <tr>
      <th >property</th>
      <th >type</th>
      <th colspan="3">value</th>
    </tr>
    <tr>
      <td rowspan="30"><code><b>options</b></code></td>
      <td rowspan="30"><code>Partial &#60;ResizeBounding.Options&#62;</code></td>
       <tr>
        <td colspan="3">
          <b><code>options.prefix</code></b>
        </td>
      </tr>
      <tr>
        <td colspan="2">description</td>
        <td colspan="2">Set prefix of class names
          <sub>
            <br>The class name is formed as:
            <code>`${prefix}__${className}`</code>
          </sub>
        </td>
      </tr>
      <tr>
        <td colspan="2">type</td>
        <td colspan="2"><code>string</code></td>
      </tr>
      <tr>
        <td colspan="2">
          default value
        </td>
        <td colspan="2">
          <code>'bb-resize'</code>
        </td>
      </tr>
      <!-- options.pane.width -->
      <tr>
        <td colspan="3">
           <b><code>options.pane.width</code></b>
        </td>
      </tr>
      <tr>
        <td colspan="2">description</td>
        <td colspan="2">Set width of splitter in pixels</td>
      </tr>
      <tr>
        <td colspan="2">type</td>
        <td colspan="2"><code>number</code></td>
      </tr>
      <tr>
        <td colspan="2">
          default value
        </td>
        <td colspan="2">
          <code>4</code>
        </td>
      </tr>
      <!-- options.pane.position -->
      <tr>
        <td colspan="3">
           <b><code>options.pane.position</code></b>
        </td>
      </tr>
      <tr>
        <td colspan="2">description</td>
        <td colspan="2">Determines the positioning of the splitter relative to the container boundaries.
        </td>
      </tr>
      <tr>
        <td colspan="2">type</td>
        <td colspan="2"><code>PanePosition</code></td>
      </tr>
      <tr>
        <td colspan="2">
          default value
        </td>
        <td colspan="2">
          <code>'central'</code>
          <br>
          <sub>*This option is sufficient for most cases. However, there are cases when using the central position may cut off the splitter or, on the contrary, partially overlap the inside of the container. Therefore, several additional options are available to adjust the positioning of the splitter</sub>
        </td>
      </tr>
      <tr>
        <td colspan="2" rowspan="4">values:</td>
      </tr>
      <tr>
        <td colspan="2">
          <code>'central'</code><br>
          at the center of the container border<br>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <code>'internal'</code><br>
          inside the container border<sub>*</sub>.
          <br>
          <sub>*This setting can be useful if the user's outer container or root component container has the CSS property "overflow: hidden".</sub>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <code>'external'</code><br>
          outside the container border
        </td>
      </tr>
      <tr>
        <td colspan="3">
          <b><code>options.pane.knob.constantlyShow</code>
        </td>
      </tr>
      <tr>
        <td colspan="2">description</td>
        <td colspan="2">Always display the knob</td>
      </tr>
      <tr>
        <td colspan="2">type</td>
        <td colspan="2"><code>boolean</code></td>
      </tr>
      <tr>
        <td colspan="3">
          <b><code>options.pane.cursor.vertical</code></b>
        </td>
      </tr>
      <tr>
        <td colspan="2">description</td>
        <td colspan="2">Cursor style for horizontal bounding during Focus and Resize</td>
      </tr>
      <tr>
        <td colspan="2">type</td>
        <td colspan="2"><code>CSSStyleDeclaration["cursor"]</code></td>
      </tr>
      <tr>
        <td colspan="2">default value</td>
        <td colspan="2"><code>'row-resize'</code></td>
      </tr>
      <tr>
        <td colspan="3">
          <b><code>options.pane.cursor.horizontal</code></b>
        </td>
      </tr>
      <tr>
        <td colspan="2">description</td>
        <td colspan="2">Cursor style for vertical bounding during Focus and Resize</td>
      </tr>
      <tr>
        <td colspan="2">type</td>
        <td colspan="2"><code>CSSStyleDeclaration["cursor"]</code></td>
      </tr>
      <tr>
        <td colspan="2">default value</td>
        <td colspan="2"><code>'col-resize'</code></td>
      </tr>
      <tr>
        <td colspan="3">
          <b><code>options.knob</code></b>
        </td>
      </tr>
      <tr>
        <td colspan="2">description</td>
        <td colspan="2">...</td>
      </tr>
    </tr>
    <tr>
      <td rowspan="20"><code><b>styles</b></code></td>
      <td rowspan="20"><code>Partial &#60;ResizeBounding.Styles&#62;</code>
        <br><br>
where <code>type Styles = Record<"container", Partial  &#60;StylingAttributes&#62;&#62 & Partial &#60;InteractiveElementStyles&#62;</code>
        <br><br>
where <code>type InteractiveElementStyles = Record&#60; "pane" | "splitter" | "knob", Record &#60;StylingStates, Partial&#60;StylingAttributes&#62;&#62; & Partial&#60;StylingAttributes&#62;&#62;</code>
      </td>
      <tr>
        <td colspan="3">
          <b><code>styles.container</code></b>
        </td>
      </tr>
      <tr>
        <td colspan="2">description</td>
        <td colspan="2">Describes custom styles the container element. Root container is the element directly in which the user content is located, forwarded through &#60;slot/&#62;.
        <br>
        <br>
        <sub>Pane receives <code>show</code> and <code>hide</code> classes respectively when displayed and when hidden. By default, no styles are attached to these classes. However, this is implemented in case you want to add styles using CSS</sub>
       </td>
      </tr>
      <tr>
        <td colspan="2">type</td>
        <td colspan="2">
          <code>Record &#60;StylingStates, Partial&#60;StylingAttributes&#62;&#62; & Partial&#60;StylingAttributes&#62;&#62;</code>
        </td>
      </tr>
      <tr>
        <td colspan="2">default value</td>
        <td colspan="2"><pre><code>container: {
  class: "container",
  style: {},
},</code></pre>
        </td>
      </tr>
      <tr>
        <td colspan="3">
          <b><code>styles.pane</code></b>
        </td>
      </tr>
      <tr>
        <td colspan="2">description</td>
        <td colspan="2">Describes custom styles the pane element. The Pane element is a container responsible for positioning the splitter. Therefore, treat this component as an empty container, since you may only need to style it in very rare cases</td>
      </tr>
      <tr>
        <td colspan="2">type</td>
        <td colspan="2"><code>{class: string, style: HTMLAttributes["style"]}</code></td>
      </tr>
      <tr>
        <td colspan="2">default value</td>
        <td colspan="2">
          <pre><code>pane: {
  class: "pane",
  style: {
    position: "absolute",
    display: "block",
    zIndex: 9999,
  },
  focused: {
    class: "focus",
  },
},</code></pre>
        </td>
      </tr>
      <tr>
        <td colspan="3">
          <b><code>styles.splitter</code></b>
        </td>
      </tr>
      <tr>
        <td colspan="2">description</td>
        <td colspan="2">Describes custom styles the splitter element. Splitter is an element that displays a selected border line</td>
      </tr>
      <tr>
        <td colspan="2">type</td>
        <td colspan="2">
          <code>Record &#60;StylingStates, Partial&#60;StylingAttributes&#62;&#62; & Partial&#60;StylingAttributes&#62;&#62;</code>
        </td>
      </tr>
      <tr>
        <td colspan="2">default value</td>
        <td colspan="2">
          <pre><code>splitter: {
  class: "splitter",
  style: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "none",
    zIndex: 9999,
  },
  focused: {
    class: "focus",
    style: { background: "gray" },
  }
},</code></pre>
        </td>
      </tr>
      <tr>
        <td colspan="3">
          <b><code>styles.knob</code></b>
        </td>
      </tr>
      <tr>
        <td colspan="2">description</td>
        <td colspan="2">Describes custom styles the knob element. Knob is a decorative element located on top of the splitter. Convenient to use with touch actions, as it increases the touch area of ​​the splitter by its own size and has a positive effect on user experience</td>
      </tr>
      <tr>
        <td colspan="2">type</td>
        <td colspan="2">
          <code>Record &#60;StylingStates, Partial&#60;StylingAttributes&#62;&#62; & Partial&#60;StylingAttributes&#62;&#62;</code>
        </td>
      </tr>
      <tr>
        <td colspan="2">default value</td>
        <td colspan="2">
          <pre><code>knob: {
  class: "knob",
  style: {},
  focused: {
    class: "focus",
  }
},</code></pre>
        </td>
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
      <td><code><b>@update:width</b></code></td>
      <td><code>(width: number) => void</code></td>
      <td colspan="2">Emitted every time a container width is updated</td> 
    </tr>
    <tr>
      <td><code><b>@update:height</b></code></td>
      <td><code>(height: number) => void</code></td>
      <td colspan="2">Emitted every time a container height is updated</td> 
    </tr>
    <tr>
      <td><code><b>@drag:start</b></code></td>
      <td><code>(direction: string) => void</code></td>
      <td colspan="2">Emitted when resizing starts. The callback function accepts an argument of current <code>direction</code></td> 
    </tr>
    <tr>
      <td><code><b>@drag:move</b></code></td>
      <td><code>(direction: string) => void</code></td>
      <td colspan="2">Emitted when resizing. The callback function accepts an argument of current <code>direction</code></td> 
    </tr>
    <tr>
      <td><code><b>@drag:end</b></code></td>
      <td><code>(direction: string) => void</code></td>
      <td colspan="2">Emitted when resizing ends. The callback function accepts an argument of current <code>direction</code></td> 
    </tr>
    <tr>
      <td><code><b>@focus</b></code></td>
      <td><code>({state: boolean, direction: string}) => void</code></td>
      <td colspan="2">Emitted when focusing on a specific boundary pane.</td> 
    </tr>
	</tbody>
</table>

---

### Overriding

#### Options:

The Options object is responsible for fine-tuning the component and setting computed parameters.

```html
<!-- @filename: MyResizeBoundingComponent.vue -->

<template>
  <Vue3BbResize
    v-bind="$attrs"
    :directions="'hv'"
    :options="{
      prefix: 'my-bb-resize',
      pane: {
        width: 12,
        position: 'internal', // 'central' | 'internal' | 'external'
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
<!-- @filename: MyResizeBoundingComponent.vue -->

<template>
  <Vue3BbResize v-bind="$attrs" :directions="'hv'" :options>
    <slot></slot>
  </Vue3BbResize>
</template>
```

```ts
// @filename: MyResizeBoundingComponent.vue

<script setup lang="ts">
import type { ResizeBounding } from 'vue3-resize-bounding';

const myOptions: Partial<ResizeBounding.Options> = {
  pane: {
    prefix: 'my-bb-resize',
    width: 12,
    knob: {
      constantlyShow: true
    },
    cursor: {
      horizontal: 'ew-resize',
    },
  },
}
```

> The example shows overriding all parameters. Of course, you can only override the properties you need.

---

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

Or you may also use the `css`/ a `preprocessor` to fully customize the component styles:

> Remember that you can override class names through the styles object

```sass
// SASS/SCSS

// Change `bb-resize` to your prefix if it has been changed via 'options'
.bb-resize {
  &-container { }

   /* * * Normal state: * * */

  &-pane { }

  &-splitter { }

  &-knob { }

  /* * * Focused state: * * */

  &.focus {
    &-pane { }

    &-splitter { }

    &-knob { }
  }
}

```

> How you override container `styles` depends on your preferences

---

#### Base styles:

Defining properties through a `styles` object does not overwrite the `"base styles"`. This is necessary to ensure that the component always displays correctly, since these styles are based on calculated properties. So you can still fully customize these elements using the `options` property.

> **Overwriting `Base Styles`**
> If, for some reason, it is still necessary to forcibly overwrite the `"base styles"`, use the `!important` flag when defining the Style/CSS property value.

Below you can see the base styles:

```ts
// Pane (an empty container that is responsible for positioning the splitter)
const paneBaseStyles = (
  size: number
): Record<PaneDirections, HTMLAttributes["style"]> => {
  const _offset = `${size / 2}px`;
  return {
    l: { top: "0px", left: _offset, width: "0px", height: "100%" },
    r: { top: "0px", right: _offset, width: "0px", height: "100%" },
    t: { left: "0px", top: _offset, width: "100%", height: "0px" },
    b: { left: "0px", bottom: _offset, width: "100%", height: "0px" },
  };
};

// Splitter
const splitterBaseStyles = (
  size: number
): Record<PaneDirections, HTMLAttributes["style"]> => {
  const _size = `${size}px`;
  return {
    l: { right: "0px", width: _size, height: "100%" },
    r: { left: "0px", width: _size, height: "100%" },
    t: { bottom: "0px", height: _size, width: "100%" },
    b: { top: "0px", height: _size, width: "100%" },
  };
};
```

---

## Author

**Mikhail Grebennikov** - [yamogoo](https://github.com/yamogoo)

This project is licensed under the terms of the [MIT license](./LICENSE).
