/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  OrderRequestInterface,
  SetOrderRequestType,
} from '@/interfaces/order/OrderRequestInterface';

import styles from './inputBox.module.scss';

export default function CertificationNumberInputBox({
  title,
  orderRequestState,
  setOrderRequestState,
}: {
  title: string;
  orderRequestState: OrderRequestInterface;
  setOrderRequestState: SetOrderRequestType;
}) {
  const certificationNumberHandleChange = (event: any) => {
    const value = Number(event.target.value);
    if (isNaN(value)) {
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
          orderRequestState.certificationNumber.length < 6 &&
          styles.invalid_input
        }`}
        type="text"
        maxLength={6}
        value={orderRequestState.certificationNumber}
        placeholder="숫자6자리를 입력해주세요."
        onChange={certificationNumberHandleChange}
      />
    </div>
  );
}
