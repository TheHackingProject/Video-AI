import { interpolate, spring, SpringConfig } from "remotion";

export const springConfigs = {
  smooth: { damping: 200 } as SpringConfig,
  bouncy: { damping: 8, stiffness: 100 } as SpringConfig,
  snappy: { damping: 20, stiffness: 200 } as SpringConfig,
  gentle: { damping: 30, stiffness: 80 } as SpringConfig,
  stiff: { damping: 15, stiffness: 300 } as SpringConfig,
};

export const fadeIn = (
  frame: number,
  delay: number = 0,
  duration: number = 20
): number => {
  return interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

export const fadeOut = (
  frame: number,
  start: number,
  duration: number = 20
): number => {
  return interpolate(frame, [start, start + duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

export const slideIn = (
  frame: number,
  fps: number,
  delay: number = 0,
  direction: "left" | "right" | "top" | "bottom" = "bottom",
  distance: number = 50,
  config: SpringConfig = springConfigs.smooth
): { transform: string; opacity: number } => {
  const progress = spring({
    frame: frame - delay,
    fps,
    config,
  });

  const directionMap = {
    left: `translateX(${interpolate(progress, [0, 1], [-distance, 0])}px)`,
    right: `translateX(${interpolate(progress, [0, 1], [distance, 0])}px)`,
    top: `translateY(${interpolate(progress, [0, 1], [-distance, 0])}px)`,
    bottom: `translateY(${interpolate(progress, [0, 1], [distance, 0])}px)`,
  };

  return {
    transform: directionMap[direction],
    opacity: progress,
  };
};

export const scaleIn = (
  frame: number,
  fps: number,
  delay: number = 0,
  config: SpringConfig = springConfigs.bouncy
): { transform: string; opacity: number } => {
  const progress = spring({
    frame: frame - delay,
    fps,
    config,
  });

  return {
    transform: `scale(${interpolate(progress, [0, 1], [0.8, 1])})`,
    opacity: progress,
  };
};

export const pulse = (frame: number, speed: number = 0.1): number => {
  return (Math.sin(frame * speed) + 1) / 2;
};

export const rotate = (frame: number, speed: number = 1): number => {
  return frame * speed;
};

export const typewriterProgress = (
  frame: number,
  startFrame: number,
  text: string,
  charsPerSecond: number = 30,
  fps: number = 30
): number => {
  const elapsed = Math.max(0, frame - startFrame);
  const charsPerFrame = charsPerSecond / fps;
  const visibleChars = Math.floor(elapsed * charsPerFrame);
  return Math.min(visibleChars, text.length);
};

export const staggerDelay = (
  index: number,
  baseDelay: number = 0,
  stagger: number = 5
): number => {
  return baseDelay + index * stagger;
};

export const easeOutBack = (t: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

export const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
