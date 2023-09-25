'use client';

import Image from 'next/image';
import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import { GetParameter, getApiCall } from '@/service/restAPI.service';
import { useLocale, useTranslations } from 'next-intl';
import { Product } from '@/interfaces/product/product';
import { ProductDetail } from '@/interfaces/product/productDetail';

export default function ProductDetail({ params: { id } }: { params: any }) {
  const locale: string = useLocale();
  const productDetailTrans = useTranslations('Product.detail');

  const [productDetail, setProductDetail] = useState<ProductDetail>();

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
      {productDetail ? (
        <div className={styles.detail_box}>
          <div className={styles.left_cont}>
            <div className={styles.img_box}>
              {/* TO-DO: image url 정해지면 아래 src 수정 */}
              <Image
                src={
                  '/common/product/perfume/' +
                  productDetail.productImageList[0].productImageUrl
                }
                alt="D01"
                fill
              />
            </div>
            <div className={styles.img_slide_box}>
              <div className={styles.img_slide_inner_box}>
                {/* TO-DO: image url 정해지면 아래 src 수정 */}
                {/* {product.productDetailImageList.map((detailImage) => {
                  return (
                    <Image
                      src={
                        '/common/product/perfume/' + detailImage.productImageUrl
                      }
                      alt="D02"
                      width={50}
                      height={50}
                    />
                  );
                })} */}
              </div>
            </div>
          </div>
          <div className={styles.right_cont}>
            <div className={styles.desc_box}>
              <p className={styles.desc_title}>{productDetail.productName}</p>
              <p className={styles.desc_price}>
                {productDetail.productPrice}
                {productDetailTrans('price')}
              </p>
              <hr />
              <p className={styles.desc_product_eng}>
                {convertToHtml(productDetail.concept)}
              </p>
              <hr />
              <p className={styles.desc_sub_title}>NOTES</p>
              {convertToHtml(productDetail.notes)}
              <p className={styles.desc_sub_title}>PERFUMER</p>
              <p className={styles.desc_sub_elt}>{productDetail.perfumer}</p>
              <p className={styles.desc_sub_title}>INGREDIENTS</p>
              <p className={styles.desc_sub_elt}>{productDetail.ingredient}</p>
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
                    <button type="button">-</button>
                    <input type="text" value="0" readOnly />
                    <button type="button">+</button>
                  </div>
                  <div className={styles.payment_select_price}>
                    {productDetail.discountedPrice}원
                  </div>
                </div>
              </div>
              <div className={styles.payment_total_price_box}>
                <span className={styles.payment_total_count}>
                  총 상품금액 (1개)
                </span>
                <span className={styles.payment_total_price}>36,000원</span>
              </div>
              <div className={styles.payment_decision_box}>
                <button type="button" className={styles.payment_decision_buy}>
                  구매하기
                </button>
                <button
                  type="button"
                  className={styles.payment_decision_basket}
                >
                  장바구니
                </button>
              </div>
              <hr />
              <div className={styles.payment_naverpay}>
                <button type="button">NPay 구매</button>
                <button type="button">찜</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
