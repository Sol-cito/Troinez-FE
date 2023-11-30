'use client';

import styles from './page.module.scss';
import { useAppDispatch, useAppSelector } from '../../../redux/config';
import CartProduct from '@/components/cartproduct/cartProduct';
import { useEffect, useState } from 'react';
import {
  CartItem,
  checkAllCartItems,
  removeFromCart,
} from '@/redux/store/cart.store';
import PurchasePopUpModal from '@/components/product/modal/PurchasePopUpModal';

export default function Cart() {
  const [showOrderPopup, setShowOrderPopup] = useState<boolean>(false);
  const [pageReady, setPageReady] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { cartItemList } = useAppSelector((state) => state.cartItemSlice);

  const getTotalPrice = () => {
    return cartItemList
      .filter((item) => {
        if (item.checked) return item;
      })
      .reduce((res, item) => {
        return res + item.product.discountedPrice * item.quantity;
      }, 0);
  };

  const handleOnClickRemoveFromCart = () => {
    if (window.confirm('선택하신 상품이 삭제됩니다. 삭제하시겠습니까?')) {
      const checkedItems: CartItem[] = cartItemList.filter((item) => {
        if (item.checked) return item;
      });
      checkedItems.forEach((item) => {
        dispatch(removeFromCart(item.product));
      });
    }
  };

  const selectAllCartItems = () => {
    cartItemList.forEach((item) => {
      dispatch(checkAllCartItems(item.product));
    });
  };

  useEffect(() => {
    setPageReady(true);
    selectAllCartItems();
  }, []);

  return (
    pageReady && (
      <div className={styles.body_container}>
        <div className={styles.row_container}>
          <span className={styles.row_title}>장바구니</span>
          <hr />
        </div>

        <div className={styles.row_container}>
          <div className={styles.product_list_box}>
            {cartItemList.map((ele, key) => {
              return <CartProduct key={key} cartItem={ele} />;
            })}
          </div>
        </div>
        <div className={styles.row_container}>
          <div className={styles.product_price_info_box}>
            <p>
              <strong>[기본배송]</strong>
            </p>
            <p>
              <span>상품 구매금액 : </span>
              <span>{getTotalPrice().toLocaleString()}</span>
              <span> + </span>
              <span>배송비 3,000</span>
            </p>
            <p>
              <span>합계 : </span>
              <span>{(getTotalPrice() + 3000).toLocaleString()}원</span>
            </p>
          </div>
        </div>
        <hr className={styles.hr_lighter} />
        <div className={styles.row_container}>
          <div className={styles.selector_button_box}>
            <button type="button" onClick={selectAllCartItems}>
              전체선택
            </button>
            <button type="button" onClick={handleOnClickRemoveFromCart}>
              선택삭제
            </button>
          </div>
        </div>
        <hr className={styles.hr_normal} />
        <div className={styles.row_container}>
          <div className={styles.product_order_info}>
            <p>
              <strong>주문상품</strong>
            </p>
            <hr className={styles.hr_lighter} />
            <div className={styles.product_order_box}>
              <div>총 상품금액</div>
              <div>{getTotalPrice().toLocaleString()}원</div>
            </div>
            <div className={styles.product_order_box}>
              <div>총 배송비</div>
              <div>3,000원</div>
            </div>
            <div className={styles.product_order_box}>
              <div>결재예정금액</div>
              <div>{(getTotalPrice() + 3000).toLocaleString()}원</div>
            </div>
            <hr className={styles.hr_normal} />
          </div>
          <div className={styles.product_buy_button_box}>
            <button type="button" onClick={() => setShowOrderPopup(true)}>
              구매하기
            </button>
          </div>
          {showOrderPopup && (
            <>
              <div className={styles.overlay} />
              {/* TO-DO: pop up modal... */}
              {/* <PurchasePopUpModal closeModal={() => setShowOrderPopup(false)} /> */}
            </>
          )}
        </div>
      </div>
    )
  );
}
