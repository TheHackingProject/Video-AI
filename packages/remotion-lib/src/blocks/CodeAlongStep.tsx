import type React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { SectionIntro } from "@repo/ui/section-intro";
import { CodeBlockStatic } from "@repo/ui/code-block-static";

export interface CodeAlongStepItem {
  label: string;
  code: string;
  highlightLines?: number[];
}

export interface CodeAlongStepProps {
  steps: CodeAlongStepItem[];
  startFrame?: number;
  durationPerStep?: number;
  showLineNumbers?: boolean;
  title?: string;
  fadeInDuration?: number;
  /** Passed to SectionIntro (e.g. Solarpunk text on dark gradient). */
  introTextColor?: string;
}

export function CodeAlongStep({
  steps,
  startFrame = 0,
  durationPerStep = 30,
  showLineNumbers = true,
  title,
  fadeInDuration = 10,
  introTextColor,
}: CodeAlongStepProps): React.ReactElement {
  const frame = useCurrentFrame();
  const progress = frame - startFrame;
  const stepIndex = Math.min(
    Math.max(0, Math.floor(progress / durationPerStep)),
    steps.length - 1
  );
  const step = steps[stepIndex];
  if (!step) {
    return <div />;
  }

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + fadeInDuration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 48,
        gap: 24,
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <div style={{ width: "100%" }}>
        <SectionIntro text={step.label} textColor={introTextColor} />
      </div>
      <div style={{ width: "100%" }}>
        <CodeBlockStatic
          code={step.code}
          showLineNumbers={showLineNumbers}
          title={title}
          highlightLineIndex={step.highlightLines}
        />
      </div>
    </div>
  );
}
