import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./card";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: {
      control: "text",
      description: "Card title",
    },
    children: {
      control: "text",
      description: "Card content/description",
    },
    href: {
      control: "text",
      description: "Link URL",
    },
    className: {
      control: "text",
      description: "CSS class for styling",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: "Documentation",
    children: "Learn more about the project setup and architecture.",
    href: "https://turborepo.dev/docs",
  },
};

export const WithStyling: Story = {
  args: {
    title: "Storybook",
    children: "Build UI components in isolation with Storybook.",
    href: "https://storybook.js.org",
    className: "block p-4 border rounded-lg hover:shadow-lg transition-shadow",
  },
};

export const GitHub: Story = {
  args: {
    title: "GitHub Repository",
    children: "View the source code and contribute to the project.",
    href: "https://github.com",
  },
};

export const Tutorial: Story = {
  args: {
    title: "Getting Started",
    children: "Follow the tutorial to set up your development environment.",
    href: "https://turborepo.dev/docs/getting-started",
  },
};
