import { AbsoluteFill, Sequence } from "remotion";
import { FadeSlide, ZoomBlur, Wipe } from "@repo/ui/remotion";

const DemoCard: React.FC<{ title: string; color: string }> = ({
  title,
  color,
}) => (
  <div
    style={{
      backgroundColor: color,
      borderRadius: 16,
      padding: 40,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <h2 style={{ color: "white", fontSize: 32, margin: 0 }}>{title}</h2>
  </div>
);

export const TransitionsDemo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f0f",
      }}
    >
      <Sequence from={0} durationInFrames={90}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
          }}
        >
          <p style={{ color: "#666", fontSize: 14 }}>FadeSlide (from bottom)</p>
          <FadeSlide direction="bottom" delay={10}>
            <DemoCard title="FadeSlide" color="#6366f1" />
          </FadeSlide>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={90} durationInFrames={90}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
          }}
        >
          <p style={{ color: "#666", fontSize: 14 }}>ZoomBlur</p>
          <ZoomBlur delay={10}>
            <DemoCard title="ZoomBlur" color="#ec4899" />
          </ZoomBlur>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={180} durationInFrames={90}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
          }}
        >
          <p style={{ color: "#666", fontSize: 14 }}>Wipe (from left)</p>
          <Wipe direction="left" delay={10}>
            <DemoCard title="Wipe" color="#22c55e" />
          </Wipe>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
