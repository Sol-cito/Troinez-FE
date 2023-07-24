import styles from "./footer.module.scss";
import Image from "next/image";

export default function Footer() {
  const companyName = "TROIS NEZ LABORATORY"
  const companyAddressInfoList = [
    "경기도 고양시 일산서구 킨텍스로 240",
    "(대화동,킨텍스 꿈에그린)",
    "GIFC 2009호"]
  const companyBusinessInfoList = [
    "[트와네즈 주식회사] 대표자명 : 황재준",
    "사업자등록번호 : 135-87-02682",
    "통신판매업신고번호 : 2022-고양일산서-1048",
    "고객관리지원팀 : 070-8755-2000",
    "(상담시간 : 평일 오전 10시 ~ 17시 주말 및 공휴일 휴무)",
    "이메일 : troisnezjun@naver.com"
  ]
  const iconInfoList = [
    "/img/icons8-instagram.svg",
    "/img/icon-naver.svg"
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__left}>
        <div>
          <p>{companyName}</p>
        </div>
        <div>
          {companyAddressInfoList.map((addressInfo) => (
            <p key={addressInfo}>{addressInfo}</p>
          ))}
        </div>
      </div>
      <div className={styles.footer__mid}>
        {companyBusinessInfoList.map((businessInfo) => (
          <p key={businessInfo}>{businessInfo}</p>
        ))}
      </div>
      <div className={styles.footer__right}>
        <div>
          {iconInfoList.map((iconInfo) => (
            <Image key={iconInfo} className={styles.footer__icon} src={iconInfo} alt="social icon" width={32} height={32}/>
          ))}
        </div>
      </div>
    </footer>
  );
}
