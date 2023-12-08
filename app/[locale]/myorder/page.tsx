'use client';

import styles from './page.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MyOrder() {
  const [orderId, setOrderId] = useState('');
  const [certificationNumber, setCertificationNumber] = useState('');

  const handleOnChangeOrderId = (event: any) => {
    setOrderId(event.target.value);
  };

  const handleOnChangeCertificationNumber = (event: any) => {
    setCertificationNumber(event.target.value);
  };

  return (
    <div className={styles.body_container}>
      <input onChange={handleOnChangeOrderId} />
      <input onChange={handleOnChangeCertificationNumber} />
      <Link
        href={{
          pathname: `/myorder/items`,
          query: { orderId: orderId, certificationNumber: certificationNumber },
        }}
        className={`${styles.menu_btn}`}
      >
        조회
      </Link>
    </div>
  );
}
