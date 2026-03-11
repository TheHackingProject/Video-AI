import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    appName: {
      control: "text",
      description: "Name of the app displayed in the alert",
    },
    children: {
      control: "text",
      description: "Button label",
    },
    className: {
      control: "text",
      description: "CSS class for styling",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Click me",
    appName: "Storybook",
  },
};

export const WithCustomClass: Story = {
  args: {
    children: "Styled Button",
    appName: "Video-AI",
    className: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",
  },
};

export const DocsApp: Story = {
  args: {
    children: "Open Docs",
    appName: "docs",
  },
};

export const WebApp: Story = {
  args: {
    children: "Launch Web",
    appName: "web",
  },
};
