/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  OrderRequestInterface,
  SetOrderRequestType,
} from '@/interfaces/order/OrderRequestInterface';

import styles from './inputBox.module.scss';

export default function DetailAddressInputBox({
  title,
  orderRequestState,
  setOrderRequestState,
}: {
  title: string;
  orderRequestState: OrderRequestInterface;
  setOrderRequestState: SetOrderRequestType;
}) {
  const detailAddressHandleChange = (event: any) => {
    console.log(event.target.value);
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
          className={styles.address_input}
          onChange={detailAddressHandleChange}
        />
      </div>
    </div>
  );
}
