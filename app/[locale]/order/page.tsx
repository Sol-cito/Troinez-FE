'use client';

/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-before-interactive-script-outside-document */

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { nanoid } from 'nanoid';
import OrderProduct from '@/components/order/orderProduct';
import NameInputBox from '@/components/order/inputBox/nameInputBox';
import CertificationNumberInputBox from '@/components/order/inputBox/certificationNumberInputBox';
import PhoneNumberInputBox from '@/components/order/inputBox/phoneNumberInputBox';
import EmailInputBox from '@/components/order/inputBox/emailInputBox';
import DetailAddressInputBox from '@/components/order/inputBox/detailAddressInputBox';
import ZipCodeAndAddressInputBox from '@/components/order/inputBox/zipCodeAndAddressInputBox';
import RequestInputBox from '@/components/order/inputBox/requestInputBox';
import {
  OrderProductDtoInterface,
  OrderRequestInterface,
  ValidationResultForFocusInterface,
  ValidationResultInterface,
} from '@/interfaces/order/OrderRequestInterface';
import { OrderResponseInterface } from '@/interfaces/order/OrderResponseInterface';
import { PostParameter, postApiCall } from '@/service/restAPI.service';
import { useTranslations } from 'next-intl';
import { orderValidCheck, orderValidCheckForFocus } from '@/utils/orderUtil';
import { useAppDispatch, useAppSelector } from '../../../redux/config';
import styles from './page.module.scss';

