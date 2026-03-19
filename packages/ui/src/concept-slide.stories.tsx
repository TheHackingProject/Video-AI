import type { Meta, StoryObj } from "@storybook/react";
import { ConceptSlide } from "./concept-slide";

const meta: Meta<typeof ConceptSlide> = {
  title: "UI/ConceptSlide",
  component: ConceptSlide,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark", values: [{ name: "dark", value: "#0d1117" }] },
  },
  argTypes: {
    title: { control: "text" },
    body: { control: "text" },
    callout: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof ConceptSlide>;

export const Default: Story = {
  args: {
    title: "Git = sur ta machine",
    body: "Un outil sur ton ordinateur. Il garde l'historique de ton projet : chaque sauvegarde. Une machine à voyager dans le temps pour ton code.",
  },
};

export const WithCallout: Story = {
  args: {
    title: "GitHub = en ligne + collaboration",
    body: "Un site sur internet. Il stocke une copie de ton projet et permet de travailler à plusieurs : partager le code, proposer des changements, les valider.",
    callout: "Git = machine · GitHub = lieu en ligne",
  },
};

export const NoCallout: Story = {
  args: {
    title: "Commit, késako",
    body: "Un commit, c'est une sauvegarde datée de ton projet. Comme un point de sauvegarde dans un jeu.",
  },
};
