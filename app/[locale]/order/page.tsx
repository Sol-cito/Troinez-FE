import OrderProduct from '@/components/order/orderProduct';
import styles from './page.module.scss';

export default function Order() {
  return (
    <div className={styles.order}>
      <div>
        <hr />
        <div className={styles.product_info_container}>
          <div className={styles.product_list_box}>
            <OrderProduct />
            <OrderProduct />
          </div>
          <div className={styles.product_total_price}>
            <div>Total</div>
            <div>76,000</div>
          </div>
        </div>
        <hr />
        <div className={styles.order_info_container}>
          <div>주문자 정보</div>
          <div>
            <p>이름</p>
            <input type="text" />
          </div>
          <div>
            <p>연락처</p>
            <div>
              <input type="text" />
              <input type="text" />
              <input type="text" />
            </div>
          </div>
          <div>이메일</div>
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <div>비회원 주문조회 비밀번호</div>
          <div>
            <p>비밀번호</p>
            <div>
              <input type="text" />
            </div>
            <p>비밀번호 확인</p>
            <div>
              <input type="text" />
            </div>
          </div>
          <div>배송 정보</div>
          <div>
            <input type="checkbox" />
            <span>직접입력</span>
            <input type="checkbox" />
            <span>주문자 정보와 동일</span>
          </div>
          <p>수취인</p>
          <div>
            <input type="text" />
          </div>
          <p>연락처</p>
          <div>
            <input type="text" />
            <input type="text" />
            <input type="text" />
          </div>
          <p>이메일</p>
          <div>
            <input type="text" />
            <input type="text" />
            <input type="text" />
          </div>
          <p>우편번호</p>
          <div>
            <input type="text" />
            <input type="button" />
          </div>
          <p>주소</p>
          <div>
            <input type="text" />
          </div>
          <div>
            <input type="text" />
          </div>
          <p>배송 요청사항</p>
          <div>
            <input type="text" />
          </div>
          <div>결재수단</div>
          <p>결재수단 선택</p>
          <div>
            <p>상품합계금액</p>
          </div>
          <div>
            <p>할인금액</p>
          </div>
          <div>
            <p>배송비</p>
          </div>
          <div>
            <p>최종결제금액</p>
          </div>
          <div>
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
            <div>
              <input type="button" value="76,000원 결제하기" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
