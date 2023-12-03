'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './page.module.scss';

export default function PaymentFailPage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.push('/'), 5000);
  }, []);

  return (
    <div className={styles.fail_box}>
      <span>
        결제 취소 or 실패하였습니다. 5초 후 메인화면으로 이동합니다...
      </span>
    </div>
  );
}
