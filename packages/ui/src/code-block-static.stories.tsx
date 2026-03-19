import type { Meta, StoryObj } from "@storybook/react";
import { CodeBlockStatic } from "./code-block-static";

const meta: Meta<typeof CodeBlockStatic> = {
  title: "UI/CodeBlockStatic",
  component: CodeBlockStatic,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark", values: [{ name: "dark", value: "#0d1117" }] },
  },
  argTypes: {
    code: { control: "text" },
    showLineNumbers: { control: "boolean" },
    title: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof CodeBlockStatic>;

const terminalSample = `$ pwd
/Users/toto/projets

$ ls
README.md  src  package.json`;

export const Default: Story = {
  args: {
    code: terminalSample,
    showLineNumbers: true,
  },
};

export const WithHighlight: Story = {
  args: {
    code: terminalSample,
    showLineNumbers: true,
    highlightLineIndex: 1,
  },
};

export const WithMultipleHighlight: Story = {
  args: {
    code: `$ pwd
/Users/toto/projets

$ ls
README.md  src`,
    showLineNumbers: true,
    highlightLineIndex: [1, 2],
  },
};

export const WithTitle: Story = {
  args: {
    code: "const x = 1;\nconsole.log(x);",
    showLineNumbers: true,
    title: "terminal",
  },
};

export const NoLineNumbers: Story = {
  args: {
    code: "echo 'Hello'",
    showLineNumbers: false,
  },
};
