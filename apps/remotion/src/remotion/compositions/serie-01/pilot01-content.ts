/**
 * Pilot 01 — on-screen copy aligned with KM/Docs/video-ai-preparation/pilot-01-prerequis-outline.md
 * VO may extend these strings; keep readable at 1080p.
 */

export const TITLE = "Pré-requis : terminal et bases";
export const SUBTITLE = "2 commandes pour suivre Git";

/** Intro scene — first beat (~7 s @ 30fps) */
export const INTRO_HOOK =
  "Salut ! Dans les prochaines vidéos, on va taper des commandes Git dans le terminal. Rien de sorcier : aujourd’hui, on ouvre cette fenêtre et on teste deux commandes ultra simples.";

/** Intro scene — second beat (~7 s) */
export const INTRO_OBJECTIVE =
  "À la fin, tu sauras où ouvrir le terminal sur ton ordi, et à quoi servent pwd et ls — pour toujours savoir dans quel dossier tu es et ce qu’il contient.";

export const STEP1_ANALOGY =
  "Le terminal, en clair, c’est une fenêtre de texte où tu parles à l’ordinateur en une ligne : tu tapes, tu valides, ça répond.";

/** Shorter on-screen hint; VO can expand (Mac/Linux/Windows). */
export const STEP1_OS_LINE =
  "Mac : Spotlight ou menu → Terminal · Linux : souvent Ctrl+Alt+T · Windows : PowerShell ; pour coller au cours : Git Bash ou WSL.";

export const STEP1_CODE = `# Ouvrir le terminal
# Mac : Spotlight → "Terminal"
# Linux : Ctrl+Alt+T
# Windows : PowerShell ou Git Bash / WSL`;

export const STEP2_BODY =
  "Une fois le terminal ouvert, tape pwd puis Entrée. En anglais : print working directory — en français : le dossier dans lequel tu travailles maintenant. C’est ton repère avant Git.\n\nTu vois un chemin du style /Users/… ou /home/… : c’est ta position actuelle.";

export const STEP3_BODY =
  "Deuxième commande : ls puis Entrée — list. Elle affiche fichiers et dossiers du répertoire courant. Sur Windows PowerShell, dir fait pareil.\n\nL’essentiel : voir que le terminal te répond avec une liste.";

export const RECAP_TEXT =
  "Récap : tu sais ouvrir le terminal, tu as vu pwd pour le dossier courant et ls pour son contenu. Tu peux enchaîner avec la suite sur Git — on te guide pas à pas.";

export const CTA_TITLE = "À suivre : Git vs GitHub";
export const CTA_SUBTITLE = "La suite du parcours";

export const OS_PILLS = [
  { id: "mac", label: "Mac", hint: "Spotlight → Terminal" },
  { id: "linux", label: "Linux", hint: "Ctrl+Alt+T" },
  { id: "windows", label: "Windows", hint: "PowerShell / Git Bash" },
] as const;

export const LESSON_STEP_LABELS = ["Ouvrir", "pwd", "ls"] as const;

/** Terminal: type speed and pause (frames) before output line starts after command. */
export const TERMINAL_TYPE_SPEED = 2;
export const TERMINAL_CMD_TO_OUTPUT_DELAY = 28;
export const TERMINAL_PROMPT = "$ ";

export const TERMINAL_PWD_LINES = [
  { type: "command" as const, text: "pwd", delay: 14 },
  { type: "output" as const, text: "/Users/toto/projets", delay: TERMINAL_CMD_TO_OUTPUT_DELAY },
];

export const TERMINAL_LS_LINES = [
  { type: "command" as const, text: "ls", delay: 14 },
  {
    type: "output" as const,
    text: "README.md  src  package.json",
    delay: TERMINAL_CMD_TO_OUTPUT_DELAY,
  },
];
