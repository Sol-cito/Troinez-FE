import { OrderProductDtoInterface } from './OrderRequestInterface';

export interface OrderSuccessResponseInterface {
  amount: number;
  orderId: string;
  orderName: string;
  userName: string;
  receiver: string;
  receiverPhoneNumber: string;
  zipCode: string;
  address: string;
  addressDetail: string;
  request: string;
  orderProductDtoList: [OrderProductDtoInterface];
  productIdList: [number];
}
