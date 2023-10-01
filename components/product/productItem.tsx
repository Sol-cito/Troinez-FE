/* eslint-disable object-curly-newline */
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { Product } from '@/interfaces/product/product';
import styles from './productItem.module.scss';

export default function ProductItem({ product }: { product: Product }) {
  const locale: string = useLocale();

  const productDetail = useTranslations('Product.detail');

  const cartImg = '/common/product/img/cart-shopping-solid.svg';

  return (
    <div className={styles.item_box}>
      <div className={styles.item_img_box}>
        <Link
          href={`/${locale}/product/${product.id}`}
          className={styles.menu_btn}
        >
          <Image
            // TO-DO: image url 정해지면 아래 src 수정
            src={'/common/product/perfume/'.concat(
              product.productImage.productImageUrl
            )}
            alt="D01"
            sizes="20vw"
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
