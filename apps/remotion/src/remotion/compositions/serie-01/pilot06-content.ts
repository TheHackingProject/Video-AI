/**
 * Pilot 06 — on-screen copy + timings aligned with KM pilot-06 outline.
 * Taxonomie texte THP: runbook §04 (GlitchText / TextReveal / Typewriter).
 * Format 1, 45 s @ 30 fps = 1350 frames.
 */

export const FPS = 30;

export const PREMOUNT_FRAMES = FPS;

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
  prConcept: 12 * FPS,
  prFlowConcept: 12 * FPS,
  recap: 6 * FPS,
  cta: 2 * FPS,
} as const;

export const FRAME = {
  title: 0,
  hook: SCENE_DURATIONS.title,
  prConcept: SCENE_DURATIONS.title + SCENE_DURATIONS.hook,
  prFlowConcept:
    SCENE_DURATIONS.title + SCENE_DURATIONS.hook + SCENE_DURATIONS.prConcept,
  recap:
    SCENE_DURATIONS.title +
    SCENE_DURATIONS.hook +
    SCENE_DURATIONS.prConcept +
    SCENE_DURATIONS.prFlowConcept,
  cta:
    SCENE_DURATIONS.title +
    SCENE_DURATIONS.hook +
    SCENE_DURATIONS.prConcept +
    SCENE_DURATIONS.prFlowConcept +
    SCENE_DURATIONS.recap,
} as const;

export const TITLE = "Pull request";
export const TITLE_SUBTITLE = "Proposer et faire valider";

export const TITLE_GLITCH_DURATION = 28;
export const TITLE_PAUSE_AFTER_GLITCH = 8;
export const TITLE_SUBTITLE_REVEAL_DURATION = 18;
export const TITLE_SUBTITLE_START_FRAME =
  TITLE_GLITCH_DURATION + TITLE_PAUSE_AFTER_GLITCH;

export const HOOK_TEXT =
  "Sur GitHub, tu ouvres une pull request pour proposer tes changements et laisser quelqu’un les relire avant qu’ils partent dans la branche principale du dépôt.";
export const HOOK_CPS = 25;

export const PR_CONCEPT_TITLE = "Discussion avant intégration";
export const PR_CONCEPT_BODY =
  "Une pull request, c’est l’endroit où la discussion et la validation se passent — avant que le code rejoigne la ligne stable à distance.";

export const PR_CONCEPT_TITLE_REVEAL_DURATION = 24;
export const PR_CONCEPT_PAUSE_AFTER_TITLE = 8;
export const PR_CONCEPT_BODY_START_FRAME =
  PR_CONCEPT_TITLE_REVEAL_DURATION + PR_CONCEPT_PAUSE_AFTER_TITLE;
export const PR_CONCEPT_BODY_CPS = 26;

export const PR_FLOW_TITLE = "Proposer, puis valider";
export const PR_FLOW_BODY =
  "La pull request relie ton travail à la branche cible : un reviewer peut commenter, puis approuver la fusion.";

export const PR_FLOW_TITLE_REVEAL_DURATION = 22;
export const PR_FLOW_PAUSE_AFTER_TITLE = 6;
export const PR_FLOW_BODY_START_FRAME =
  PR_FLOW_TITLE_REVEAL_DURATION + PR_FLOW_PAUSE_AFTER_TITLE;
export const PR_FLOW_BODY_CPS = 27;

/** Scene-local frames: diagram hero timing (aligned with pilot 05 workflow). */
export const PR_FLOW_FROM_LOCAL = 110;
export const PR_FLOW_START_LOCAL = 4;
export const PR_FLOWCHART_START_FRAME = PR_FLOW_FROM_LOCAL + PR_FLOW_START_LOCAL;
export const PR_FLOW_NODE_DELAY = 16;

export const RECAP_TEXT =
  "Retiens : pull request = proposer et faire valider avant d’intégrer.";
export const RECAP_CPS = 26;

export const CTA_TITLE = "À suivre : Fork";
export const CTA_SUBTITLE = "copier un repo pour contribuer";
export const CTA_TITLE_REVEAL_DURATION = 18;
export const CTA_SUB_START_FRAME = 18;
export const CTA_SUB_CPS = 22;

export const SCENE_KEYWORDS = [
  "TITRE",
  "ACCROCHE",
  "CONCEPT",
  "PR",
  "RÉCAP",
  "SUITE",
] as const;
