export interface ProductImage {
  id: number;
  productImageUrl: string;
  productImageType: ProductImageType;
}

export enum ProductImageType {
  THUM = 'THUM',
  SUB = 'SUB',
  DETAIL = 'DETAIL',
}
