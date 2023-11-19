/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  OrderRequestInterface,
  SetOrderRequestType,
} from '@/interfaces/order/OrderRequestInterface';

import styles from './inputBox.module.scss';

export default function PhoneNumberInputBox({
  title,
  orderRequestState,
  setOrderRequestState,
}: {
  title: string;
  orderRequestState: OrderRequestInterface;
  setOrderRequestState: SetOrderRequestType;
}) {
  const phoneNumberFirstHandleChange = (event: any) => {
    setOrderRequestState({
      ...orderRequestState,
      phoneNumber: [
        event.target.value,
        orderRequestState.phoneNumber[1],
        orderRequestState.phoneNumber[2],
      ],
    });
  };
  const phoneNumberMidHandleChange = (event: any) => {
    setOrderRequestState({
      ...orderRequestState,
      phoneNumber: [
        orderRequestState.phoneNumber[0],
        event.target.value,
        orderRequestState.phoneNumber[2],
      ],
    });
  };
  const phoneNumberLastHandleChange = (event: any) => {
    setOrderRequestState({
      ...orderRequestState,
      phoneNumber: [
        orderRequestState.phoneNumber[0],
        orderRequestState.phoneNumber[1],
        event.target.value,
      ],
    });
  };

  const receiverPhoneNumberFirstHandleChange = (event: any) => {
    setOrderRequestState({
      ...orderRequestState,
      receiverPhoneNumber: [
        event.target.value,
        orderRequestState.receiverPhoneNumber[1],
        orderRequestState.receiverPhoneNumber[2],
      ],
    });
  };
  const receiverPhoneNumberMidHandleChange = (event: any) => {
    setOrderRequestState({
      ...orderRequestState,
      receiverPhoneNumber: [
        orderRequestState.receiverPhoneNumber[0],
        event.target.value,
        orderRequestState.receiverPhoneNumber[2],
      ],
    });
  };
  const receiverPhoneNumberLastHandleChange = (event: any) => {
    setOrderRequestState({
      ...orderRequestState,
      receiverPhoneNumber: [
        orderRequestState.receiverPhoneNumber[0],
        orderRequestState.receiverPhoneNumber[1],
        event.target.value,
      ],
    });
  };

  return (
    <div className={styles.inputbox_div}>
      <div className={styles.inputbox_tit}>{title}</div>
      {title === '연락처' ? (
        <div>
          <input
            className={styles.phone_number}
            type="text"
            value={orderRequestState.phoneNumber[0]}
            maxLength={3}
            onChange={phoneNumberFirstHandleChange}
          />
          <span> - </span>
          <input
            className={styles.phone_number}
            type="text"
            maxLength={4}
            value={orderRequestState.phoneNumber[1]}
            onChange={phoneNumberMidHandleChange}
          />
          <span> - </span>
          <input
            className={styles.phone_number}
            type="text"
            maxLength={4}
            value={orderRequestState.phoneNumber[2]}
            onChange={phoneNumberLastHandleChange}
          />
        </div>
      ) : (
        <div>
          <input
            className={styles.phone_number}
            type="text"
            value={orderRequestState.receiverPhoneNumber[0]}
            maxLength={3}
            onChange={receiverPhoneNumberFirstHandleChange}
          />
          <span> - </span>
          <input
            className={styles.phone_number}
            type="text"
            maxLength={4}
            value={orderRequestState.receiverPhoneNumber[1]}
            onChange={receiverPhoneNumberMidHandleChange}
          />
          <span> - </span>
          <input
            className={styles.phone_number}
            type="text"
            maxLength={4}
            value={orderRequestState.receiverPhoneNumber[2]}
            onChange={receiverPhoneNumberLastHandleChange}
          />
        </div>
      )}
    </div>
  );
}
