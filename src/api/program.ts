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

return json.data.map((item: any) => ({
  id: item.id,
  documentId: item.documentId || "",
  title: item.title || "",
  description: item.description || "",
  longDescription: item.longDescription || "",
  startDate: item.startDate || "",
  duration: item.duration || "",
  level: item.level || "",
  price: item.price || "",
  requirements: item.requirements || "",
}));
}