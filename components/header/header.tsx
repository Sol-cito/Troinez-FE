"use client";

import Link from "next/link";
import React from "react";
import styles from "./header.module.scss";
import { useLocale } from "next-intl";

function Header() {
  const locale: string = useLocale();
  const switchLocale = (): string => {
    return locale === "ko" ? "en" : "ko";
  };

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
          <Link href={`/${locale}`} className={styles.menu_btn}>
            SHOP
          </Link>
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
