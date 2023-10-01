import { ProductImage } from './productImage';

export interface ProductDetail {
  id: number;
  productName: string;
  productPrice: number;
  discountRate: number;
  discountedPrice: number;
  concept: string;
  notes: string;
  scentDescription: string;
  perfumer: Perfumer;
  ingredient: string;
  information: string;
  caution: string;
  manufacturer: string;
  productImageList: ProductImage[];
}

export enum Perfumer {
  HwangJaeJoon = '황재준',
  ParkJinMan = '박진만',
}
