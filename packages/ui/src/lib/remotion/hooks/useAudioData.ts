import { useCurrentFrame } from "remotion";

interface UseAudioDataOptions {
  frequencyBands?: number;
  smoothing?: number;
}

interface UseAudioDataResult {
  bands: number[];
  volume: number;
  bass: number;
  mid: number;
  treble: number;
}

export const useAudioData = ({
  frequencyBands = 8,
  smoothing = 0.8,
}: UseAudioDataOptions = {}): UseAudioDataResult => {
  const frame = useCurrentFrame();

  const bands: number[] = [];
  for (let i = 0; i < frequencyBands; i++) {
    const frequency = (i + 1) * 0.3;
    const phase = i * 0.5;
    const value = (Math.sin(frame * frequency * 0.1 + phase) + 1) / 2;
    const noise = Math.random() * 0.1;
    bands.push(Math.min(1, Math.max(0, value * smoothing + noise)));
  }

  const volume = bands.reduce((a, b) => a + b, 0) / bands.length;
  const bass = ((bands[0] ?? 0) + (bands[1] ?? 0)) / 2;
  const mid = ((bands[2] ?? 0) + (bands[3] ?? 0) + (bands[4] ?? 0)) / 3;
  const treble = ((bands[5] ?? 0) + (bands[6] ?? 0) + (bands[7] ?? 0)) / 3;

  return {
    bands,
    volume,
    bass,
    mid,
    treble,
  };
};
