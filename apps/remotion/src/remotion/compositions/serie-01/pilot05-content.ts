/**
 * Pilot 05 — on-screen copy + timings aligned with KM pilot-05 outline.
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
  integrationConcept: 12 * FPS,
  mergeFlowConcept: 12 * FPS,
  recap: 6 * FPS,
  cta: 2 * FPS,
} as const;

export const FRAME = {
  title: 0,
  hook: SCENE_DURATIONS.title,
  integrationConcept: SCENE_DURATIONS.title + SCENE_DURATIONS.hook,
  mergeFlowConcept:
    SCENE_DURATIONS.title + SCENE_DURATIONS.hook + SCENE_DURATIONS.integrationConcept,
  recap:
    SCENE_DURATIONS.title +
    SCENE_DURATIONS.hook +
    SCENE_DURATIONS.integrationConcept +
    SCENE_DURATIONS.mergeFlowConcept,
  cta:
    SCENE_DURATIONS.title +
    SCENE_DURATIONS.hook +
    SCENE_DURATIONS.integrationConcept +
    SCENE_DURATIONS.mergeFlowConcept +
    SCENE_DURATIONS.recap,
} as const;

// --- Scene 1: GlitchText hero + TextReveal subtitle ---
export const TITLE = "Merge";
export const TITLE_SUBTITLE = "Réunir les lignes";

export const TITLE_GLITCH_DURATION = 28;
export const TITLE_PAUSE_AFTER_GLITCH = 8;
export const TITLE_SUBTITLE_REVEAL_DURATION = 18;
export const TITLE_SUBTITLE_START_FRAME =
  TITLE_GLITCH_DURATION + TITLE_PAUSE_AFTER_GLITCH;

// --- Scene 2: Typewriter hook ---
export const HOOK_TEXT =
  "Tu as travaillé sur une branche à part. Le merge, c’est l’étape où tu ramènes ce travail dans la branche cible — souvent main — en intégrant les commits.";
export const HOOK_CPS = 25;

// --- Scene 3: integration concept ---
export const INTEGRATION_TITLE = "Intégrer sans effacer";
export const INTEGRATION_BODY =
  "Une fusion ajoute l’historique de ta branche à la ligne cible sans remplacer ce qui y était déjà — quand Git peut le faire proprement.";

export const INTEGRATION_TITLE_REVEAL_DURATION = 24;
export const INTEGRATION_PAUSE_AFTER_TITLE = 8;
export const INTEGRATION_BODY_START_FRAME =
  INTEGRATION_TITLE_REVEAL_DURATION + INTEGRATION_PAUSE_AFTER_TITLE;
export const INTEGRATION_BODY_CPS = 26;

// --- Scene 4: merge flow + FlowChart ---
export const MERGE_FLOW_TITLE = "La branche cible grandit";
export const MERGE_FLOW_BODY =
  "Après un merge réussi sur main, ta ligne stable contient aussi les commits venus de la branche fusionnée.";

export const MERGE_FLOW_TITLE_REVEAL_DURATION = 22;
export const MERGE_FLOW_PAUSE_AFTER_TITLE = 6;
export const MERGE_FLOW_BODY_START_FRAME =
  MERGE_FLOW_TITLE_REVEAL_DURATION + MERGE_FLOW_PAUSE_AFTER_TITLE;
export const MERGE_FLOW_BODY_CPS = 27;

/** When the FlowChart beat begins (scene-local frames). Lower = diagram is the visual hero sooner (workflow schéma). */
export const MERGE_FLOW_FROM_LOCAL = 110;
export const MERGE_FLOW_START_LOCAL = 4;
export const MERGE_FLOWCHART_START_FRAME =
  MERGE_FLOW_FROM_LOCAL + MERGE_FLOW_START_LOCAL;
export const MERGE_FLOW_NODE_DELAY = 16;

// --- Scene 5: recap ---
export const RECAP_TEXT =
  "Retiens : merge = intégrer une branche dans une autre pour réunir les lignes.";
export const RECAP_CPS = 26;

// --- Scene 6: CTA ---
export const CTA_TITLE = "À suivre : Pull request";
export const CTA_SUBTITLE = "proposer et faire valider";
export const CTA_TITLE_REVEAL_DURATION = 18;
export const CTA_SUB_START_FRAME = 18;
export const CTA_SUB_CPS = 22;

export const SCENE_KEYWORDS = [
  "TITRE",
  "ACCROCHE",
  "CONCEPT",
  "FUSION",
  "RÉCAP",
  "SUITE",
] as const;
