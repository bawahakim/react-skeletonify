import type React from "react";

import type { SkeletonConfig } from "../context/skeleton-config";

const fontStack = [
  "system-ui",
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  "sans-serif",
].join(", ");

export const primaryButtonStyle: React.CSSProperties = {
  padding: "10px 18px",
  borderRadius: "8px",
  border: "1px solid rgba(148, 163, 184, 0.6)",
  background: "linear-gradient(90deg, #4f46e5, #6366f1)",
  color: "#f9fafb",
  fontSize: "0.9rem",
  fontWeight: 500,
  letterSpacing: "0.02em",
  cursor: "pointer",
  boxShadow: "0 10px 25px rgba(15, 23, 42, 0.35)",
};

export const subtleButtonStyle: React.CSSProperties = {
  padding: "10px 18px",
  borderRadius: "8px",
  border: "1px solid rgba(148, 163, 184, 0.5)",
  background: "rgba(15, 23, 42, 0.7)",
  color: "#e5e7eb",
  fontSize: "0.9rem",
  fontWeight: 500,
  letterSpacing: "0.02em",
  cursor: "pointer",
};

interface StoryLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  configTitle?: string;
  config?: SkeletonConfig;
}

export const StoryLayout: React.FC<StoryLayoutProps> = ({
  children,
  title,
  subtitle,
  config,
  configTitle,
}) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at top, #0f172a, #020617)",
        padding: "32px",
        boxSizing: "border-box",
        fontFamily: fontStack,
        color: "#e5e7eb",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "32px",
          alignItems: "flex-start",
          maxWidth: "1040px",
          width: "100%",
        }}
      >
        <div style={{ flex: 3 }}>
          {title && (
            <div style={{ marginBottom: "16px" }}>
              <h1
                style={{
                  margin: 0,
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                }}
              >
                {title}
              </h1>

              {subtitle && (
                <p
                  style={{
                    marginTop: "8px",
                    marginBottom: 0,
                    color: "#9ca3af",
                    fontSize: "0.9rem",
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {children}
        </div>

        {config && (
          <div
            style={{
              flex: 2,
              background: "rgba(15, 23, 42, 0.9)",
              borderRadius: "16px",
              padding: "18px 20px",
              border: "1px solid rgba(148, 163, 184, 0.5)",
              boxShadow: "0 22px 45px rgba(15, 23, 42, 0.7)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "#6b7280",
                  }}
                >
                  Skeleton config
                </p>
                <h2
                  style={{
                    margin: "4px 0 0 0",
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "#e5e7eb",
                  }}
                >
                  {configTitle ?? "Default values"}
                </h2>
              </div>
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "999px",
                  border: "1px solid rgba(148, 163, 184, 0.5)",
                  fontSize: "0.75rem",
                  color: "#9ca3af",
                  background: "rgba(15, 23, 42, 0.9)",
                }}
              >
                SkeletonProvider
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "10px",
                marginTop: "8px",
              }}
            >
              <ConfigRow label="Animation" value={config.animation} />
              <ConfigRow
                label="Speed (s)"
                value={config.animationSpeed.toString()}
              />
              <ConfigRow label="Background" value={config.background} />
              <ConfigRow label="Border" value={config.border || "none"} />
              <ConfigRow label="Radius" value={config.borderRadius || "0"} />
              <ConfigRow
                label="Text margin"
                value={config.textTagsMargin || "0"}
              />
              <ConfigRow
                label="Except tags"
                value={
                  config.exceptTags.length ? config.exceptTags.join(", ") : "—"
                }
              />
              <ConfigRow
                label="Except groups"
                value={
                  config.exceptTagGroups.length
                    ? config.exceptTagGroups.join(", ")
                    : "—"
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface ComparisonRowProps {
  children: React.ReactNode;
}

export const ComparisonRow: React.FC<ComparisonRowProps> = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "24px",
        alignItems: "flex-start",
      }}
    >
      {children}
    </div>
  );
};

interface ComparisonColumnProps {
  title: string;
  children: React.ReactNode;
}

export const ComparisonColumn: React.FC<ComparisonColumnProps> = ({
  title,
  children,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "0.8rem",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "#9ca3af",
        }}
      >
        {title}
      </p>
      {children}
    </div>
  );
};

const ConfigRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => {
  return (
    <div
      style={{
        borderRadius: "12px",
        padding: "8px 10px",
        background:
          "radial-gradient(circle at top left, rgba(56, 189, 248, 0.08), rgba(15, 23, 42, 0.9))",
        border: "1px solid rgba(148, 163, 184, 0.5)",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.16em",
          color: "#6b7280",
        }}
      >
        {label}
      </p>
      <p
        style={{
          margin: "4px 0 0 0",
          fontSize: "0.8rem",
          color: "#e5e7eb",
          fontFamily:
            '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {value}
      </p>
    </div>
  );
};

export interface UserCardProps {
  imageWrapper?: (children: React.ReactNode) => React.ReactNode;
  textWrapper?: (children: React.ReactNode) => React.ReactNode;
  buttonWrapper?: (children: React.ReactNode) => React.ReactNode;
}

export const UserCard: React.FC<UserCardProps> = ({
  imageWrapper,
  textWrapper,
  buttonWrapper,
}) => {
  const avatar = (
    <img
      src="https://i.pravatar.cc/150?u=fake@pravatar.com"
      alt="User avatar"
      style={{
        width: "72px",
        height: "72px",
        borderRadius: "999px",
        border: "2px solid rgba(148, 163, 184, 0.8)",
      }}
    />
  );

  const nameAndRole = (
    <>
      <h2
        style={{
          margin: "0 0 6px 0",
          fontSize: "1.1rem",
          fontWeight: 600,
          letterSpacing: "0.02em",
          color: "#e5e7eb",
        }}
      >
        John Doe
      </h2>
      <p
        style={{
          margin: 0,
          color: "#9ca3af",
          fontSize: "0.9rem",
        }}
      >
        Software Engineer
      </p>
    </>
  );

  const primaryButton = (
    <button style={primaryButtonStyle}>View Profile</button>
  );

  return (
    <div
      style={{
        padding: "20px 22px",
        border: "1px solid rgba(148, 163, 184, 0.45)",
        borderRadius: "16px",
        maxWidth: "420px",
        background:
          "radial-gradient(circle at top left, rgba(56, 189, 248, 0.12), rgba(15, 23, 42, 0.98))",
        boxShadow: "0 24px 60px rgba(15, 23, 42, 0.9)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
          marginBottom: "16px",
        }}
      >
        {imageWrapper ? imageWrapper(avatar) : avatar}
        <div>{textWrapper ? textWrapper(nameAndRole) : nameAndRole}</div>
      </div>
      <p
        style={{
          lineHeight: "1.6",
          fontSize: "0.9rem",
          color: "#cbd5f5",
          marginBottom: "16px",
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      {buttonWrapper ? buttonWrapper(primaryButton) : primaryButton}
    </div>
  );
};

export const ArticleCard: React.FC = () => (
  <div
    style={{
      padding: "20px 22px",
      borderRadius: "16px",
      border: "1px solid rgba(148, 163, 184, 0.45)",
      maxWidth: "640px",
      background:
        "radial-gradient(circle at top left, rgba(244, 114, 182, 0.14), rgba(15, 23, 42, 0.98))",
      boxShadow: "0 24px 60px rgba(15, 23, 42, 0.9)",
    }}
  >
    <h1
      style={{
        margin: 0,
        fontSize: "1.35rem",
        fontWeight: 600,
        letterSpacing: "0.02em",
        color: "#e5e7eb",
      }}
    >
      Article Title
    </h1>
    <p
      style={{
        marginTop: "10px",
        marginBottom: "6px",
        color: "#cbd5f5",
        fontSize: "0.95rem",
        lineHeight: "1.7",
      }}
    >
      This is a paragraph of text that will be skeletonized.
    </p>
    <p
      style={{
        marginTop: 0,
        marginBottom: "18px",
        color: "#cbd5f5",
        fontSize: "0.95rem",
        lineHeight: "1.7",
      }}
    >
      Another paragraph with more content to show the skeleton effect.
    </p>
    <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
      <button style={primaryButtonStyle}>Read More</button>
      <button style={subtleButtonStyle}>Share</button>
    </div>
  </div>
);
