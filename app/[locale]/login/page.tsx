'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.scss';

export default function Login() {
  const naverLoginImage = '/common/login/img/btnG_official.png';
  // eslint-disable-next-line operator-linebreak
  const naverLoginUri =
    'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=qwJU3X8aINd3fD0YtXqH&state=hLiDdL2uhPtsftcU&redirect_uri=http://localhost:8080/api/login/oauth2/code/naver';
  return (
    <div className={styles.login_wrapper}>
      <div className={styles.login_left_title}>MEMBERSHIP</div>
      <div className={styles.login_header}>
        <p className={styles.login_title}>SW19</p>
        <p className={styles.login_subtitle}>FRANCE</p>
      </div>
      <div className={styles.flex_box}>
        <div className={styles.image_box}>
          <p className={styles.login_box_title}>로그인</p>
          <Link href={naverLoginUri}>
            <Image src={naverLoginImage} alt="naver login image" fill />
          </Link>
        </div>
      </div>
    </div>
  );
}
