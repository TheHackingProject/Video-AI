import type { JSX } from "react";

export interface SectionIntroProps {
  text: string;
  className?: string;
}

export function SectionIntro({
  text,
  className,
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
        color: "#f0f6fc",
        textAlign: "center",
      }}
    >
      <p style={{ margin: 0 }}>{text}</p>
    </div>
  );
}
