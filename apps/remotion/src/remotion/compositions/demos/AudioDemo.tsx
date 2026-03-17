import { AbsoluteFill } from "remotion";
import { Spectrum, Waveform, AudioBar } from "@repo/ui/remotion";

export const AudioDemo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f0f",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 20 }}>
          Spectrum (Audio Visualizer)
        </p>
        <Spectrum
          width={800}
          height={150}
          bars={48}
          gradientColors={["#6366f1", "#ec4899"]}
          speed={0.12}
        />
      </div>

      <div style={{ textAlign: "center" }}>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 20 }}>
          Waveform
        </p>
        <Waveform width={800} height={100} color="#22c55e" />
      </div>

      <div style={{ textAlign: "center" }}>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 20 }}>
          AudioBar
        </p>
        <AudioBar width={600} height={80} bars={24} color="#f59e0b" />
      </div>
    </AbsoluteFill>
  );
};
