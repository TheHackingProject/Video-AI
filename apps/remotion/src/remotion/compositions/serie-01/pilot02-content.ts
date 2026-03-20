/**
 * Pilot 02 — on-screen copy aligned with KM/Docs/video-ai-preparation/pilot-02-git-vs-github-outline.md
 * Format 1 concept intro, 45 s @ 30 fps = 1350 frames.
 */

export const FPS = 30;

export const PREMOUNT_FRAMES = FPS;

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

// --- Scene 1 ---
export const TITLE = "Git vs GitHub";
export const TITLE_SUBTITLE = "Une idée en 45 secondes";

/** Fade-in duration (frames) for remotion-lib animated blocks inside each scene. */
export const BLOCK_FADE_FRAMES = 18;

// --- Scene 2 (hook on screen — condensed vs full VO) ---
export const HOOK_TEXT =
  "Git et GitHub : est-ce la même chose ? Non — et ça change tout de comprendre la différence.";

// --- Scene 3 ---
export const GIT_TITLE = "Git = sur ta machine";
export const GIT_BODY =
  "Un outil sur ton ordinateur. Il garde l’historique de ton projet : chaque sauvegarde. Une machine à voyager dans le temps pour ton code.";

// --- Scene 4 ---
export const GITHUB_TITLE = "GitHub = en ligne + collaboration";
export const GITHUB_BODY =
  "Un site sur internet. Il stocke une copie de ton projet et permet de travailler à plusieurs : partager le code, proposer des changements, les valider.";
export const GITHUB_CALLOUT = "Git = machine · GitHub = lieu en ligne";

// --- Scene 5 ---
export const RECAP_TEXT =
  "Git, c’est l’outil ; GitHub, c’est l’endroit où on le met en commun.";

// --- Scene 6 ---
export const CTA_TITLE = "À suivre : Commit";
export const CTA_SUBTITLE = "késako";
