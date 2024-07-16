import { PropsWithChildren } from "react";

import { colors } from "@/components/colors";
import "./UIInnerBlock.scss";

interface Props extends PropsWithChildren {
  title?: string;
  imagePath?: string;
  imageDescription?: string;
  showLogo?: boolean;
}

const HInnerBlock = ({
  children,
  title,
  imagePath,
  showLogo = false,
}: Props) => {
  return (
    <div className={"ui-inner-block"}>
      <div
        className={"ui-inner-block--container"}
        style={{
          backgroundImage: `url(${imagePath})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundColor: colors.backgroundPrimary,
        }}
      >
        <div className="ui-inner-block__control-panel">{children}</div>
        {showLogo && (
          <div style={{ position: "absolute", left: "60px" }}>
            <img src="/resize-bounding-w-descriptor.svg" />
          </div>
        )}
        <h1 style={{ color: colors.foregroundPrimary }}>{title}</h1>
      </div>
    </div>
  );
};

export default HInnerBlock;
