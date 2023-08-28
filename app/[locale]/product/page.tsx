'use client';

import Image from 'next/image';
// import Link from 'next/link';
import styles from './page.module.scss';

export default function Product() {
  const productImg = '/common/product/img/D01.png';
  const cartImg = '/common/product/img/cart-shopping-solid.svg';
  return (
    <div>
      <div className={styles.product_list_title}>
        <span>
          <hr />
        </span>
        <span className={styles.title}>All Products</span>
      </div>
      <div className={styles.product_list_box}>
        <div className={styles.product_list_item}>
          <div className={styles.product_img}>
            <Image src={productImg} alt="D01" fill />
          </div>
          <div className={styles.product_description_wrapper}>
            <div className={styles.product_description}>
              <p className={styles.product_name}>TROISNEZ D01</p>
              <p className={styles.product_price}>420,0000원</p>
              <p className={styles.product_sale_price}>
                <span>할인 : </span>
                <span>108,000원</span>
                <span> 10% </span>
              </p>
              <p className={styles.newest_icon}>
                <span className={styles.icon}>new</span>
              </p>
              <p>
                <Image
                  src={cartImg}
                  className={styles.cart_icon}
                  alt="cart"
                  width={15}
                  height={15}
                />
                <span> Cart</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
