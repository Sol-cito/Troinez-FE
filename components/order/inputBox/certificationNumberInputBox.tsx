/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import {
  OrderRequestInterface,
  SetOrderRequestType,
} from '@/interfaces/order/OrderRequestInterface';

import styles from './inputBox.module.scss';

export default function CertificationNumberInputBox({
  title,
  orderRequestState,
  setOrderRequestState,
  isValidCertificationNumber,
  setIsValidCertificationNumber,
}: {
  title: string;
  orderRequestState: OrderRequestInterface;
  setOrderRequestState: SetOrderRequestType;
  isValidCertificationNumber: boolean;
  setIsValidCertificationNumber: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const certificationNumberIsValid = () =>
    /^\d{6}$/.test(orderRequestState.certificationNumber);

  const certificationNumberHandleChange = (event: any) => {
    setOrderRequestState({
      ...orderRequestState,
      certificationNumber: event.target.value,
    });
  };
  useEffect(() => {
    setIsValidCertificationNumber(certificationNumberIsValid());
  }, [orderRequestState.certificationNumber]);

  return (
    <div className={styles.inputbox_div}>
      <div className={styles.inputbox_tit}>{title}</div>
      <input
        className={styles.input_six_digit}
        type="text"
        value={orderRequestState.certificationNumber}
        placeholder="숫자6자리를 입력해주세요."
        onChange={certificationNumberHandleChange}
      />
      {!isValidCertificationNumber && (
        <span className={`${styles.warning} ${styles.mgn_left_1vw}`}>
          인증번호가 올바르지 않습니다. (6자리 숫자를 입력해주세요)
        </span>
      )}
      {isValidCertificationNumber && (
        <span className={`${styles.ok} ${styles.mgn_left_1vw}`}>
          인증번호가 올바른 숫자입니다.
        </span>
      )}
    </div>
  );
}
