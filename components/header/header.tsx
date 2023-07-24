import Link from "next/link";
import React from "react";
import styles from "./header.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <Link href="/" className={styles.logo}>
            IN GOLD WE TRUST PARIS®
          </Link>
        </div>
        <div className={styles.right}>
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
        </div>
      </nav>
    </header>
  );
}

export default Header;
