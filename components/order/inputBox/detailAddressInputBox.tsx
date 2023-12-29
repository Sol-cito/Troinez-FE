/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  OrderRequestInterface,
  SetOrderRequestType,
  ValidationResultInterface,
} from '@/interfaces/order/OrderRequestInterface';
import { RefObject } from 'react';
import styles from './inputBox.module.scss';

export default function DetailAddressInputBox({
  title,
  orderRequestState,
  setOrderRequestState,
  validationResult,
  receiverDetailAddressFocus,
}: {
  title: string;
  orderRequestState: OrderRequestInterface;
  setOrderRequestState: SetOrderRequestType;
  validationResult: ValidationResultInterface;
  receiverDetailAddressFocus: RefObject<HTMLInputElement>;
}) {
  const detailAddressHandleChange = (event: any) => {
    setOrderRequestState({
      ...orderRequestState,
      receiverDetailAddress: event.target.value,
    });
  };

  return (
    <div className={styles.inputbox_div}>
      <div className={styles.inputbox_tit}>{title}</div>
      <div>
        <input
          type="text"
          ref={receiverDetailAddressFocus}
          className={`${styles.address_input} ${
            !validationResult.receiverDetailAddress && styles.invalid_input
          }`}
          onChange={detailAddressHandleChange}
        />
      </div>
    </div>
  );
}
