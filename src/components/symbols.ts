import { InjectionKey } from "vue";

import { BBResizeOptions } from "./typings";

export const StylesInjectionKey = Symbol() as InjectionKey<
  BBResizeOptions | undefined
>;
