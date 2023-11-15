'use client';

import { ProductDetail } from '@/interfaces/product/productDetail';
import { ProductImageType } from '@/interfaces/product/productImage';
import { GetParameter, getApiCall } from '@/service/restAPI.service';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CarouselImages from '@/components/carouselImages/carouselImages';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { addCartCookie } from '@/utils/tokenUtils';
import PaymentPopUpmodal from '@/components/product/modal/PaymentPopUpmodal';
import styles from './page.module.scss';

export default function ProductDetailPage({
  params: { id },
}: {
  params: Params;
}) {
  const productDetailTrans = useTranslations('Product.detail');
  const [productDetail, setProductDetail] = useState<ProductDetail>();

  const [selectedProductNumber, setSelectedProductNumber] = useState<number>(1);

  const productId: number = id;

  const getProductDetail = async () => {
    const getParameter: GetParameter = {
      url: '/products',
      params: { id: productId },
    };
    const res: ProductDetail = await getApiCall(getParameter);
    setProductDetail(res);
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  const convertToHtml = (target: string) => (
    <div dangerouslySetInnerHTML={{ __html: target }} />
  );

  const [showCartModal, setShowCartModal] = useState(false);

  const addCartButtonAction = () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const id = productDetail?.id;
    const productCount = selectedProductNumber;
    const cartProduct = {
      productId: id ?? 0,
      productCount,
    };
    addCartCookie(cartProduct);
    setShowCartModal(!showCartModal);
  };

  const closeModal = () => {
    setShowCartModal(false);
  };

  // const paymentButtonAction = () => {
  //   const selectedProductCount = document.getElementById(
  //     'selected-product-count'
  //   )?.value;
  //   const productPrice = document.getElementById('product-price')?.innerText;
  //   const amount = document.getElementById('product-total-price')?.innerText;

  //   const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';
  //   const tossPayments = TossPayments(clientKey);
  //   tossPayments.requestPayment('카드', {
  //     amount: 15000,
  //     orderId: '9g7YMXTywW6IUi8vuCpr7',
  //     orderName: '토스 티셔츠 외 2건',
  //     customerName: '박토스',
  //     successUrl: 'http://localhost:8080/success',
  //     failUrl: 'http://localhost:8080/fail',
  //   });
  // };

  return (
    <div>
      <div>
        {showCartModal && <PaymentPopUpmodal closeModal={closeModal} />}
      </div>
      {productDetail && (
        <>
          <div className={styles.detail_box}>
            <div className={styles.left_cont}>
              <CarouselImages
                showIndicators={false}
                showThumbs
                showArrow
                imageUrlList={productDetail.productImageList
                  .filter(
                    (image) =>
                      image.productImageType !== ProductImageType.DETAIL
                  )
                  .map((image) =>
                    'https://d3en4rwu5hlcjb.cloudfront.net/product/perfume/'.concat(
                      image.productImageUrl
                    )
                  )}
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
                        id="selected-product-count"
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
                      <span id="product-price">
                        {productDetail.discountedPrice.toLocaleString()}
                      </span>
                      <span>{productDetailTrans('price')}</span>
                    </div>
                  </div>
                </div>
                <div className={styles.payment_total_price_box}>
                  <span className={styles.payment_total_count}>
                    {productDetailTrans('totalPrice')}({selectedProductNumber}
                    {productDetailTrans('pieces')})
                  </span>
                  <span className={styles.payment_total_price}>
                    <span id="product-total-price">
                      {(
                        selectedProductNumber * productDetail.discountedPrice
                      ).toLocaleString()}
                    </span>
                    <span>{productDetailTrans('price')}</span>
                  </span>
                </div>
                <div className={styles.payment_decision_box}>
                  <button
                    type="button"
                    id="non-member-payment-button"
                    className={styles.payment_decision_buy}
                    // onClick={purchase}
                  >
                    {productDetailTrans('nonMemberBuy')}
                  </button>
                  <button
                    type="button"
                    className={styles.payment_decision_basket}
                    onClick={addCartButtonAction}
                  >
                    {productDetailTrans('cart')}
                  </button>
                </div>
                <hr />
              </div>
            </div>
          </div>
          <div className={styles.detail_image_box}>
            {productDetail.productImageList.map((image) => (
              <Image
                key={image.productImageUrl}
                src={'https://d3en4rwu5hlcjb.cloudfront.net/product/perfume/'.concat(
                  image.productImageUrl
                )}
                alt="D01"
                quality={100}
                width={500}
                height={500}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
