import React from "react";
import { TitleCard } from "@repo/ui/title-card";
import { FadeIn } from "../primitives/FadeIn";

export interface TitleCardAnimatedProps {
  title: string;
  subtitle?: string;
  startFrame?: number;
  durationInFrames?: number;
}

export function TitleCardAnimated({
  title,
  subtitle,
  startFrame = 0,
  durationInFrames = 15,
}: TitleCardAnimatedProps): React.ReactElement {
  return (
    <FadeIn startFrame={startFrame} durationInFrames={durationInFrames}>
      <TitleCard title={title} subtitle={subtitle} />
    </FadeIn>
  );
}
