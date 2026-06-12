export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  brand: string;
  thumbnail: string;
  images: string[];
  reviews?: Review[];
  stock?: number;
  discountPercentage?: number;
  warrantyInformation?: string;
  shippingInformation?: string;
  returnPolicy?: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface CategoryResponseItem {
  slug?: string;
  name?: string;
}
