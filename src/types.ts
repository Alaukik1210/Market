// types.ts

export interface MarketplaceItem {
  id: number;
  name: string;
  coverImage: string;
  price: string;
  category: string;
  condition: string;
  description: string;
  seller: string;
  location: string;
  images: string[]; 
  dateAdded: string; 
}


export interface ImageFile {
  file: File;
  url: string;
}
