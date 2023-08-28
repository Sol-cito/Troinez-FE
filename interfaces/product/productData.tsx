export default interface ProductItem {
  id: number;
  name: string;
  price: number;
  discountPrice: number;
  discountRate: number;
  image: string;

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
}
