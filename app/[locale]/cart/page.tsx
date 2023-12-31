/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */

'use client';

import CartProduct from '@/components/cartproduct/cartProduct';
import { useEffect, useState } from 'react';
import {
  CartItem,
  checkAllCartItems,
  removeFromCart,
} from '@/redux/store/cart.store';
import PurchasePopUpModal from '@/components/product/modal/PurchasePopUpModal';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../redux/config';
import styles from './page.module.scss';

export default function Cart() {
  const locale: string = useLocale();
  const router = useRouter();

  const [showOrderPopup, setShowOrderPopup] = useState<boolean>(false);
  const [pageReady, setPageReady] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { cartItemList } = useAppSelector((state) => state.cartItemSlice);
  const [deliveryPrice, setDeliveryPrice] = useState(3000);
  const productDetailText = useTranslations('Product.detail');
  const priceUnit = productDetailText('price');

  const getTotalPrice = () =>
    cartItemList
      .filter((item) => {
        if (item.checked) return item;
      })
      .reduce(
        (res, item) => res + item.product.discountedPrice * item.quantity,
        0
      );

  const selectAllCartItems = () => {
    if (cartItemList.length === 0) {
      alert('카트에 담긴 상품이 없습니다.');
      return;
    }
    cartItemList.forEach((item) => {
      dispatch(checkAllCartItems(item.product));
    });
  };

  const handleOnClickRemoveFromCart = () => {
    if (cartItemList.length === 0) {
      alert('카트에 담긴 상품이 없습니다.');
      return;
    }

    if (window.confirm('선택하신 상품이 삭제됩니다. 삭제하시겠습니까?')) {
      const checkedItems: CartItem[] = cartItemList.filter((item) => {
        if (item.checked) return item;
      });
      checkedItems.forEach((item) => {
        dispatch(removeFromCart(item.product));
      });
      selectAllCartItems();
    }
  };

  const onClickPurchase = () => {
    if (cartItemList.length === 0) {
      alert('카트에 담긴 상품이 없습니다.');
      return;
    }
    if (cartItemList.filter((item) => item.checked).length === 0) {
      alert('구매할 상품을 선택해주세요.');
      return;
    }
    setShowOrderPopup(true);
  };

  useEffect(() => {
    if (locale === 'en') {
      alert('Only available in Korea.');
      router.push('/en');
    }
    setPageReady(true);
    selectAllCartItems();
  }, []);

  useEffect(() => {
    if (getTotalPrice() >= 30000) {
      setDeliveryPrice(0);
    } else {
      setDeliveryPrice(3000);
    }
  }, [cartItemList]);

  useEffect(() => {
    if (showOrderPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [showOrderPopup]);

  return (
    pageReady && (
      <div className={styles.body_container}>
        <div className={styles.row_container}>
          <span className={styles.row_title}>장바구니</span>
          <hr />
        </div>

        <div className={styles.row_container}>
          <div className={styles.product_list_box}>
            {cartItemList.map((ele, key) => (
              <CartProduct key={key} cartItem={ele} />
            ))}
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
              <span>배송비 {deliveryPrice.toLocaleString()}</span>
            </p>
            <p>
              <span>합계 : </span>
              <span>
                {(getTotalPrice() + deliveryPrice).toLocaleString() + priceUnit}
              </span>
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
              <div>{getTotalPrice().toLocaleString() + priceUnit}</div>
            </div>
            <div className={styles.product_order_box}>
              <div className={styles.delivery_price_guide}>
                배송비 (제주 혹은 도서산간 지역의 경우 추가비용이 발생할 수
                있습니다.)
              </div>
              <div>{deliveryPrice.toLocaleString() + priceUnit}</div>
            </div>
            <div className={styles.product_order_box}>
              <div>결제예정금액</div>
              <div>
                {(getTotalPrice() + deliveryPrice).toLocaleString() + priceUnit}
              </div>
            </div>
            <hr className={styles.hr_normal} />
          </div>
          <div className={styles.product_buy_button_box}>
            <button type="button" onClick={onClickPurchase}>
              구매하기
            </button>
          </div>
          {showOrderPopup && (
            <>
              <div className={styles.overlay} />
              <PurchasePopUpModal
                closeModal={() => setShowOrderPopup(false)}
                purchaseContent={{
                  isCartOrder: true,
                  purchaseInfoList: [],
                }}
                selectedProductNumber={0}
              />
            </>
          )}
        </div>
      </div>
    )
  );
}
