'use client';

import ProductItem from '@/components/product/productItem';
import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import { GetParameter, getApiCall } from '@/service/restAPI.service';
import Product from '@/interfaces/product/product';

export default function Product() {
  useEffect(() => {
    getAllProducts();
  }, []);

  const [productList, setProductList] = useState<Product[]>([]);

  const getAllProducts = async () => {
    const getParameter: GetParameter = {
      url: '/products',
    };
    const res: Product[] = await getApiCall(getParameter);
    if (res) {
      setProductList(res);
    }
  };

  return (
    <div>
      <div className={styles.title_box}>
        <span>
          <hr />
        </span>
        <span className={styles.title}>All Products</span>
      </div>
      <div className={styles.list_box}>
        {productList.map((product: Product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
