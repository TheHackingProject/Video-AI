import type React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { FadeIn } from "@repo/remotion-lib";
import {
  FadeSlide,
  FlowChart,
  GlitchText,
  ParticleField,
  ProgressBar,
  SceneHeader,
  Terminal,
  TextReveal,
  Typewriter,
  WordByWord,
  demoShowcaseColors,
  solarTheme,
  type Theme,
} from "@repo/ui/remotion";
import { CodeBlockStatic } from "@repo/ui/code-block-static";
import { ThpGitBranch, ThpMonitor, ThpTerminal } from "@repo/ui/icons";
import {
  CTA_SUBTITLE,
  CTA_SUB_START,
  CTA_SUBTITLE_CPS,
  CTA_TITLE,
  CTA_TITLE_REVEAL_DURATION,
  FRAME,
  INTRO_HOOK,
  INTRO_OBJECTIVE,
  INTRO_OBJECTIVE_START_FRAME,
  INTRO_TYPEWRITER_CPS,
  LESSON_STEP_LABELS,
  OS_PILLS,
  PREMOUNT_FRAMES,
  RECAP_FLOWCHART,
  RECAP_LINE1,
  RECAP_LINE2,
  RECAP_LINE2_START,
  RECAP_LINE2_WORD_DELAY,
  RECAP_TYPE_CPS,
  SCENE_DURATIONS,
  STEP1_ANALOGY,
  STEP1_ANALOGY_CPS,
  STEP1_BEATS,
  STEP1_CODE,
  STEP1_OS_LINE,
  STEP1_OS_WORD_DELAY,
  STEP2_BEATS,
  STEP2_BODY_CPS,
  STEP2_PARA1,
  STEP2_PARA2,
  STEP2_PARA2_START,
  STEP3_BEATS,
  STEP3_BODY_CPS,
  STEP3_PARA1,
  STEP3_PARA2,
  STEP3_PARA2_START,
  SUBTITLE,
  TERMINAL_BLOCK_START_IN_PARENT,
  TERMINAL_LS_LINES,
  TERMINAL_PROMPT,
  TERMINAL_PWD_LINES,
  TERMINAL_TYPE_SPEED,
  PILOT01_SCENE_KEYWORDS,
  PILOT01_TOTAL_SCENES,
  SHOW_TYPEWRITER_CURSOR,
  TITLE,
  TITLE_SUBTITLE_START_FRAME,
  TITLE_GLITCH_DURATION,
  TITLE_SUBTITLE_REVEAL_DURATION,
} from "./pilot01-content";
import { Serie01SceneShell } from "./Serie01SceneShell";

const tc = solarTheme.colors;
const particleColors = [
  tc.primary,
  tc.secondary,
  tc.accent,
  tc.success,
];
const VINE_TILE_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 Q45 15 30 30 Q15 45 30 60' fill='none' stroke='%2322c55e' stroke-width='1'/%3E%3C/svg%3E")`;

