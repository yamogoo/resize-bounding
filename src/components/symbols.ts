import { type InjectionKey } from "vue";

import type { BBResizeStyles } from "./typings";

export const StylesInjectionKey = Symbol() as InjectionKey<
  BBResizeStyles | undefined
>;
