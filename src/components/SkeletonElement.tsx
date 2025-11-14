import React from "react";
import useAddSkeleton from "../hooks/useAddSkeleton";
import { SkeletonConfig } from "../context/skeleton-config";

interface SkeletonElementProps {
  children: React.ReactNode;
  config: SkeletonConfig;
}

const SkeletonElement: React.FC<SkeletonElementProps> = (props) => {
  const { children, config } = props;
  const addSkeleton = useAddSkeleton(config);

  return React.Children.map(children, (child) => addSkeleton(child));
};

export default SkeletonElement;
