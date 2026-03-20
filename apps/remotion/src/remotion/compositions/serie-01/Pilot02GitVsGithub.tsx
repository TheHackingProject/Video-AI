import type React from "react";
import {
  AbsoluteFill,
  Sequence,
  useVideoConfig,
} from "remotion";
import { FadeIn } from "@repo/remotion-lib";
import {
  FlowChart,
  GlitchText,
  ParticleField,
  ProgressBar,
  TextReveal,
  Typewriter,
  demoShowcaseColors,
  solarTheme,
} from "@repo/ui/remotion";
import { Serie01SceneShell } from "./Serie01SceneShell";
import {
  CTA_SUBTITLE,
  CTA_SUB_START_FRAME,
  CTA_SUB_CPS,
  CTA_TITLE,
  CTA_TITLE_REVEAL_DURATION,
  FRAME,
  GIT_BODY,
  GIT_BODY_CPS,
  GIT_BODY_START_FRAME,
  GIT_TITLE,
  GIT_TITLE_REVEAL_DURATION,
  GITHUB_BODY,
  GITHUB_BODY_CPS,
  GITHUB_BODY_START_FRAME,
  GITHUB_CALLOUT,
  GITHUB_CALLOUT_CPS,
  GITHUB_CALLOUT_START_FRAME,
  GITHUB_FLOW_DURATION,
  GITHUB_FLOW_FROM_LOCAL,
  GITHUB_FLOW_NODE_DELAY,
  GITHUB_FLOW_START_LOCAL,
  GITHUB_TITLE,
  GITHUB_TITLE_REVEAL_DURATION,
  HOOK_CPS,
  HOOK_TEXT,
  PREMOUNT_FRAMES,
  RECAP_CPS,
  RECAP_TEXT,
  SCENE_DURATIONS,
  SCENE_KEYWORDS,
  TITLE,
  TITLE_GLITCH_DURATION,
  TITLE_SUBTITLE,
  TITLE_SUBTITLE_REVEAL_DURATION,
  TITLE_SUBTITLE_START_FRAME,
  TOTAL_SCENES,
} from "./pilot02-content";

const tc = solarTheme.colors;
const particleColors = [tc.primary, tc.secondary, tc.accent, tc.success];

const narrationBoxStyle: React.CSSProperties = {
  maxWidth: 920,
  margin: "0 auto",
  textAlign: "center",
  lineHeight: 1.65,
};

