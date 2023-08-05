'use client';

import Link from 'next/link';
import React from 'react';
import { useLocale } from 'next-intl';
import { SHOP_DROPDOWN_LIST } from '@/common/shopDropdownList';
import styles from './header.module.scss';
import DropdownMenu from '../dropdown/dropdownMenu';
import DropdownBox from '../dropdown/dropdownBox';

function Header() {
  const locale: string = useLocale();
  const switchLocale = (): string => (locale === 'ko' ? 'en' : 'ko');

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <Link href={`/${locale}`} className={styles.logo}>
            IN GOLD WE TRUST PARIS®
          </Link>
        </div>
        <div className={styles.right}>
          <Link href={`/${switchLocale()}`} className={styles.menu_btn}>
            {locale.toLocaleUpperCase()}
          </Link>
          <DropdownBox
            dropdownMenus={SHOP_DROPDOWN_LIST.map((ele) => (
              <DropdownMenu key={ele.href} title={ele.title} href={ele.href} />
            ))}
          >
            <Link href={`/${locale}`} className={styles.menu_btn}>
              SHOP
            </Link>
          </DropdownBox>
          <Link href={`/${locale}/about`} className={styles.menu_btn}>
            ABOUT
          </Link>
          <Link href={`/${locale}`} className={styles.menu_btn}>
            LOGIN(LOGOUT)
          </Link>
          <Link href={`/${locale}`} className={styles.menu_btn}>
            CART
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
