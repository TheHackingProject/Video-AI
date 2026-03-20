import type React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import {
  ConceptSlideAnimated,
  SectionIntroAnimated,
  TitleCardAnimated,
} from "@repo/remotion-lib";
import { ParticleField, demoShowcaseColors, solarTheme } from "@repo/ui/remotion";
import {
  BLOCK_FADE_FRAMES,
  CTA_SUBTITLE,
  CTA_TITLE,
  FRAME,
  GIT_BODY,
  GIT_TITLE,
  GITHUB_BODY,
  GITHUB_CALLOUT,
  GITHUB_TITLE,
  HOOK_TEXT,
  PREMOUNT_FRAMES,
  RECAP_TEXT,
  SCENE_DURATIONS,
  TITLE,
  TITLE_SUBTITLE,
} from "./pilot02-content";

const tc = solarTheme.colors;
const particleColors = [tc.primary, tc.secondary, tc.accent, tc.success];

const centerFill: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  padding: 48,
  boxSizing: "border-box",
};

export const Pilot02GitVsGithub: React.FC = () => {
  const { width, height } = useVideoConfig();

  const bgGradient = `radial-gradient(ellipse at center, ${demoShowcaseColors.backgroundGlow} 0%, ${tc.background} 72%, #030806 100%)`;

  return (
    <AbsoluteFill style={{ background: bgGradient }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.2,
          pointerEvents: "none",
        }}
      >
        <ParticleField
          width={width}
          height={height}
          count={36}
          speed={0.14}
          theme={solarTheme}
          colors={particleColors}
        />
      </div>

      <Sequence
        from={FRAME.title}
        durationInFrames={SCENE_DURATIONS.title}
        premountFor={PREMOUNT_FRAMES}
      >
        <AbsoluteFill style={{ zIndex: 1 }}>
          <div style={centerFill}>
            <TitleCardAnimated
              title={TITLE}
              subtitle={TITLE_SUBTITLE}
              startFrame={0}
              durationInFrames={BLOCK_FADE_FRAMES}
              titleColor={tc.text}
              subtitleColor={tc.textMuted}
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence
        from={FRAME.hook}
        durationInFrames={SCENE_DURATIONS.hook}
        premountFor={PREMOUNT_FRAMES}
      >
        <AbsoluteFill style={{ zIndex: 1 }}>
          <div style={centerFill}>
            <SectionIntroAnimated
              text={HOOK_TEXT}
              startFrame={0}
              durationInFrames={BLOCK_FADE_FRAMES}
              textColor={tc.text}
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence
        from={FRAME.gitConcept}
        durationInFrames={SCENE_DURATIONS.gitConcept}
        premountFor={PREMOUNT_FRAMES}
      >
        <AbsoluteFill style={{ zIndex: 1 }}>
          <div
            style={{
              ...centerFill,
              alignItems: "stretch",
            }}
          >
            <ConceptSlideAnimated
              title={GIT_TITLE}
              body={GIT_BODY}
              startFrame={0}
              durationInFrames={BLOCK_FADE_FRAMES}
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence
        from={FRAME.githubConcept}
        durationInFrames={SCENE_DURATIONS.githubConcept}
        premountFor={PREMOUNT_FRAMES}
      >
        <AbsoluteFill style={{ zIndex: 1 }}>
          <div
            style={{
              ...centerFill,
              alignItems: "stretch",
            }}
          >
            <ConceptSlideAnimated
              title={GITHUB_TITLE}
              body={GITHUB_BODY}
              callout={GITHUB_CALLOUT}
              startFrame={0}
              durationInFrames={BLOCK_FADE_FRAMES}
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence
        from={FRAME.recap}
        durationInFrames={SCENE_DURATIONS.recap}
        premountFor={PREMOUNT_FRAMES}
      >
        <AbsoluteFill style={{ zIndex: 1 }}>
          <div style={centerFill}>
            <SectionIntroAnimated
              text={RECAP_TEXT}
              startFrame={0}
              durationInFrames={BLOCK_FADE_FRAMES}
              textColor={tc.text}
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence
        from={FRAME.cta}
        durationInFrames={SCENE_DURATIONS.cta}
        premountFor={PREMOUNT_FRAMES}
      >
        <AbsoluteFill style={{ zIndex: 1 }}>
          <div style={centerFill}>
            <TitleCardAnimated
              title={CTA_TITLE}
              subtitle={CTA_SUBTITLE}
              startFrame={0}
              durationInFrames={14}
              titleColor={tc.text}
              subtitleColor={tc.textMuted}
            />
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
