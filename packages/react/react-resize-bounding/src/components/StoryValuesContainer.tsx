import React, { type PropsWithChildren } from "react";

import "./StoryValuesContainer.scss";

export type Props = PropsWithChildren;

const StoryValuesContainer = (props: Props) => {
  const { children } = props;

  return <div className="story-values-container">{children}</div>;
};

export default StoryValuesContainer;
