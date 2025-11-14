import type { Meta, StoryObj } from "@storybook/react-vite";

import SkeletonWrapper from "./SkeletonWrapper";
import SkeletonKeep from "./SkeletonKeep";
import { defaultValues } from "../context/skeleton-config";
import { SkeletonProvider } from "../context/SkeletonContext";

interface StoryArgs {
  loading: boolean;
}

const meta = {
  component: SkeletonWrapper,
} satisfies Meta<typeof SkeletonWrapper>;

export default meta;

type Story = StoryObj<StoryArgs>;

// Sample card component to demonstrate skeleton
const UserCard = () => (
  <div
    style={{
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      maxWidth: "400px",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        marginBottom: "16px",
      }}
    >
      <img
        src="https://i.pravatar.cc/150?u=fake@pravatar.com"
        alt="User avatar"
        style={{ width: "80px", height: "80px", borderRadius: "50%" }}
      />
      <div>
        <h2 style={{ margin: "0 0 8px 0" }}>John Doe</h2>
        <p style={{ margin: 0, color: "#666" }}>Software Engineer</p>
      </div>
    </div>
    <p style={{ lineHeight: "1.6" }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <button
      style={{
        padding: "8px 16px",
        background: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px",
      }}
    >
      View Profile
    </button>
  </div>
);

const ArticleCard = () => (
  <div style={{ padding: "20px" }}>
    <h1>Article Title</h1>
    <p>This is a paragraph of text that will be skeletonized.</p>
    <p>Another paragraph with more content to show the skeleton effect.</p>
    <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
      <button
        style={{
          padding: "8px 16px",
          background: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Read More
      </button>
      <button
        style={{
          padding: "8px 16px",
          background: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Share
      </button>
    </div>
  </div>
);

export const Default: Story = {
  args: { loading: true },
  render: ({ loading }) => (
    <div>
      <SkeletonProvider config={defaultValues}>
        <SkeletonWrapper loading={loading}>
          <UserCard />
        </SkeletonWrapper>
      </SkeletonProvider>
    </div>
  ),
};

export const WithCustomAnimation: Story = {
  render: ({ loading }) => (
    <div>
      <SkeletonProvider config={defaultValues}>
        <SkeletonWrapper loading={loading}>
          <UserCard />
        </SkeletonWrapper>
      </SkeletonProvider>
    </div>
  ),
  args: {
    loading: true,
  },
};

export const SimpleText: Story = {
  render: ({ loading }) => (
    <div>
      <SkeletonProvider config={defaultValues}>
        <SkeletonWrapper loading={loading}>
          <ArticleCard />
        </SkeletonWrapper>
      </SkeletonProvider>
    </div>
  ),
  args: {
    loading: true,
  },
};

export const Loading: Story = {
  args: { loading: true },
  render: ({ loading }) => (
    <div>
      <SkeletonProvider config={defaultValues}>
        <SkeletonWrapper loading={loading}>
          <UserCard />
        </SkeletonWrapper>
      </SkeletonProvider>
    </div>
  ),
};

export const Keep: Story = {
  args: { loading: true },
  render: ({ loading }) => (
    <div>
      <SkeletonProvider config={defaultValues}>
        <SkeletonWrapper loading={loading}>
          <div
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <p>This paragraph will be skeletonized during loading.</p>
            <SkeletonKeep>
              <p>This paragraph will remain visible and NOT be skeletonized.</p>
            </SkeletonKeep>
            <p>Another paragraph that will be skeletonized.</p>
            <SkeletonKeep>
              <p>This one is also protected from skeletonization.</p>
            </SkeletonKeep>
          </div>
        </SkeletonWrapper>
      </SkeletonProvider>
    </div>
  ),
};
