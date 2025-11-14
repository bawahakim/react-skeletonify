import React from "react";
import createNodeWrapper from "../utils/create-node-wrapper";
import createLeafNode from "../utils/create-leaf-node";
import { SkeletonConfig } from "../context/skeleton-config";
import createStyle from "../utils/create-style";
import checkTagInGroup from "../utils/check-tag-in-group";
import isTextElement from "../utils/is-text-element";
import SkeletonKeep from "../components/SkeletonKeep";
import SkeletonIgnore from "../components/SkeletonIgnore";
import SkeletonUnite from "../components/SkeletonUnite";

function useAddSkeleton(config: SkeletonConfig) {
  const { className, exceptTags, exceptTagGroups, textTagsMargin } = config;
  const CLASS_NAME = `react-skeletonify ${className} `;
  const style = createStyle(config);

  const addSkeleton = (node: React.ReactNode): React.ReactNode => {
    if (!React.isValidElement(node))
      return createNodeWrapper(node as any, CLASS_NAME, style);

    const element = node as React.ReactElement<any>;
    const { children } = element.props;
    const elementType: string | React.ComponentType<any> = element.type;

    if (isSkeletonKeepComponent(elementType)) {
      return element;
    }

    if (isSkeletonIgnoreComponent(elementType)) {
      return null;
    }

    if (isSkeletonUniteComponent(elementType)) {
      return createLeafNode(element, CLASS_NAME, style);
    }

    if (typeof elementType === "string") {
      if (exceptTags.includes(elementType)) {
        return element;
      }
      const isRestrictedGroupTag = checkTagInGroup(
        elementType,
        exceptTagGroups
      );

      if (isRestrictedGroupTag) return element;
    }

    const hasChildren = React.Children.count(children) > 0;
    const isValidChildren = typeof children !== "string";

    if (typeof elementType === "function") {
      const rendered = (elementType as any)(element.props);
      return addSkeleton(rendered);
    }

    const isTextTag = isTextElement(elementType);

    if (isTextTag) {
      return createLeafNode(element, CLASS_NAME, {
        ...style,
        margin: textTagsMargin,
      });
    }

    if (elementType === "img") {
      return createNodeWrapper(element, CLASS_NAME, style);
    }

    if (hasChildren && isValidChildren) {
      const childWithSkeletons = React.Children.map(children, addSkeleton);

      return React.cloneElement(element, {
        ...element.props,
        children: childWithSkeletons,
      } as typeof element.props);
    }

    return createLeafNode(element, CLASS_NAME, style);
  };

  return addSkeleton;
}

function isSkeletonKeepComponent(
  elementType: React.ComponentType<any> | string
): boolean {
  return elementType === SkeletonKeep;
}

function isSkeletonIgnoreComponent(
  elementType: React.ComponentType<any> | string
): boolean {
  return elementType === SkeletonIgnore;
}

function isSkeletonUniteComponent(
  elementType: React.ComponentType<any> | string
): boolean {
  return elementType === SkeletonUnite;
}

export default useAddSkeleton;
