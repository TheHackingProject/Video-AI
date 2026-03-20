import type React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import {
  TitleCardAnimated,
  SectionIntroAnimated,
  CodeAlongStep,
} from "@repo/remotion-lib";
import { Terminal } from "@repo/ui/remotion";

const FPS = 30;

/** Durations aligned with KM/Docs/video-ai-preparation/pilot-01-prerequis-outline.md (~120 s @ 30 fps). */
const SCENE_DURATIONS = {
  title: 5 * FPS,
  intro: 14 * FPS,
  step1: 32 * FPS,
  step2: 26 * FPS,
  step3: 26 * FPS,
  recap: 12 * FPS,
  cta: 5 * FPS,
};

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

const STEP1_LABEL =
  "Le terminal, c'est une fenêtre où tu tapes des commandes. Sur Mac : cherche Terminal dans le Spotlight. Sur Linux : Ctrl+Alt+T ou cherche Terminal dans le menu. Sur Windows : PowerShell, ou installe WSL / Git Bash.";

const STEP1_CODE = `# Ouvrir le terminal
# Mac : Spotlight → "Terminal"
# Linux : Ctrl+Alt+T
# Windows : PowerShell ou Git Bash`;

const STEP2_LABEL =
  "Une fois le terminal ouvert, tape pwd puis Entrée. P-W-D veut dire « print working directory » : ça affiche le dossier dans lequel tu te trouves.";

const STEP2_LINES = [
  { type: "command" as const, text: "pwd" },
  { type: "output" as const, text: "/Users/toto/projets" },
];

const STEP3_LABEL =
  "Pour voir le contenu du dossier actuel, tape ls puis Entrée. Sur Windows PowerShell tu peux utiliser dir. Tu obtiens la liste des fichiers et dossiers.";

const STEP3_LINES = [
  { type: "command" as const, text: "ls" },
  { type: "output" as const, text: "README.md  src  package.json" },
];

const RECAP_TEXT =
  "Tu as ouvert le terminal et utilisé pwd et ls. Tu es prêt pour suivre les prochaines vidéos en ligne de commande.";

const TERMINAL_TYPE_SPEED = 2;

export const Pilot01Prerequis: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0d1117",
      }}
    >
      <Sequence from={FRAME.title} durationInFrames={SCENE_DURATIONS.title}>
        <TitleCardAnimated
          title="Pré-requis : terminal et bases"
          subtitle="Pour suivre les démos Git"
          startFrame={FRAME.title}
          durationInFrames={20}
        />
      </Sequence>

      <Sequence from={FRAME.intro} durationInFrames={SCENE_DURATIONS.intro}>
        <SectionIntroAnimated
          text="Dans les prochaines vidéos on va utiliser Git en ligne de commande. On va voir où ouvrir le terminal et une ou deux commandes de base."
          startFrame={FRAME.intro}
          durationInFrames={20}
        />
      </Sequence>

      <Sequence from={FRAME.step1} durationInFrames={SCENE_DURATIONS.step1}>
        <CodeAlongStep
          steps={[{ label: STEP1_LABEL, code: STEP1_CODE }]}
          startFrame={FRAME.step1}
          durationPerStep={SCENE_DURATIONS.step1}
          showLineNumbers={false}
          title="terminal"
          fadeInDuration={20}
        />
      </Sequence>

      <Sequence from={FRAME.step2} durationInFrames={SCENE_DURATIONS.step2}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 48,
            gap: 32,
            height: "100%",
          }}
        >
          <SectionIntroAnimated
            text={STEP2_LABEL}
            startFrame={FRAME.step2}
            durationInFrames={20}
          />
          <div style={{ width: "100%", maxWidth: 640 }}>
            <Terminal
              lines={STEP2_LINES}
              title="terminal"
              startFrame={FRAME.step2}
              typeSpeed={TERMINAL_TYPE_SPEED}
            />
          </div>
        </div>
      </Sequence>

      <Sequence from={FRAME.step3} durationInFrames={SCENE_DURATIONS.step3}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 48,
            gap: 32,
            height: "100%",
          }}
        >
          <SectionIntroAnimated
            text={STEP3_LABEL}
            startFrame={FRAME.step3}
            durationInFrames={20}
          />
          <div style={{ width: "100%", maxWidth: 640 }}>
            <Terminal
              lines={STEP3_LINES}
              title="terminal"
              startFrame={FRAME.step3}
              typeSpeed={TERMINAL_TYPE_SPEED}
            />
          </div>
        </div>
      </Sequence>

      <Sequence from={FRAME.recap} durationInFrames={SCENE_DURATIONS.recap}>
        <SectionIntroAnimated
          text={RECAP_TEXT}
          startFrame={FRAME.recap}
          durationInFrames={20}
        />
      </Sequence>

      <Sequence from={FRAME.cta} durationInFrames={SCENE_DURATIONS.cta}>
        <TitleCardAnimated
          title="À suivre : Git vs GitHub"
          subtitle="La suite du parcours"
          startFrame={FRAME.cta}
          durationInFrames={20}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
