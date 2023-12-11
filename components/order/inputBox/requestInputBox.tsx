/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  OrderRequestInterface,
  SetOrderRequestType,
} from '@/interfaces/order/OrderRequestInterface';

import styles from './inputBox.module.scss';

export default function RequestInputBox({
  title,
  orderRequestState,
  setOrderRequestState,
}: {
  title: string;
  orderRequestState: OrderRequestInterface;
  setOrderRequestState: SetOrderRequestType;
}) {
  const requestHandleChange = (event: any) => {
    setOrderRequestState({
      ...orderRequestState,
      receiverRequest: event.target.value,
    });
  };
  return (
    <div className={styles.inputbox_div}>
      <div className={styles.inputbox_tit}>{title}</div>
      <textarea
        className={styles.request_inputbox}
        placeholder=" 배송 시 요청사항을 기입해주세요 (ex.문앞에 놔주세요)."
        onChange={requestHandleChange}
      />
    </div>
  );
}
