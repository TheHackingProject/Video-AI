/**
 * Pilot 01 — on-screen copy aligned with KM/Docs/video-ai-preparation/pilot-01-prerequis-outline.md
 * VO may extend these strings; keep readable at 1080p.
 * Timings: frame counts @ FPS for deterministic Remotion sequences.
 * Text roles: runbook §04 (THP taxonomy) — TextReveal hero title; Typewriter narration; WordByWord optional emphasis.
 */

export const FPS = 30;

/** Série 01 chrome: title + intro + 3 steps + recap + CTA */
export const PILOT01_TOTAL_SCENES = 7;

export const PILOT01_SCENE_KEYWORDS = [
  "TITRE",
  "INTRO",
  "OUVRIR",
  "PWD",
  "LS",
  "RÉCAP",
  "SUITE",
] as const;

/** Production: hide typewriter cursor unless debugging pacing. */
export const SHOW_TYPEWRITER_CURSOR = false;

/** premountFor on main scene sequences (skill remotion-best-practices / sequencing). */
export const PREMOUNT_FRAMES = FPS;

/** Light overlap between beats (smooth handoff). */
export const BEAT_OVERLAP_FRAMES = 10;

export const SCENE_DURATIONS = {
  title: 5 * FPS,
  intro: 14 * FPS,
  step1: 32 * FPS,
  step2: 26 * FPS,
  step3: 26 * FPS,
  recap: 12 * FPS,
  cta: 5 * FPS,
} as const;

export const FRAME = {
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
} as const;

// --- Role ids (matrix contract) ---
export const ROLE_INTRO_HERO = "ROLE_INTRO_HERO";
export const ROLE_INTRO_SUBTITLE = "ROLE_INTRO_SUBTITLE";
export const ROLE_NARRATION = "ROLE_NARRATION";
export const ROLE_EMPHASIS = "ROLE_EMPHASIS";
export const ROLE_CTA_TITLE = "ROLE_CTA_TITLE";
export const ROLE_CTA_SUBTITLE = "ROLE_CTA_SUBTITLE";

// --- Title: GlitchText hero + TextReveal subtitle (matrix v1) ---
export const TITLE = "Pré-requis : terminal et bases";
export const SUBTITLE = "2 commandes pour suivre Git";
export const TITLE_GLITCH_DURATION = 34;
export const TITLE_PAUSE_AFTER_GLITCH_FRAMES = 8;
export const TITLE_SUBTITLE_REVEAL_DURATION = 24;
export const TITLE_SUBTITLE_START_FRAME =
  TITLE_GLITCH_DURATION + TITLE_PAUSE_AFTER_GLITCH_FRAMES;

// --- Intro (two typewriter blocks, single scene) ---
export const INTRO_HOOK =
  "Salut ! Dans les prochaines vidéos, on va taper des commandes Git dans le terminal. Rien de sorcier : aujourd’hui, on ouvre cette fenêtre et on teste deux commandes ultra simples.";

export const INTRO_OBJECTIVE =
  "À la fin, tu sauras où ouvrir le terminal sur ton ordi, et à quoi servent pwd et ls — pour toujours savoir dans quel dossier tu es et ce qu’il contient.";

export const INTRO_TYPEWRITER_CPS = 24;
export const INTRO_PAUSE_AFTER_HOOK_FRAMES = 6;
export const INTRO_HOOK_FRAMES = Math.ceil(
  (INTRO_HOOK.length / INTRO_TYPEWRITER_CPS) * FPS
);
export const INTRO_OBJECTIVE_FRAMES = Math.ceil(
  (INTRO_OBJECTIVE.length / INTRO_TYPEWRITER_CPS) * FPS
);
export const INTRO_OBJECTIVE_START_FRAME =
  INTRO_HOOK_FRAMES + INTRO_PAUSE_AFTER_HOOK_FRAMES;

// --- Step 1 beats (960f): analogy -> pills -> OS hint -> code ---
export const STEP1_ANALOGY =
  "Le terminal, en clair, c’est une fenêtre de texte où tu parles à l’ordinateur en une ligne : tu tapes, tu valides, ça répond.";

export const STEP1_ANALOGY_CPS = 24;

export const STEP1_OS_LINE =
  "Mac : Spotlight ou menu → Terminal · Linux : souvent Ctrl+Alt+T · Windows : PowerShell ; pour coller au cours : Git Bash ou WSL.";

export const STEP1_OS_WORD_DELAY = 8;
export const STEP1_OS_HIGHLIGHT_COLOR_ROLE = "success";

export const STEP1_CODE = `# Ouvrir le terminal
# Mac : Spotlight → "Terminal"
# Linux : Ctrl+Alt+T
# Windows : PowerShell ou Git Bash / WSL`;

export const STEP1_BEATS = {
  /** Keep each beat mounted until scene cut (no premature disappear). */
  analogy: { from: 0, duration: SCENE_DURATIONS.step1 },
  pills: { from: 168, duration: SCENE_DURATIONS.step1 - 168 },
  osLine: { from: 378, duration: SCENE_DURATIONS.step1 - 378 },
  code: { from: 538, duration: SCENE_DURATIONS.step1 - 538 },
} as const;

// --- Step 2 / 3 body (split for staggered typewriter) ---
export const STEP2_PARA1 =
  "Une fois le terminal ouvert, tape pwd puis Entrée. En anglais : print working directory — en français : le dossier dans lequel tu travailles maintenant. C’est ton repère avant Git.";

export const STEP2_PARA2 =
  "Tu vois un chemin du style /Users/… ou /home/… : c’est ta position actuelle.";

export const STEP3_PARA1 =
  "Deuxième commande : ls puis Entrée — list. Elle affiche fichiers et dossiers du répertoire courant. Sur Windows PowerShell, dir fait pareil.";

