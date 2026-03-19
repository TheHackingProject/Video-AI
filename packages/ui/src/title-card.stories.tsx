import type { Meta, StoryObj } from "@storybook/react";
import { TitleCard } from "./title-card";

const meta: Meta<typeof TitleCard> = {
  title: "UI/TitleCard",
  component: TitleCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark", values: [{ name: "dark", value: "#0d1117" }] },
  },
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof TitleCard>;

export const Default: Story = {
  args: {
    title: "Pré-requis : terminal et bases",
  },
};

export const WithSubtitle: Story = {
  args: {
    title: "Git vs GitHub",
    subtitle: "Une idée en 45 secondes",
  },
};

export const Pilot01Title: Story = {
  args: {
    title: "Pré-requis : terminal et bases",
    subtitle: "Pour suivre les démos Git",
  },
};