const narrationBoxStyle: React.CSSProperties = {
  maxWidth: 820,
  margin: "0 auto",
  textAlign: "center",
  lineHeight: 1.65,
};

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
              backgroundColor:
                n === activeStep ? `${theme.colors.primary}40` : "transparent",
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
          <ThpMonitor
            size={22}
            color={theme.colors.secondary}
            strokeWidth={2}
            aria-hidden
          />
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

  const recapFlowDuration = SCENE_DURATIONS.recap - RECAP_FLOWCHART.from;

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
          totalScenes={PILOT01_TOTAL_SCENES}
          keyword={PILOT01_SCENE_KEYWORDS[0]}
          transition="zoom-blur"
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
              intensity={0.42}
            />
          </div>
          <div style={{ marginTop: 28, minHeight: 72, ...narrationBoxStyle }}>
            <TextReveal
              text={SUBTITLE}
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
        from={FRAME.intro}
        durationInFrames={SCENE_DURATIONS.intro}
        premountFor={PREMOUNT_FRAMES}
      >
        <Serie01SceneShell
          sceneNumber={2}
          totalScenes={PILOT01_TOTAL_SCENES}
          keyword={PILOT01_SCENE_KEYWORDS[1]}
          transition="wipe-left"
        >
          <div style={{ minHeight: 168, ...narrationBoxStyle }}>
            <Typewriter
              text={INTRO_HOOK}
              startFrame={0}
              charsPerSecond={INTRO_TYPEWRITER_CPS}
              theme={solarTheme}
              fontSize={22}
              color={tc.text}
              showCursor={SHOW_TYPEWRITER_CURSOR}
            />
          </div>
          <div style={{ minHeight: 148, marginTop: 8, ...narrationBoxStyle }}>
            <Typewriter
              text={INTRO_OBJECTIVE}
              startFrame={INTRO_OBJECTIVE_START_FRAME}
              charsPerSecond={INTRO_TYPEWRITER_CPS}
              theme={solarTheme}
              fontSize={22}
              color={tc.text}
              showCursor={SHOW_TYPEWRITER_CURSOR}
            />
          </div>
        </Serie01SceneShell>
      </Sequence>

      <Sequence
        from={FRAME.step1}
        durationInFrames={SCENE_DURATIONS.step1}
        premountFor={PREMOUNT_FRAMES}
      >
        <AbsoluteFill style={{ zIndex: 1 }}>
          <SceneHeader
            sceneNumber={3}
            totalScenes={PILOT01_TOTAL_SCENES}
            keyword={PILOT01_SCENE_KEYWORDS[2]}
            startFrame={0}
            theme={solarTheme}
          />
          <FadeSlide direction="bottom" delay={3} distance={36}>
            <AbsoluteFill>
              <LessonStepsFooter activeStep={1} theme={solarTheme} />

              <Sequence
                from={STEP1_BEATS.analogy.from}
                durationInFrames={STEP1_BEATS.analogy.duration}
                layout="none"
              >
                <div
                  style={{
                    position: "absolute",
                    top: 100,
                    left: 40,
                    right: 40,
                  }}
                >
                  <div style={narrationBoxStyle}>
                    <Typewriter
                      text={STEP1_ANALOGY}
                      startFrame={0}
                      charsPerSecond={STEP1_ANALOGY_CPS}
                      theme={solarTheme}
                      fontSize={22}
                      color={tc.text}
                      showCursor={SHOW_TYPEWRITER_CURSOR}
                    />
                  </div>
                </div>
              </Sequence>

              <Sequence
                from={STEP1_BEATS.pills.from}
                durationInFrames={STEP1_BEATS.pills.duration}
                layout="none"
              >
                <div
                  style={{
                    position: "absolute",
                    top: 310,
                    left: 40,
                    right: 40,
                  }}
                >
                  <FadeIn
                    startFrame={0}
                    durationInFrames={16}
                    translateY={14}
                  >
                    <OsPillsRow theme={solarTheme} />
                  </FadeIn>
                </div>
              </Sequence>

              <Sequence
                from={STEP1_BEATS.osLine.from}
                durationInFrames={STEP1_BEATS.osLine.duration}
                layout="none"
              >
                <div
                  style={{
                    position: "absolute",
                    top: 480,
                    left: 40,
                    right: 40,
                  }}
                >
                  <div style={narrationBoxStyle}>
                    <WordByWord
                      text={STEP1_OS_LINE}
                      startFrame={0}
                      wordDelay={STEP1_OS_WORD_DELAY}
                      theme={solarTheme}
                      fontSize={19}
                      color={tc.textMuted}
                      highlightColor={tc.success}
                    />
                  </div>
                </div>
              </Sequence>

              <Sequence
                from={STEP1_BEATS.code.from}
                durationInFrames={STEP1_BEATS.code.duration}
                layout="none"
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: 150,
                    left: 40,
                    right: 40,
                    display: "flex",
                    justifyContent: "center",
                    zIndex: 6,
                  }}
                >
                  <FadeIn
                    startFrame={0}
                    durationInFrames={18}
                    translateY={12}
                  >
                    <div style={{ width: "100%", maxWidth: 720 }}>
                      <CodeBlockStatic
                        code={STEP1_CODE}
                        showLineNumbers={false}
                        title="terminal"
                      />
                    </div>
                  </FadeIn>
                </div>
              </Sequence>
            </AbsoluteFill>
          </FadeSlide>
        </AbsoluteFill>
      </Sequence>

      <Sequence
        from={FRAME.step2}
        durationInFrames={SCENE_DURATIONS.step2}
        premountFor={PREMOUNT_FRAMES}
      >
        <AbsoluteFill style={{ zIndex: 1 }}>
          <SceneHeader
            sceneNumber={4}
            totalScenes={PILOT01_TOTAL_SCENES}
            keyword={PILOT01_SCENE_KEYWORDS[3]}
            startFrame={0}
            theme={solarTheme}
          />
          <FadeSlide direction="bottom" delay={3} distance={36}>
            <AbsoluteFill>
              <LessonStepsFooter activeStep={2} theme={solarTheme} />

              <div
                style={{
                  position: "absolute",
                  top: 96,
                  left: 48,
                  right: 48,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  maxWidth: 920,
                  margin: "0 auto",
                }}
              >
            <FadeIn startFrame={0} durationInFrames={14} translateY={10}>
              <ThpTerminal size={36} color={tc.primary} strokeWidth={2} aria-hidden />
            </FadeIn>
            <div style={{ flex: 1, paddingTop: 4 }}>
              <div style={{ ...narrationBoxStyle, textAlign: "left" }}>
                <Typewriter
                  text={STEP2_PARA1}
                  startFrame={0}
                  charsPerSecond={STEP2_BODY_CPS}
                  theme={solarTheme}
                  fontSize={21}
                  color={tc.text}
                  showCursor={SHOW_TYPEWRITER_CURSOR}
                />
              </div>
              <div
                style={{
                  marginTop: 18,
                  minHeight: 88,
                  ...narrationBoxStyle,
                  textAlign: "left",
                }}
              >
                <Typewriter
                  text={STEP2_PARA2}
                  startFrame={STEP2_PARA2_START}
                  charsPerSecond={STEP2_BODY_CPS}
                  theme={solarTheme}
                  fontSize={21}
                  color={tc.text}
                  showCursor={SHOW_TYPEWRITER_CURSOR}
                />
              </div>
            </div>
          </div>

              <Sequence
                from={STEP2_BEATS.terminal.from}
                durationInFrames={STEP2_BEATS.terminal.duration}
                layout="none"
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: 150,
                    left: 48,
                    right: 48,
                    display: "flex",
                    justifyContent: "center",
                    zIndex: 6,
                  }}
                >
                  <div style={{ width: "100%", maxWidth: 640 }}>
                    <FadeIn startFrame={0} durationInFrames={14} translateY={10}>
                      <Terminal
                        lines={TERMINAL_PWD_LINES}
                        title="terminal"
                        startFrame={TERMINAL_BLOCK_START_IN_PARENT}
                        typeSpeed={TERMINAL_TYPE_SPEED}
                        prompt={TERMINAL_PROMPT}
                        theme={solarTheme}
                      />
                    </FadeIn>
                  </div>
                </div>
              </Sequence>
            </AbsoluteFill>
          </FadeSlide>
        </AbsoluteFill>
      </Sequence>

      <Sequence
        from={FRAME.step3}
        durationInFrames={SCENE_DURATIONS.step3}
        premountFor={PREMOUNT_FRAMES}
      >
        <AbsoluteFill style={{ zIndex: 1 }}>
          <SceneHeader
            sceneNumber={5}
            totalScenes={PILOT01_TOTAL_SCENES}
            keyword={PILOT01_SCENE_KEYWORDS[4]}
            startFrame={0}
            theme={solarTheme}
          />
          <FadeSlide direction="bottom" delay={3} distance={36}>
            <AbsoluteFill>
              <LessonStepsFooter activeStep={3} theme={solarTheme} />

              <div
                style={{
                  position: "absolute",
                  top: 96,
                  left: 48,
                  right: 48,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  maxWidth: 920,
                  margin: "0 auto",
                }}
              >
                <FadeIn startFrame={0} durationInFrames={12} translateY={10}>
                  <ThpTerminal size={36} color={tc.secondary} strokeWidth={2} aria-hidden />
                </FadeIn>
                <div style={{ flex: 1, paddingTop: 4 }}>
                  <div style={{ ...narrationBoxStyle, textAlign: "left" }}>
                    <Typewriter
                      text={STEP3_PARA1}
                      startFrame={0}
                      charsPerSecond={STEP3_BODY_CPS}
                      theme={solarTheme}
                      fontSize={21}
                      color={tc.text}
                      showCursor={SHOW_TYPEWRITER_CURSOR}
                    />
                  </div>
                  <div
                    style={{
                      marginTop: 16,
                      minHeight: 72,
                      ...narrationBoxStyle,
                      textAlign: "left",
                    }}
                  >
                    <Typewriter
                      text={STEP3_PARA2}
                      startFrame={STEP3_PARA2_START}
                      charsPerSecond={STEP3_BODY_CPS}
                      theme={solarTheme}
                      fontSize={21}
                      color={tc.text}
                      showCursor={SHOW_TYPEWRITER_CURSOR}
                    />
                  </div>
                </div>
              </div>

              <Sequence
                from={STEP3_BEATS.terminal.from}
                durationInFrames={STEP3_BEATS.terminal.duration}
                layout="none"
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: 150,
                    left: 48,
                    right: 48,
                    display: "flex",
                    justifyContent: "center",
                    zIndex: 6,
                  }}
                >
                  <div style={{ width: "100%", maxWidth: 640 }}>
                    <FadeIn startFrame={0} durationInFrames={12} translateY={10}>
                      <Terminal
                        lines={TERMINAL_LS_LINES}
                        title="terminal"
                        startFrame={TERMINAL_BLOCK_START_IN_PARENT}
                        typeSpeed={TERMINAL_TYPE_SPEED}
                        prompt={TERMINAL_PROMPT}
                        theme={solarTheme}
                      />
                    </FadeIn>
                  </div>
                </div>
              </Sequence>
            </AbsoluteFill>
          </FadeSlide>
        </AbsoluteFill>
      </Sequence>

      <Sequence
        from={FRAME.recap}
        durationInFrames={SCENE_DURATIONS.recap}
        premountFor={PREMOUNT_FRAMES}
      >
        <AbsoluteFill style={{ zIndex: 1 }}>
          <SceneHeader
            sceneNumber={6}
            totalScenes={PILOT01_TOTAL_SCENES}
            keyword={PILOT01_SCENE_KEYWORDS[5]}
            startFrame={0}
            theme={solarTheme}
          />
          <FadeSlide direction="bottom" delay={3} distance={36}>
            <AbsoluteFill>
              <div
                style={{
                  paddingTop: 88,
                  paddingLeft: 40,
                  paddingRight: 40,
                }}
              >
                <div style={{ ...narrationBoxStyle, minHeight: 120 }}>
                  <Typewriter
                    text={RECAP_LINE1}
                    startFrame={0}
                    charsPerSecond={RECAP_TYPE_CPS}
                    theme={solarTheme}
                    fontSize={21}
                    color={tc.text}
                    showCursor={SHOW_TYPEWRITER_CURSOR}
                  />
                </div>
                <div style={{ ...narrationBoxStyle, minHeight: 88, marginTop: 12 }}>
                  <WordByWord
                    text={RECAP_LINE2}
                    startFrame={RECAP_LINE2_START}
                    wordDelay={RECAP_LINE2_WORD_DELAY}
                    theme={solarTheme}
                    fontSize={21}
                    color={tc.text}
                    highlightColor={tc.accent}
                  />
                </div>
              </div>

              <Sequence
                from={RECAP_FLOWCHART.from}
                durationInFrames={recapFlowDuration}
                layout="none"
              >
                <div
                  style={{
                    position: "absolute",
                    left: 40,
                    right: 40,
                    bottom: 72,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <FadeIn startFrame={0} durationInFrames={16} translateY={12}>
                    <FlowChart
                      nodes={[
                        { id: "1", label: "Terminal", icon: "▸", color: tc.primary },
                        { id: "2", label: "pwd", icon: "📍", color: tc.accent },
                        { id: "3", label: "ls", icon: "📂", color: tc.secondary },
                        { id: "4", label: "Prêt", icon: "✓", color: tc.success },
                      ]}
                      startFrame={RECAP_FLOWCHART.startFrameLocal}
                      nodeDelay={RECAP_FLOWCHART.nodeDelay}
                      direction="horizontal"
                      theme={solarTheme}
                    />
                  </FadeIn>
                </div>
              </Sequence>
            </AbsoluteFill>
          </FadeSlide>
        </AbsoluteFill>
      </Sequence>

      <Sequence
        from={FRAME.cta}
        durationInFrames={SCENE_DURATIONS.cta}
        premountFor={PREMOUNT_FRAMES}
      >
        <Serie01SceneShell
          sceneNumber={7}
          totalScenes={PILOT01_TOTAL_SCENES}
          keyword={PILOT01_SCENE_KEYWORDS[6]}
          bottomPadding={48}
          transition="zoom-blur"
        >
          <FadeIn startFrame={0} durationInFrames={12} translateY={10}>
            <ThpGitBranch size={48} color={tc.accent} strokeWidth={2} aria-hidden />
          </FadeIn>
          <div style={{ ...narrationBoxStyle, marginTop: 8 }}>
            <TextReveal
              text={CTA_TITLE}
              startFrame={0}
              duration={CTA_TITLE_REVEAL_DURATION}
              theme={solarTheme}
              fontSize={solarTheme.fontSizes.xxl}
              color={tc.text}
              direction="left"
            />
          </div>
          <div style={{ ...narrationBoxStyle, minHeight: 48, marginTop: 12 }}>
            <Typewriter
              text={CTA_SUBTITLE}
              startFrame={CTA_SUB_START}
              charsPerSecond={CTA_SUBTITLE_CPS}
              theme={solarTheme}
              fontSize={solarTheme.fontSizes.lg}
              color={tc.textMuted}
              showCursor={SHOW_TYPEWRITER_CURSOR}
            />
          </div>
        </Serie01SceneShell>
      </Sequence>
    </AbsoluteFill>
  );
};
