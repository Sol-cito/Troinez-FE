/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable object-curly-newline */
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { Product } from '@/interfaces/product/product';
import { isMobile } from 'react-device-detect';
import { useAppDispatch } from '@/redux/config';
import { addToCart } from '@/redux/store/cart.store';
import { useEffect, useState } from 'react';
import styles from './productItem.module.scss';
import AddCartPopUpModal from './modal/AddCartPopUpModal';

export default function ProductItem({ product }: { product: Product }) {
  const [showCartModal, setShowCartModal] = useState(false);

  const dispatch = useAppDispatch();

  const locale: string = useLocale();

  const productDetail = useTranslations('Product.detail');

  const cartImg = '/common/product/img/cart-shopping-solid.svg';

  const handleOnClickCart = () => {
    setShowCartModal(true);
    dispatch(addToCart(product));
  };

  useEffect(() => {
    if (showCartModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [showCartModal]);

  return (
    <div className={styles.item_box}>
      <div className={styles.item_img_box}>
        <Link
          href={`/${locale}/products/item/${product.id}`}
          className={styles.menu_btn}
        >
          <Image
            // TO-DO: image url 정해지면 아래 src 수정
            src={'https://d3en4rwu5hlcjb.cloudfront.net/product/perfume/'.concat(
              product.productImage?.productImageUrl
            )}
            alt="D01"
            sizes={isMobile ? '70vw' : '20vw'}
            priority
            fill
          />
        </Link>
      </div>
      <div className={styles.item_desc_box}>
        <div className={styles.item_desc}>
          <p className={styles.item_name}>{product.productName}</p>
          <p className={styles.item_price}>
            {product.productPrice.toLocaleString()}
            {productDetail('price')}
          </p>
          <p className={styles.item_disc_price}>
            <span> {productDetail('discount')}: </span>
            <span>
              {product.discountedPrice.toLocaleString()}
              {productDetail('price')}
            </span>{' '}
            <span>
              {product.discountRate}
              {productDetail('percentage')}
            </span>
          </p>
          <p className={styles.item_newest_icon}>
            <span className={styles.icon}>new</span>
          </p>
          {locale !== 'en' && (
            <div className={styles.cart_area} onClick={handleOnClickCart}>
              <Image
                src={cartImg}
                className={styles.cart_icon}
                alt="cart"
                width={15}
                height={15}
              />
              <span> Cart </span>
            </div>
          )}
        </div>
        {showCartModal && (
          <>
            <div className={styles.overlay} />
            <AddCartPopUpModal
              closeModal={() => {
                setShowCartModal(false);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
