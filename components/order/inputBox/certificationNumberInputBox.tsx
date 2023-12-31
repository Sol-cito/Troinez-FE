/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  OrderRequestInterface,
  SetOrderRequestType,
} from '@/interfaces/order/OrderRequestInterface';
import { RefObject } from 'react';
import styles from './inputBox.module.scss';

export default function CertificationNumberInputBox({
  title,
  orderRequestState,
  isFirstTry,
  setOrderRequestState,
  verificationCodeFocus,
}: {
  title: string;
  orderRequestState: OrderRequestInterface;
  isFirstTry: boolean;
  setOrderRequestState: SetOrderRequestType;
  verificationCodeFocus: RefObject<HTMLInputElement>;
}) {
  const certificationNumberHandleChange = (event: any) => {
    const value = Number(event.target.value);
    if (Number.isNaN(value)) {
      alert('숫자만 입력 가능합니다.');
      return;
    }
    setOrderRequestState({
      ...orderRequestState,
      certificationNumber: event.target.value,
    });
  };

  return (
    <div className={styles.inputbox_div}>
      <div className={styles.inputbox_tit}>{title}</div>
      <input
        className={`${styles.input_six_digit} ${
          !isFirstTry &&
          orderRequestState.certificationNumber.length < 6 &&
          styles.invalid_input
        }`}
        type="text"
        ref={verificationCodeFocus}
        maxLength={6}
        value={orderRequestState.certificationNumber}
        placeholder="숫자6자리를 입력해주세요."
        onChange={certificationNumberHandleChange}
      />
    </div>
  );
}
