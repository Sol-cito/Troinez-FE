/* eslint-disable object-curly-newline */
import Image from 'next/image';
import styles from './productItem.module.scss';
import { useTranslations } from 'next-intl';
import Product from '@/interfaces/product/product';

export default function ProductItem({ product }: { product: Product }) {
  const productDetail = useTranslations('Product.detail');

  const cartImg = '/common/product/img/cart-shopping-solid.svg';

  return (
    <div className={styles.item_box}>
      <div className={styles.item_img_box}>
        <Image
          // TO-DO: image url 정해지면 아래 src 수정
          src={
            '/common/product/thum/' + product.productThumImage?.productImageUrl
          }
          alt="D01"
          fill
        />
      </div>
      <div className={styles.item_desc_box}>
        <div className={styles.item_desc}>
          <p className={styles.item_name}>{product.productName}</p>
          <p className={styles.item_price}>
            {product.productPrice}
            {productDetail('price')}
          </p>
          <p className={styles.item_disc_price}>
            <span> {productDetail('discount')} : </span>
            <span>
              {product.discountedPrice}
              {productDetail('price')}
            </span>
            <span>
              {' '}
              {product.discountRate}
              {productDetail('percentage')}
            </span>
          </p>
          <p className={styles.item_newest_icon}>
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
            <span> Cart </span>
          </p>
        </div>
      </div>
    </div>
  );
}
