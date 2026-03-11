import type { Meta, StoryObj } from "@storybook/react";
import { Code } from "./code";

const meta: Meta<typeof Code> = {
  title: "UI/Code",
  component: Code,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: {
      control: "text",
      description: "Code content to display",
    },
    className: {
      control: "text",
      description: "CSS class for styling",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Code>;

export const Default: Story = {
  args: {
    children: "npm install",
  },
};

export const WithStyling: Story = {
  args: {
    children: "bun run dev",
    className: "px-2 py-1 bg-gray-100 rounded font-mono text-sm",
  },
};

export const Command: Story = {
  args: {
    children: "turbo build --filter=docs",
  },
};

export const Variable: Story = {
  args: {
    children: "const greeting = 'Hello, World!'",
    className: "bg-gray-900 text-green-400 px-3 py-2 rounded font-mono",
  },
};

export const LongCode: Story = {
  args: {
    children: "git clone --recurse-submodules https://github.com/user/repo.git",
  },
};
