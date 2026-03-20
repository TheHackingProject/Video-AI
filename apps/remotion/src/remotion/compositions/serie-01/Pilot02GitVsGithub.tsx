import type React from "react";
import {
  AbsoluteFill,
  Sequence,
  useVideoConfig,
} from "remotion";
import { FadeIn } from "@repo/remotion-lib";
import {
  FadeSlide,
  FlowChart,
  ParticleField,
  ProgressBar,
  SceneHeader,
  TextReveal,
  Typewriter,
  demoShowcaseColors,
  solarTheme,
} from "@repo/ui/remotion";
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
  TITLE_REVEAL_DURATION,
  TITLE_SUBTITLE,
  TITLE_SUBTITLE_CPS,
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

function SceneShell({
  sceneIndex,
  children,
}: {
  sceneIndex: number;
  children: React.ReactNode;
}): React.ReactElement {
  const n = sceneIndex + 1;
  return (
    <AbsoluteFill style={{ zIndex: 1 }}>
      <SceneHeader
        sceneNumber={n}
        totalScenes={TOTAL_SCENES}
        keyword={SCENE_KEYWORDS[sceneIndex]}
        startFrame={0}
        theme={solarTheme}
      />
      <FadeSlide direction="bottom" delay={3} distance={36}>
        <AbsoluteFill>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 88,
              paddingLeft: 40,
              paddingRight: 40,
              paddingBottom: 40,
              boxSizing: "border-box",
            }}
          >
            {children}
          </div>
        </AbsoluteFill>
      </FadeSlide>
    </AbsoluteFill>
  );
}

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
        <SceneShell sceneIndex={0}>
          <div style={narrationBoxStyle}>
            <TextReveal
              text={TITLE}
              startFrame={0}
              duration={TITLE_REVEAL_DURATION}
              theme={solarTheme}
              fontSize={solarTheme.fontSizes.display}
              color={tc.text}
              direction="left"
            />
          </div>
          <div style={{ marginTop: 20, minHeight: 56, ...narrationBoxStyle }}>
            <Typewriter
              text={TITLE_SUBTITLE}
              startFrame={TITLE_SUBTITLE_START_FRAME}
              charsPerSecond={TITLE_SUBTITLE_CPS}
              theme={solarTheme}
              fontSize={solarTheme.fontSizes.xl}
              fontFamily={solarTheme.fonts.body}
              color={tc.textMuted}
              showCursor={false}
            />
          </div>
        </SceneShell>
      </Sequence>

      <Sequence
        from={FRAME.hook}
        durationInFrames={SCENE_DURATIONS.hook}
        premountFor={PREMOUNT_FRAMES}
      >
        <SceneShell sceneIndex={1}>
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
        </SceneShell>
      </Sequence>

      <Sequence
        from={FRAME.gitConcept}
        durationInFrames={SCENE_DURATIONS.gitConcept}
        premountFor={PREMOUNT_FRAMES}
      >
        <SceneShell sceneIndex={2}>
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
        </SceneShell>
      </Sequence>

      <Sequence
        from={FRAME.githubConcept}
        durationInFrames={SCENE_DURATIONS.githubConcept}
        premountFor={PREMOUNT_FRAMES}
      >
        <AbsoluteFill style={{ zIndex: 1 }}>
          <SceneHeader
            sceneNumber={4}
            totalScenes={TOTAL_SCENES}
            keyword={SCENE_KEYWORDS[3]}
            startFrame={0}
            theme={solarTheme}
          />
          <FadeSlide direction="bottom" delay={3} distance={36}>
            <AbsoluteFill>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  paddingTop: 88,
                  paddingLeft: 40,
                  paddingRight: 40,
                  paddingBottom: 120,
                  boxSizing: "border-box",
                }}
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
              </div>
            </AbsoluteFill>
          </FadeSlide>
        </AbsoluteFill>
      </Sequence>

      <Sequence
        from={FRAME.recap}
        durationInFrames={SCENE_DURATIONS.recap}
        premountFor={PREMOUNT_FRAMES}
      >
        <SceneShell sceneIndex={4}>
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
        </SceneShell>
      </Sequence>

      <Sequence
        from={FRAME.cta}
        durationInFrames={SCENE_DURATIONS.cta}
        premountFor={PREMOUNT_FRAMES}
      >
        <SceneShell sceneIndex={5}>
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
        </SceneShell>
      </Sequence>
    </AbsoluteFill>
  );
};
