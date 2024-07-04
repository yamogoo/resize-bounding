const setup = {
  lang: "ts",
  text: `
import App from "@/App";
import { createApp } from "vue";
const app = createApp(App);
app.use(Vue3BbResize, { name: "bb-resize" });
app.mount("#app");
`,
};

const install = {
  lang: "bash",
  text: `
npm i -D vue3-bb-resize

yarn add vue3-bb-resize
  `,
};

export const __DOC__ = {
  setup,
  install,
};
