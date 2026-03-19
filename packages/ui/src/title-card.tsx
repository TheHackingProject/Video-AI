import type { JSX } from "react";

export interface TitleCardProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function TitleCard({
  title,
  subtitle,
  className,
}: TitleCardProps): JSX.Element {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 48,
        textAlign: "center",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: 48,
          fontWeight: 700,
          color: "#f0f6fc",
          lineHeight: 1.2,
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            margin: "16px 0 0",
            fontSize: 24,
            color: "#8b949e",
            fontWeight: 400,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
