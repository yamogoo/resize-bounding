import ResizeBounding from "./components/ResizeBounding.vue";

export { type Props } from "./components/ResizeBounding";

export {
  PaneDirections,
  PaneDirectionAliases,
  type SplitterPosition,
  type Knob,
  type Options,
  type ResizeBoundingClassNames,
  type IResizeBoundingClassNames,
  type IStyles,
} from "./shared/typings";
export { type IStyle } from "@fluentui/merge-styles";

export {
  PREFIX,
  globalClassNames,
  getClassNames,
} from "./components/ResizeBounding.classNames";

export default ResizeBounding;
