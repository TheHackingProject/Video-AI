import type { Meta, StoryObj } from "@storybook/react";
import { THP_LUCIDE_MAP, ThpGitBranch, ThpSun, ThpTerminal } from "./thp-lucide";

const meta: Meta = {
  title: "THP / Lucide icons",
  parameters: { layout: "centered" },
};

export default meta;

export const CuratedMap: StoryObj = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 20,
        color: "#22c55e",
        background: "#0a1410",
        padding: 28,
        borderRadius: 12,
      }}
    >
      {(Object.entries(THP_LUCIDE_MAP) as [keyof typeof THP_LUCIDE_MAP, (typeof THP_LUCIDE_MAP)["sun"]][]).map(
        ([slug, Icon]) => (
          <div key={slug} style={{ textAlign: "center" }}>
            <Icon size={36} strokeWidth={2} aria-hidden />
            <div style={{ marginTop: 8, fontSize: 11, color: "#6ee7b7", fontFamily: "system-ui" }}>{slug}</div>
          </div>
        ),
      )}
    </div>
  ),
};

export const TerminalAndGit: StoryObj = {
  render: () => (
    <div style={{ display: "flex", gap: 20, color: "#14b8a6", background: "#071311", padding: 24 }}>
      <ThpTerminal size={40} strokeWidth={2} aria-label="Terminal" />
      <ThpGitBranch size={40} strokeWidth={2} aria-label="Git branch" />
      <ThpSun size={40} strokeWidth={2} color="#f59e0b" aria-label="Sun" />
    </div>
  ),
};
