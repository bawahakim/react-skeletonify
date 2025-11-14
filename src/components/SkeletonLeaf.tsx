import React, { CSSProperties, useMemo } from "react";
import { SkeletonConfig } from "../context/skeleton-config";
import { useSkeleton } from "../context/SkeletonContext";
import createStyle from "../utils/create-style";

export interface SkeletonLeafProps {
  loading: boolean;
  children: React.ReactNode;
  overrideConfig?: Partial<SkeletonConfig>;
  style?: CSSProperties;
}

const SkeletonLeaf: React.FC<SkeletonLeafProps> = (props) => {
  const { loading, children, overrideConfig, style } = props;
  const mainConfig = useSkeleton();

  const config: SkeletonConfig = useMemo(
    () => ({
      ...mainConfig,
      ...overrideConfig,
      style: { ...mainConfig.style, ...overrideConfig?.style, ...style },
    }),
    [overrideConfig, mainConfig]
  );

  if (loading) {
    const skeletonStyle = createStyle(config);
    const className = `react-skeletonify ${config.className || ""}`;

    return (
      <div
        className={className}
        style={{
          ...skeletonStyle,
          display: "inline-block",
          width: "100%",
          height: "auto",
          minHeight: "1em",
        }}
      >
        {/* Render children invisibly to maintain layout */}
        <div style={{ opacity: 0, pointerEvents: "none" }}>{children}</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default SkeletonLeaf;