export const Pilot02GitVsGithub: React.FC = () => {
  const { width, height, durationInFrames } = useVideoConfig();

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

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 25,
          pointerEvents: "none",
        }}
      >
        <ProgressBar
          theme={solarTheme}
          totalFrames={durationInFrames}
          showTime
          showPercentage={false}
          height={5}
        />
      </div>

      <Sequence
        from={FRAME.title}
        durationInFrames={SCENE_DURATIONS.title}
        premountFor={PREMOUNT_FRAMES}
      >
        <Serie01SceneShell
          sceneNumber={1}
          totalScenes={TOTAL_SCENES}
          keyword={SCENE_KEYWORDS[0]}
        >
          <div style={narrationBoxStyle}>
            <GlitchText
              text={TITLE}
              startFrame={0}
              duration={TITLE_GLITCH_DURATION}
              theme={solarTheme}
              fontSize={solarTheme.fontSizes.display}
              color={tc.text}
              glitchColor1={tc.secondary}
              glitchColor2={tc.accent}
              intensity={0.4}
            />
          </div>
          <div style={{ marginTop: 20, minHeight: 56, ...narrationBoxStyle }}>
            <TextReveal
              text={TITLE_SUBTITLE}
              startFrame={TITLE_SUBTITLE_START_FRAME}
              duration={TITLE_SUBTITLE_REVEAL_DURATION}
              theme={solarTheme}
              fontSize={solarTheme.fontSizes.xl}
              fontFamily={solarTheme.fonts.body}
              color={tc.textMuted}
              direction="left"
            />
          </div>
        </Serie01SceneShell>
      </Sequence>

      <Sequence
        from={FRAME.hook}
        durationInFrames={SCENE_DURATIONS.hook}
        premountFor={PREMOUNT_FRAMES}
      >
        <Serie01SceneShell
          sceneNumber={2}
          totalScenes={TOTAL_SCENES}
          keyword={SCENE_KEYWORDS[1]}
        >
          <div style={{ ...narrationBoxStyle, minHeight: 140 }}>
            <Typewriter
              text={HOOK_TEXT}
              startFrame={0}
              charsPerSecond={HOOK_CPS}
              theme={solarTheme}
              fontSize={24}
              color={tc.text}
              showCursor={false}
            />
          </div>
        </Serie01SceneShell>
      </Sequence>

      <Sequence
        from={FRAME.gitConcept}
        durationInFrames={SCENE_DURATIONS.gitConcept}
        premountFor={PREMOUNT_FRAMES}
      >
        <Serie01SceneShell
          sceneNumber={3}
          totalScenes={TOTAL_SCENES}
          keyword={SCENE_KEYWORDS[2]}
        >
          <div
            style={{
              ...narrationBoxStyle,
              textAlign: "center",
              width: "100%",
            }}
          >
            <TextReveal
              text={GIT_TITLE}
              startFrame={0}
              duration={GIT_TITLE_REVEAL_DURATION}
              theme={solarTheme}
              fontSize={solarTheme.fontSizes.xxl}
              color={tc.text}
              direction="left"
            />
            <div style={{ marginTop: 20, minHeight: 120 }}>
              <Typewriter
                text={GIT_BODY}
                startFrame={GIT_BODY_START_FRAME}
                charsPerSecond={GIT_BODY_CPS}
                theme={solarTheme}
                fontSize={22}
                color={tc.textMuted}
                showCursor={false}
              />
            </div>
          </div>
        </Serie01SceneShell>
      </Sequence>

      <Sequence
        from={FRAME.githubConcept}
        durationInFrames={SCENE_DURATIONS.githubConcept}
        premountFor={PREMOUNT_FRAMES}
      >
        <Serie01SceneShell
          sceneNumber={4}
          totalScenes={TOTAL_SCENES}
          keyword={SCENE_KEYWORDS[3]}
          layout="stack"
          bottomPadding={120}
        >
          <div style={{ ...narrationBoxStyle, textAlign: "center" }}>
            <TextReveal
              text={GITHUB_TITLE}
              startFrame={0}
              duration={GITHUB_TITLE_REVEAL_DURATION}
              theme={solarTheme}
              fontSize={solarTheme.fontSizes.xxl}
              color={tc.text}
              direction="left"
            />
            <div style={{ marginTop: 18, minHeight: 100 }}>
              <Typewriter
                text={GITHUB_BODY}
                startFrame={GITHUB_BODY_START_FRAME}
                charsPerSecond={GITHUB_BODY_CPS}
                theme={solarTheme}
                fontSize={22}
                color={tc.textMuted}
                showCursor={false}
              />
            </div>
            <div style={{ marginTop: 12, minHeight: 40 }}>
              <Typewriter
                text={GITHUB_CALLOUT}
                startFrame={GITHUB_CALLOUT_START_FRAME}
                charsPerSecond={GITHUB_CALLOUT_CPS}
                theme={solarTheme}
                fontSize={20}
                fontFamily={solarTheme.fonts.title}
                color={tc.accent}
                showCursor={false}
              />
            </div>
          </div>

          <Sequence
            from={GITHUB_FLOW_FROM_LOCAL}
            durationInFrames={GITHUB_FLOW_DURATION}
            layout="none"
          >
            <div
              style={{
                position: "absolute",
                left: 32,
                right: 32,
                bottom: 56,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <FadeIn startFrame={0} durationInFrames={16} translateY={8}>
                <FlowChart
                  nodes={[
                    {
                      id: "1",
                      label: "Git",
                      subtitle: "sur ta machine",
                      icon: "▸",
                      color: tc.primary,
                    },
                    {
                      id: "2",
                      label: "GitHub",
                      subtitle: "en ligne",
                      icon: "☁",
                      color: tc.secondary,
                    },
                  ]}
                  startFrame={GITHUB_FLOW_START_LOCAL}
                  nodeDelay={GITHUB_FLOW_NODE_DELAY}
                  direction="horizontal"
                  theme={solarTheme}
                />
              </FadeIn>
            </div>
          </Sequence>
        </Serie01SceneShell>
      </Sequence>

      <Sequence
        from={FRAME.recap}
        durationInFrames={SCENE_DURATIONS.recap}
        premountFor={PREMOUNT_FRAMES}
      >
        <Serie01SceneShell
          sceneNumber={5}
          totalScenes={TOTAL_SCENES}
          keyword={SCENE_KEYWORDS[4]}
        >
          <div style={{ ...narrationBoxStyle, minHeight: 100 }}>
            <Typewriter
              text={RECAP_TEXT}
              startFrame={0}
              charsPerSecond={RECAP_CPS}
              theme={solarTheme}
              fontSize={26}
              fontFamily={solarTheme.fonts.title}
              color={tc.text}
              showCursor={false}
            />
          </div>
        </Serie01SceneShell>
      </Sequence>

      <Sequence
        from={FRAME.cta}
        durationInFrames={SCENE_DURATIONS.cta}
        premountFor={PREMOUNT_FRAMES}
      >
        <Serie01SceneShell
          sceneNumber={6}
          totalScenes={TOTAL_SCENES}
          keyword={SCENE_KEYWORDS[5]}
        >
          <div style={{ ...narrationBoxStyle, minHeight: 44 }}>
            <TextReveal
              text={CTA_TITLE}
              startFrame={0}
              duration={CTA_TITLE_REVEAL_DURATION}
              theme={solarTheme}
              fontSize={solarTheme.fontSizes.xxl}
              color={tc.text}
              direction="center"
            />
          </div>
          <div style={{ marginTop: 6, ...narrationBoxStyle }}>
            <Typewriter
              text={CTA_SUBTITLE}
              startFrame={CTA_SUB_START_FRAME}
              charsPerSecond={CTA_SUB_CPS}
              theme={solarTheme}
              fontSize={solarTheme.fontSizes.lg}
              color={tc.textMuted}
              showCursor={false}
            />
          </div>
        </Serie01SceneShell>
      </Sequence>
    </AbsoluteFill>
  );
};
