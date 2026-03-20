import type { JSX } from "react";

export interface SectionIntroProps {
  text: string;
  className?: string;
  /** Text color (default matches legacy GitHub-style dark UI). */
  textColor?: string;
}

export function SectionIntro({
  text,
  className,
  textColor = "#f0f6fc",
}: SectionIntroProps): JSX.Element {
  return (
    <div
      className={className}
      style={{
        padding: 48,
        maxWidth: 800,
        margin: "0 auto",
        fontFamily: "'Inter', sans-serif",
        fontSize: 22,
        lineHeight: 1.6,
        color: textColor,
        textAlign: "center",
        whiteSpace: "pre-line",
      }}
    >
      <p style={{ margin: 0 }}>{text}</p>
    </div>
  );
}
