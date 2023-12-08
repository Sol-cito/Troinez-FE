/* eslint-disable react-hooks/exhaustive-deps */

'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { OrderSuccessResponseInterface } from '@/interfaces/order/OrderSuccessResponseInterface';
import { GetParameter, getApiCall } from '@/service/restAPI.service';
import styles from './page.module.scss';
import OrderProduct from '@/components/order/orderProduct';

export default function MyOrderItems() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const certificationNumber = searchParams.get('certificationNumber');

  const [orderSuccessResponse, setOrderSuccessResponse] =
    useState<OrderSuccessResponseInterface>();

  const getOrderSuccessInfo = async () => {
    const getParameter: GetParameter = {
      url: '/orderFind',
      params: { orderId: orderId, certificationNumber: certificationNumber },
    };
    const res: OrderSuccessResponseInterface = await getApiCall(getParameter);
    setOrderSuccessResponse(res);
  };

  useEffect(() => {
    getOrderSuccessInfo();
  }, []);

  return (
    <div className={styles.body_container}>
      <div className={styles.row_container}>
        <div className={styles.row_sub_title}>주문번호 : {orderId}</div>
        <hr className={styles.hr_mgn_top_1vw} />
        <div className={styles.product_list}>
          {orderSuccessResponse?.orderProductDtoList.map((orderProduct) => (
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
              {orderSuccessResponse?.receiver}
            </div>
          </div>
          <div className={styles.delivery_row}>
            <div className={styles.delivery_row_key}>연락처</div>
            <div className={styles.delivery_row_value}>
              {orderSuccessResponse?.receiverPhoneNumber}
            </div>
          </div>
          <div className={styles.delivery_row}>
            <div
              className={`${styles.delivery_row_key} ${styles.vertical_center}`}
            >
              배송지
            </div>
            <div className={styles.delivery_row_value}>
              {orderSuccessResponse?.zipCode}
              <br />
              {orderSuccessResponse?.address} <br />
              {orderSuccessResponse?.addressDetail}
            </div>
          </div>
          <div className={`${styles.delivery_row} ${styles.delivery_row_last}`}>
            <div className={styles.delivery_row_key}>배송메모</div>
            <div className={styles.delivery_row_value}>-</div>
          </div>
        </div>
      </div>
    </div>
  );
}
