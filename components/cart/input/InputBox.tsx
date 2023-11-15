import styles from './inputBox.module.scss';

export default function InputBox({ boxType }: { boxType: string }) {
  let titleHTML = null;
  let inputBoxHTML = null;

  let title = '';

  if (boxType === 'name') {
    title = '이름';
    inputBoxHTML = (
      <div>
        <input className={styles.name} type="text" />
      </div>
    );
  } else if (boxType === 'certificationNumber') {
    title = '인증번호 (6자리 숫자)';
    inputBoxHTML = (
      <div>
        <input className={styles.password} type="text" />
      </div>
    );
  } else if (boxType === 'certificationNumberCheck') {
    title = '인증번호 확인';
    inputBoxHTML = (
      <div>
        <input className={styles.password_check} type="password" />
      </div>
    );
  } else if (boxType === 'email') {
    title = '이메일';
    inputBoxHTML = (
      <div>
        <input className={styles.email} type="text" />
        <span>@</span>
        <input className={styles.email} type="text" />
        <select className={styles.email_list}>
          <option value="직접 입력">직접 입력</option>
          <option value="naver.com">naver.com</option>
        </select>
      </div>
    );
  } else if (boxType === 'receiver') {
    title = '수취인';
    inputBoxHTML = (
      <div>
        <input className={styles.receiver} type="text" />
      </div>
    );
  } else if (boxType === 'zipCode') {
    title = '우편번호';
    inputBoxHTML = (
      <div>
        <input className={styles.zipcode} type="text" readOnly />
        <input className={styles.zipcode_btn} type="button" value="검색" />
      </div>
    );
  } else if (boxType === 'address') {
    title = '주소';
    inputBoxHTML = (
      <div>
        <input className={styles.address} type="text" readOnly />
      </div>
    );
  } else if (boxType === 'request') {
    title = '배송 요청사항';
    inputBoxHTML = (
      <div>
        <input className={styles.request} type="text" readOnly />
      </div>
    );
  } else if (boxType === 'phone') {
    title = '연락처';
    inputBoxHTML = (
      <div>
        <input className={styles.phone_number} type="text" />
        <span> - </span>
        <input className={styles.phone_number} type="text" />
        <span> - </span>
        <input className={styles.phone_number} type="text" />
      </div>
    );
  } else {
    title = '-';
  }

  titleHTML = <div>{title}</div>;
  return (
    <div className={styles.input_box}>
      {titleHTML}
      {inputBoxHTML}
    </div>
  );
}
