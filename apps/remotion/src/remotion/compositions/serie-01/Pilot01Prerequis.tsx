import type React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import {
  TitleCardAnimated,
  SectionIntroAnimated,
} from "@repo/remotion-lib";
import {
  FlowChart,
  ParticleField,
  ProgressBar,
  SceneHeader,
  Terminal,
  demoShowcaseColors,
  solarTheme,
  type Theme,
} from "@repo/ui/remotion";
import { CodeBlockStatic } from "@repo/ui/code-block-static";
import { ThpGitBranch, ThpMonitor, ThpTerminal } from "@repo/ui/icons";
import {
  CTA_SUBTITLE,
  CTA_TITLE,
  INTRO_HOOK,
  INTRO_OBJECTIVE,
  LESSON_STEP_LABELS,
  OS_PILLS,
  RECAP_TEXT,
  STEP1_ANALOGY,
  STEP1_CODE,
  STEP1_OS_LINE,
  STEP2_BODY,
  STEP3_BODY,
  SUBTITLE,
  TERMINAL_LS_LINES,
  TERMINAL_PROMPT,
  TERMINAL_PWD_LINES,
  TERMINAL_TYPE_SPEED,
  TITLE,
} from "./pilot01-content";

const FPS = 30;

const SCENE_DURATIONS = {
  title: 5 * FPS,
  intro: 14 * FPS,
  step1: 32 * FPS,
  step2: 26 * FPS,
  step3: 26 * FPS,
  recap: 12 * FPS,
  cta: 5 * FPS,
} as const;

const INTRO_HALF = Math.floor(SCENE_DURATIONS.intro / 2);

const FRAME = {
  title: 0,
  intro: SCENE_DURATIONS.title,
  step1: SCENE_DURATIONS.title + SCENE_DURATIONS.intro,
  step2:
    SCENE_DURATIONS.title +
    SCENE_DURATIONS.intro +
    SCENE_DURATIONS.step1,
  step3:
    SCENE_DURATIONS.title +
    SCENE_DURATIONS.intro +
    SCENE_DURATIONS.step1 +
    SCENE_DURATIONS.step2,
  recap:
    SCENE_DURATIONS.title +
    SCENE_DURATIONS.intro +
    SCENE_DURATIONS.step1 +
    SCENE_DURATIONS.step2 +
    SCENE_DURATIONS.step3,
  cta:
    SCENE_DURATIONS.title +
    SCENE_DURATIONS.intro +
    SCENE_DURATIONS.step1 +
    SCENE_DURATIONS.step2 +
    SCENE_DURATIONS.step3 +
    SCENE_DURATIONS.recap,
};

const PREMOUNT = FPS;
const tc = solarTheme.colors;
const particleColors = [
  tc.primary,
  tc.secondary,
  tc.accent,
  tc.success,
];

function LessonStepsFooter({
  activeStep,
  theme,
}: {
  activeStep: 1 | 2 | 3;
  theme: Theme;
}): React.ReactElement {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 76,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: theme.spacing.sm,
        zIndex: 8,
        pointerEvents: "none",
      }}
    >
      {LESSON_STEP_LABELS.map((label, i) => {
        const n = (i + 1) as 1 | 2 | 3;
        const on = n <= activeStep;
        return (
          <div
            key={label}
            style={{
              padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
              borderRadius: theme.borderRadius.md,
              border: `1px solid ${theme.colors.textDark}`,
              backgroundColor: n === activeStep ? `${theme.colors.primary}40` : "transparent",
              color: on ? theme.colors.text : theme.colors.textMuted,
              fontFamily: theme.fonts.body,
              fontSize: theme.fontSizes.sm,
              fontWeight: n === activeStep ? 600 : 400,
            }}
          >
            {n}/3 · {label}
          </div>
        );
      })}
    </div>
  );
}

