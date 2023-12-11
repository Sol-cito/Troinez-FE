/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  OrderRequestInterface,
  SetOrderRequestType,
  SetValidationResultType,
  ValidationResultInterface,
} from '@/interfaces/order/OrderRequestInterface';

import styles from './inputBox.module.scss';
import { useState } from 'react';

export default function NameInputBox({
  title,
  orderRequestState,
  setOrderRequestState,
  validationResult,
  setValidationResult,
}: {
  title: string;
  orderRequestState: OrderRequestInterface;
  setOrderRequestState: SetOrderRequestType;
  validationResult: ValidationResultInterface;
  setValidationResult: SetValidationResultType;
}) {
  const [isNameInitialized, setNameIsInitialized] = useState(false);
  const [isReceiverNameInitialized, setReceiverNameIsInitialized] =
    useState(false);

  const nameHandleChange = (event: any) => {
    setNameIsInitialized(true);
    setOrderRequestState({
      ...orderRequestState,
      userName: event.target.value,
    });
    if (event.target.value.length === 0) {
      setValidationResult({ ...validationResult, userName: false });
    } else {
      setValidationResult({ ...validationResult, userName: true });
    }
  };

  const receiverNameHandleChange = (event: any) => {
    setReceiverNameIsInitialized(true);
    setOrderRequestState({
      ...orderRequestState,
      receiver: event.target.value,
    });
    if (event.target.value.length === 0) {
      setValidationResult({ ...validationResult, receiver: false });
    } else {
      setValidationResult({ ...validationResult, receiver: true });
    }
  };

  return (
    <div className={styles.inputbox_div}>
      <div className={styles.inputbox_tit}>{title}</div>
      {title === '이름' ? (
        <>
          <input
            type="text"
            className={
              !validationResult.userName && isNameInitialized
                ? styles.invalid_input
                : undefined
            }
            value={orderRequestState.userName}
            onChange={nameHandleChange}
          />
          {!validationResult.userName && isNameInitialized && (
            <span className={styles.error_message}>이름을 입력해 주세요.</span>
          )}
        </>
      ) : (
        <>
          <input
            type="text"
            className={
              !validationResult.receiver && isReceiverNameInitialized
                ? styles.invalid_input
                : undefined
            }
            value={orderRequestState.receiver}
            onChange={receiverNameHandleChange}
          />
          {!validationResult.receiver && isReceiverNameInitialized && (
            <span className={styles.error_message}>이름을 입력해 주세요.</span>
          )}
        </>
      )}
    </div>
  );
}
