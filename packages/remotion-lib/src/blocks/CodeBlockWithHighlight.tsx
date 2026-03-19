import type React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { CodeBlockStatic } from "@repo/ui/code-block-static";
export interface CodeBlockStep {
  lines: number[];
}

export interface CodeBlockWithHighlightProps {
  code: string;
  steps: CodeBlockStep[];
  startFrame?: number;
  durationPerStep?: number;
  showLineNumbers?: boolean;
  title?: string;
  fadeInDuration?: number;
}

export function CodeBlockWithHighlight({
  code,
  steps,
  startFrame = 0,
  durationPerStep = 30,
  showLineNumbers = true,
  title,
  fadeInDuration = 10,
}: CodeBlockWithHighlightProps): React.ReactElement {
  const frame = useCurrentFrame();
  const progress = frame - startFrame;
  const stepIndex = Math.min(
    Math.floor(progress / durationPerStep),
    steps.length - 1
  );
  const currentStep = steps[stepIndex];
  const highlightLineIndex =
    currentStep && currentStep.lines.length > 0
      ? currentStep.lines.length === 1
        ? currentStep.lines[0]
        : currentStep.lines
      : undefined;

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + fadeInDuration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div style={{ opacity }}>
      <CodeBlockStatic
        code={code}
        highlightLineIndex={highlightLineIndex}
        showLineNumbers={showLineNumbers}
        title={title}
      />
    </div>
  );
}
