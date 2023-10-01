import { ProductImage } from './productImage';

export interface Product {
  id: number;
  productCategory: string;
  productName: string;
  productPrice: number;
  discountRate: number;
  discountedPrice: number;
  productImage: ProductImage;
}
