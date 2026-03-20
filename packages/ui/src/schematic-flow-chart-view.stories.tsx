import type { Decorator, Meta, StoryFn, StoryObj } from "@storybook/react";
import {
  SchematicFlowChartView,
  type SchematicFlowChartNode,
  type SchematicLink,
} from "./lib/diagrams/SchematicFlowChartView";

const lessonNodes: SchematicFlowChartNode[] = [
  {
    id: "1",
    title: "Script & outline",
    subtitle: "Pilot KM + beats",
    iconSlug: "learningPath",
  },
  {
    id: "2",
    title: "Static UI",
    subtitle: "Storybook first",
    iconSlug: "sprout",
  },
  {
    id: "3",
    title: "Remotion",
    subtitle: "Animated composition",
    iconSlug: "sparkle",
  },
];

const meta: Meta<typeof SchematicFlowChartView> = {
  title: "THP / Diagrams/SchematicFlowChartView",
  component: SchematicFlowChartView,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    backgrounds: { default: "dark" },
  },
  decorators: [
    ((Story: StoryFn) => (
      <div
        style={{
          background: "#0f0f0f",
          padding: 32,
          minHeight: 240,
        }}
      >
        <Story />
      </div>
    )) as Decorator,
  ],
};

export default meta;
type Story = StoryObj<typeof SchematicFlowChartView>;

const allOnes = (n: number) => Array.from({ length: n }, () => 1);

export const LessonPipelineHorizontal: Story = {
  args: {
    nodes: lessonNodes,
    direction: "horizontal",
    showArrows: true,
    nodeProgress: allOnes(lessonNodes.length),
    arrowProgress: allOnes(lessonNodes.length - 1),
  },
};

export const LessonPipelineVertical: Story = {
  args: {
    nodes: lessonNodes,
    direction: "vertical",
    showArrows: true,
    nodeProgress: allOnes(lessonNodes.length),
    arrowProgress: allOnes(lessonNodes.length - 1),
  },
};

const cycleNodes: SchematicFlowChartNode[] = [
  {
    id: "a",
    title: "Card 1",
    subtitle: "Step A",
    iconSlug: "learningPath",
  },
  {
    id: "b",
    title: "Card 2",
    subtitle: "Step B",
    iconSlug: "sprout",
  },
  {
    id: "c",
    title: "Card 3",
    subtitle: "Step C",
    iconSlug: "sparkle",
  },
  {
    id: "d",
    title: "Card 4",
    subtitle: "Loop",
    iconSlug: "terminal",
  },
];

const cycleLinks: SchematicLink[] = [
  { from: 0, to: 1, direction: "right" },
  { from: 1, to: 2, direction: "down" },
  { from: 2, to: 3, direction: "left" },
  { from: 3, to: 0, direction: "up" },
];

export const GraphFourDirectionCycle: Story = {
  args: {
    nodes: cycleNodes,
    links: cycleLinks,
    graphCell: { cardWidth: 200, cardHeight: 92, gap: 48 },
    showArrows: true,
    nodeProgress: allOnes(cycleNodes.length),
    arrowProgress: allOnes(cycleLinks.length),
  },
};
