'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { OrderSuccessResponseInterface } from '@/interfaces/order/OrderSuccessResponseInterface';
import { GetParameter, getApiCall } from '@/service/restAPI.service';
import OrderProduct from '@/components/order/orderProduct';
import styles from './page.module.scss';

export default function MyOrderItems() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const certificationNumber = searchParams.get('certificationNumber');

  const [orderSuccessResponse, setOrderSuccessResponse] =
    useState<OrderSuccessResponseInterface>();

  const getOrderSuccessInfo = async () => {
    const getParameter: GetParameter = {
      url: '/orderFind',
      params: { orderId, certificationNumber },
    };
    const res: OrderSuccessResponseInterface = await getApiCall(getParameter);
    if (!res) {
      alert('주문 내역이 존재하지 않습니다.');
      router.push('/myorder');
      return;
    }
    setOrderSuccessResponse(res);
  };

  useEffect(() => {
    getOrderSuccessInfo();
  }, []);

  return (
    <div className={styles.body_container}>
      {orderSuccessResponse && (
        <>
          <div className={styles.row_container}>
            <div className={styles.row_title}>주문내역조회</div>
            <div className={styles.row_sub_title}>주문번호 : {orderId}</div>
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
            <div className={styles.row_price}>
              총 주문가격 : {orderSuccessResponse.amount.toLocaleString()} 원
              (배송비포함)
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
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
