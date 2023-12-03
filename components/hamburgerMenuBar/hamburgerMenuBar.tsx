'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { SHOP_DROPDOWN_LIST } from '@/common/shopDropdownList';
import { usePathname, useRouter } from 'next/navigation';
import styles from './hamburgerMenuBar.module.scss';

export default function HamburgerMenuBar({ isLogin }: { isLogin: boolean }) {
  const [isHomeClicked, setIsHomeClicked] = useState(false);
  const [isShopClicked, setIsShopClicked] = useState(false);

  const locale: string = useLocale();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsHomeClicked(false);
    setIsShopClicked(false);
  }, [pathname]);

  const onClickHome = () => {
    setIsHomeClicked(!isHomeClicked);
  };

  const onClickShop = () => {
    setIsShopClicked(!isShopClicked);
  };

  return (
    <div className={styles.menu_bar_wrapper}>
      <div className={styles.login_and_cart}>
        <Image
          src="/common/icon/mobile-login.svg"
          alt="TNZ"
          width={30}
          height={30}
          onClick={() => !isLogin && router.push(`/${locale}/login`)}
        />
        {locale === 'ko' && (
          <Image
            src="/common/icon/mobile-cart.svg"
            alt="TNZ"
            width={30}
            height={30}
            onClick={() => {
              router.push(`/cart`);
            }}
          />
        )}
      </div>
      <div className={styles.home} onClick={onClickHome} role="presentation">
        <span className={styles.text}>HOME({locale.toLocaleUpperCase()})</span>
        <Image
          className={styles.arrow_image}
          src={
            isHomeClicked
              ? '/common/icon/arrow-up.svg'
              : '/common/icon/arrow-down.svg'
          }
          alt="TNZ"
          width={10}
          height={10}
        />
      </div>
      <div
        className={styles.lang_selection_dropdown}
        style={{
          visibility: isHomeClicked ? 'visible' : 'hidden',
          height: isHomeClicked ? 'max-content' : 0,
        }}
      >
        <Link href="/">Korean</Link>
        <Link href="/en">English</Link>
      </div>
      <div className={styles.shop} onClick={onClickShop} role="presentation">
        <span className={styles.text}>SHOP</span>
        <Image
          className={styles.arrow_image}
          src={
            isShopClicked
              ? '/common/icon/arrow-up.svg'
              : '/common/icon/arrow-down.svg'
          }
          alt="TNZ"
          width={10}
          height={10}
        />
      </div>
      <div
        className={styles.shop_selection_dropdown}
        style={{
          visibility: isShopClicked ? 'visible' : 'hidden',
          height: isShopClicked ? 'max-content' : 0,
        }}
      >
        {SHOP_DROPDOWN_LIST.map((ele) => (
          <Link key={ele.href} href={`/${locale}/${ele.href}`}>
            {ele.title}
          </Link>
        ))}
      </div>
      <div className={styles.about}>
        <Link href={`/${locale}/about`} className={styles.text}>
          ABOUT
        </Link>
      </div>
    </div>
  );
}
