import React from "react";
import { SectionIntro } from "@repo/ui/section-intro";
import { FadeIn } from "../primitives/FadeIn";

export interface SectionIntroAnimatedProps {
  text: string;
  startFrame?: number;
  durationInFrames?: number;
}

export function SectionIntroAnimated({
  text,
  startFrame = 0,
  durationInFrames = 15,
}: SectionIntroAnimatedProps): React.ReactElement {
  return (
    <FadeIn startFrame={startFrame} durationInFrames={durationInFrames}>
      <SectionIntro text={text} />
    </FadeIn>
  );
}
