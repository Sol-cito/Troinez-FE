'use client';

/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import OrderProduct from '@/components/order/orderProduct';
import NameInputBox from '@/components/order/inputBox/nameInputBox';
import CertificationNumberInputBox from '@/components/order/inputBox/certificationNumberInputBox';
import PhoneNumberInputBox from '@/components/order/inputBox/phoneNumberInputBox';
import EmailInputBox from '@/components/order/inputBox/emailInputBox';
import DetailAddressInputBox from '@/components/order/inputBox/detailAddressInputBox';
import ZipCodeAndAddressInputBox from '@/components/order/inputBox/zipCodeAndAddressInputBox';
import RequestInputBox from '@/components/order/inputBox/requestInputBox';
import orderVaildCheck from '@/utils/orderUtil';
import {
  OrderProductDtoInterface,
  OrderRequestInterface,
} from '@/interfaces/order/OrderRequestInterface';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.scss';

export default function Order() {
  const initialOrderRequest: OrderRequestInterface = {
    orderProductDtoList: [{ productId: 0, productCount: 0 }],
    userName: '',
    phoneNumber: ['010', '', ''],
    email: ['', ''],
    certificationNumber: '',
    receiver: '',
    receiverPhoneNumber: ['010', '', ''],
    receiverEmail: ['', ''],
    receiverZipcode: '',
    receiverAddress: '',
    receiverDetailAddress: '',
    receiverRequest: '',
    productTotalPrice: 0,
    salePrice: 0,
    deliveryType: '일반배송',
    deliveryPrice: 3000,
    totalPrice: 0,
  };

  const [isValidCertificationNumber, setIsValidCertificationNumber] =
    useState(false);

  const [orderType, setOrderType] = useState('');
  const [orderRequest, setOrderRequest] =
    useState<OrderRequestInterface>(initialOrderRequest);
  const [orderProductId, setOrderProductId] = useState(0);
  const [orderProductCount, setOrderProductCount] = useState(0);
  const [orderProductAmount, setOrderProductAmount] = useState(0);
  const searchParams = useSearchParams();

  const [isValidOrder, setIsValidOrder] = useState(false);
  const [allAgree, setAllAgree] = useState(false);
  const [termsofserviceAgree, setTermsofserviceAgree] = useState(false);
  const [privatePolicyAgree, setPrivatePolicyAgree] = useState(false);

  const windowFeatures = 'width=400,height=400';
  const onClickAllAgreeCheckBox = () => {
    setTermsofserviceAgree(true);
    setPrivatePolicyAgree(true);
    setAllAgree(true);
  };

  const onClickTermsOfServiceAgree = () => {
    setTermsofserviceAgree(true);
    window.open('/termsofservice', '_blank', windowFeatures);
  };

  const onClickPrivatePolicyAgree = () => {
    setPrivatePolicyAgree(true);
    window.open('/privatepolicy', '_blank', windowFeatures);
  };

  const onClickPayment = () => {
    if (!isValidOrder) {
      alert('입력하지 않은 란이 있습니다.');
    } else if (orderType === 'order') {
      // backEndApi 호출
      // orderId: nanoid(),
      // orderName: '토스 티셔츠 외 2건',
      // customerName: '김토스',
      // customerEmail: 'customer123@gmail.com',
      // successUrl: `${window.location.origin}/order/payment/success`,
      // failUrl: `${window.location.origin}/order/payment/fail`,
      // 결재창 띄우기 with params
      const params = `?type=order&productid=${orderProductId}&customername=${orderRequest.userName}&customeremail=${orderRequest.email[0]}@${orderRequest.email[1]}`;
      window.location.href = '/order/payment'.concat(params);

      // success url 오면 success 창으로 넘겨줘야함.
    } else {
      console.log(orderType);
    }
  };

  useEffect(() => {
    setAllAgree(termsofserviceAgree && privatePolicyAgree);
  }, [termsofserviceAgree, privatePolicyAgree]);

  const ORDER = 'order';
  const CART = 'cart';

  useEffect(() => {
    // 만약 queryParams에 productId 와 productcount 값이 정상적으로 존재할 경우
    // -> 단일 주문

    const orderTypeParam = searchParams.get('type');
    if (orderTypeParam === CART) {
      setOrderType(CART);
    }

    if (orderTypeParam === ORDER) {
      const productIdParam = searchParams.get('productId');
      const productCountParam = searchParams.get('productCount');
      const amountParam = searchParams.get('amount');
      if (
        productIdParam !== null &&
        productCountParam !== null &&
        amountParam != null
      ) {
        const newOrderProductDto: OrderProductDtoInterface = {
          productId: parseInt(productIdParam, 10),
          productCount: parseInt(productCountParam, 10),
        };

        setOrderType(ORDER);
        setOrderProductId(parseInt(productIdParam, 10));
        setOrderProductCount(parseInt(productCountParam, 10));
        setOrderProductAmount(parseInt(amountParam, 10));
        setOrderRequest({
          ...orderRequest,
          productTotalPrice: parseInt(amountParam, 10),
          totalPrice: parseInt(amountParam, 10) + orderRequest.deliveryPrice,
          orderProductDtoList: [newOrderProductDto],
        });
      } else {
        // error
      }
    }
  }, []);

  useEffect(() => {
    orderVaildCheck(
      orderRequest,
      isValidCertificationNumber,
      allAgree,
      setIsValidOrder
    );
  }, [orderRequest, allAgree]);

  // 그 외
  // -> 카트 주문

  // 단일 주문의 경우 OrderProduct가 1개만 존재한다.
  return (
    <div className={styles.body_container}>
      <div className={styles.row_container}>
        <hr />
        {orderType === ORDER && (
          <OrderProduct
            orderProductId={orderProductId}
            orderProductCount={orderProductCount}
          />
        )}
      </div>
      <div className={styles.row_container}>
        <hr />
        <div className={styles.total_amount}>Total</div>
        {orderType === 'order' && <div>{orderProductAmount} 원</div>}
        <hr />
      </div>
      <div className={styles.row_container}>
        <span className={styles.row_title}>주문자 정보</span>
        <NameInputBox
          title="이름"
          orderRequestState={orderRequest}
          setOrderRequestState={setOrderRequest}
        />
        <PhoneNumberInputBox
          title="연락처"
          orderRequestState={orderRequest}
          setOrderRequestState={setOrderRequest}
        />
        <EmailInputBox
          title="이메일"
          orderRequestState={orderRequest}
          setOrderRequestState={setOrderRequest}
        />
        {/* <InputBox boxType="email" /> */}
        <span className={styles.row_title}>비회원 주문조회 인증번호</span>
        <CertificationNumberInputBox
          title="인증번호 입력"
          orderRequestState={orderRequest}
          setOrderRequestState={setOrderRequest}
          isValidCertificationNumber={isValidCertificationNumber}
          setIsValidCertificationNumber={setIsValidCertificationNumber}
        />
        <hr />
        <span className={styles.row_title}>배송 정보</span>
        {/* <div>
          <input type="checkbox" />
          <span>직접입력</span>
          <input type="checkbox" />
          <span>주문자 정보와 동일</span>
        </div> */}
        <NameInputBox
          title="수취인"
          orderRequestState={orderRequest}
          setOrderRequestState={setOrderRequest}
        />
        <PhoneNumberInputBox
          title="연락처(수취인)"
          orderRequestState={orderRequest}
          setOrderRequestState={setOrderRequest}
        />
        <EmailInputBox
          title="이메일(수취인)"
          orderRequestState={orderRequest}
          setOrderRequestState={setOrderRequest}
        />
        <ZipCodeAndAddressInputBox
          title="우편번호"
          orderRequestState={orderRequest}
          setOrderRequestState={setOrderRequest}
        />
        <DetailAddressInputBox
          title="상세 주소"
          orderRequestState={orderRequest}
          setOrderRequestState={setOrderRequest}
        />
        <RequestInputBox
          title="배송 요청사항"
          orderRequestState={orderRequest}
          setOrderRequestState={setOrderRequest}
        />
        <hr />
      </div>
      <div className={styles.row_container}>
        <div className={styles.space_between}>
          <span>상품 합계 금액</span>
          <span>{orderRequest.productTotalPrice}</span>
        </div>
        <hr />
        <div className={styles.space_between}>
          <span>할인 금액</span>
          <span>{orderRequest.salePrice}</span>
        </div>
        <hr />
        <div className={styles.space_between}>
          <span>배송비</span>
          <span>{orderRequest.deliveryPrice}</span>
        </div>
        <hr />
        <div className={styles.space_between}>
          <span>최종 결재 금액</span>
          <span>{orderRequest.totalPrice}</span>
        </div>
        <hr />
      </div>
      <div className={styles.row_container}>
        <div className={styles.agree_div}>
          <input
            type="checkbox"
            className={styles.agree_div_checkbox}
            checked={allAgree}
          />
          <input
            type="button"
            className={styles.agree_div_button}
            value="모든 약관 동의"
            onClick={onClickAllAgreeCheckBox}
          />
        </div>
        <hr />
        <div className={styles.agree_div}>
          <input
            type="checkbox"
            className={styles.agree_div_checkbox}
            checked={termsofserviceAgree}
          />
          <input
            type="button"
            className={styles.agree_div_button}
            value="[필수] 쇼핑몰 이용약관 동의"
            onClick={onClickTermsOfServiceAgree}
          />
        </div>
        <hr />
        <div className={styles.agree_div}>
          <input
            type="checkbox"
            className={styles.agree_div_checkbox}
            checked={privatePolicyAgree}
          />
          <input
            type="button"
            className={styles.agree_div_button}
            value="[필수] 개인정보 수집 및 이용 동의"
            onClick={onClickPrivatePolicyAgree}
          />
        </div>
        <hr />
        <div className={styles.agree_div}>
          <div className={styles.lightgray_div}>
            <span className={styles.mgn_left}>
              구매조건 확인 및 결제진행 동의
            </span>
          </div>
        </div>
        <div className={styles.agree_div}>
          <div className={`${styles.lightgray_div}  ${styles.center}`}>
            <span>주문 내용을 확인하였으며 약관에 동의합니다.</span>
          </div>
        </div>
      </div>
      <div className={`${styles.row_container} ${styles.center}`}>
        <input
          className={styles.payment_btn}
          type="button"
          value={`${orderRequest.totalPrice} 원 결제하기`}
          onClick={onClickPayment}
        />
      </div>
    </div>
  );
}
