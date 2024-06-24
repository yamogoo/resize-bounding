<style>
html body table td, html body table th {
    padding: 12px 12px;
}

html body table th {
    font-weight: 500;
    white-space: nowrap;
}

.table-fonts {
  font-family: Helvetica, "Trebuchet MS", Monospace, sans-serif;
  line-height: 1.5;
}

.prop{
  color: #795da3;
  white-space: nowrap;
}

.type{
  font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
  color: #63a35c;
  white-space: nowrap;
}

.value{
  font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
  color: #a71d5d;
  text-align: center;
}

.meaning{
  color: #969896;
}

.description{
  color: #969896;
}

.nottice{
  color: #969896;
}

.f-xs {
  font-size: 10px;
}

.f--sm {
  font-size: 13px;
}

.f--md {
  font-size: 16px;
}

</style>

![image](./public/bb-resize.svg)

# Vue3 Resize Bounding

This project is licensed under the terms of the MIT license.

### Install

```bash
npm i vue3-bb-resize
```

### Setup

```ts
import App from "@/App";
import { createApp } from "vue";

const app = createApp(App);
app.use(Vue3BbResize, { name: "bb-resize" });
app.mount("#app");
```

### Properties

<table class="table-fonts">
  <thead>
    <th>property</th>
    <th>type</th>
    <th>default value</th>
    <th width="100%" colspan="2">description</th>
  </thead>
	<tbody>
		<tr>
      <tr>
        <td class="prop" rowspan="9">directions</td>
        <td class="type" rowspan="9">string</td>
        <td class="value" rowspan="9">'r'</td>
      </tr>
      <tr>
        <td class="description" colspan="2"><span class="value">'trbl'</span><br>The literal describes which boundaries should be enabled for resizing.<br>
        <span>The order of characters does not matter.</span>
        </td>
      </tr>
      <th>value</th>
			<th>type</th>
      <tr>
        <td class="value">'t'</td>
        <td class="meaning">top</td>
      </tr>
      <tr>
        <td class="value">'r'</td>
        <td class="meaning">right</td>
      </tr>
      <tr>
        <td class="value">'b'</td>
        <td class="meaning">bottom</td>
      </tr>
      <tr>
        <td class="value">'l'</td>
        <td class="meaning">left</td>
      </tr>
      <tr>
        <td class="value">'h'</td>
        <td class="meaning">horizontal, equivalent to <span class="value">'lr'</span></td>
      </tr>
      <tr>
        <td class="value">'v'</td>
        <td class="meaning">vertical, equivalent to <span class="value">'lb'</span></td>
      </tr>
    </tr>
    <tr>
      <td class="prop">disabled</td>
      <td class="type">boolean</td>
      <td class="value">false</td>
      <td class="description" colspan="2">Disable border selection</td> 
    </tr>
    <tr>
      <td class="prop">width</td>
      <td class="type">number | undefined</td>
      <td><span class="value">undefined</span></td>
      <td class="description" colspan="2">Set current container width. <span class="value">undefiend</span> means <span class="value">Number.POSITIVE_INFINITY</span></td>
    </tr>
    <tr>
      <td class="prop">minWidth</td>
      <td class="type">number | undefined</td>
      <td class="value">0</td>
      <td class="description" colspan="2">Minimum value of the width resizing range</td>
    </tr>
    <tr>
      <td class="prop">maxWidth</td>
      <td class="type">number | undefined</td>
      <td><span class="value">undefined</span></td>
      <td class="description" colspan="2">Maximum resizing range value. <span class="value">undefiend</span> means <span class="value">Number.POSITIVE_INFINITY</span></td>
    </tr>
    <tr>
      <td class="prop">height</td>
      <td class="type">number | undefined</td>
      <td class="value">0</td>
      <td class="description" colspan="2">Set current container height</td>
    </tr>
    <tr>
      <td class="prop">minWidth</td>
      <td class="type">number | undefined</td>
      <td class="value">0</td>
      <td class="description" colspan="2">Minimum height resizing range value</td>
    </tr>
    <tr>
      <td class="prop">maxWidth</td>
      <td class="type">number | undefined</td>
      <td><span class="value">undefined</span></td>
      <td class="description" colspan="2">The maximum value of the height resizing range. <span class="value">undefiend</span> means <span class="value">Number.POSITIVE_INFINITY</span></td>
    </tr>
	</tbody>
</table>

### Events

<table class="table-fonts">
  <thead>
    <th  width="180px">property</th>
    <th>type</th>
    <th width="100%" colspan="2">description</th>
  </thead>
	<tbody>
    <tr>
      <td class="prop">@update:width</td>
      <td class="type">(width: number) => void</td>
      <td class="description" colspan="2">Emitted every time a container width is updated</td> 
    </tr>
    <tr>
      <td class="prop">@update:height</td>
      <td class="type">(height: number) => void</td>
      <td class="description" colspan="2">Emitted every time a container height is updated</td> 
    </tr>
    <tr>
      <td class="prop">@drag:start</td>
      <td class="type">(direction: string) => void</td>
      <td class="description" colspan="2">Emitted when resizing starts. The callback function accepts the argument of direction type.</td> 
    </tr>
    <tr>
      <td class="prop">@drag:move</td>
      <td class="type">(direction: string) => void</td>
      <td class="description" colspan="2">Emitted when resizing. The callback function accepts the argument of direction type.</td> 
    </tr>
    <tr>
      <td class="prop">@drag:end</td>
      <td class="type">(direction: string) => void</td>
      <td class="description" colspan="2">Emitted when resizing ends. The callback function accepts the argument of direction type.</td> 
    </tr>
	</tbody>
</table>

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
    <!-- YOUR COMPONENT START-->
    <nav style="width="100%; height: 100%;>My Container</nav>
    <!-- YOUR COMPONENT END-->
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
