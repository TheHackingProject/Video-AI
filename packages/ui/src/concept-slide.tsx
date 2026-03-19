import type { JSX } from "react";

export interface ConceptSlideProps {
  title: string;
  body: string;
  callout?: string;
  className?: string;
}

export function ConceptSlide({
  title,
  body,
  callout,
  className,
}: ConceptSlideProps): JSX.Element {
  return (
    <div
      className={className}
      style={{
        padding: 48,
        maxWidth: 900,
        margin: "0 auto",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <h2
        style={{
          margin: "0 0 24px",
          fontSize: 32,
          fontWeight: 600,
          color: "#f0f6fc",
        }}
      >
        {title}
      </h2>
      <p
        style={{
          margin: 0,
          fontSize: 20,
          lineHeight: 1.6,
          color: "#c9d1d9",
        }}
      >
        {body}
      </p>
      {callout && (
        <div
          style={{
            marginTop: 24,
            padding: "12px 16px",
            backgroundColor: "rgba(67, 97, 238, 0.15)",
            borderLeft: "4px solid #4361ee",
            borderRadius: 4,
            fontSize: 18,
            color: "#a5d6ff",
          }}
        >
          {callout}
        </div>
      )}
    </div>
  );
}
