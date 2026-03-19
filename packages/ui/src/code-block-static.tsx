import type { JSX } from "react";

export interface CodeBlockStaticProps {
  code: string;
  highlightLineIndex?: number | number[];
  showLineNumbers?: boolean;
  title?: string;
  className?: string;
}

function getHighlightSet(
  highlightLineIndex?: number | number[]
): Set<number> {
  if (highlightLineIndex === undefined) return new Set();
  if (typeof highlightLineIndex === "number") return new Set([highlightLineIndex]);
  return new Set(highlightLineIndex);
}

export function CodeBlockStatic({
  code,
  highlightLineIndex,
  showLineNumbers = true,
  title,
  className,
}: CodeBlockStaticProps): JSX.Element {
  const highlightLines = getHighlightSet(highlightLineIndex);
  const lines = code.split("\n");

  return (
    <div
      className={className}
      style={{
        backgroundColor: "#0d1117",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid #30363d",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 16,
      }}
    >
      {title && (
        <div
          style={{
            padding: "8px 16px",
            backgroundColor: "#161b22",
            borderBottom: "1px solid #30363d",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f56" }} />
          <span style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
          <span style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#27c93f" }} />
          <span style={{ color: "#8b949e", fontSize: 14 }}>{title}</span>
        </div>
      )}
      <div
        style={{
          padding: 16,
          overflowX: "auto",
          color: "#c9d1d9",
          lineHeight: 1.6,
        }}
      >
        {lines.map((line, index) => {
          const lineNumber = index + 1;
          const isHighlighted = highlightLines.has(lineNumber);
          return (
            <div
              key={`line-${lineNumber}`}
              style={{
                display: "flex",
                backgroundColor: isHighlighted ? "rgba(67, 97, 238, 0.15)" : "transparent",
                marginLeft: isHighlighted ? -16 : 0,
                marginRight: isHighlighted ? -16 : 0,
                paddingLeft: isHighlighted ? 16 : 0,
                paddingRight: isHighlighted ? 16 : 0,
                borderLeft: isHighlighted ? "3px solid #4361ee" : "3px solid transparent",
              }}
            >
              {showLineNumbers && (
                <span
                  style={{
                    width: 40,
                    textAlign: "right",
                    marginRight: 16,
                    color: "#484f58",
                    userSelect: "none",
                    flexShrink: 0,
                  }}
                >
                  {lineNumber}
                </span>
              )}
              <span style={{ whiteSpace: "pre" }}>{line || " "}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
