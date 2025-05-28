import React from "react";

import "./StoryPropField.scss";

export interface Props {
  name?: string;
  description?: string;
  value?: string | number;
  separator?: string | null;
}

const StoryPropField = ({
  name,
  description,
  value,
  separator = "=",
}: Props) => {
  return (
    <div className="prop-field">
      {description && <p className="prop-field__description">{description}</p>}
      <pre className="prop-field__container">
        {name && <span className="prop-field__name">{name}</span>}
        {separator && name && (
          <span className="prop-field__separator">{separator}</span>
        )}
        {value !== undefined && (
          <span className="prop-field__value">{value}</span>
        )}
      </pre>
    </div>
  );
};

export default StoryPropField;
