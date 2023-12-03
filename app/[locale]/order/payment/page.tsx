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
import { useSearchParams } from 'next/navigation';
import styles from './page.module.scss';

const clientKey: string =
  process.env.NEXT_PUBLIC_TOS_CLIENT_KEY === undefined
    ? ''
    : process.env.NEXT_PUBLIC_TOS_CLIENT_KEY;
// http://localhost:3000/order/payment/success?paymentType=NORMAL&orderId=FHNHzc9nNHQjfa9_tiG6y&paymentKey=tviva2023111820545503n42&amount=50000
const successUrl = 'http://localhost:8080/api/v1/orderSuccess';

export default function TossPayments() {
  const searchParams = useSearchParams();
  const customerEmail = searchParams.get('customerEmail');
  const customerName = searchParams.get('customerName');
  const orderId = searchParams.get('orderId');
  const orderName = searchParams.get('orderName');
  const totalPrice = parseInt(searchParams.get('totalPrice') || '-1', 10);
  const customerKey = orderId || '123456';

  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentButtonAction = async () => {
    const paymentWidget = paymentWidgetRef.current;
    try {
      await paymentWidget?.requestPayment({
        orderId,
        orderName,
        customerName,
        customerEmail,
        successUrl: `${successUrl}`,
        failUrl: `${window.location.origin}/order/payment/fail`,
      });
    } catch (err) {
      alert('[Error] 결제 과정에서 에러가 발생했습니다. 다시 시도해주세요.');
    }
  };
  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);
      paymentWidget.renderPaymentMethods('#paymet-widget', totalPrice);
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
