import { ProductImage } from './product_image';

export default interface Product {
  id: number;
  name: string;
  productPrice: number;
  discountedPrice: number;
  discountRate: number;

  // 네이버페이 결재정보
  clientId: string;
  chainId: string;
  mode: string;
  merchantUserKey: string;
  merchantPayKey: string;
  productName: string;
  totalPayAmount: number;
  taxScopeAmount: number;
  taxExScopeAmount: number;

  productThumImage: ProductImage;
  productSubImageList: ProductImage[];
  productDetailImageList: ProductImage[];
}
