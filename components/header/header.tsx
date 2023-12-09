'use client';

import Link from 'next/link';
import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { SHOP_DROPDOWN_LIST } from '@/common/shopDropdownList';
import Image from 'next/image';
import { isMobile } from 'react-device-detect';
import DropdownMenu from '../dropdown/dropdownMenu';
import DropdownBox from '../dropdown/dropdownBox';
import HamburgerButton from '../hamburgerButton/hamburgerButton';
import styles from './header.module.scss';
import { useAppSelector } from '../../redux/config';

function Header({
  isLogin,
  token,
  username,
}: {
  isLogin: boolean;
  token: string | undefined;
  username: string | undefined;
}) {
  const locale: string = useLocale();
  const switchLocale = (): string => (locale === 'ko' ? 'en' : 'ko');
  const logoTextUrl =
    'https://d3en4rwu5hlcjb.cloudfront.net/logo/logo_text.png';
  const logoSignUrl =
    'https://d3en4rwu5hlcjb.cloudfront.net/logo/logo_sign.png';

  const logOutUri = process.env.NEXT_PUBLIC_NAVER_LOGOUT_REQUEST_URI;

  const loginTrans = useTranslations('Login');

  const { cartItemList } = useAppSelector((state) => state.cartItemSlice);

  let loginoutLink;
  let usernameBtn;
  if (isLogin) {
    usernameBtn = (
      <Link href="#none" className={styles.menu_btn}>
        <strong>{username}</strong>
        {loginTrans('welcome')}
      </Link>
    );
    loginoutLink = (
      <Link href={`${logOutUri}?token=${token}`} className={styles.menu_btn}>
        LOGOUT
      </Link>
    );
  } else {
    usernameBtn = '';
    loginoutLink = (
      <Link href={`/${locale}/login`} className={styles.menu_btn}>
        LOGIN
      </Link>
    );
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <Link href={`/${locale}`} className={styles.logo}>
            <Image src={logoTextUrl} alt="TROIS NEZ" quality={100} fill />
          </Link>
        </div>
        <div className={styles.mid}>
          <div>
            <Image
              src={logoSignUrl}
              alt="TNZ"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        {isMobile ? (
          <HamburgerButton isLogin={isLogin} />
        ) : (
          <div className={styles.right}>
            {usernameBtn}
            <Link href={`/${switchLocale()}`} className={styles.menu_btn}>
              {locale.toLocaleUpperCase()}
            </Link>
            <DropdownBox
              dropdownMenus={SHOP_DROPDOWN_LIST.map((ele) => (
                <DropdownMenu
                  key={ele.href}
                  title={ele.title}
                  href={`/${locale}/${ele.href}`}
                />
              ))}
            >
              <span className={styles.menu_btn}>SHOP</span>
            </DropdownBox>
            <Link href={`/${locale}/about`} className={styles.menu_btn}>
              ABOUT
            </Link>
            {loginoutLink}
            {locale !== 'en' && (
              <>
                <Link href="/myorder" className={`${styles.menu_btn}`}>
                  MY ORDER
                </Link>
                <Link
                  href="/cart"
                  className={`${styles.menu_btn}, ${styles.cart_btn}`}
                >
                  CART
                </Link>
                {cartItemList && cartItemList.length !== 0 && (
                  <div className={styles.num_of_cart_item_wrapper}>
                    <div className={styles.num_of_cart_item}>
                      {cartItemList.reduce((res, ele) => res + ele.quantity, 0)}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
