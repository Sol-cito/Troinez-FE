import OrderProduct from '@/components/order/orderProduct';
import InputBox from '@/components/cart/input/InputBox';
import styles from './page.module.scss';

export default function Order() {
  return (
    <div className={styles.body_container}>
      <div className={styles.row_container}>
        <hr />
        <OrderProduct />
        <OrderProduct />
      </div>
      <div className={styles.row_container}>
        <hr />
        <div>Total</div>
        <div>76,000</div>
        <hr />
      </div>
      <div className={styles.row_container}>
        <span className={styles.row_title}>주문자 정보</span>
        <InputBox boxType="name" />
        <InputBox boxType="phone" />
        <InputBox boxType="email" />
        <span className={styles.row_title}>비회원 주문조회 비밀번호</span>
        <InputBox boxType="certificationNumber" />
        <InputBox boxType="certificationNumberCheck" />
        <hr />
        <span className={styles.row_title}>배송 정보</span>
        <div>
          <input type="checkbox" />
          <span>직접입력</span>
          <input type="checkbox" />
          <span>주문자 정보와 동일</span>
        </div>
        <InputBox boxType="receiver" />
        <InputBox boxType="certificationNumber" />
        <InputBox boxType="email" />
        <InputBox boxType="zipCode" />
        <InputBox boxType="address" />
        <InputBox boxType="request" />
        <hr />
      </div>
      <div className={styles.row_container}>
        <div className={styles.space_between}>
          <span>상품 합계 금액</span>
          <span>76,000</span>
        </div>
        <hr />
        <div className={styles.space_between}>
          <span>할인 금액</span>
          <span>0</span>
        </div>
        <hr />
        <div className={styles.space_between}>
          <span>배송비</span>
          <span>3,000</span>
        </div>
        <hr />
        <div className={styles.space_between}>
          <span>최종 결재 금액</span>
          <span>76,0000</span>
        </div>
        <hr />
      </div>
      <div className={styles.row_container}>
        <div>
          <input type="checkbox" />
          <span>모든 약관 동의</span>
        </div>
        <div>
          <input type="checkbox" />
          <span>[필수] 쇼핑몰 이용약관 동의</span>
        </div>
        <div>
          <input type="checkbox" />
          <span>[필수] 개인정보 수집 및 이용 동의</span>
        </div>
        <div>
          <span>구매조건 확인 및 결제진행 동의</span>
        </div>
        <div>
          <span>주문 내용을 확인하였으며 약관에 동의합니다.</span>
        </div>
      </div>
      <div className={`${styles.row_container} ${styles.center}`}>
        <input
          className={styles.payment_btn}
          type="button"
          value="76,000원 결제하기"
        />
      </div>
    </div>
  );
}
