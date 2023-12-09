/* eslint-disable react-hooks/exhaustive-deps */

'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import OrderProduct from '@/components/order/orderProduct';
import { OrderSuccessResponseInterface } from '@/interfaces/order/OrderSuccessResponseInterface';
import { GetParameter, getApiCall } from '@/service/restAPI.service';
import styles from './page.module.scss';
import { useAppDispatch, useAppSelector } from '@/redux/config';
import { removeFromCart } from '@/redux/store/cart.store';
import { Product } from '@/interfaces/product/product';

export default function OrderSuccessPage() {
  const dispatch = useAppDispatch();
  const { cartItemList } = useAppSelector((state) => state.cartItemSlice);

  const [orderSuccessResponse, setOrderSuccessResponse] =
    useState<OrderSuccessResponseInterface>();

  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || '';

  const onClickKeepShopping = () => {
    window.location.href = '/products/all';
  };

  const getOrderSuccessInfo = async () => {
    const getParameter: GetParameter = {
      url: '/orderSuccessInfo',
      params: { orderId },
    };
    const res: OrderSuccessResponseInterface = await getApiCall(getParameter);
    setOrderSuccessResponse(res);
  };

  const removeItemsFromCart = async () => {
    orderSuccessResponse?.orderProductDtoList.forEach(async (item) => {
      const getParameter: GetParameter = {
        url: '/product',
        params: { id: item.productId },
      };
      const product: Product = await getApiCall(getParameter);
      dispatch(removeFromCart(product));
    });
  };

  useEffect(() => {
    getOrderSuccessInfo();
  }, []);

  useEffect(() => {
    removeItemsFromCart();
  }, [orderSuccessResponse]);

  return (
    <div className={styles.body_container}>
      {orderSuccessResponse && (
        <>
          <div className={styles.row_container}>
            <div className={styles.row_title}>
              주문이 성공적으로 <span className={styles.blue}>완료</span>
              되었습니다.
            </div>
            <div className={styles.row_guide}>
              <p>※ 주문번호가 작성하신 이메일로 전송되었습니다.</p>
              <p>
                ※ 주문조회 시 주문번호 및 6자리 인증번호가 반드시 필요하니
                참고해 주시기 바랍니다.
              </p>
            </div>
            <div className={styles.row_sub_title}>
              주문번호 : {orderSuccessResponse.orderId}
            </div>
            <div className={styles.center}>
              <input
                type="button"
                value="쇼핑 계속하기"
                className={styles.keep_shopping_btn}
                onClick={onClickKeepShopping}
              />
            </div>
            <hr className={styles.hr_mgn_top_1vw} />
            <div className={styles.product_list}>
              {orderSuccessResponse.orderProductDtoList.map((orderProduct) => (
                <OrderProduct
                  key={orderProduct.productId}
                  orderProductId={orderProduct.productId}
                  orderProductCount={orderProduct.productCount}
                  visibleDelivery={false}
                />
              ))}
            </div>
          </div>
          <hr className={styles.hr_mgn_top_1vw} />
          <div />
          <div className={styles.row_container}>
            <div className={styles.delivery_info_box}>
              <div className={styles.delivery_title}>
                <span>배송지정보</span>
              </div>
              <hr />
              <div className={styles.delivery_row}>
                <div className={styles.delivery_row_key}>수령인</div>
                <div className={styles.delivery_row_value}>
                  {orderSuccessResponse.receiver}
                </div>
              </div>
              <div className={styles.delivery_row}>
                <div className={styles.delivery_row_key}>연락처</div>
                <div className={styles.delivery_row_value}>
                  {orderSuccessResponse.receiverPhoneNumber}
                </div>
              </div>
              <div className={styles.delivery_row}>
                <div
                  className={`${styles.delivery_row_key} ${styles.vertical_center}`}
                >
                  배송지
                </div>

                <div className={styles.delivery_row_value}>
                  {orderSuccessResponse.zipCode}
                  <br />
                  {orderSuccessResponse.address} <br />
                  {orderSuccessResponse.addressDetail}
                </div>
              </div>
              <div
                className={`${styles.delivery_row} ${styles.delivery_row_last}`}
              >
                <div className={styles.delivery_row_key}>배송메모</div>
                <div className={styles.delivery_row_value}>
                  {orderSuccessResponse.request || '-'}
                </div>{' '}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
