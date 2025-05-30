import locales from "@/locales";

export type SystemTheme = "light" | "dark";
export type Theme = SystemTheme;

export type Themes = Array<Theme>;

export interface ISize {
  width: number;
  height: number;
}

export type UIElementColor =
  | "primary"
  | "primary-inversed"
  | "primary-transparent"
  | "secondary"
  | "secondary-inversed"
  | "secondary-transparent"
  | "tertiary"
  | "accent"
  | "disabled"
  | "warning"
  | "error"
  | "info";

export type UIElementSize =
  | "xxxs"
  | "xxs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl";

export type UIElementDirection = "ltr" | "rtl";

export type UIElementOrientation = "horizontal" | "vertical";

export type UIElementAlignment = "start" | "center" | "end";

export type Locale = keyof typeof locales;
