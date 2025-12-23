export interface Program {
  id: number;
  documentId: string;
  title: string;
  description: string;
  longDescription: string; 
  startDate: string; // Tip Date u Strapi-ju stiže kao string (YYYY-MM-DD)
  duration: string;
  level: string;
  price: string; // PROMENJENO: Na slici je Text
  requirements: string; 
}