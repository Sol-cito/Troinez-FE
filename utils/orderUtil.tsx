import { OrderRequestInterface } from '@/interfaces/order/OrderRequestInterface';

export default function orderVaildCheck(
  orderRequest: OrderRequestInterface,
  isValidCertificationNumber: boolean,
  allAgree: boolean,
  setIsValidOrder: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (orderRequest.userName.trim().length === 0) {
    setIsValidOrder(false);
  } else if (
    orderRequest.phoneNumber[0].length +
      orderRequest.phoneNumber[1].length +
      orderRequest.phoneNumber[2].length !==
    11
  ) {
    setIsValidOrder(false);
  } else if (
    orderRequest.email[0].length === 0 ||
    orderRequest.email[1].length === 0
  ) {
    setIsValidOrder(false);
  } else if (!isValidCertificationNumber) {
    setIsValidOrder(false);
  } else if (orderRequest.receiver.trim().length === 0) {
    setIsValidOrder(false);
  } else if (
    orderRequest.receiverPhoneNumber[0].length +
      orderRequest.receiverPhoneNumber[1].length +
      orderRequest.receiverPhoneNumber[2].length !==
    11
  ) {
    setIsValidOrder(false);
  } else if (
    orderRequest.receiverEmail[0].length === 0 ||
    orderRequest.receiverEmail[1].length === 0
  ) {
    setIsValidOrder(false);
  } else if (
    orderRequest.receiverZipcode.length === 0 ||
    orderRequest.receiverAddress.length === 0
  ) {
    setIsValidOrder(false);
  } else if (orderRequest.receiverDetailAddress.length === 0) {
    setIsValidOrder(false);
  } else if (!allAgree) {
    setIsValidOrder(false);
  } else {
    setIsValidOrder(true);
  }
}
