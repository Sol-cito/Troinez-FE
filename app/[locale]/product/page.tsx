'use client';

// import Link from 'next/link';
import ProductItem from '@/components/product/productItem';
import ProductData from '@/interfaces/product/productData';
import styles from './page.module.scss';

export default function Product() {
  // ProductList API로 Fetch
  const productList: ProductData[] = [
    {
      id: 1,
      name: 'TROISNEZ 트와네즈 디퓨저 D01 200ml',
      price: 45000,
      discountPrice: 36000,
      discountRate: 20,
      image: '/common/product/img/D01.png',
    },
    {
      id: 2,
      name: 'TROISNEZ 트와네즈 디퓨저 D02 200ml',
      price: 45000,
      discountPrice: 36000,
      discountRate: 20,
      image: '/common/product/img/D02.png',
    },
    {
      id: 3,
      name: 'TROISNEZ 트와네즈 디퓨저 D03 200ml',
      price: 45000,
      discountPrice: 36000,
      discountRate: 20,
      image: '/common/product/img/D03.png',
    },
    {
      id: 2,
      name: 'TROISNEZ 트와네즈 디퓨저 D04 200ml',
      price: 45000,
      discountPrice: 36000,
      discountRate: 20,
      image: '/common/product/img/D04.png',
    },
    {
      id: 2,
      name: 'TROISNEZ 트와네즈 디퓨저 D05 200ml',
      price: 45000,
      discountPrice: 36000,
      discountRate: 20,
      image: '/common/product/img/D05.png',
    },
    {
      id: 2,
      name: 'TROISNEZ 트와네즈 디퓨저 D06 200ml',
      price: 45000,
      discountPrice: 36000,
      discountRate: 20,
      image: '/common/product/img/D06.png',
    },
  ];

  return (
    <div>
      <div className={styles.product_list_title}>
        <span>
          <hr />
        </span>
        <span className={styles.title}>All Products</span>
      </div>
      <div className={styles.product_list_box}>
        {productList.map((productItem: ProductData) => (
          <ProductItem key={productItem.id} product={productItem} />
        ))}
      </div>
    </div>
  );
}
