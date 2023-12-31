'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import HamburgerMenuBar from '../hamburgerMenuBar/hamburgerMenuBar';
import styles from './hamburgerButton.module.scss';

export default function HamburgerButton({ isLogin }: { isLogin: boolean }) {
  const [showMenuBar, setShowMenuBar] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setShowMenuBar(false);
  }, [pathname]);

  useEffect(() => {
    // prevent body scroll
    if (showMenuBar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [showMenuBar]);

  return (
    <>
      {showMenuBar && (
        <div
          role="presentation"
          className={styles.transparent_background}
          onClick={() => {
            setShowMenuBar(false);
          }}
        />
      )}
      <div className={styles.hamburger_button_wrapper}>
        <Image
          className={styles.hamburger_button_image}
          src="/common/icon/hamburger-button.svg"
          alt="TNZ"
          width={10}
          height={10}
          onClick={() => {
            setShowMenuBar(!showMenuBar);
          }}
        />
        <div
          className={styles.menu_bar}
          style={{
            transform: `translateX(${showMenuBar ? 0 : 100}%)`,
          }}
        >
          <HamburgerMenuBar isLogin={isLogin} />
        </div>
      </div>
    </>
  );
}
