import { AbsoluteFill } from "remotion";
import {
  Typewriter,
  WordByWord,
  TextReveal,
  GlitchText,
} from "@repo/ui/remotion";

export const TextDemo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f0f",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 60,
        padding: 80,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 8 }}>
          Typewriter
        </p>
        <Typewriter
          text="Hello, this is a typewriter effect!"
          startFrame={0}
          charsPerSecond={20}
          fontSize={32}
        />
      </div>

      <div style={{ textAlign: "center" }}>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 8 }}>
          WordByWord
        </p>
        <WordByWord
          text="Each word appears one by one"
          startFrame={60}
          wordDelay={15}
          fontSize={28}
        />
      </div>

      <div style={{ textAlign: "center" }}>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 8 }}>
          TextReveal
        </p>
        <TextReveal text="Revealed Text" startFrame={120} fontSize={36} />
      </div>

      <div style={{ textAlign: "center" }}>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 8 }}>
          GlitchText
        </p>
        <GlitchText text="GLITCH EFFECT" startFrame={150} fontSize={40} />
      </div>
    </AbsoluteFill>
  );
};
