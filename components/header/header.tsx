import Link from "next/link";
import React from "react";
import styles from "./header.module.scss";

function Header() {
  return (
    <header>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          IN GOLD WE TRUST PARIS
        </Link>
        <Link href="/" className={styles.menu_btn}>
          LANG
        </Link>
        <Link href="/" className={styles.menu_btn}>
          SHOP
        </Link>
        <Link href="/about" className={styles.menu_btn}>
          ABOUT
        </Link>
        <Link href="/" className={styles.menu_btn}>
          LOGIN(LOGOUT)
        </Link>
        <Link href="/" className={styles.menu_btn}>
          CART
        </Link>
      </nav>
    </header>
  );
}

export default Header;