export default function Order() {
  const dispatch = useAppDispatch();
  const { cartItemList } = useAppSelector((state) => state.cartItemSlice);

  const initialOrderRequest: OrderRequestInterface = {
    orderProductDtoList: [],
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
    orderId: nanoid(),
    salePrice: 0,
    deliveryType: '일반배송',
    deliveryPrice: 3000,
    totalPrice: 0,
  };

  const initialValidationResult: ValidationResultInterface = {
    userName: true,
    phoneNumber: true,
    email: true,
    certificationNumber: true,
    receiver: true,
    receiverPhoneNumber: true,
    receiverEmail: true,
    receiverZipcode: true,
    receiverAddress: true,
    receiverDetailAddress: true,
    allTermsAgreed: true,
  };

  const userNameFocus = useRef<HTMLInputElement>(null);
  const userFirstPhoneNumberFocus = useRef<HTMLInputElement>(null);
  const userSecondPhoneNumberFocus = useRef<HTMLInputElement>(null);
  const userThirdPhoneNumberFocus = useRef<HTMLInputElement>(null);
  const userFirstEmailFocus = useRef<HTMLInputElement>(null);
  const userSecondEmailFocus = useRef<HTMLInputElement>(null);
  const verificationCodeFocus = useRef<HTMLInputElement>(null);
  const receiverFocus = useRef<HTMLInputElement>(null);
  const receiverFirstPhoneNumberFocus = useRef<HTMLInputElement>(null);
  const receiverSecondPhoneNumberFocus = useRef<HTMLInputElement>(null);
  const receiverThirdPhoneNumberFocus = useRef<HTMLInputElement>(null);
  const receiverFirstEmailFocus = useRef<HTMLInputElement>(null);
  const receiverSecondEmailFocus = useRef<HTMLInputElement>(null);
  const receiverZipcodeFocus = useRef<HTMLInputElement>(null);
  const receiverDetailAddressFocus = useRef<HTMLInputElement>(null);
  const allTermsAgreedFocus = useRef<HTMLInputElement>(null);

  const [validationResult, setValidationResult] =
    useState<ValidationResultInterface>(initialValidationResult);

  const [orderType, setOrderType] = useState('');
  const [orderRequest, setOrderRequest] =
    useState<OrderRequestInterface>(initialOrderRequest);
  const [orderProductId, setOrderProductId] = useState(0);
  const [orderProductCount, setOrderProductCount] = useState(0);
  const [orderProductAmount, setOrderProductAmount] = useState(0);
  const searchParams = useSearchParams();

  const [allAgree, setAllAgree] = useState(false);
  const [termsofserviceAgree, setTermsofserviceAgree] = useState(false);
  const [privatePolicyAgree, setPrivatePolicyAgree] = useState(false);

  const [isReceiverSameAsOrderer, setIsReceiverSameAsOrderer] = useState(false);
  const productDetailText = useTranslations('Product.detail');
  const priceUnit = productDetailText('price');

  const [isFirstTry, setIsFirstTry] = useState(true);

  useEffect(() => {
    if (isReceiverSameAsOrderer) {
      setOrderRequest({
        ...orderRequest,
        receiver: orderRequest.userName,
        receiverPhoneNumber: orderRequest.phoneNumber,
        receiverEmail: orderRequest.email,
      });
    } else {
      setOrderRequest({
        ...orderRequest,
        receiver: '',
        receiverPhoneNumber: ['010', '', ''],
        receiverEmail: ['', ''],
      });
    }
  }, [isReceiverSameAsOrderer]);

  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);

    const orderTypeParam = searchParams.get('type');
    if (orderTypeParam === 'cart') {
      setOrderType('cart');

      const orderProductDtoList: OrderProductDtoInterface[] = cartItemList
        .filter((item) => {
          if (item.checked === true) {
            return item;
          }
        })
        .map((item) => {
          const orderProductDto: OrderProductDtoInterface = {
            productId: item.product.id,
            productCount: item.quantity,
          };
          return orderProductDto;
        });

      const productTotalPriceWithoutDiscount: number = cartItemList.reduce(
        (res, item) =>
          res + (item.checked ? item.product.productPrice * item.quantity : 0),
        0
      );

      const productTotalWithDiscount: number = cartItemList.reduce(
        (res, item) =>
          res +
          (item.checked ? item.product.discountedPrice * item.quantity : 0),
        0
      );

      const deliveryPriceAdjustment: number =
        productTotalWithDiscount >= 30000 ? 0 : 3000;

      setOrderProductAmount(productTotalWithDiscount);
      setOrderRequest({
        ...orderRequest,
        orderProductDtoList,
        productTotalPrice: productTotalPriceWithoutDiscount,
        deliveryPrice: deliveryPriceAdjustment,
        totalPrice: productTotalWithDiscount + deliveryPriceAdjustment,
        salePrice: productTotalPriceWithoutDiscount - productTotalWithDiscount,
      });
    } else {
      const productIdParam = searchParams.get('productId');
      const productCountParam = searchParams.get('productCount');
      const totalOriginalPrice = searchParams.get('totalOriginalPrice');
      const totalDiscountPrice = searchParams.get('totalDiscountPrice');
      if (
        productIdParam !== null &&
        productCountParam !== null &&
        totalOriginalPrice != null &&
        totalDiscountPrice != null
      ) {
        const newOrderProductDto: OrderProductDtoInterface = {
          productId: parseInt(productIdParam, 10),
          productCount: parseInt(productCountParam, 10),
        };

        const deliveryPriceAdjustment: number =
          parseInt(totalDiscountPrice, 10) >= 30000 ? 0 : 3000;

        setOrderType('single');
        setOrderProductId(parseInt(productIdParam, 10));
        setOrderProductCount(parseInt(productCountParam, 10));
        setOrderProductAmount(parseInt(totalDiscountPrice, 10));
        setOrderRequest({
          ...orderRequest,
          productTotalPrice: parseInt(totalOriginalPrice, 10),
          deliveryPrice: deliveryPriceAdjustment,
          totalPrice:
            parseInt(totalDiscountPrice, 10) + deliveryPriceAdjustment,
          salePrice:
            parseInt(totalOriginalPrice, 10) - parseInt(totalDiscountPrice, 10),
          orderProductDtoList: [newOrderProductDto],
        });
      } else {
        alert('[Error] 잘못된 경로입니다.');
        router.push('/');
      }
    }
  }, []);

  const windowFeatures = 'width=400,height=400';
  const onClickAllAgreeCheckBox = () => {
    setTermsofserviceAgree(true);
    setPrivatePolicyAgree(true);
    setAllAgree(true);
  };

  const onClickTermsOfServiceAgree = () => {
    window.open('/termsofservice', '_blank', windowFeatures);
  };

  const onClickPrivatePolicyAgree = () => {
    window.open('/privatepolicy', '_blank', windowFeatures);
  };

  useEffect(() => {
    setAllAgree(termsofserviceAgree && privatePolicyAgree);
  }, [termsofserviceAgree, privatePolicyAgree]);

  useEffect(() => {
    if (!isFirstTry) {
      const validationCheckResult: ValidationResultInterface = orderValidCheck(
        orderRequest,
        allAgree
      );
      setValidationResult(validationCheckResult);
    }
  }, [orderRequest, allAgree, isFirstTry]);

  const onClickPayment = async () => {
    setIsFirstTry(false);

    const validationCheckResult: ValidationResultInterface = orderValidCheck(
      orderRequest,
      allAgree
    );

    const invalidResultArray: string[] = [];
    Object.entries(validationCheckResult).forEach((entry) => {
      if (!entry[1]) {
        invalidResultArray.push(entry[0]);
      }
    });
    if (invalidResultArray.length > 0) {
      const focusValidationResult: ValidationResultForFocusInterface =
        orderValidCheckForFocus(orderRequest, allAgree);

      if (focusValidationResult.userNameFocus) {
        userNameFocus.current?.focus();
      } else if (focusValidationResult.userFirstPhoneNumberFocus) {
        userFirstPhoneNumberFocus.current?.focus();
      } else if (focusValidationResult.userSecondPhoneNumberFocus) {
        userSecondPhoneNumberFocus.current?.focus();
      } else if (focusValidationResult.userThirdPhoneNumberFocus) {
        userThirdPhoneNumberFocus.current?.focus();
      } else if (focusValidationResult.userFirstEmailFocus) {
        userFirstEmailFocus.current?.focus();
      } else if (focusValidationResult.userSecondEmailFocus) {
        userSecondEmailFocus.current?.focus();
      } else if (focusValidationResult.verificationCodeFocus) {
        verificationCodeFocus.current?.focus();
      } else if (focusValidationResult.receiverFocus) {
        receiverFocus.current?.focus();
      } else if (focusValidationResult.receiverFirstPhoneNumberFocus) {
        receiverFirstPhoneNumberFocus.current?.focus();
      } else if (focusValidationResult.receiverSecondPhoneNumberFocus) {
        receiverSecondPhoneNumberFocus.current?.focus();
      } else if (focusValidationResult.receiverThirdPhoneNumberFocus) {
        receiverThirdPhoneNumberFocus.current?.focus();
      } else if (focusValidationResult.receiverFirstEmailFocus) {
        receiverFirstEmailFocus.current?.focus();
      } else if (focusValidationResult.receiverSecondEmailFocus) {
        receiverSecondEmailFocus.current?.focus();
      } else if (focusValidationResult.receiverZipcodeFocus) {
        receiverZipcodeFocus.current?.focus();
      } else if (focusValidationResult.receiverDetailAddressFocus) {
        receiverDetailAddressFocus.current?.focus();
      } else if (focusValidationResult.allTermsAgreedFocus) {
        alert('모든 약관에 동의해주세요.');
        return;
      }
      return;
    }
    setValidationResult(validationCheckResult);

    const postParameter: PostParameter = {
      url: '/order',
      data: orderRequest,
    };
    const response: OrderResponseInterface = await postApiCall(postParameter);

    const orderTypeParam = searchParams.get('type');
    const { customerEmail } = response;
    const { customerName } = response;
    const { orderId } = response;
    const { orderName } = response;
    const { totalPrice } = orderRequest;
    const params = `?customerName=${customerName}&customerEmail=${customerEmail}&orderId=${orderId}&orderName=${orderName}&totalPrice=${totalPrice}&orderType=${orderTypeParam}`;
    window.location.href = '/order/payment'.concat(params);
    // success url 오면 success 창으로 넘겨줘야함.
  };

  return (
    <div className={styles.body_container}>
      {orderRequest.orderProductDtoList.length > 0 && (
        <div className={styles.row_container}>
          <hr />
          {orderType === 'single' ? (
            <OrderProduct
              orderProductId={orderProductId}
              orderProductCount={orderProductCount}
              visibleDelivery
            />
          ) : (
            orderRequest.orderProductDtoList.map((item) => (
              <OrderProduct
                key={item.productId}
                orderProductId={item.productId}
                orderProductCount={item.productCount}
                visibleDelivery
              />
            ))
          )}
        </div>
      )}
      <div className={styles.row_container}>
        <hr />
        <div className={styles.total_amount}>
          Total : <span>{orderProductAmount.toLocaleString() + priceUnit}</span>
        </div>
        <hr />
      </div>
      <div className={styles.row_container}>
        <span className={styles.row_title}>주문자 정보</span>
        <NameInputBox
          title="이름"
          orderRequestState={orderRequest}
          setOrderRequestState={setOrderRequest}
          validationResult={validationResult}
          focusRef={userNameFocus}
        />
        {!validationResult.userName && (
          <span className={styles.error_message}>이름을 입력해 주세요.</span>
        )}
        <PhoneNumberInputBox
          title="연락처"
          orderRequestState={orderRequest}
          isFirstTry={isFirstTry}
          setOrderRequestState={setOrderRequest}
          firstPhoneNumberFocus={userFirstPhoneNumberFocus}
          secondPhoneNumberFocus={userSecondPhoneNumberFocus}
          thirdPhoneNumberFocus={userThirdPhoneNumberFocus}
        />
        {!validationResult.phoneNumber && (
          <span className={styles.error_message}>
            연락처 11자리를 입력해 주세요.
          </span>
        )}
        <EmailInputBox
          title="이메일"
          orderRequestState={orderRequest}
          isFirstTry={isFirstTry}
          setOrderRequestState={setOrderRequest}
          firstEmailFocus={userFirstEmailFocus}
          secondEmailFocus={userSecondEmailFocus}
        />
        {validationResult.email === false && (
          <span className={styles.error_message}>이메일을 입력해주세요</span>
        )}
        <br />
        <span className={styles.row_title}>비회원 주문조회 인증번호</span>
        <CertificationNumberInputBox
          title="인증번호 입력"
          orderRequestState={orderRequest}
          isFirstTry={isFirstTry}
          setOrderRequestState={setOrderRequest}
          verificationCodeFocus={verificationCodeFocus}
        />
        {validationResult.certificationNumber === false && (
          <span className={styles.error_message}>
            인증번호 6자리를 입력해주세요.
          </span>
        )}
        <hr />
        <span className={styles.row_title}>배송 정보</span>
        <div className={styles.row_orderer_info}>
          <label className={styles.orderer_label} htmlFor="orderer_checkbox">
            <input
              className={styles.orderer_checkbox}
              type="checkbox"
              onChange={() => {
                setIsReceiverSameAsOrderer(!isReceiverSameAsOrderer);
              }}
              checked={!isReceiverSameAsOrderer}
            />
            <span>직접입력</span>
          </label>
          <label
            className={styles.orderer_label}
            htmlFor="first-orderer_checkbox"
          >
            <input
              className={styles.orderer_checkbox}
              type="checkbox"
              onChange={() => {
                setIsReceiverSameAsOrderer(!isReceiverSameAsOrderer);
              }}
              checked={isReceiverSameAsOrderer}
            />
            <span>주문자정보와 동일</span>
          </label>
        </div>
        <NameInputBox
          title="수취인"
          orderRequestState={orderRequest}
          setOrderRequestState={setOrderRequest}
          validationResult={validationResult}
          focusRef={receiverFocus}
        />
        {!validationResult.receiver && (
          <span className={styles.error_message}>
            수취인 이름을 입력해 주세요.
          </span>
        )}
        <PhoneNumberInputBox
          title="연락처(수취인)"
          orderRequestState={orderRequest}
          isFirstTry={isFirstTry}
          setOrderRequestState={setOrderRequest}
          firstPhoneNumberFocus={receiverFirstPhoneNumberFocus}
          secondPhoneNumberFocus={receiverSecondPhoneNumberFocus}
          thirdPhoneNumberFocus={receiverThirdPhoneNumberFocus}
        />

        {!validationResult.receiverPhoneNumber && (
          <span className={styles.error_message}>
            연락처 11자리를 입력해 주세요.
          </span>
        )}
        <EmailInputBox
          title="이메일(수취인)"
          orderRequestState={orderRequest}
          isFirstTry={isFirstTry}
          setOrderRequestState={setOrderRequest}
          firstEmailFocus={receiverFirstEmailFocus}
          secondEmailFocus={receiverSecondEmailFocus}
        />
        {validationResult.receiverEmail === false && (
          <span className={styles.error_message}>
            수취인 이메일을 입력해주세요
          </span>
        )}
        <ZipCodeAndAddressInputBox
          title="우편번호"
          orderRequestState={orderRequest}
          setOrderRequestState={setOrderRequest}
          validationResult={validationResult}
          receiverZipcodeFocus={receiverZipcodeFocus}
        />
        {!validationResult.receiverZipcode && (
          <span className={styles.error_message_bottom}>
            우편번호 및 주소를 입력해주세요.
          </span>
        )}
        <DetailAddressInputBox
          title="상세 주소"
          orderRequestState={orderRequest}
          setOrderRequestState={setOrderRequest}
          validationResult={validationResult}
          receiverDetailAddressFocus={receiverDetailAddressFocus}
        />
        {!validationResult.receiverDetailAddress && (
          <span className={styles.error_message_bottom}>
            상세주소를 입력해주세요.
          </span>
        )}
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
          <span>
            {orderRequest.productTotalPrice.toLocaleString() + priceUnit}
          </span>
        </div>
        <hr />
        <div className={styles.space_between}>
          <span>할인 금액</span>
          <span>{orderRequest.salePrice.toLocaleString() + priceUnit}</span>
        </div>
        <hr />
        <div className={styles.space_between}>
          <span>배송비</span>
          <span>{orderRequest.deliveryPrice.toLocaleString() + priceUnit}</span>
        </div>
        <hr />
        <div className={styles.space_between}>
          <span>최종 결제 금액</span>
          <span>{orderRequest.totalPrice.toLocaleString() + priceUnit}</span>
        </div>
        <hr />
      </div>
      <div className={`${styles.row_container} ${styles.mgn_top_1vw}`}>
        <div className={styles.agree_div}>
          <div className={styles.lightgray_div}>
            <span className={styles.mgn_left}>
              구매조건 확인 및 결제진행 동의
            </span>
          </div>
        </div>
        <div className={styles.agree_div}>
          <input
            type="checkbox"
            ref={allTermsAgreedFocus}
            className={styles.agree_div_checkbox}
            checked={allAgree}
            onChange={onClickAllAgreeCheckBox}
          />
          <span className={styles.agree_all}>모든 약관 동의</span>
          {!validationResult.allTermsAgreed && (
            <span className={styles.error_message}>
              모든 약관에 동의해주세요.
            </span>
          )}
        </div>
        <hr />
        <div className={styles.agree_div}>
          <input
            type="checkbox"
            className={styles.agree_div_checkbox}
            checked={termsofserviceAgree}
            onChange={() => setTermsofserviceAgree(!termsofserviceAgree)}
          />
          <input
            type="button"
            className={styles.agree_div_button}
            value="[필수] 쇼핑몰 이용약관 동의(약관을 보려면 클릭하세요)"
            onClick={onClickTermsOfServiceAgree}
          />
        </div>
        <hr />
        <div className={styles.agree_div}>
          <input
            type="checkbox"
            className={styles.agree_div_checkbox}
            checked={privatePolicyAgree}
            onChange={() => setPrivatePolicyAgree(!privatePolicyAgree)}
          />
          <input
            type="button"
            className={styles.agree_div_button}
            value="[필수] 개인정보 수집 및 이용 동의(약관을 보려면 클릭하세요)"
            onClick={onClickPrivatePolicyAgree}
          />
        </div>
        <hr />
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
          value={`${
            orderRequest.totalPrice.toLocaleString() + priceUnit
          }  결제하기`}
          onClick={onClickPayment}
        />
      </div>
    </div>
  );
}
