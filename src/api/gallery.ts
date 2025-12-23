import type { GalleryImage } from "../types/Gallery";

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

export async function fetchGallery(): Promise<GalleryImage[]> {
  const res = await fetch(
    `${STRAPI_URL}/api/galleries?populate=image`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch gallery");
  }

  const json: StrapiGalleryResponse = await res.json();

  return json.data.map(item => ({
    id: item.id,
    url: STRAPI_URL + item.attributes.image.data.attributes.url,
    alt: item.attributes.image.data.attributes.alternativeText,
  }));
}