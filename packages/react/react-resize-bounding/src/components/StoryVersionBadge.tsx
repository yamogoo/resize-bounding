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
    className,
  } = props;

  const badgeClassName = ["ui-badge", className].filter(Boolean).join(" ");

  return (
    <div className={badgeClassName} data-testid={dataTestid}>
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
