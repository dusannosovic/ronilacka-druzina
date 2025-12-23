import type { Program } from "../types/Program";

type StrapiProgramAttributes = {
  title: string;
  description: string;
  icon?: string;
};

type StrapiProgramItem = {
  id: number;
  attributes: StrapiProgramAttributes;
};

type StrapiProgramsResponse = {
  data: StrapiProgramItem[];
};

export async function fetchPrograms(): Promise<Program[]> {
  const res = await fetch("https://mindful-apparel-46444cf289.strapiapp.com/api/");

  if (!res.ok) {
    throw new Error("Failed to fetch programs");
  }

  const json: StrapiProgramsResponse = await res.json();

  return json.data.map((item) => ({
    id: item.id,
    title: item.attributes.title,
    description: item.attributes.description,
    icon: item.attributes.icon,
  }));
}