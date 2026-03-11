import { AbsoluteFill } from "remotion";
import {
  Button,
  Card,
  Badge,
  ProgressBar,
  SceneHeader,
} from "../../../../packages/ui/src/lib/remotion";

export const UIDemo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f0f",
        padding: 60,
      }}
    >
      <SceneHeader
        sceneNumber={1}
        totalScenes={8}
        title="UI Components Demo"
        keyword="components"
        startFrame={0}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "flex-start",
          marginTop: 120,
          gap: 40,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{ color: "#666", fontSize: 14 }}>Buttons</p>
          <Button text="Primary" variant="primary" startFrame={30} />
          <Button text="Secondary" variant="secondary" startFrame={40} />
          <Button text="Outline" variant="outline" startFrame={50} />
          <Button text="Ghost" variant="ghost" startFrame={60} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{ color: "#666", fontSize: 14 }}>Badges</p>
          <div style={{ display: "flex", gap: 12 }}>
            <Badge text="New" variant="info" startFrame={70} />
            <Badge text="Warning" variant="warning" startFrame={80} />
            <Badge text="Success" variant="success" startFrame={90} />
          </div>
        </div>

        <Card
          title="Card Component"
          subtitle="With optional subtitle"
          icon="📦"
          startFrame={100}
          style={{ maxWidth: 300 }}
        >
          <p style={{ color: "#aaa", fontSize: 14, margin: 0 }}>
            Cards can contain any content and animate on entry.
          </p>
        </Card>
      </div>

      <ProgressBar showTime showPercentage />
    </AbsoluteFill>
  );
};
