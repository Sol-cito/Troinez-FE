'use client';

import { useState } from 'react';
import styles from './hamburgerMenuBar.module.scss';
import Image from 'next/image';
import { useLocale } from 'next-intl';

export default function HamburgerMenuBar() {
  const [isHomeClicked, setIsHomeClicked] = useState(false);
  const [isShopClicked, setIsShopClicked] = useState(false);

  const locale: string = useLocale();

  const onClickHome = () => {
    setIsHomeClicked(!isHomeClicked);
  };

  const onClickShop = () => {
    setIsShopClicked(!isShopClicked);
  };

  return (
    <>
      <div className={styles.menu_bar_wrapper}>
        <div className={styles.login_and_cart}>
          <Image
            src="/common/icon/mobile-login.svg"
            alt="TNZ"
            width={30}
            height={30}
            onClick={() => {}}
          />
          <Image
            src="/common/icon/mobile-cart.svg"
            alt="TNZ"
            width={30}
            height={30}
            onClick={() => {}}
          />
        </div>
        <div className={styles.home} onClick={onClickHome}>
          <span className={styles.text}>
            HOME({locale.toLocaleUpperCase()})
          </span>
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
        {/* {isHomeClicked && ( */}
        <div
          className={styles.lang_selection_dropdown}
          style={{
            visibility: isHomeClicked ? 'visible' : 'hidden',
            height: isHomeClicked ? 'max-content' : 0,
          }}
        >
          <span>Korean</span>
          <span>English</span>
        </div>
        {/* )} */}
        <div className={styles.shop} onClick={onClickShop}>
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
          <span>All Products</span>
          <span>Room Diffuser</span>
          <span>Car Diffuser</span>
        </div>
        <div className={styles.about}>
          <span className={styles.text}>ABOUT</span>
        </div>
      </div>
    </>
  );
}
