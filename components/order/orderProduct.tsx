'use client';

/* eslint-disable no-unsafe-optional-chaining */
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { GetParameter, getApiCall } from '@/service/restAPI.service';
import { ProductDetail } from '@/interfaces/product/productDetail';
import styles from './orderProduct.module.scss';

export default function OrderProduct({
  orderProductId,
  orderProductCount,
  visibleDelivery,
}: {
  orderProductId: number;
  orderProductCount: number;
  visibleDelivery: boolean;
}) {
  const [productDetail, setProductDetail] = useState<ProductDetail>();
  const getProductDetail = async () => {
    const getParameter: GetParameter = {
      url: '/products',
      params: { id: orderProductId },
    };
    const res: ProductDetail = await getApiCall(getParameter);
    setProductDetail(res);
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    // api 요청으로 product 정보 가져오기
    <div>
      <div className={styles.product_info_div}>
        <div>
          <div className={styles.product_image}>
            <Image
              key={1}
              src={'https://d3en4rwu5hlcjb.cloudfront.net/product/perfume/'.concat(
                productDetail?.productImageList[0].productImageUrl || 'error'
              )}
              alt="D01"
              fill
            />
          </div>
          <div className={styles.product_info}>
            <br />
            <p>{productDetail?.productName}</p>
            <p>{productDetail?.discountedPrice}원</p>
            {visibleDelivery && <p>배송 : 기본배송</p>}
            {visibleDelivery && <p>-</p>}
          </div>
          <div className={styles.product_total_price}>
            <div>{orderProductCount}개</div>
            <div>
              {orderProductCount * (productDetail?.discountedPrice || -1)}원
            </div>
          </div>
        </div>
      </div>
      <hr className={styles.hr_lighter} />
    </div>
  );
}
