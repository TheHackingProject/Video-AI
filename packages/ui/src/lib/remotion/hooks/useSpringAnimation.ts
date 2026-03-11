import { useCurrentFrame, useVideoConfig, spring, SpringConfig, interpolate } from "remotion";
import { springConfigs } from "../utils/animations";

interface UseSpringAnimationOptions {
  delay?: number;
  config?: SpringConfig;
}

interface UseSpringAnimationResult {
  progress: number;
  opacity: number;
  scale: number;
  translateY: number;
  translateX: number;
}

export const useSpringAnimation = ({
  delay = 0,
  config = springConfigs.smooth,
}: UseSpringAnimationOptions = {}): UseSpringAnimationResult => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config,
  });

  return {
    progress,
    opacity: progress,
    scale: interpolate(progress, [0, 1], [0.9, 1]),
    translateY: interpolate(progress, [0, 1], [20, 0]),
    translateX: interpolate(progress, [0, 1], [20, 0]),
  };
};
