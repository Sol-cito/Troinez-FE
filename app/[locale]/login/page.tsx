'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.scss';
import { isMobile } from 'react-device-detect';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const [pageReady, setPageReady] = useState<boolean>(false);

  useEffect(() => {
    setPageReady(true);
  }, []);

  const naverLoginImage = '/common/login/img/btnG_official.png';
  const clientId = process.env.NEXT_PUBLIC_NAVER_LOGIN_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_NAVER_LOGIN_REDIRECT_URI;

  // eslint-disable-next-line operator-linebreak
  const naverLoginUri = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&state=hLiDdL2uhPtsftcU&redirect_uri=${redirectUri}`;
  return (
    pageReady && (
      <div className={styles.login_wrapper}>
        {!isMobile && (
          <>
            <div className={styles.login_left_title}>MEMBERSHIP</div>
            <div className={styles.login_header}>
              <Image
                src="/common/logo/logo_entire.png"
                alt="TNZ"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </>
        )}
        <div className={styles.flex_box}>
          <div className={styles.image_box}>
            <p className={styles.login_box_title}>로그인</p>
            <Link href={naverLoginUri}>
              <Image src={naverLoginImage} alt="naver login image" fill />
            </Link>
          </div>
        </div>
      </div>
    )
  );
}
