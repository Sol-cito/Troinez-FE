import {
  OrderRequestInterface,
  ValidationResultInterface,
} from '@/interfaces/order/OrderRequestInterface';

export default function orderValidCheck(
  orderRequest: OrderRequestInterface,
  allAgree: boolean
) {
  const validationResult: ValidationResultInterface = {
    userName: false,
    phoneNumber: false,
    email: false,
    certificationNumber: false,
    receiver: false,
    receiverPhoneNumber: false,
    receiverEmail: false,
    receiverZipcode: false,
    receiverAddress: false,
    receiverDetailAddress: false,
    allTermsAgreed: false,
  };

  const focusValidationResult = {};

  if (orderRequest.userName.trim().length !== 0) {
    validationResult.userName = true;
  }

  if (
    !(
      orderRequest.phoneNumber[0].length +
        orderRequest.phoneNumber[1].length +
        orderRequest.phoneNumber[2].length !==
      11
    )
  ) {
    validationResult.phoneNumber = true;
  }

  if (
    !(orderRequest.email[0].length === 0 || orderRequest.email[1].length === 0)
  ) {
    validationResult.email = true;
  }

  if (/^\d{6}$/.test(orderRequest.certificationNumber)) {
    validationResult.certificationNumber = true;
  }

  if (orderRequest.receiver.trim().length !== 0) {
    validationResult.receiver = true;
  }

  if (
    !(
      orderRequest.receiverPhoneNumber[0].length +
        orderRequest.receiverPhoneNumber[1].length +
        orderRequest.receiverPhoneNumber[2].length !==
      11
    )
  ) {
    validationResult.receiverPhoneNumber = true;
  }

  if (
    !(
      orderRequest.receiverEmail[0].length === 0 ||
      orderRequest.receiverEmail[1].length === 0
    )
  ) {
    validationResult.receiverEmail = true;
  }

  if (orderRequest.receiverZipcode.length !== 0) {
    validationResult.receiverZipcode = true;
  }

  if (orderRequest.receiverAddress.length !== 0) {
    validationResult.receiverAddress = true;
  }

  if (orderRequest.receiverDetailAddress.length !== 0) {
    validationResult.receiverDetailAddress = true;
  }

  if (allAgree) {
    validationResult.allTermsAgreed = true;
  }

  return validationResult;
}
