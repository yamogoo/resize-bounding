import React, { PropsWithChildren } from "react";

import "./StoryResizeBoundingCover.scss";

import StoryCoverMainLogo from "./StoryCoverMainLogo";
import StoryVersionBadge from "./StoryVersionBadge";

export interface Props extends PropsWithChildren {}

const VERSION = import.meta.env.APP_VERSION;

const StoryResizeBoundingCover = () => {
  return (
    <div className="resize-bounding-cover">
      <div className="resize-bounding-cover__container">
        <div className="resize-bounding-cover__logo">
          <StoryCoverMainLogo></StoryCoverMainLogo>
          <p className="resize-bounding-cover__text">REACT</p>
        </div>
        <StoryVersionBadge
          className="resize-bounding-cover__version-badge"
          label="version"
          value={VERSION}
        ></StoryVersionBadge>
      </div>
    </div>
  );
};

export default StoryResizeBoundingCover;
