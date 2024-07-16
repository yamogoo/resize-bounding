import { PropsWithChildren } from "react";

import UIInput from "./UIInput";
import "./UISizeField.scss";

import { colors } from "@/components/colors";
interface Props extends PropsWithChildren {
  width?: number;
  height?: number;
  label?: string;
  updateWidth?: (width: number) => void;
  updateHeight?: (height: number) => void;
}

const UISizeField = ({ width, height, updateWidth, updateHeight }: Props) => {
  return (
    <div
      className="ui-size-field"
      style={{
        backgroundColor: colors.backgroundSecondary,
        color: colors.foregroundSecondary,
      }}
    >
      <UIInput
        label={"W:"}
        value={width}
        disabled={width === undefined}
        updateValue={(width) => {
          typeof updateWidth === "function" && updateWidth(width);
        }}
      />
      <UIInput
        label={"H:"}
        value={height}
        disabled={height === undefined}
        updateValue={(height) => {
          typeof updateHeight === "function" && updateHeight(height);
        }}
      />
    </div>
  );
};

export default UISizeField;
