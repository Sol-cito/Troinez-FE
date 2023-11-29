/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import styles from './PurchasePopUpModal.module.scss';
import { Product } from '@/interfaces/product/product';

export default function PurchasePopUpModal({
  closeModal,
  productList,
}: {
  closeModal: Function;
  productList: Product[];
}) {
  const orderUrl = '/order?type=order';
  return (
    <div className={styles.box}>
      <div className={styles.box_container}>
        <div className={styles.title_container}>
          <span>구매하기 창으로 이동하시겠습니까 ?</span>
        </div>
        <div className={`${styles.button_container} ${styles.left_button}`}>
          <Link
            href={{ pathname: orderUrl, query: JSON.stringify(productList) }}
            className={styles.link}
          >
            <button className={styles.yes}>예</button>
          </Link>
          <button onClick={() => closeModal()}>아니오</button>
        </div>
      </div>
    </div>
  );
}
