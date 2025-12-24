import type { GalleryPost } from "../types/Gallery";

type StrapiImageAttributes = {
  url: string;
  alternativeText?: string;
};

type StrapiImageItem = {
  id: number;
  attributes: StrapiImageAttributes;
};

type StrapiGalleryItem = {
  id: number;
  attributes: {
    image: {
      data: StrapiImageItem;
    };
  };
};

type StrapiGalleryResponse = {
  data: StrapiGalleryItem[];
};

const STRAPI_URL = "https://mindful-apparel-46444cf289.strapiapp.com/api/";

export async function fetchGallery(): Promise<GalleryPost[]> {
  const res = await fetch(
    `${STRAPI_URL}/api/galleries?populate=image`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch gallery");
  }

  const json: StrapiGalleryResponse = await res.json();

return json.data.map((item: any) => ({
  id: item.id,
  documentId: item.documentId || "",
  location: item.location || "Nepoznata lokacija",
  caption: item.caption || "",
  
  // Mapiramo niz slika jer interfejs kaže da je "images" niz (array)
  images: (item.images || []).map((img: any) => ({
    id: img.id,
    // Provera da li je URL već potpun (sa https://) ili je relativan (/uploads/...)
    url: img.url?.startsWith('http') 
      ? img.url 
      : `${img.url}`,
    alternativeText: img.alternativeText || ""
  }))
}));
}