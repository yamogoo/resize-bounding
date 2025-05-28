import React from "react";

import "./StoryVersionBadge.scss";

export interface Props {
  label: string;
  value: string;
  className: string;
}

const StoryVersionBadge = (props: Props) => {
  const { label, value } = props;

  return (
    <div className="ui-badge" data-testid="ui-badge">
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
