import React from "react";
import { IframeProps } from "../types/iframeProps";
const IframeComponent: React.FC<IframeProps> = ({
  src,
  title = "Embedded Content",
  width = "100%",
  height = "700px",
  allowFullScreen = true,
  className = "",
}) => {
  return (
    <div className={`iframe-container ${className}`} style={{ position: "relative", overflow: "hidden" }}>
      <iframe
        src={src}
        title={title}
        width={width}
        height={height}
        allowFullScreen={allowFullScreen}
        style={{
          border: "none",
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default IframeComponent;