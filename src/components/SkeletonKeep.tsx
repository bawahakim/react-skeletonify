import React from "react";

export interface SkeletonKeepProps {
  children: React.ReactNode;
}

export class SkeletonKeep extends React.Component<SkeletonKeepProps> {
  render() {
    return <>{this.props.children}</>;
  }
}

export default SkeletonKeep;
