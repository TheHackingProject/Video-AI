import { AbsoluteFill } from "remotion";
import { FlowChart, Tree, Timeline, ComparisonTable } from "@repo/ui/remotion";

export const DiagramsDemo: React.FC = () => {
  const flowChartNodes = [
    { id: "1", label: "Start", icon: "🚀" },
    { id: "2", label: "Process", icon: "⚙️" },
    { id: "3", label: "Decision", icon: "🤔" },
    { id: "4", label: "End", icon: "✅" },
  ];

  const treeRoot = {
    id: "root",
    label: "Root",
    children: [
      {
        id: "a",
        label: "Branch A",
        children: [
          { id: "a1", label: "Leaf 1" },
          { id: "a2", label: "Leaf 2" },
        ],
      },
      {
        id: "b",
        label: "Branch B",
        children: [{ id: "b1", label: "Leaf 3" }],
      },
    ],
  };

  const timelineItems = [
    { id: "1", title: "Started", description: "Project kickoff", date: "2024" },
    { id: "2", title: "Growth", description: "Team expansion", date: "2025" },
    { id: "3", title: "Launch", description: "Public release", date: "2026" },
  ];

  const tableColumns = [
    { key: "feature", header: "Feature" },
    { key: "planA", header: "Plan A" },
    { key: "planB", header: "Plan B" },
  ];

  const tableRows = [
    { feature: "Storage", planA: "10 GB", planB: "100 GB" },
    { feature: "Users", planA: "5", planB: "Unlimited" },
    { feature: "Support", planA: "Email", planB: "24/7" },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f0f",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        padding: 40,
        gap: 40,
      }}
    >
      <div>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 12 }}>
          FlowChart
        </p>
        <FlowChart nodes={flowChartNodes} startFrame={0} />
      </div>

      <div>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 12 }}>Tree</p>
        <Tree root={treeRoot} startFrame={30} />
      </div>

      <div>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 12 }}>
          Timeline
        </p>
        <Timeline items={timelineItems} startFrame={60} />
      </div>

      <div>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 12 }}>
          ComparisonTable
        </p>
        <ComparisonTable
          columns={tableColumns}
          rows={tableRows}
          startFrame={90}
        />
      </div>
    </AbsoluteFill>
  );
};