function OsPillsRow({ theme }: { theme: Theme }): React.ReactElement {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: theme.spacing.md,
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.md,
      }}
    >
      {OS_PILLS.map((pill) => (
        <div
          key={pill.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: theme.spacing.sm,
            padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
            borderRadius: theme.borderRadius.lg,
            border: `1px solid ${theme.colors.secondary}80`,
            backgroundColor: `${theme.colors.backgroundLight}cc`,
          }}
        >
          <ThpMonitor size={22} color={theme.colors.secondary} strokeWidth={2} aria-hidden />
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                fontFamily: theme.fonts.title,
                fontSize: theme.fontSizes.md,
                color: theme.colors.text,
                fontWeight: 600,
              }}
            >
              {pill.label}
            </div>
            <div
              style={{
                fontFamily: theme.fonts.body,
                fontSize: theme.fontSizes.sm,
                color: theme.colors.textMuted,
                maxWidth: 200,
              }}
            >
              {pill.hint}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export const Pilot01Prerequis: React.FC = () => {
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
          count={42}
          speed={0.18}
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

      <Sequence from={FRAME.title} durationInFrames={SCENE_DURATIONS.title} premountFor={PREMOUNT}>
        <AbsoluteFill style={{ zIndex: 1 }}>
          <TitleCardAnimated
            title={TITLE}
            subtitle={SUBTITLE}
            startFrame={0}
            durationInFrames={24}
            titleColor={tc.text}
            subtitleColor={tc.textMuted}
          />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={FRAME.intro} durationInFrames={SCENE_DURATIONS.intro} premountFor={PREMOUNT}>
        <AbsoluteFill style={{ zIndex: 1 }}>
          <SceneHeader
            sceneNumber={1}
            totalScenes={5}
            keyword="INTRO"
            startFrame={0}
            theme={solarTheme}
          />
          <Sequence durationInFrames={INTRO_HALF} layout="none">
            <SectionIntroAnimated
              text={INTRO_HOOK}
              startFrame={0}
              durationInFrames={22}
              textColor={tc.text}
            />
          </Sequence>
          <Sequence from={INTRO_HALF} durationInFrames={SCENE_DURATIONS.intro - INTRO_HALF} layout="none">
            <SectionIntroAnimated
              text={INTRO_OBJECTIVE}
              startFrame={0}
              durationInFrames={22}
              textColor={tc.text}
            />
          </Sequence>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={FRAME.step1} durationInFrames={SCENE_DURATIONS.step1} premountFor={PREMOUNT}>
        <AbsoluteFill style={{ zIndex: 1 }}>
          <SceneHeader
            sceneNumber={2}
            totalScenes={5}
            keyword="OUVRIR"
            startFrame={0}
            theme={solarTheme}
          />
          <LessonStepsFooter activeStep={1} theme={solarTheme} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingTop: 100,
              paddingLeft: 48,
              paddingRight: 48,
              height: "100%",
              overflow: "hidden",
            }}
          >
            <SectionIntroAnimated
              text={STEP1_ANALOGY}
              startFrame={0}
              durationInFrames={24}
              textColor={tc.text}
            />
            <OsPillsRow theme={solarTheme} />
            <SectionIntroAnimated
              text={STEP1_OS_LINE}
              startFrame={36}
              durationInFrames={22}
              textColor={tc.textMuted}
            />
            <div style={{ width: "100%", maxWidth: 720, marginTop: 16 }}>
              <CodeBlockStatic code={STEP1_CODE} showLineNumbers={false} title="terminal" />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={FRAME.step2} durationInFrames={SCENE_DURATIONS.step2} premountFor={PREMOUNT}>
        <AbsoluteFill style={{ zIndex: 1 }}>
          <SceneHeader
            sceneNumber={3}
            totalScenes={5}
            keyword="PWD"
            startFrame={0}
            theme={solarTheme}
          />
          <LessonStepsFooter activeStep={2} theme={solarTheme} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 48,
              gap: 20,
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                maxWidth: 880,
              }}
            >
              <ThpTerminal size={36} color={tc.primary} strokeWidth={2} aria-hidden />
              <div style={{ flex: 1 }}>
                <SectionIntroAnimated
                  text={STEP2_BODY}
                  startFrame={0}
                  durationInFrames={26}
                  textColor={tc.text}
                />
              </div>
            </div>
            <div style={{ width: "100%", maxWidth: 640 }}>
              <Terminal
                lines={TERMINAL_PWD_LINES}
                title="terminal"
                startFrame={12}
                typeSpeed={TERMINAL_TYPE_SPEED}
                prompt={TERMINAL_PROMPT}
                theme={solarTheme}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={FRAME.step3} durationInFrames={SCENE_DURATIONS.step3} premountFor={PREMOUNT}>
        <AbsoluteFill style={{ zIndex: 1 }}>
          <SceneHeader
            sceneNumber={4}
            totalScenes={5}
            keyword="LS"
            startFrame={0}
            theme={solarTheme}
          />
          <LessonStepsFooter activeStep={3} theme={solarTheme} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 48,
              gap: 20,
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                maxWidth: 880,
              }}
            >
              <ThpTerminal size={36} color={tc.secondary} strokeWidth={2} aria-hidden />
              <div style={{ flex: 1 }}>
                <SectionIntroAnimated
                  text={STEP3_BODY}
                  startFrame={0}
                  durationInFrames={26}
                  textColor={tc.text}
                />
              </div>
            </div>
            <div style={{ width: "100%", maxWidth: 640 }}>
              <Terminal
                lines={TERMINAL_LS_LINES}
                title="terminal"
                startFrame={12}
                typeSpeed={TERMINAL_TYPE_SPEED}
                prompt={TERMINAL_PROMPT}
                theme={solarTheme}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={FRAME.recap} durationInFrames={SCENE_DURATIONS.recap} premountFor={PREMOUNT}>
        <AbsoluteFill style={{ zIndex: 1 }}>
          <SceneHeader
            sceneNumber={5}
            totalScenes={5}
            keyword="RÉCAP"
            startFrame={0}
            theme={solarTheme}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 48,
              gap: 28,
              height: "100%",
            }}
          >
            <SectionIntroAnimated
              text={RECAP_TEXT}
              startFrame={0}
              durationInFrames={22}
              textColor={tc.text}
            />
            <FlowChart
              nodes={[
                { id: "1", label: "Terminal", icon: "▸", color: tc.primary },
                { id: "2", label: "pwd", icon: "📍", color: tc.accent },
                { id: "3", label: "ls", icon: "📂", color: tc.secondary },
                { id: "4", label: "Prêt", icon: "✓", color: tc.success },
              ]}
              startFrame={18}
              nodeDelay={12}
              direction="horizontal"
              theme={solarTheme}
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={FRAME.cta} durationInFrames={SCENE_DURATIONS.cta} premountFor={PREMOUNT}>
        <AbsoluteFill style={{ zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: 20,
            }}
          >
            <ThpGitBranch size={48} color={tc.accent} strokeWidth={2} aria-hidden />
            <TitleCardAnimated
              title={CTA_TITLE}
              subtitle={CTA_SUBTITLE}
              startFrame={0}
              durationInFrames={18}
              titleColor={tc.text}
              subtitleColor={tc.textMuted}
            />
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
