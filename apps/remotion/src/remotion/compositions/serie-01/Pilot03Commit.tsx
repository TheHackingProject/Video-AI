import type React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
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
  HOOK_CPS,
  HOOK_TEXT,
  PREMOUNT_FRAMES,
  RECAP_CPS,
  RECAP_TEXT,
  SAVE_BODY,
  SAVE_BODY_CPS,
  SAVE_BODY_START_FRAME,
  SAVE_TITLE,
  SAVE_TITLE_REVEAL_DURATION,
  SCENE_DURATIONS,
  SCENE_KEYWORDS,
  TITLE,
  TITLE_GLITCH_DURATION,
  TITLE_SUBTITLE,
  TITLE_SUBTITLE_REVEAL_DURATION,
  TITLE_SUBTITLE_START_FRAME,
  TOTAL_SCENES,
  WORKFLOW_BODY,
  WORKFLOW_BODY_CPS,
  WORKFLOW_BODY_START_FRAME,
  WORKFLOW_FLOW_FROM_LOCAL,
  WORKFLOW_FLOW_NODE_DELAY,
  WORKFLOW_FLOWCHART_START_FRAME,
  WORKFLOW_TITLE,
  WORKFLOW_TITLE_REVEAL_DURATION,
} from "./pilot03-content";

const tc = solarTheme.colors;
const particleColors = [tc.primary, tc.secondary, tc.accent, tc.success];
const VINE_TILE_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 Q45 15 30 30 Q15 45 30 60' fill='none' stroke='%2322c55e' stroke-width='1'/%3E%3C/svg%3E")`;

const narrationBoxStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 920,
  margin: "0 auto",
  textAlign: "center",
  lineHeight: 1.65,
  boxSizing: "border-box",
};

const heroGlitchWrapStyle: React.CSSProperties = {
  ...narrationBoxStyle,
  display: "flex",
  justifyContent: "center",
  paddingLeft: 20,
  paddingRight: 20,
};

export const Pilot03Commit: React.FC = () => {
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
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.08,
          background: `
            linear-gradient(135deg, transparent 45%, ${tc.primary}10 50%, transparent 55%),
            linear-gradient(225deg, transparent 45%, ${tc.secondary}0f 50%, transparent 55%)
          `,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.03,
          pointerEvents: "none",
          backgroundImage: VINE_TILE_PATTERN,
        }}
      />

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
          transition="wipe-left"
        >
          <div style={heroGlitchWrapStyle}>
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
          transition="zoom-blur"
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
        from={FRAME.saveConcept}
        durationInFrames={SCENE_DURATIONS.saveConcept}
        premountFor={PREMOUNT_FRAMES}
      >
        <Serie01SceneShell
          sceneNumber={3}
          totalScenes={TOTAL_SCENES}
          keyword={SCENE_KEYWORDS[2]}
        >
          <div style={narrationBoxStyle}>
            <TextReveal
              text={SAVE_TITLE}
              startFrame={0}
              duration={SAVE_TITLE_REVEAL_DURATION}
              theme={solarTheme}
              fontSize={solarTheme.fontSizes.xxl}
              color={tc.text}
              direction="left"
            />
            <div style={{ marginTop: 20, minHeight: 120 }}>
              <Typewriter
                text={SAVE_BODY}
                startFrame={SAVE_BODY_START_FRAME}
                charsPerSecond={SAVE_BODY_CPS}
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
        from={FRAME.workflowConcept}
        durationInFrames={SCENE_DURATIONS.workflowConcept}
        premountFor={PREMOUNT_FRAMES}
      >
        <Serie01SceneShell
          sceneNumber={4}
          totalScenes={TOTAL_SCENES}
          keyword={SCENE_KEYWORDS[3]}
          layout="stack"
          bottomPadding={56}
        >
          <div
            style={{
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "stretch",
              width: "100%",
            }}
          >
            {/*
              One visual group: copy + fixed gap + FlowChart. Do not put flex:1 between
              text and chart — it pins the diagram to the progress bar with a huge void.
            */}
            <div style={{ width: "100%", flexShrink: 0 }}>
              <div style={{ ...narrationBoxStyle, textAlign: "center" }}>
                <TextReveal
                  text={WORKFLOW_TITLE}
                  startFrame={0}
                  duration={WORKFLOW_TITLE_REVEAL_DURATION}
                  theme={solarTheme}
                  fontSize={solarTheme.fontSizes.xxl}
                  color={tc.text}
                  direction="left"
                />
                <div style={{ marginTop: 18, minHeight: 88 }}>
                  <Typewriter
                    text={WORKFLOW_BODY}
                    startFrame={WORKFLOW_BODY_START_FRAME}
                    charsPerSecond={WORKFLOW_BODY_CPS}
                    theme={solarTheme}
                    fontSize={22}
                    color={tc.textMuted}
                    showCursor={false}
                  />
                </div>
              </div>
              <div
                style={{
                  marginTop: 28,
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <FadeIn
                  startFrame={WORKFLOW_FLOW_FROM_LOCAL}
                  durationInFrames={16}
                  translateY={8}
                >
                  <FlowChart
                    nodes={[
                      {
                        id: "1",
                        label: "Modifier",
                        subtitle: "tes fichiers",
                        icon: "✎",
                        color: tc.primary,
                      },
                      {
                        id: "2",
                        label: "Enregistrer",
                        subtitle: "avec Git",
                        icon: "◆",
                        color: tc.secondary,
                      },
                      {
                        id: "3",
                        label: "Commit",
                        subtitle: "dans l’historique",
                        icon: "▸",
                        color: tc.accent,
                      },
                    ]}
                    startFrame={WORKFLOW_FLOWCHART_START_FRAME}
                    nodeDelay={WORKFLOW_FLOW_NODE_DELAY}
                    direction="horizontal"
                    theme={solarTheme}
                  />
                </FadeIn>
              </div>
            </div>
          </div>
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
          transition="wipe-left"
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
