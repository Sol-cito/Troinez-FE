'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import styles from './page.module.scss';

export default function LoginPage() {
  const [pageReady, setPageReady] = useState<boolean>(false);

  const locale: string = useLocale();

  useEffect(() => {
    setPageReady(true);
  }, []);

  const naverLoginImage =
    'https://d3en4rwu5hlcjb.cloudfront.net/login/btnG_official.png';
  const clientId = process.env.NEXT_PUBLIC_NAVER_LOGIN_CLIENT_ID;
  const redirectUri = String(
    process.env.NEXT_PUBLIC_NAVER_LOGIN_REDIRECT_URI
  ).concat(`?locale=${locale}`);

  // eslint-disable-next-line operator-linebreak
  const naverLoginUri = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&state=hLiDdL2uhPtsftcU&redirect_uri=${redirectUri}`;
  return (
    pageReady && (
      <div className={styles.login_wrapper}>
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
