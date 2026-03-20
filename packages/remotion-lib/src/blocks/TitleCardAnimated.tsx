import React from "react";
import { TitleCard } from "@repo/ui/title-card";
import { FadeIn } from "../primitives/FadeIn";

export interface TitleCardAnimatedProps {
  title: string;
  subtitle?: string;
  startFrame?: number;
  durationInFrames?: number;
  titleColor?: string;
  subtitleColor?: string;
}

export function TitleCardAnimated({
  title,
  subtitle,
  startFrame = 0,
  durationInFrames = 15,
  titleColor,
  subtitleColor,
}: TitleCardAnimatedProps): React.ReactElement {
  return (
    <FadeIn
      startFrame={startFrame}
      durationInFrames={durationInFrames}
      translateY={24}
    >
      <TitleCard
        title={title}
        subtitle={subtitle}
        titleColor={titleColor}
        subtitleColor={subtitleColor}
      />
    </FadeIn>
  );
}
