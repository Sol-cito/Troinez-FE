import {
  OrderRequestInterface,
  ValidationResultForFocusInterface,
  ValidationResultInterface,
} from '@/interfaces/order/OrderRequestInterface';

export function orderValidCheck(
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

export function orderValidCheckForFocus(
  orderRequest: OrderRequestInterface,
  allAgree: boolean
) {
  const focusValidationResult: ValidationResultForFocusInterface = {
    userNameFocus: false,
    userFirstPhoneNumberFocus: false,
    userSecondPhoneNumberFocus: false,
    userThirdPhoneNumberFocus: false,
    userFirstEmailFocus: false,
    userSecondEmailFocus: false,
    verificationCodeFocus: false,
    receiverFocus: false,
    receiverFirstPhoneNumberFocus: false,
    receiverSecondPhoneNumberFocus: false,
    receiverThirdPhoneNumberFocus: false,
    receiverFirstEmailFocus: false,
    receiverSecondEmailFocus: false,
    receiverZipcodeFocus: false,
    receiverAddressFocus: false,
    receiverDetailAddressFocus: false,
    allTermsAgreedFocus: false,
  };

  if (orderRequest.userName.trim().length === 0) {
    focusValidationResult.userNameFocus = true;
  }

  if (orderRequest.phoneNumber[0].length != 3) {
    focusValidationResult.userFirstPhoneNumberFocus = true;
  }
  if (orderRequest.phoneNumber[1].length != 4) {
    focusValidationResult.userSecondPhoneNumberFocus = true;
  }
  if (orderRequest.phoneNumber[2].length != 4) {
    focusValidationResult.userThirdPhoneNumberFocus = true;
  }

  if (orderRequest.email[0].length === 0) {
    focusValidationResult.userFirstEmailFocus = true;
  }

  if (orderRequest.email[1].length === 0) {
    focusValidationResult.userSecondEmailFocus = true;
  }

  if (!/^\d{6}$/.test(orderRequest.certificationNumber)) {
    focusValidationResult.verificationCodeFocus = true;
  }

  if (orderRequest.receiver.trim().length === 0) {
    focusValidationResult.receiverFocus = true;
  }

  if (orderRequest.receiverPhoneNumber[0].length != 3) {
    focusValidationResult.receiverFirstPhoneNumberFocus = true;
  }
  if (orderRequest.receiverPhoneNumber[1].length != 4) {
    focusValidationResult.receiverSecondPhoneNumberFocus = true;
  }
  if (orderRequest.receiverPhoneNumber[2].length != 4) {
    focusValidationResult.receiverThirdPhoneNumberFocus = true;
  }

  if (orderRequest.receiverEmail[0].length === 0) {
    focusValidationResult.receiverFirstEmailFocus = true;
  }

  if (orderRequest.receiverEmail[1].length === 0) {
    focusValidationResult.receiverSecondEmailFocus = true;
  }

  if (orderRequest.receiverZipcode.length === 0) {
    focusValidationResult.receiverZipcodeFocus = true;
  }

  if (orderRequest.receiverDetailAddress.length === 0) {
    focusValidationResult.receiverDetailAddressFocus = true;
  }

  if (!allAgree) {
    focusValidationResult.allTermsAgreedFocus = true;
  }

  return focusValidationResult;
}
