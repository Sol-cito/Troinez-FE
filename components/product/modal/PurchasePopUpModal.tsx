/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import styles from './PurchasePopUpModal.module.scss';

export interface PurchaseInfo {
  selectedProductId: number;
  selectedProductCount: number;
  selectedProductPrice: number;
}

export interface PurchaseContent {
  isCartOrder: boolean;
  purchaseInfoList: PurchaseInfo[];
}

export default function PurchasePopUpModal({
  closeModal,
  purchaseContent,
  selectedProductNumber,
}: {
  closeModal: any;
  purchaseContent: PurchaseContent;
  selectedProductNumber: number;
}) {
  let orderUrl: string;

  if (purchaseContent.isCartOrder) {
    orderUrl = '/order?type=cart';
  } else {
    const purchaseInfo: PurchaseInfo = purchaseContent.purchaseInfoList[0];

    orderUrl = `/order?type=single&productId=${
      purchaseInfo.selectedProductId
    }&productCount=${selectedProductNumber}&amount=${
      purchaseInfo.selectedProductPrice * purchaseInfo.selectedProductCount
    }`;
  }

  return (
    <div className={styles.box}>
      <div className={styles.box_container}>
        <div className={styles.title_container}>
          <span>구매하기 창으로 이동하시겠습니까 ?</span>
        </div>
        <div className={`${styles.button_container} ${styles.left_button}`}>
          <Link href={orderUrl} className={styles.link}>
            <button onClick={closeModal} className={styles.yes}>
              예
            </button>
          </Link>
          <button onClick={closeModal}>아니오</button>
        </div>
      </div>
    </div>
  );
}
