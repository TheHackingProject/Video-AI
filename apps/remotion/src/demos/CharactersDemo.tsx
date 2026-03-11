import { AbsoluteFill } from "remotion";
import { Avatar, SpeakingHead, Silhouette } from "../../../../packages/ui/src/lib/remotion";

export const CharactersDemo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f0f",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 30 }}>Avatar</p>
        <Avatar
          name="John Doe"
          emoji="👨‍💻"
          size={150}
          color="#6366f1"
          startFrame={0}
        />
      </div>

      <div style={{ textAlign: "center" }}>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 30 }}>
          SpeakingHead
        </p>
        <SpeakingHead
          name="Speaker"
          emoji="🧑‍🏫"
          size={150}
          color="#ec4899"
          speaking={true}
          message="Hello! I'm demonstrating the SpeakingHead component."
          startFrame={30}
        />
      </div>

      <div style={{ textAlign: "center" }}>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 30 }}>
          Silhouette
        </p>
        <Silhouette
          type="hacker"
          name="Hacker"
          size={150}
          color="#22c55e"
          highlighted={true}
          startFrame={60}
        />
      </div>
    </AbsoluteFill>
  );
};
