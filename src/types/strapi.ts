export interface DiveTrip {
  id: number;
  documentId: string;
  title: string;
  difficulty: string;
  price: number;
  duration: string;
  date: string;        
  description: string;
  locationUrl: string;
  featuredImage?: {
    url: string;
    alternativeText?: string;
  };
}