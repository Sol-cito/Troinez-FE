/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  OrderRequestInterface,
  SetOrderRequestType,
} from '@/interfaces/order/OrderRequestInterface';

import styles from './inputBox.module.scss';

export default function EmailInputBox({
  title,
  orderRequestState,
  setOrderRequestState,
}: {
  title: string;
  orderRequestState: OrderRequestInterface;
  setOrderRequestState: SetOrderRequestType;
}) {
  const emailIdHandleChange = (event: any) => {
    setOrderRequestState({
      ...orderRequestState,
      email: [event.target.value, orderRequestState.email[1]],
    });
  };
  const emailDomainHandleChange = (event: any) => {
    setOrderRequestState({
      ...orderRequestState,
      email: [orderRequestState.email[0], event.target.value],
    });
  };
  const receiverEmailIdHandleChange = (event: any) => {
    setOrderRequestState({
      ...orderRequestState,
      receiverEmail: [event.target.value, orderRequestState.receiverEmail[1]],
    });
  };
  const receiverEmailDomainHandleChange = (event: any) => {
    setOrderRequestState({
      ...orderRequestState,
      receiverEmail: [orderRequestState.receiverEmail[0], event.target.value],
    });
  };

  return (
    <div className={styles.inputbox_div}>
      <div className={styles.inputbox_tit}>{title}</div>
      {title === '이메일' ? (
        <div className={styles.email_input_box}>
          <input
            className={styles.email_input}
            type="text"
            value={orderRequestState.email[0]}
            onChange={emailIdHandleChange}
          />
          <span> @ </span>
          <input
            className={styles.email_input}
            type="text"
            value={orderRequestState.email[1]}
            onChange={emailDomainHandleChange}
          />
          <label htmlFor="email-select" />
          <select
            id="email-select"
            name="email"
            onChange={emailDomainHandleChange}
          >
            <option value="">이메일을 선택하세요</option>
            <option value="naver.com">naver.com</option>
            <option value="hanmail.net">hanmail.net</option>
            <option value="nate.com">nate.com</option>
            <option value="hotmail.com">hotmail.com</option>
            <option value="hanmir.com">hanmir.com</option>
            <option value="dreamwiz.com">dreamwiz.com</option>
            <option value="lycos.co.kr">lycos.co.kr</option>
            <option value="paran.com">paran.com</option>
            <option value="">직접 입력</option>
          </select>
        </div>
      ) : (
        <div className={styles.email_input_box}>
          <input
            className={styles.email_input}
            type="text"
            value={orderRequestState.receiverEmail[0]}
            onChange={receiverEmailIdHandleChange}
          />
          <span> @ </span>
          <input
            className={styles.email_input}
            type="text"
            value={orderRequestState.receiverEmail[1]}
            onChange={receiverEmailDomainHandleChange}
          />
          <label htmlFor="email-select" />
          <select
            id="email-select"
            name="email"
            onChange={receiverEmailDomainHandleChange}
          >
            <option value="">이메일을 선택하세요</option>
            <option value="naver.com">naver.com</option>
            <option value="hanmail.net">hanmail.net</option>
            <option value="nate.com">nate.com</option>
            <option value="hotmail.com">hotmail.com</option>
            <option value="hanmir.com">hanmir.com</option>
            <option value="dreamwiz.com">dreamwiz.com</option>
            <option value="lycos.co.kr">lycos.co.kr</option>
            <option value="paran.com">paran.com</option>
            <option value="">직접 입력</option>
          </select>
        </div>
      )}
    </div>
  );
}
