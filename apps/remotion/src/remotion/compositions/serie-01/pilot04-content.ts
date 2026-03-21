/**
 * Pilot 04 — on-screen copy + timings aligned with KM pilot-04 outline.
 * Taxonomie texte THP: runbook §04 (GlitchText / TextReveal / Typewriter).
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
  parallelConcept: 12 * FPS,
  branchFlowConcept: 12 * FPS,
  recap: 6 * FPS,
  cta: 2 * FPS,
} as const;

export const FRAME = {
  title: 0,
  hook: SCENE_DURATIONS.title,
  parallelConcept: SCENE_DURATIONS.title + SCENE_DURATIONS.hook,
  branchFlowConcept:
    SCENE_DURATIONS.title + SCENE_DURATIONS.hook + SCENE_DURATIONS.parallelConcept,
  recap:
    SCENE_DURATIONS.title +
    SCENE_DURATIONS.hook +
    SCENE_DURATIONS.parallelConcept +
    SCENE_DURATIONS.branchFlowConcept,
  cta:
    SCENE_DURATIONS.title +
    SCENE_DURATIONS.hook +
    SCENE_DURATIONS.parallelConcept +
    SCENE_DURATIONS.branchFlowConcept +
    SCENE_DURATIONS.recap,
} as const;

// --- Scene 1: GlitchText hero + TextReveal subtitle ---
export const TITLE = "Branch";
export const TITLE_SUBTITLE = "Une ligne parallèle";

export const TITLE_GLITCH_DURATION = 28;
export const TITLE_PAUSE_AFTER_GLITCH = 8;
export const TITLE_SUBTITLE_REVEAL_DURATION = 18;
export const TITLE_SUBTITLE_START_FRAME =
  TITLE_GLITCH_DURATION + TITLE_PAUSE_AFTER_GLITCH;

// --- Scene 2: Typewriter hook ---
export const HOOK_TEXT =
  "Tu sais enregistrer des commits. Parfois tu veux avancer une idée sans mélanger ça avec ta version stable : Git te permet d’ouvrir une branche — une ligne de développement parallèle.";
export const HOOK_CPS = 25;

// --- Scene 3: analogy concept ---
export const PARALLEL_TITLE = "Comme une voie de garage";
export const PARALLEL_BODY =
  "Une branche, c’est comme une voie de garage : la route principale continue, et toi tu travailles à part.";

export const PARALLEL_TITLE_REVEAL_DURATION = 24;
export const PARALLEL_PAUSE_AFTER_TITLE = 8;
export const PARALLEL_BODY_START_FRAME =
  PARALLEL_TITLE_REVEAL_DURATION + PARALLEL_PAUSE_AFTER_TITLE;
export const PARALLEL_BODY_CPS = 26;

// --- Scene 4: commits beside main + FlowChart ---
export const BRANCH_FLOW_TITLE = "À côté de la ligne principale";
export const BRANCH_FLOW_BODY =
  "Sur une branche, tes commits restent à côté de la ligne principale : tu n’écrases pas main tant que tu n’as pas fusionné.";

export const BRANCH_FLOW_TITLE_REVEAL_DURATION = 22;
export const BRANCH_FLOW_PAUSE_AFTER_TITLE = 6;
export const BRANCH_FLOW_BODY_START_FRAME =
  BRANCH_FLOW_TITLE_REVEAL_DURATION + BRANCH_FLOW_PAUSE_AFTER_TITLE;
export const BRANCH_FLOW_BODY_CPS = 27;

/** When the FlowChart beat begins (scene-local frames). */
export const BRANCH_FLOW_FROM_LOCAL = 200;
/** First node spring offset after chart beat starts (still scene-local). */
export const BRANCH_FLOW_START_LOCAL = 4;
export const BRANCH_FLOWCHART_START_FRAME =
  BRANCH_FLOW_FROM_LOCAL + BRANCH_FLOW_START_LOCAL;
export const BRANCH_FLOW_NODE_DELAY = 16;
/** @deprecated Inner Sequence removed; kept for outline / KM timing notes. */
export const BRANCH_FLOW_DURATION =
  SCENE_DURATIONS.branchFlowConcept - BRANCH_FLOW_FROM_LOCAL;

// --- Scene 5: recap ---
export const RECAP_TEXT =
  "Retiens : une branche = une ligne de travail parallèle.";
export const RECAP_CPS = 26;

// --- Scene 6: CTA ---
export const CTA_TITLE = "À suivre : Merge";
export const CTA_SUBTITLE = "réunir les branches";
export const CTA_TITLE_REVEAL_DURATION = 18;
export const CTA_SUB_START_FRAME = 18;
export const CTA_SUB_CPS = 22;

export const SCENE_KEYWORDS = [
  "TITRE",
  "ACCROCHE",
  "CONCEPT",
  "PARALLÈLE",
  "RÉCAP",
  "SUITE",
] as const;
