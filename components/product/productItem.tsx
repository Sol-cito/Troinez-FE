/* eslint-disable object-curly-newline */
import Image from 'next/image';
import ProductData from '@/interfaces/product/productData';
import styles from './productItem.module.scss';

export default function ProductItem({
  key,
  product,
}: {
  key: number;
  product: ProductData;
}) {
  const cartImg = '/common/product/img/cart-shopping-solid.svg';

  const { name, price, discountPrice, discountRate, image } = product;
  const keyString = `${key}`;
  const priceString = `${price}원`;
  const discountPriceString = `${discountPrice}원 `;
  const discountRateString = `${discountRate}%`;

  return (
    <div className={styles.product_item} id={keyString}>
      <div className={styles.product_img}>
        <Image src={image} alt="D01" fill />
      </div>
      <div className={styles.product_description_wrapper}>
        <div className={styles.product_description}>
          <p className={styles.product_name}>{name}</p>
          <p className={styles.product_price}>{priceString}</p>
          <p className={styles.product_sale_price}>
            <span>할인 : </span>
            <span>{discountPriceString}</span>
            <span>{discountRateString}</span>
          </p>
          <p className={styles.newest_icon}>
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
