import { useCurrentFrame, useVideoConfig } from "remotion";

interface UseTypewriterOptions {
  text: string;
  startFrame?: number;
  charsPerSecond?: number;
  showCursor?: boolean;
  cursorBlinkSpeed?: number;
}

interface UseTypewriterResult {
  displayText: string;
  isComplete: boolean;
  cursorVisible: boolean;
  progress: number;
}

export const useTypewriter = ({
  text,
  startFrame = 0,
  charsPerSecond = 30,
  showCursor = true,
  cursorBlinkSpeed = 0.15,
}: UseTypewriterOptions): UseTypewriterResult => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const elapsed = Math.max(0, frame - startFrame);
  const charsPerFrame = charsPerSecond / fps;
  const visibleChars = Math.floor(elapsed * charsPerFrame);
  const clampedChars = Math.min(visibleChars, text.length);

  const displayText = text.slice(0, clampedChars);
  const isComplete = clampedChars >= text.length;
  const cursorVisible = showCursor && (!isComplete || Math.sin(frame * cursorBlinkSpeed) > 0);
  const progress = clampedChars / text.length;

  return {
    displayText,
    isComplete,
    cursorVisible,
    progress,
  };
};
