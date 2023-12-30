/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Script from 'next/script';
import {
  OrderRequestInterface,
  SetOrderRequestType,
  ValidationResultInterface,
} from '@/interfaces/order/OrderRequestInterface';

import { RefObject, useEffect } from 'react';
import getDeliveryPriceByZipCode from '@/utils/zipCodeUtil';
import styles from './inputBox.module.scss';

declare global {
  interface Window {
    daum: any;
  }
}

interface IAddr {
  address: string;
  zonecode: string;
}

export default function ZipCodeAndAddressInputBox({
  title,
  orderRequestState,
  setOrderRequestState,
  validationResult,
  receiverZipcodeFocus,
}: {
  title: string;
  orderRequestState: OrderRequestInterface;
  setOrderRequestState: SetOrderRequestType;
  validationResult: ValidationResultInterface;
  receiverZipcodeFocus: RefObject<HTMLInputElement>;
}) {
  useEffect(() => {
    let [deliveryPrice, deliveryType]: [number, string] =
      getDeliveryPriceByZipCode(orderRequestState.receiverZipcode);
    if (orderRequestState.productTotalPrice >= 30000) {
      deliveryPrice -= 3000;
    }
    setOrderRequestState({
      ...orderRequestState,
      deliveryPrice: deliveryPrice,
      deliveryType: deliveryType,
    });
  }, [orderRequestState.receiverZipcode, orderRequestState.receiverAddress]);

  const onClickAddr = () => {
    new window.daum.Postcode({
      oncomplete(data: IAddr) {
        // (document.getElementById('addr') as HTMLInputElement).value =
        //   data.address;
        // (document.getElementById('zipNo') as HTMLInputElement).value =
        //   data.zonecode;
        setOrderRequestState({
          ...orderRequestState,
          receiverAddress: data.address,
          receiverZipcode: data.zonecode,
        });
        document.getElementById('addrDetail')?.focus();
      },
    }).open();
  };
  return (
    <div className={styles.inputbox_div}>
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />
      <div className={styles.inputbox_tit}>{title}</div>
      <span
        className={styles.fake_focus_span}
        tabIndex={1}
        ref={receiverZipcodeFocus}
      />
      <input
        className={` ${
          !validationResult.receiverZipcode && styles.invalid_input
        }`}
        type="text"
        readOnly
        value={orderRequestState.receiverZipcode}
        id="zipNo"
      />
      <input type="button" value="주소 검색" onClick={onClickAddr} />
      <input
        className={`${styles.address_input} ${
          !validationResult.receiverAddress && styles.invalid_input
        }`}
        type="text"
        readOnly
        id="addr"
        value={orderRequestState.receiverAddress}
      />
    </div>
  );
}
