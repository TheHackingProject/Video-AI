import type React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import {
  TitleCardAnimated,
  SectionIntroAnimated,
  CodeAlongStep,
} from "@repo/remotion-lib";

const FPS = 30;

const SCENE_DURATIONS = {
  title: 8 * FPS,
  intro: 15 * FPS,
  step1: 45 * FPS,
  step2: 40 * FPS,
  step3: 42 * FPS,
  recap: 20 * FPS,
  cta: 10 * FPS,
};

const STEP1_LABEL =
  "Le terminal, c'est une fenêtre où tu tapes des commandes. Sur Mac : cherche Terminal dans le Spotlight. Sur Linux : Ctrl+Alt+T ou cherche Terminal dans le menu. Sur Windows : PowerShell, ou installe WSL / Git Bash.";

const STEP1_CODE = `# Ouvrir le terminal
# Mac : Spotlight → "Terminal"
# Linux : Ctrl+Alt+T
# Windows : PowerShell ou Git Bash`;

const STEP2_LABEL =
  "Une fois le terminal ouvert, tape pwd puis Entrée. P-W-D veut dire « print working directory » : ça affiche le dossier dans lequel tu te trouves.";

const STEP2_CODE = `$ pwd
/Users/toto/projets`;

const STEP3_LABEL =
  "Pour voir le contenu du dossier actuel, tape ls puis Entrée. Sur Windows PowerShell tu peux utiliser dir. Tu obtiens la liste des fichiers et dossiers.";

const STEP3_CODE = `$ ls
README.md  src  package.json`;

const RECAP_TEXT =
  "Tu as ouvert le terminal et utilisé pwd et ls. Tu es prêt pour suivre les prochaines vidéos en ligne de commande.";

export const Pilot01Prerequis: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0d1117",
      }}
    >
      <Sequence from={0} durationInFrames={SCENE_DURATIONS.title}>
        <TitleCardAnimated
          title="Pré-requis : terminal et bases"
          subtitle="Pour suivre les démos Git"
          startFrame={0}
          durationInFrames={15}
        />
      </Sequence>

      <Sequence from={SCENE_DURATIONS.title} durationInFrames={SCENE_DURATIONS.intro}>
        <SectionIntroAnimated
          text="Dans les prochaines vidéos on va utiliser Git en ligne de commande. On va voir où ouvrir le terminal et une ou deux commandes de base."
          startFrame={0}
          durationInFrames={15}
        />
      </Sequence>

      <Sequence
        from={SCENE_DURATIONS.title + SCENE_DURATIONS.intro}
        durationInFrames={SCENE_DURATIONS.step1}
      >
        <CodeAlongStep
          steps={[{ label: STEP1_LABEL, code: STEP1_CODE }]}
          startFrame={0}
          durationPerStep={SCENE_DURATIONS.step1}
          showLineNumbers={false}
          title="terminal"
          fadeInDuration={15}
        />
      </Sequence>

      <Sequence
        from={
          SCENE_DURATIONS.title +
          SCENE_DURATIONS.intro +
          SCENE_DURATIONS.step1
        }
        durationInFrames={SCENE_DURATIONS.step2}
      >
        <CodeAlongStep
          steps={[{ label: STEP2_LABEL, code: STEP2_CODE }]}
          startFrame={0}
          durationPerStep={SCENE_DURATIONS.step2}
          showLineNumbers={true}
          title="terminal"
          fadeInDuration={15}
        />
      </Sequence>

      <Sequence
        from={
          SCENE_DURATIONS.title +
          SCENE_DURATIONS.intro +
          SCENE_DURATIONS.step1 +
          SCENE_DURATIONS.step2
        }
        durationInFrames={SCENE_DURATIONS.step3}
      >
        <CodeAlongStep
          steps={[{ label: STEP3_LABEL, code: STEP3_CODE }]}
          startFrame={0}
          durationPerStep={SCENE_DURATIONS.step3}
          showLineNumbers={true}
          title="terminal"
          fadeInDuration={15}
        />
      </Sequence>

      <Sequence
        from={
          SCENE_DURATIONS.title +
          SCENE_DURATIONS.intro +
          SCENE_DURATIONS.step1 +
          SCENE_DURATIONS.step2 +
          SCENE_DURATIONS.step3
        }
        durationInFrames={SCENE_DURATIONS.recap}
      >
        <SectionIntroAnimated
          text={RECAP_TEXT}
          startFrame={0}
          durationInFrames={15}
        />
      </Sequence>

      <Sequence
        from={
          SCENE_DURATIONS.title +
          SCENE_DURATIONS.intro +
          SCENE_DURATIONS.step1 +
          SCENE_DURATIONS.step2 +
          SCENE_DURATIONS.step3 +
          SCENE_DURATIONS.recap
        }
        durationInFrames={SCENE_DURATIONS.cta}
      >
        <TitleCardAnimated
          title="À suivre : Git vs GitHub"
          subtitle="Une idée en 45 secondes"
          startFrame={0}
          durationInFrames={15}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
