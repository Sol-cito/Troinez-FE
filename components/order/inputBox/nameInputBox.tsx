/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  OrderRequestInterface,
  SetOrderRequestType,
  ValidationResultInterface,
} from '@/interfaces/order/OrderRequestInterface';
import { RefObject } from 'react';
import styles from './inputBox.module.scss';

export default function NameInputBox({
  title,
  orderRequestState,
  setOrderRequestState,
  validationResult,
  focusRef,
}: {
  title: string;
  orderRequestState: OrderRequestInterface;
  setOrderRequestState: SetOrderRequestType;
  validationResult: ValidationResultInterface;
  focusRef: RefObject<HTMLInputElement>;
}) {
  const nameHandleChange = (event: any) => {
    setOrderRequestState({
      ...orderRequestState,
      userName: event.target.value,
    });
  };

  const receiverNameHandleChange = (event: any) => {
    setOrderRequestState({
      ...orderRequestState,
      receiver: event.target.value,
    });
  };

  return (
    <div className={styles.inputbox_div}>
      <div className={styles.inputbox_tit}>{title}</div>
      {title === '이름' ? (
        <input
          type="text"
          className={
            !validationResult.userName ? styles.invalid_input : undefined
          }
          ref={focusRef}
          value={orderRequestState.userName}
          onChange={nameHandleChange}
        />
      ) : (
        <input
          type="text"
          className={
            !validationResult.receiver ? styles.invalid_input : undefined
          }
          ref={focusRef}
          value={orderRequestState.receiver}
          onChange={receiverNameHandleChange}
        />
      )}
    </div>
  );
}
