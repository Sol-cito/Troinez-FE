/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  OrderRequestInterface,
  SetOrderRequestType,
} from '@/interfaces/order/OrderRequestInterface';

import styles from './inputBox.module.scss';

export default function NameInputBox({
  title,
  orderRequestState,
  setOrderRequestState,
}: {
  title: string;
  orderRequestState: OrderRequestInterface;
  setOrderRequestState: SetOrderRequestType;
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
          value={orderRequestState.userName}
          onChange={nameHandleChange}
        />
      ) : (
        <input
          type="text"
          value={orderRequestState.receiver}
          onChange={receiverNameHandleChange}
        />
      )}
    </div>
  );
}
