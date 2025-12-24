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

const STRAPI_URL = import.meta.env.VITE_CMS_URL || "http://localhost:1337";

export async function fetchGallery(): Promise<GalleryPost[]> {
  // Osiguraj se da je populate=images (množina)
  const res = await fetch(`${STRAPI_URL}/api/galleries?populate=images`);
  const json = await res.json();

  console.log("Sirovi podaci iz Strapi-ja:", json.data);

  return json.data.map((item: any) => {
    return {
      id: item.id,
      documentId: item.documentId || "",
      location: item.location || "Nepoznata lokacija",
      caption: item.caption || "",
      
      images: (item.images || []).map((img: any) => {
        // Pravimo pun URL
        const fullUrl = img.url?.startsWith('http') 
          ? img.url 
          : `${STRAPI_URL}${img.url}`;
        
        console.log("Generisan URL slike:", fullUrl); // PROVERI OVO U KONZOLI (F12)
        
        return {
          id: img.id,
          url: fullUrl,
          alternativeText: img.alternativeText || ""
        };
      })
    };
  });
}