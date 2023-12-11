'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './page.module.scss';

export default function MyOrder() {
  const router = useRouter();
  const [orderId, setOrderId] = useState('');
  const [certificationNumber, setCertificationNumber] = useState('');

  const handleOnChangeOrderId = (event: any) => {
    setOrderId(event.target.value);
  };

  const handleOnChangeCertificationNumber = (event: any) => {
    setCertificationNumber(event.target.value);
  };

  const handleOnClickFindOrder = () => {
    if (!orderId) {
      alert('주문번호를 입력해주세요.');
      return;
    }
    if (!certificationNumber) {
      alert('인증번호를 입력해주세요.');
      return;
    }
    router.push(
      `/myorder/items?orderId=${orderId}&certificationNumber=${certificationNumber}`
    );
  };

  return (
    <div className={styles.body_container}>
      <h1 className={styles.title}>주문조회</h1>
      <div className={styles.inputs}>
        <input
          className={styles.order_number_input}
          placeholder="주문번호"
          value={orderId}
          onChange={handleOnChangeOrderId}
        />
        <input
          className={styles.certification_number_input}
          placeholder="인증번호(6자리)"
          maxLength={6}
          value={certificationNumber}
          onChange={handleOnChangeCertificationNumber}
        />
        <button
          className={styles.find_button}
          type="button"
          onClick={handleOnClickFindOrder}
        >
          조회하기
        </button>
      </div>
    </div>
  );
}
