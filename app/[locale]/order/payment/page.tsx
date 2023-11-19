/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-bitwise */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import { useEffect, useRef } from 'react';
import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from '@tosspayments/payment-widget-sdk';
import { nanoid } from 'nanoid';

import styles from './page.module.scss';

const clientKey: string =
  process.env.NEXT_PUBLIC_TOS_CLIENT_KEY === undefined
    ? ''
    : process.env.NEXT_PUBLIC_TOS_CLIENT_KEY;
const customerKey: string =
  process.env.NEXT_PUBLIC_TOS_CUSTOMER_KEY === undefined
    ? ''
    : process.env.NEXT_PUBLIC_TOS_CUSTOMER_KEY;
// http://localhost:3000/order/payment/success?paymentType=NORMAL&orderId=FHNHzc9nNHQjfa9_tiG6y&paymentKey=tviva2023111820545503n42&amount=50000
const successUrl = 'http://localhost:8080/api/v1/ordersuccess';

export default function TossPayments() {
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const price = 50_000;
  const paymentButtonAction = async () => {
    const paymentWidget = paymentWidgetRef.current;
    try {
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName: '토스 티셔츠 외 2건',
        customerName: '김토스',
        customerEmail: 'customer123@gmail.com',
        successUrl: `${successUrl}`,
        failUrl: `${window.location.origin}/order/payment/fail`,
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);
      paymentWidget.renderPaymentMethods('#paymet-widget', price);
      paymentWidgetRef.current = paymentWidget;
    })();
  }, []);

  return (
    <div className={styles.tossPayments}>
      <h1>주문서</h1>
      <div id="paymet-widget" />
      <button className="" onClick={paymentButtonAction}>
        결제하기
      </button>
    </div>
  );
}
