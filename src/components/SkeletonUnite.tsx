import React from "react";

export interface SkeletonUniteProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export class SkeletonUnite extends React.Component<SkeletonUniteProps> {
  render() {
    // Check if this component is being skeletonized
    if (
      this.props.className &&
      this.props.className.includes("react-skeletonify")
    ) {
      return (
        <div
          className={this.props.className}
          style={{
            ...this.props.style,
          }}
        >
          {/* Render children invisibly to maintain layout */}
          <div style={{ opacity: 0, pointerEvents: "none" }}>
            {this.props.children}
          </div>
        </div>
      );
    }

    // Normal rendering - just return children
    return <>{this.props.children}</>;
  }
}

export default SkeletonUnite;
