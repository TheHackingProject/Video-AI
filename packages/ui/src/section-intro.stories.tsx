import type { Meta, StoryObj } from "@storybook/react";
import { SectionIntro } from "./section-intro";

const meta: Meta<typeof SectionIntro> = {
  title: "UI/SectionIntro",
  component: SectionIntro,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark", values: [{ name: "dark", value: "#0d1117" }] },
  },
  argTypes: {
    text: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof SectionIntro>;

export const Default: Story = {
  args: {
    text: "Git et GitHub : est-ce la même chose ? Non — et ça change tout de comprendre la différence.",
  },
};

export const Pilot01Intro: Story = {
  args: {
    text: "Dans les prochaines vidéos on va utiliser Git en ligne de commande. On va voir où ouvrir le terminal et une ou deux commandes de base.",
  },
};

export const Recap: Story = {
  args: {
    text: "Tu as ouvert le terminal, utilisé pwd et ls. Tu es prêt pour les prochaines vidéos.",
  },
};
