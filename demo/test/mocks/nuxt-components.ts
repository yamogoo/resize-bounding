import { defineComponent, h } from "vue";

export const NuxtIcon = defineComponent({
  name: "NuxtIcon",
  props: {
    name: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    return () =>
      h("svg", {
        "data-testid": "mock-nuxt-icon",
        "data-name": props.name,
      });
  },
});