export const STEP3_PARA2 =
  "L’essentiel : voir que le terminal te répond avec une liste.";

export const STEP2_BODY_CPS = 26;
export const STEP3_BODY_CPS = 28;

export const STEP2_PARA1_FRAMES = Math.ceil(
  (STEP2_PARA1.length / STEP2_BODY_CPS) * FPS
);
export const STEP2_PARA2_FRAMES = Math.ceil(
  (STEP2_PARA2.length / STEP2_BODY_CPS) * FPS
);
export const STEP2_PARA2_START = STEP2_PARA1_FRAMES - BEAT_OVERLAP_FRAMES;

export const STEP3_PARA1_FRAMES = Math.ceil(
  (STEP3_PARA1.length / STEP3_BODY_CPS) * FPS
);
export const STEP3_PARA2_FRAMES = Math.ceil(
  (STEP3_PARA2.length / STEP3_BODY_CPS) * FPS
);
export const STEP3_PARA2_START = STEP3_PARA1_FRAMES - BEAT_OVERLAP_FRAMES;

/** Space after body copy before terminal appears (pwd). */
const STEP2_GAP_BEFORE_TERMINAL = 24;
/** Slightly tighter handoff on ls (progression). */
const STEP3_GAP_BEFORE_TERMINAL = 18;

const STEP2_TERMINAL_FROM =
  STEP2_PARA2_START + STEP2_PARA2_FRAMES + STEP2_GAP_BEFORE_TERMINAL;
const STEP3_TERMINAL_FROM =
  STEP3_PARA2_START + STEP3_PARA2_FRAMES + STEP3_GAP_BEFORE_TERMINAL;

export const STEP2_BEATS = {
  terminal: {
    from: STEP2_TERMINAL_FROM,
    duration: SCENE_DURATIONS.step2 - STEP2_TERMINAL_FROM,
  },
} as const;

export const STEP3_BEATS = {
  terminal: {
    from: STEP3_TERMINAL_FROM,
    duration: SCENE_DURATIONS.step3 - STEP3_TERMINAL_FROM,
  },
} as const;

// --- Recap ---
export const RECAP_LINE1 =
  "Récap : tu sais ouvrir le terminal, tu as vu pwd pour le dossier courant et ls pour son contenu.";

export const RECAP_LINE2 =
  "Tu peux enchaîner avec la suite sur Git — on te guide pas à pas.";

/** Full recap paragraph for scripts / VO (same text as two on-screen lines). */
export const RECAP_TEXT = `${RECAP_LINE1}\n\n${RECAP_LINE2}`;

export const RECAP_TYPE_CPS = 26;
export const RECAP_PAUSE_FRAMES = 10;
export const RECAP_LINE1_FRAMES = Math.ceil(
  (RECAP_LINE1.length / RECAP_TYPE_CPS) * FPS
);
export const RECAP_LINE2_FRAMES = Math.ceil(
  (RECAP_LINE2.length / RECAP_TYPE_CPS) * FPS
);
export const RECAP_LINE2_START =
  RECAP_LINE1_FRAMES + RECAP_PAUSE_FRAMES - BEAT_OVERLAP_FRAMES;

/** WordByWord for recap line 2 only (one emphasis beat per recap scene, §04). */
export const RECAP_LINE2_WORD_DELAY = 10;

export const RECAP_FLOWCHART = {
  from: RECAP_LINE1_FRAMES + 8,
  nodeDelay: 11,
  startFrameLocal: 12,
} as const;

// --- CTA (TextReveal title + Typewriter subtitle — §04 / serie parity with pilot 02) ---
export const CTA_TITLE = "À suivre : Git vs GitHub";
export const CTA_SUBTITLE = "La suite du parcours";
export const CTA_TITLE_REVEAL_DURATION = 22;
export const CTA_PAUSE_AFTER_TITLE_FRAMES = 8;
export const CTA_SUBTITLE_CPS = 18;
export const CTA_SUB_START =
  CTA_TITLE_REVEAL_DURATION + CTA_PAUSE_AFTER_TITLE_FRAMES;

export const OS_PILLS = [
  { id: "mac", label: "Mac", hint: "Spotlight → Terminal" },
  { id: "linux", label: "Linux", hint: "Ctrl+Alt+T" },
  { id: "windows", label: "Windows", hint: "PowerShell / Git Bash" },
] as const;

export const LESSON_STEP_LABELS = ["Ouvrir", "pwd", "ls"] as const;

/** Terminal: type speed (chars per frame for command lines) and pause before output. */
export const TERMINAL_TYPE_SPEED = 2;
export const TERMINAL_CMD_TO_OUTPUT_DELAY_PWD = 36;
export const TERMINAL_CMD_TO_OUTPUT_DELAY_LS = 32;
export const TERMINAL_COMMAND_LEAD_IN_FRAMES = 18;
export const TERMINAL_BLOCK_START_IN_PARENT = 12;

export const TERMINAL_PROMPT = "$ ";

export const TERMINAL_PWD_LINES = [
  { type: "command" as const, text: "pwd", delay: TERMINAL_COMMAND_LEAD_IN_FRAMES },
  {
    type: "output" as const,
    text: "/Users/toto/projets",
    delay: TERMINAL_CMD_TO_OUTPUT_DELAY_PWD,
  },
];

export const TERMINAL_LS_LINES = [
  { type: "command" as const, text: "ls", delay: TERMINAL_COMMAND_LEAD_IN_FRAMES },
  {
    type: "output" as const,
    text: "README.md  src  package.json",
    delay: TERMINAL_CMD_TO_OUTPUT_DELAY_LS,
  },
];
