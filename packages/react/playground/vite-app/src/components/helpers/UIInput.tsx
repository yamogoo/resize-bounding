import { strToNum } from "./utils";
import "./UIInput.scss";
import { useId } from "react";

interface Props {
  value?: number;
  disabled?: boolean;
  label?: string;
  updateValue: (value: number) => void;
}

const UIInput = ({
  value = 0,
  label,
  disabled = false,
  updateValue,
}: Props) => {
  const id = useId();

  return (
    <div className={`ui-input ${disabled && "disabled"}`}>
      {label && (
        <label htmlFor={id} className="ui-input__label">
          {label}
          {!disabled && (
            <input
              id={id}
              type="number"
              value={value}
              onChange={(e) => {
                updateValue(strToNum((e.target as HTMLInputElement).value));
              }}
            />
          )}
        </label>
      )}
      {disabled && <span>--</span>}
    </div>
  );
};

export default UIInput;
