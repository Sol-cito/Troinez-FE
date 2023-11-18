'use client';

import Image from 'next/image';
import styles from './hamburgerButton.module.scss';
import { useEffect, useState } from 'react';
import HamburgerMenuBar from '../hamburgerMenuBar/hamburgerMenuBar';
import { usePathname } from 'next/navigation';

export default function HamburgerButton() {
  const [showMenuBar, setShowMenuBar] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setShowMenuBar(false);
  }, [pathname]);

  return (
    <>
      {showMenuBar && (
        <div
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
          <HamburgerMenuBar />
        </div>
      </div>
    </>
  );
}
