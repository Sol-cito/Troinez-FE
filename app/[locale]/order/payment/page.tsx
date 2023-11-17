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

const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
const customerKey = 'YbX2HuSlsC9uVJW6NMRMj';

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
        successUrl: `${window.location.origin}/order/payment/success`,
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
    <div className="TossPayments">
      <h1>주문서</h1>
      <div id="paymet-widget" />
      <button onClick={paymentButtonAction}>결제하기</button>
    </div>
  );
}
