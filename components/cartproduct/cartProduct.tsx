'use client';

import Image from 'next/image';
import styles from './cartProduct.module.scss';
import { useState } from 'react';
import {
  CartItem,
  addToCart,
  decreaseItemNumber,
} from '@/redux/store/cart.store';
import { useAppDispatch } from '@/redux/config';
import { useAppSelector } from '../../redux/config';

export default function CartProduct({ cartItem }: { cartItem: CartItem }) {
  const [checked, setChecked] = useState(true);

  const dispatch = useAppDispatch();
  const { cartItemList } = useAppSelector((state) => state.cartItemSlice);

  const handleIncreaseNumber = () => {
    dispatch(addToCart(cartItem.product));
  };

  const handleDecreaseNumber = () => {
    if (cartItem.quantity === 1) {
      if (window.confirm('변경 시 해당 상품이 삭제됩니다. 삭제하시겠습니까?')) {
        dispatch(decreaseItemNumber(cartItem.product));
      }
      return;
    }
    dispatch(decreaseItemNumber(cartItem.product));
  };

  return (
    <div>
      <div className={styles.product_checkbox_div}>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {
            setChecked(!checked);
          }}
        />
      </div>
      <div className={styles.product_info_div}>
        <div>
          <div className={styles.product_image}>
            <Image
              key={1}
              src={'https://d3en4rwu5hlcjb.cloudfront.net/product/perfume/'.concat(
                cartItem.product.productImage.productImageUrl
              )}
              alt="D01"
              fill
            />
          </div>
          <div className={styles.product_info}>
            <p>{cartItem.product.productName})</p>
            <p>{cartItem.product.discountedPrice.toLocaleString()}원</p>
            <p>배송 : 기본배송</p>
            <p>-</p>
            <div>
              <button
                type="button"
                className={styles.change_count}
                onClick={handleDecreaseNumber}
              >
                -
              </button>
              <input
                type="text"
                value={cartItem.quantity}
                readOnly
                className={styles.input_count}
              />
              <button
                type="button"
                className={styles.change_count}
                onClick={handleIncreaseNumber}
              >
                +
              </button>
              <button type="button" className={styles.apply_count}>
                변경
              </button>
            </div>
          </div>
          <div className={styles.product_total_price}>
            <p>
              {(
                cartItem.product.discountedPrice * cartItem.quantity
              ).toLocaleString()}{' '}
              원
            </p>
          </div>
        </div>
      </div>
      <hr className={styles.hr_lighter} />
    </div>
  );
}
