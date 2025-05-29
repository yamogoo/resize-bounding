import React from "react";

import "./StoryVersionBadge.scss";

export interface Props {
  label: string;
  value: string;
  className?: string;
  dataTestid?: string;
}

const StoryVersionBadge = (props: Props) => {
  const {
    label,
    value,
    dataTestid = "ui-badge",
    className = "ui-badge",
  } = props;

  return (
    <div className={className} data-testid={dataTestid}>
      <span className="ui-badge__label" data-testid="ui-badge-label">
        {label}
      </span>
      <span className="ui-badge__value" data-testid="ui-badge-value">
        {value}
      </span>
    </div>
  );
};

export default StoryVersionBadge;
