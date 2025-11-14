import React from "react";

export interface SkeletonIgnoreProps {
  children: React.ReactNode;
}

export class SkeletonIgnore extends React.Component<SkeletonIgnoreProps> {
  render() {
    return <>{this.props.children}</>;
  }
}

export default SkeletonIgnore;
