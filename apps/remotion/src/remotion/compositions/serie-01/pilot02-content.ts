/**
 * Pilot 02 — on-screen copy + timings aligned with KM pilot-02 outline.
 * Taxonomie texte THP: runbook §04 (TextReveal / Typewriter), ref. TextDemo.
 * Format 1, 45 s @ 30 fps = 1350 frames.
 */

export const FPS = 30;

export const PREMOUNT_FRAMES = FPS;

// --- Role ids (matrix contract) ---
export const ROLE_INTRO_HERO = "ROLE_INTRO_HERO";
export const ROLE_INTRO_SUBTITLE = "ROLE_INTRO_SUBTITLE";
export const ROLE_NARRATION = "ROLE_NARRATION";
export const ROLE_EMPHASIS = "ROLE_EMPHASIS";
export const ROLE_CTA_TITLE = "ROLE_CTA_TITLE";
export const ROLE_CTA_SUBTITLE = "ROLE_CTA_SUBTITLE";

export const TOTAL_SCENES = 6;

export const SCENE_DURATIONS = {
  title: 5 * FPS,
  hook: 8 * FPS,
  gitConcept: 12 * FPS,
  githubConcept: 12 * FPS,
  recap: 6 * FPS,
  cta: 2 * FPS,
} as const;

export const FRAME = {
  title: 0,
  hook: SCENE_DURATIONS.title,
  gitConcept: SCENE_DURATIONS.title + SCENE_DURATIONS.hook,
  githubConcept:
    SCENE_DURATIONS.title + SCENE_DURATIONS.hook + SCENE_DURATIONS.gitConcept,
  recap:
    SCENE_DURATIONS.title +
    SCENE_DURATIONS.hook +
    SCENE_DURATIONS.gitConcept +
    SCENE_DURATIONS.githubConcept,
  cta:
    SCENE_DURATIONS.title +
    SCENE_DURATIONS.hook +
    SCENE_DURATIONS.gitConcept +
    SCENE_DURATIONS.githubConcept +
    SCENE_DURATIONS.recap,
} as const;

// --- Scene 1: GlitchText hero + TextReveal subtitle ---
export const TITLE = "Git vs GitHub";
export const TITLE_SUBTITLE = "Une idée en 45 secondes";

export const TITLE_GLITCH_DURATION = 28;
export const TITLE_PAUSE_AFTER_GLITCH = 8;
export const TITLE_SUBTITLE_REVEAL_DURATION = 18;
export const TITLE_SUBTITLE_START_FRAME =
  TITLE_GLITCH_DURATION + TITLE_PAUSE_AFTER_GLITCH;

// --- Scene 2: Typewriter hook ---
export const HOOK_TEXT =
  "Git et GitHub : est-ce la même chose ? Non — et ça change tout de comprendre la différence.";
export const HOOK_CPS = 25;

// --- Scene 3: Git concept ---
export const GIT_TITLE = "Git = sur ta machine";
export const GIT_BODY =
  "Un outil sur ton ordinateur. Il garde l’historique de ton projet : chaque sauvegarde. Une machine à voyager dans le temps pour ton code.";

export const GIT_TITLE_REVEAL_DURATION = 24;
export const GIT_PAUSE_AFTER_TITLE = 8;
export const GIT_BODY_START_FRAME = GIT_TITLE_REVEAL_DURATION + GIT_PAUSE_AFTER_TITLE;
export const GIT_BODY_CPS = 24;

// --- Scene 4: GitHub concept + callout + FlowChart (V1) ---
export const GITHUB_TITLE = "GitHub = en ligne + collaboration";
export const GITHUB_BODY =
  "Un site sur internet. Il stocke une copie de ton projet et permet de travailler à plusieurs : partager le code, proposer des changements, les valider.";
export const GITHUB_CALLOUT = "Git = machine · GitHub = lieu en ligne";

export const GITHUB_TITLE_REVEAL_DURATION = 24;
export const GITHUB_PAUSE_AFTER_TITLE = 8;
export const GITHUB_BODY_START_FRAME =
  GITHUB_TITLE_REVEAL_DURATION + GITHUB_PAUSE_AFTER_TITLE;
export const GITHUB_BODY_CPS = 26;

/** Frames typed for body; used to schedule callout after body finishes. */
export const GITHUB_BODY_CHAR_EST = GITHUB_BODY.length;
export const GITHUB_BODY_TYPING_FRAMES = Math.ceil(
  (GITHUB_BODY_CHAR_EST / GITHUB_BODY_CPS) * FPS
);

export const GITHUB_CALLOUT_PAUSE_AFTER_BODY = 10;
export const GITHUB_CALLOUT_START_FRAME =
  GITHUB_BODY_START_FRAME +
  GITHUB_BODY_TYPING_FRAMES +
  GITHUB_CALLOUT_PAUSE_AFTER_BODY;
export const GITHUB_CALLOUT_CPS = 24;

/** Mini schéma machine ↔ nuage: starts late in scene 4 (local frames). */
export const GITHUB_FLOW_FROM_LOCAL = 210;
export const GITHUB_FLOW_DURATION =
  SCENE_DURATIONS.githubConcept - GITHUB_FLOW_FROM_LOCAL;
export const GITHUB_FLOW_NODE_DELAY = 18;
export const GITHUB_FLOW_START_LOCAL = 4;

// --- Scene 5: recap ---
export const RECAP_TEXT =
  "Git, c’est l’outil ; GitHub, c’est l’endroit où on le met en commun.";
export const RECAP_CPS = 26;

// --- Scene 6: CTA (short) ---
export const CTA_TITLE = "À suivre : Commit";
export const CTA_SUBTITLE = "késako";
export const CTA_TITLE_REVEAL_DURATION = 20;
export const CTA_SUB_START_FRAME = 22;
export const CTA_SUB_CPS = 22;

// SceneHeader keywords (aligned with outline beats)
export const SCENE_KEYWORDS = [
  "TITRE",
  "ACCROCHE",
  "GIT",
  "GITHUB",
  "RÉCAP",
  "SUITE",
] as const;
