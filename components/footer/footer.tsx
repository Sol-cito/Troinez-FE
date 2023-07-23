import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__left}>
        <div>
          <p>TROIS NEZ LABORATORY</p>
        </div>
        <div>
          <p>경기도 고양시 일산서구 킨텍스로 240</p>
          <p>(대화동,킨텍스 꿈에그린)</p>
          <p>GIFC 2009호</p>
        </div>
      </div>
      <div className={styles.footer__mid}>
        <p>[트와네즈 주식회사] 대표자명 : 황재준</p>
        <p>사업자등록번호 : 135-87-02682</p>
        <p>통신판매업신고번호 : 2022-고양일산서-1048</p>
        <p>고객관리지원팀 : 070-8755-2000</p>
        <p>(상담시간 : 평일 오전 10시 ~ 17시 주말 및 공휴일 휴무)</p>
        <p>이메일 : troisnezjun@naver.com</p>
      </div>
      <div className={styles.footer__right}>
        <div>
          <img className={styles.footer__icon} src="/img/icons8-instagram.svg" />
          <img className={styles.footer__icon} src="/img/icon-naver.svg" />
        </div>
      </div>
    </footer>
  );
}
