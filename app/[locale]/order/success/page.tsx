export default function OrderSuccess() {
  return (
    <div>
      <div>
        <p>주문이 성공적으로 완료되었습니다.</p>
        <p>
          <span>주문번호 : </span>
          <span> 2023110700001</span>
        </p>
        <p>비회원 주문조회 시 주문번호가 필요하니 곡 메모해 두시기 바랍니다.</p>
        <input type="button" value="쇼핑 계속하기" />
      </div>
      <hr />
      <div />
      <div>
        <div>
          <span>배송지정보</span>
        </div>
        <div>
          <span>수령인</span> <span>홍길동</span>
        </div>
        <div>
          <span>연락처</span> <span>010-7267-7116</span>
        </div>
        <div>
          <span>배송지</span> <span>10391</span>
        </div>
        <div>
          <span>배송메모</span> <span>-</span>
        </div>
      </div>
    </div>
  );
}
