import { AbsoluteFill } from "remotion";
import { RotatingObject, FloatingText, ParticleField } from "@repo/ui/remotion";

export const ThreeDDemo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f0f",
      }}
    >
      <ParticleField
        count={100}
        colors={["#6366f1", "#ec4899", "#22c55e"]}
        speed={0.5}
        style={{ position: "absolute", inset: 0 }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          padding: 60,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#666", fontSize: 14, marginBottom: 20 }}>
            RotatingObject (Cube)
          </p>
          <RotatingObject
            size={120}
            shape="cube"
            color="#6366f130"
            borderColor="#6366f1"
            rotationSpeed={1.5}
          />
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#666", fontSize: 14, marginBottom: 20 }}>
            RotatingObject (Hexagon)
          </p>
          <RotatingObject
            size={120}
            shape="hexagon"
            color="#ec489930"
            borderColor="#ec4899"
            rotationSpeed={-1}
          />
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#666", fontSize: 14, marginBottom: 20 }}>
            FloatingText
          </p>
          <FloatingText
            text="3D"
            fontSize={80}
            color="#22c55e"
            floatAmplitude={15}
            floatSpeed={0.08}
          />
        </div>
      </div>

      <p
        style={{
          position: "absolute",
          bottom: 40,
          left: 0,
          right: 0,
          textAlign: "center",
          color: "#666",
          fontSize: 14,
        }}
      >
        Background: ParticleField
      </p>
    </AbsoluteFill>
  );
};
