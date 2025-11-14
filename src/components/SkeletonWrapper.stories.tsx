import type { Meta, StoryObj } from "@storybook/react-vite";

import SkeletonWrapper from "./SkeletonWrapper";
import SkeletonKeep from "./SkeletonKeep";
import SkeletonIgnore from "./SkeletonIgnore";
import SkeletonUnite from "./SkeletonUnite";
import {
  defaultBackground,
  defaultValues,
  type SkeletonConfig,
} from "../context/skeleton-config";
import { SkeletonProvider } from "../context/SkeletonContext";
import SkeletonLeaf from "./SkeletonLeaf";
import {
  ComparisonColumn,
  ComparisonRow,
  StoryLayout,
  UserCard,
} from "../stories/SkeletonStoryLayout";

interface StoryArgs {
  loading: boolean;
  animation: SkeletonConfig["animation"];
  animationSpeed: number;
  borderRadius: string;
  textTagsMargin: string;
  background: string;
}

const meta = {
  component: SkeletonWrapper,
  args: {
    loading: true,
    animation: defaultValues.animation,
    animationSpeed: defaultValues.animationSpeed,
    borderRadius: "8px",
    textTagsMargin: defaultValues.textTagsMargin,
    // leave empty string so defaultBackground[animation] is used
    background: "",
  },
  argTypes: {
    loading: {
      control: {
        type: "boolean",
      },
    },
    animation: {
      control: {
        type: "inline-radio",
      },
      options: ["animation-1", "animation-2"],
    },
    animationSpeed: {
      control: {
        type: "number",
      },
    },
    borderRadius: {
      control: {
        type: "text",
      },
    },
    textTagsMargin: {
      control: {
        type: "text",
      },
    },
    background: {
      control: {
        type: "text",
      },
      description:
        "Overrides the computed background. Leave empty to use animation-based default.",
    },
  },
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

const createProviderConfig = (args: StoryArgs): Partial<SkeletonConfig> => {
  return {
    animation: args.animation,
    animationSpeed: args.animationSpeed,
    borderRadius: args.borderRadius,
    textTagsMargin: args.textTagsMargin,
    background: args.background,
  };
};

const createDisplayConfig = (args: StoryArgs): SkeletonConfig => {
  const {
    animation,
    background,
    animationSpeed,
    borderRadius,
    textTagsMargin,
  } = args;

  const effectiveBackground =
    background && background.trim() !== ""
      ? background
      : defaultBackground[animation];

  return {
    ...defaultValues,
    animation,
    animationSpeed,
    borderRadius,
    textTagsMargin,
    background: effectiveBackground,
  };
};

export const Default: Story = {
  args: {
    borderRadius: "8px",
  },

  render: (args) => {
    const providerConfig = createProviderConfig(args);
    const displayConfig = createDisplayConfig(args);

    return (
      <StoryLayout
        title="SkeletonWrapper"
        subtitle="Wrap existing UI and let React Skeletonify handle the loading state."
        config={displayConfig}
      >
        <SkeletonProvider config={providerConfig}>
          <SkeletonWrapper loading={args.loading}>
            <UserCard />
          </SkeletonWrapper>
        </SkeletonProvider>
      </StoryLayout>
    );
  },
};

export const WithCustomAnimation: Story = {
  render: (args) => {
    const providerConfig = createProviderConfig(args);
    const displayConfig = createDisplayConfig(args);

    return (
      <StoryLayout
        title="SkeletonWrapper with custom animation"
        subtitle="Experiment with animation and layout while keeping your content untouched."
        config={displayConfig}
      >
        <SkeletonProvider config={providerConfig}>
          <SkeletonWrapper loading={args.loading}>
            <UserCard />
          </SkeletonWrapper>
        </SkeletonProvider>
      </StoryLayout>
    );
  },
  args: {
    loading: true,
  },
};

export const Keep: Story = {
  args: { loading: true },
  render: (args) => {
    const providerConfig = createProviderConfig(args);
    const displayConfig = createDisplayConfig(args);

    return (
      <StoryLayout
        title="SkeletonKeep"
        subtitle="Mark regions that should stay visible even while the rest is skeletonized."
        config={displayConfig}
      >
        <SkeletonProvider config={providerConfig}>
          <ComparisonRow>
            <ComparisonColumn title="Default">
              <SkeletonWrapper loading={args.loading}>
                <UserCard />
              </SkeletonWrapper>
            </ComparisonColumn>

            <ComparisonColumn title="Kept image">
              <SkeletonWrapper loading={args.loading}>
                <UserCard
                  imageWrapper={(children) => (
                    <SkeletonKeep>{children}</SkeletonKeep>
                  )}
                />
              </SkeletonWrapper>
            </ComparisonColumn>
          </ComparisonRow>
        </SkeletonProvider>
      </StoryLayout>
    );
  },
};

export const Ignore: Story = {
  args: { loading: true },
  render: (args) => {
    const providerConfig = createProviderConfig(args);
    const displayConfig = createDisplayConfig(args);

    return (
      <StoryLayout
        title="SkeletonIgnore"
        subtitle="Hide interactive elements entirely until loading is finished."
        config={displayConfig}
      >
        <SkeletonProvider config={providerConfig}>
          <ComparisonRow>
            <ComparisonColumn title="Default">
              <SkeletonWrapper loading={args.loading}>
                <UserCard />
              </SkeletonWrapper>
            </ComparisonColumn>

            <ComparisonColumn title="Ignored button">
              <SkeletonWrapper loading={args.loading}>
                <UserCard
                  buttonWrapper={(children) => (
                    <SkeletonIgnore>{children}</SkeletonIgnore>
                  )}
                />
              </SkeletonWrapper>
            </ComparisonColumn>
          </ComparisonRow>
        </SkeletonProvider>
      </StoryLayout>
    );
  },
};

export const Unite: Story = {
  args: { loading: true },
  render: (args) => {
    const baseProviderConfig = createProviderConfig(args);
    const providerConfig: Partial<SkeletonConfig> = {
      ...baseProviderConfig,
      textTagsMargin: "8px 0",
      borderRadius: "8px",
    };

    const displayConfig: SkeletonConfig = {
      ...createDisplayConfig(args),
      textTagsMargin: "8px 0",
      borderRadius: "8px",
    };

    return (
      <StoryLayout
        title="SkeletonUnite"
        subtitle="Group multiple elements into a single skeleton block for compact loading states."
        config={displayConfig}
        configTitle="Customized values"
      >
        <SkeletonProvider config={providerConfig}>
          <ComparisonRow>
            <ComparisonColumn title="Default">
              <SkeletonWrapper loading={args.loading}>
                <UserCard />
              </SkeletonWrapper>
            </ComparisonColumn>

            <ComparisonColumn title="United text">
              <SkeletonWrapper loading={args.loading}>
                <UserCard
                  textWrapper={(children) => (
                    <SkeletonUnite
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      {children}
                    </SkeletonUnite>
                  )}
                />
              </SkeletonWrapper>
            </ComparisonColumn>
          </ComparisonRow>
        </SkeletonProvider>
      </StoryLayout>
    );
  },
};

// SkeletonLeaf stories
export const SkeletonLeafDefault: Story = {
  args: { loading: true },
  render: (args) => {
    const providerConfig = createProviderConfig(args);
    const displayConfig = createDisplayConfig(args);

    return (
      <StoryLayout
        title="SkeletonLeaf"
        subtitle="Apply a single skeleton overlay to any subtree."
        config={displayConfig}
      >
        <SkeletonProvider config={providerConfig}>
          <ComparisonRow>
            <ComparisonColumn title="Wrapper">
              <SkeletonWrapper loading={args.loading}>
                <UserCard />
              </SkeletonWrapper>
            </ComparisonColumn>

            <ComparisonColumn title="Leaf">
              <SkeletonLeaf loading={args.loading}>
                <UserCard />
              </SkeletonLeaf>
            </ComparisonColumn>
          </ComparisonRow>
        </SkeletonProvider>
      </StoryLayout>
    );
  },
};
