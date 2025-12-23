export interface GalleryPost {
  id: number;
  documentId: string;
  location: string;
  caption: string;
  images: {
    id: number;
    url: string;
    alternativeText?: string;
  }[]; // Niz slika
}