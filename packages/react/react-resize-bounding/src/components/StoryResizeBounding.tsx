import React from "react";
import { Props as ResizeBoundingProps } from "../../lib/components/ResizeBounding";

import "./StoryResizeBounding.scss";

import ResizeBounding from "../../lib/components/ResizeBounding";
import StoryResizeBoundingCover from "./StoryResizeBoundingCover";

export interface Props extends ResizeBoundingProps {
  showCover?: boolean;
}

const StoryResizeBounding = (props: Partial<Props>) => {
  const { showCover } = props;
  return (
    <ResizeBounding {...props}>
      {showCover ? (
        <StoryResizeBoundingCover></StoryResizeBoundingCover>
      ) : (
        <div className="resize-bounding-content">
          <div v-if="!showCover" className="resize-bounding-content__container">
            <h3>Slot</h3>
            <p>Place the subcomponent in the default slot</p>
          </div>
        </div>
      )}
    </ResizeBounding>
  );
};

export default StoryResizeBounding;
