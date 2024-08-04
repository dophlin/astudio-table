export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  manufacturer: string;
  expiryDate: string;
}