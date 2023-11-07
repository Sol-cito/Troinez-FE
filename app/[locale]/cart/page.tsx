import Product from '@/components/cart/product/cartProduct';
import styles from './page.module.scss';

export default function Cart() {
  return (
    <div className={styles.cart}>
      <div className={styles.cart_info_box}>
        <span>장바구니</span>
      </div>
      <hr className={styles.hr_normal} />
      <div className={styles.product_info_container}>
        <div className={styles.product_list_box}>
          <Product />
          <Product />
          <Product />
        </div>
      </div>
      <div>
        <div className={styles.product_price_info_box}>
          <p>
            <strong>[기본배송]</strong>
          </p>
          <p>
            <span>상품 구매금액 : </span>
            <span>72,000</span>
            <span> + </span>
            <span>배송비 3000</span>
          </p>
          <p>
            <span>합계 : </span>
            <span>75,000원</span>
          </p>
        </div>
      </div>
      <hr className={styles.hr_lighter} />
      <div>
        <div className={styles.selector_button_box}>
          <button type="button">전체선택</button>
          <button type="button">선택삭제</button>
        </div>
      </div>
      <hr className={styles.hr_normal} />
      <div>
        <div className={styles.product_order_info}>
          <p>
            <strong>주문상품</strong>
          </p>
          <hr className={styles.hr_lighter} />
          <div className={styles.product_order_box}>
            <div>총 상품금액</div>
            <div>76,000원</div>
          </div>
          <div className={styles.product_order_box}>
            <div>총 배송비</div>
            <div>3,000원</div>
          </div>
          <div className={styles.product_order_box}>
            <div>결재예정금액</div>
            <div>79,000원</div>
          </div>
          <hr className={styles.hr_normal} />
        </div>
        <div className={styles.product_buy_button_box}>
          <button type="button">구매하기</button>
        </div>
      </div>
    </div>
  );
}
