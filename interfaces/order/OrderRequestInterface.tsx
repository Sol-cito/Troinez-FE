/* eslint-disable @typescript-eslint/indent */
export interface OrderProductDtoInterface {
  productId: number;
  productCount: number;
}

export type SetOrderRequestType = React.Dispatch<
  React.SetStateAction<OrderRequestInterface>
>;

export interface OrderRequestInterface {
  orderProductDtoList: OrderProductDtoInterface[];
  userName: string;
  phoneNumber: string[];
  email: string[];
  certificationNumber: string;
  receiver: string;
  receiverPhoneNumber: string[];
  receiverEmail: string[];
  receiverZipcode: string;
  receiverAddress: string;
  receiverDetailAddress: string;
  receiverRequest: string;
  orderId: string;
  productTotalPrice: number; // 물품 총 가격
  salePrice: number;
  deliveryType: string;
  deliveryPrice: number;
  totalPrice: number; // 배송비 포함 결제 금액
}

export type SetValidationResultType = React.Dispatch<
  React.SetStateAction<ValidationResultInterface>
>;

export interface ValidationResultInterface {
  userName: boolean;
  phoneNumber: boolean;
  email: boolean;
  certificationNumber: boolean;
  receiver: boolean;
  receiverPhoneNumber: boolean;
  receiverEmail: boolean;
  receiverZipcode: boolean;
  receiverAddress: boolean;
  receiverDetailAddress: boolean;
  allTermsAgreed: boolean;
}
