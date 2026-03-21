/**
 * Pilot 03 — on-screen copy + timings aligned with KM pilot-03 outline.
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
  saveConcept: 12 * FPS,
  workflowConcept: 12 * FPS,
  recap: 6 * FPS,
  cta: 2 * FPS,
} as const;

export const FRAME = {
  title: 0,
  hook: SCENE_DURATIONS.title,
  saveConcept: SCENE_DURATIONS.title + SCENE_DURATIONS.hook,
  workflowConcept:
    SCENE_DURATIONS.title + SCENE_DURATIONS.hook + SCENE_DURATIONS.saveConcept,
  recap:
    SCENE_DURATIONS.title +
    SCENE_DURATIONS.hook +
    SCENE_DURATIONS.saveConcept +
    SCENE_DURATIONS.workflowConcept,
  cta:
    SCENE_DURATIONS.title +
    SCENE_DURATIONS.hook +
    SCENE_DURATIONS.saveConcept +
    SCENE_DURATIONS.workflowConcept +
    SCENE_DURATIONS.recap,
} as const;

// --- Scene 1: GlitchText hero + TextReveal subtitle ---
export const TITLE = "Commit";
export const TITLE_SUBTITLE = "Une sauvegarde datée";

export const TITLE_GLITCH_DURATION = 28;
export const TITLE_PAUSE_AFTER_GLITCH = 8;
export const TITLE_SUBTITLE_REVEAL_DURATION = 18;
export const TITLE_SUBTITLE_START_FRAME =
  TITLE_GLITCH_DURATION + TITLE_PAUSE_AFTER_GLITCH;

// --- Scene 2: Typewriter hook ---
export const HOOK_TEXT =
  "Tu as compris que Git garde l’historique de ton projet. Mais comment ? Chaque fois que tu enregistres une étape, Git crée un commit.";
export const HOOK_CPS = 25;

// --- Scene 3: save / analogy concept ---
export const SAVE_TITLE = "Une photo à un instant T";
export const SAVE_BODY =
  "Un commit, c’est une sauvegarde datée : une photo de ton projet à un instant précis. Comme un point de sauvegarde dans un jeu vidéo.";

export const SAVE_TITLE_REVEAL_DURATION = 24;
export const SAVE_PAUSE_AFTER_TITLE = 8;
export const SAVE_BODY_START_FRAME =
  SAVE_TITLE_REVEAL_DURATION + SAVE_PAUSE_AFTER_TITLE;
export const SAVE_BODY_CPS = 26;

// --- Scene 4: workflow + FlowChart ---
export const WORKFLOW_TITLE = "Comment ça se fait ?";
export const WORKFLOW_BODY =
  "Tu modifies des fichiers, tu demandes à Git d’enregistrer, puis tu valides : un nouveau commit ajoute une marque dans ton historique.";

export const WORKFLOW_TITLE_REVEAL_DURATION = 22;
export const WORKFLOW_PAUSE_AFTER_TITLE = 6;
export const WORKFLOW_BODY_START_FRAME =
  WORKFLOW_TITLE_REVEAL_DURATION + WORKFLOW_PAUSE_AFTER_TITLE;
export const WORKFLOW_BODY_CPS = 28;

/** When the workflow FlowChart beat begins (scene-local frames). */
export const WORKFLOW_FLOW_FROM_LOCAL = 200;
/** First node spring offset after chart beat starts (still scene-local). */
export const WORKFLOW_FLOW_START_LOCAL = 4;
/** FlowChart `startFrame` = fade-in beat + node delay (inside scene Sequence). */
export const WORKFLOW_FLOWCHART_START_FRAME =
  WORKFLOW_FLOW_FROM_LOCAL + WORKFLOW_FLOW_START_LOCAL;
export const WORKFLOW_FLOW_NODE_DELAY = 16;
/** @deprecated Inner Sequence removed; kept for outline / KM timing notes. */
export const WORKFLOW_FLOW_DURATION =
  SCENE_DURATIONS.workflowConcept - WORKFLOW_FLOW_FROM_LOCAL;

// --- Scene 5: recap ---
export const RECAP_TEXT =
  "Retiens : un commit = une sauvegarde datée de ton projet.";
export const RECAP_CPS = 26;

// --- Scene 6: CTA ---
export const CTA_TITLE = "À suivre : Branch";
export const CTA_SUBTITLE = "travail en parallèle";
export const CTA_TITLE_REVEAL_DURATION = 18;
export const CTA_SUB_START_FRAME = 18;
export const CTA_SUB_CPS = 22;

export const SCENE_KEYWORDS = [
  "TITRE",
  "ACCROCHE",
  "CONCEPT",
  "WORKFLOW",
  "RÉCAP",
  "SUITE",
] as const;
