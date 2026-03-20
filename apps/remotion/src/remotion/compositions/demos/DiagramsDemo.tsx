import { AbsoluteFill } from "remotion";
import {
  FlowChart,
  Tree,
  Timeline,
  ComparisonTable,
  solarTheme,
} from "@repo/ui/remotion";
import type { ThpLucideSlug } from "@repo/ui/icons";
import type { SchematicLink } from "@repo/ui/schematic-flow-chart-view";

const schematicNodes: {
  id: string;
  label: string;
  subtitle?: string;
  iconSlug: ThpLucideSlug;
}[] = [
  {
    id: "1",
    label: "Script & outline",
    subtitle: "Pilot + beats in KM",
    iconSlug: "learningPath",
  },
  {
    id: "2",
    label: "Storybook",
    subtitle: "Static UI review",
    iconSlug: "sprout",
  },
  {
    id: "3",
    label: "Remotion",
    subtitle: "Timed composition",
    iconSlug: "terminal",
  },
  {
    id: "4",
    label: "Ship",
    subtitle: "Catalogue + checklist",
    iconSlug: "sparkle",
  },
];

/** Right → down → left → up loop; grid follows `links` (see schematic-flow-geometry). */
const schematicCycleLinks: SchematicLink[] = [
  { from: 0, to: 1, direction: "right" },
  { from: 1, to: 2, direction: "down" },
  { from: 2, to: 3, direction: "left" },
  { from: 3, to: 0, direction: "up" },
];

export const DiagramsDemo: React.FC = () => {

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
        <p style={{ color: "#888", fontSize: 14, marginBottom: 12 }}>
          SchematicFlowChart — cycle 4 directions (graph via <code>links</code>)
        </p>
        <FlowChart
          nodes={schematicNodes}
          links={schematicCycleLinks}
          graphCell={{ cardWidth: 168, cardHeight: 86, gap: 40 }}
          startFrame={0}
          nodeDelay={22}
          theme={solarTheme}
        />
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
