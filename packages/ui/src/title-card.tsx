import type { JSX } from "react";

export interface TitleCardProps {
  title: string;
  subtitle?: string;
  className?: string;
  /** Override title color (e.g. Solarpunk `solarTheme.colors.text`). */
  titleColor?: string;
  /** Override subtitle color (e.g. `solarTheme.colors.textMuted`). */
  subtitleColor?: string;
}

export function TitleCard({
  title,
  subtitle,
  className,
  titleColor = "#f0f6fc",
  subtitleColor = "#8b949e",
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
          color: titleColor,
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
            color: subtitleColor,
            fontWeight: 400,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
