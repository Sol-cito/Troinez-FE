/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import styles from './PurchasePopUpModal.module.scss';

export default function PurchasePopUpModal({
  closeModal,
  selectedProductId,
  selectedProductCount,
  selectedProductPrice,
}: {
  closeModal: any;
  selectedProductId: number;
  selectedProductCount: number;
  selectedProductPrice: number | undefined;
}) {
  const orderUrl = `/order?type=order&productId=${selectedProductId}&productCount=${selectedProductCount}&amount=${
    selectedProductPrice * selectedProductCount
  }`;
  return (
    <div className={styles.box}>
      <div className={styles.box_container}>
        <div className={styles.title_container}>
          <span>구매하기 창으로 이동하시겠습니까 ?</span>
        </div>
        <div className={`${styles.button_container} ${styles.left_button}`}>
          <Link href={orderUrl} className={styles.link}>
            <button className={styles.yes}>예</button>
          </Link>
          <button onClick={closeModal}>아니오</button>
        </div>
      </div>
    </div>
  );
}
