/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import styles from './AddCartPopUpModal.module.scss';

export default function AddCartPopUpModal({ closeModal }: { closeModal: any }) {
  return (
    <div className={styles.box}>
      <div className={styles.box_container}>
        <div className={styles.title_container}>
          <span>선택한 상품을 장바구니에 담았습니다.</span>
        </div>
        <div className={`${styles.button_container} ${styles.left_button}`}>
          <button onClick={closeModal}>계속쇼핑</button>
          <Link href="/cart" className={styles.link}>
            <button>장바구니</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
