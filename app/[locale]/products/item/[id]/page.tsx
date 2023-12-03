/* eslint-disable react/no-danger */

'use client';

import { ProductDetail } from '@/interfaces/product/productDetail';
import { ProductImageType } from '@/interfaces/product/productImage';
import { GetParameter, getApiCall } from '@/service/restAPI.service';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CarouselImages from '@/components/carouselImages/carouselImages';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import AddCartPopUpModal from '@/components/product/modal/AddCartPopUpModal';
import PurchasePopUpModal, {
  PurchaseContent,
  PurchaseInfo,
} from '@/components/product/modal/PurchasePopUpModal';
import styles from './page.module.scss';
import { useAppDispatch } from '@/redux/config';
import { addToCart } from '@/redux/store/cart.store';
import { Product } from '@/interfaces/product/product';

export default function ProductDetailPage({
  params: { id },
}: {
  params: Params;
}) {
  const dispatch = useAppDispatch();

  const productDetailTrans = useTranslations('Product.detail');
  const [productDetail, setProductDetail] = useState<ProductDetail>();
  const [selectedProductNumber, setSelectedProductNumber] = useState<number>(1);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseContent, setPurchaseContent] = useState<PurchaseContent>();

  const productId: number = id;
  const getProductDetail = async () => {
    const getParameter: GetParameter = {
      url: '/product/detail',
      params: { id: productId },
    };
    const res: ProductDetail = await getApiCall(getParameter);
    setProductDetail(res);

    const purchaseInfo: PurchaseInfo = {
      selectedProductId: productId,
      selectedProductCount: selectedProductNumber,
      selectedProductPrice: res.discountedPrice,
    };

    setPurchaseContent({
      isCartOrder: false,
      purchaseInfoList: [purchaseInfo],
    });
  };
  const convertToHtml = (target: string) => (
    <div dangerouslySetInnerHTML={{ __html: target }} />
  );

  const onClickPurchaseHandle = () => {
    setShowPurchaseModal(!showPurchaseModal);
  };

  const getProduct = async () => {
    const getParameter: GetParameter = {
      url: '/product',
      params: { id: productId },
    };
    return await getApiCall(getParameter);
  };

  const addCartButtonAction = async () => {
    const product: Product = await getProduct();

    for (let i = 0; i < selectedProductNumber; i++) {
      dispatch(addToCart(product));
    }

    setShowCartModal(!showCartModal);
  };

  const closeAddCartPopUpModal = () => {
    setShowCartModal(false);
  };

  const closePurchasePopUpModal = () => {
    setShowPurchaseModal(false);
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <div>
      <div>
        {showPurchaseModal && purchaseContent && (
          <>
            <div className={styles.overlay}> </div>
            <PurchasePopUpModal
              closeModal={closePurchasePopUpModal}
              purchaseContent={purchaseContent}
            />
          </>
        )}
        {showCartModal && (
          <AddCartPopUpModal closeModal={closeAddCartPopUpModal} />
        )}
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
                <p className={styles.shipping_title}>SHIPPING</p>
                <p className={styles.shipping_sub_title}>
                  {' '}
                  - 주문일 오후 2시까지 결제 완료된 주문은 당일 출고됩니다.(주말
                  및 공휴일 제외)
                </p>
                <p className={styles.shipping_sub_title}>
                  - 3만원 이상 구매 시 배송비는 무료입니다.
                </p>
                <p className={styles.shipping_sub_title}>
                  - 제주 지역 배송비 추가 3,000원 / 제주 외 도서지역 배송비 추가
                  5,000원
                </p>
                <p className={styles.return_title}>RETURN</p>
                <p className={styles.return_sub_title}>
                  - 단순 변심으로 인한 교환/반품은 상품 수령 후 7일 이내
                  가능합니다.
                </p>
                <p className={styles.return_sub_title}>
                  - 단순 변심으로 인한 교환/반품시 왕복 배송비가 발생합니다.
                  (편도 3,000원)
                </p>
                <p className={styles.return_sub_title}>
                  - 상품 하자 및 오배송의 경우 불량 확인 시 배송비는 발생하지
                  않습니다.
                </p>
                <p className={styles.return_sub_title}>
                  - 다음과 같은 경우 교환/환불이 불가능합니다.
                </p>
                <p className={styles.return_sub2_title}>
                  {' '}
                  1. 제품을 수령한 날로부터 7일이 지난 경우
                </p>
                <p className={styles.return_sub2_title}>
                  {' '}
                  2. 제품 박스가 훼손되어 상품가치가 상실된 경우
                </p>
                <p className={styles.return_sub2_title}>
                  {' '}
                  3. 제품을 사용하였거나 일부를 소비하여 상품가치가 상실된 경우
                </p>
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
                    onClick={onClickPurchaseHandle}
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
