import React from "react";
import { ConceptSlide } from "@repo/ui/concept-slide";
import { FadeIn } from "../primitives/FadeIn";

export interface ConceptSlideAnimatedProps {
  title: string;
  body: string;
  callout?: string;
  startFrame?: number;
  durationInFrames?: number;
}

export function ConceptSlideAnimated({
  title,
  body,
  callout,
  startFrame = 0,
  durationInFrames = 15,
}: ConceptSlideAnimatedProps): React.ReactElement {
  return (
    <FadeIn startFrame={startFrame} durationInFrames={durationInFrames}>
      <ConceptSlide title={title} body={body} callout={callout} />
    </FadeIn>
  );
}
