'use client';

import { ProductDetail } from '@/interfaces/product/productDetail';
import { ProductImageType } from '@/interfaces/product/productImage';
import { GetParameter, getApiCall } from '@/service/restAPI.service';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import CarouselImages from '@/components/carouselImages/carouselImages';

export default function ProductDetail({ params: { id } }: { params: any }) {
  const productDetailTrans = useTranslations('Product.detail');
  const [productDetail, setProductDetail] = useState<ProductDetail>();

  const [selectedProductNumber, setSelectedProductNumber] = useState<number>(1);

  const productId: number = id;

  useEffect(() => {
    getProductDetail();
  }, []);

  const getProductDetail = async () => {
    const getParameter: GetParameter = {
      url: '/products',
      params: { id: productId },
    };
    const res: ProductDetail = await getApiCall(getParameter);
    setProductDetail(res);
  };

  const convertToHtml = (target: string) => {
    return <div dangerouslySetInnerHTML={{ __html: target }}></div>;
  };

  return (
    <>
      {productDetail && (
        <>
          <div className={styles.detail_box}>
            <div className={styles.left_cont}>
              <CarouselImages
                showIndicators={false}
                showThumbs={true}
                showArrow={true}
                imageUrlList={productDetail.productImageList
                  .filter((image) => {
                    return image.productImageType !== ProductImageType.DETAIL;
                  })
                  .map((image) => {
                    return '/common/product/perfume/' + image.productImageUrl;
                  })}
              />
            </div>
            <div className={styles.right_cont}>
              <div className={styles.desc_box}>
                <p className={styles.desc_title}>{productDetail.productName}</p>
                <p className={styles.desc_price}>
                  {productDetail.discountRate !== 0 && (
                    <span className={styles.desc_original_price}>
                      {productDetail.productPrice.toLocaleString()}
                      {productDetailTrans('price')}
                    </span>
                  )}
                  {productDetail.discountedPrice.toLocaleString()}
                  {productDetailTrans('price')}
                </p>
                <hr />
                {convertToHtml(productDetail.concept)}
                <hr />
                <p className={styles.desc_sub_title}>NOTES</p>
                {convertToHtml(productDetail.notes)}
                <p className={styles.desc_sub_title}>PERFUMER</p>
                <p className={styles.desc_sub_elt}>{productDetail.perfumer}</p>
                <p className={styles.desc_sub_title}>INGREDIENTS</p>
                <p className={styles.desc_sub_elt}>
                  {productDetail.ingredient}
                </p>
                <p className={styles.desc_sub_title}>INFORMATION</p>
                {convertToHtml(productDetail.information)}
                <p className={styles.desc_sub_title}>CAUTION</p>
                {convertToHtml(productDetail.caution)}
                <hr />
              </div>
              <div className={styles.payment_box}>
                <div className={styles.payment_select_box}>
                  <div className={styles.payment_select}>
                    <div className={styles.payment_select_title}>
                      {productDetail.productName}
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedProductNumber(
                            Math.max(1, selectedProductNumber - 1)
                          );
                        }}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={selectedProductNumber}
                        readOnly
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedProductNumber(selectedProductNumber + 1);
                        }}
                      >
                        +
                      </button>
                    </div>
                    <div className={styles.payment_select_price}>
                      {productDetail.discountedPrice.toLocaleString()}
                      {productDetailTrans('price')}
                    </div>
                  </div>
                </div>
                <div className={styles.payment_total_price_box}>
                  <span className={styles.payment_total_count}>
                    {productDetailTrans('totalPrice')}({selectedProductNumber}
                    {productDetailTrans('pieces')})
                  </span>
                  <span className={styles.payment_total_price}>
                    {(
                      selectedProductNumber * productDetail.discountedPrice
                    ).toLocaleString()}
                    {productDetailTrans('price')}
                  </span>
                </div>
                <div className={styles.payment_decision_box}>
                  <button type="button" className={styles.payment_decision_buy}>
                    {productDetailTrans('buy')}
                  </button>
                  <button
                    type="button"
                    className={styles.payment_decision_basket}
                  >
                    {productDetailTrans('cart')}
                  </button>
                </div>
                <hr />
                <div className={styles.payment_naverpay}>
                  <button type="button">{productDetailTrans('NPay')}</button>
                  <button type="button">{productDetailTrans('ward')}</button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.detail_image_box}>
            {productDetail.productImageList.map((image) => {
              return (
                <Image
                  key={image.productImageUrl}
                  src={'/common/product/perfume/' + image.productImageUrl}
                  alt="D01"
                  quality={100}
                  width={500}
                  height={500}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
