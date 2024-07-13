import { PropsWithChildren } from "react";

import "./UIInnerBlock.scss";

interface Props extends PropsWithChildren {
  title?: string;
  imagePath?: string;
  imageDescription?: string;
}

const HInnerBlock = ({ title, imagePath }: Props) => {
  return (
    <div className={"ui-inner-block"}>
      <div
        className={"ui-inner-block--container"}
        style={{
          backgroundImage: `url(${imagePath})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="ui-inner-block__control-panel">
          <slot></slot>
        </div>
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default HInnerBlock;
