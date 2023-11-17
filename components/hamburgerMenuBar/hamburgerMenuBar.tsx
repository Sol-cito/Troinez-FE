import styles from './hamburgerMenuBar.module.scss';
import Image from 'next/image';

export default function HamburgerMenuBar() {
  return (
    <>
      <div className={styles.menu_bar_wrapper}>
        <div className={styles.login_and_cart}>
          <Image
            src="/common/icon/mobile-login.svg"
            alt="TNZ"
            width={30}
            height={30}
            onClick={() => {}}
          />
          <Image
            src="/common/icon/mobile-cart.svg"
            alt="TNZ"
            width={30}
            height={30}
            onClick={() => {}}
          />
        </div>
        <div className={styles.home}>
          <span className={styles.text}>HOME</span>
        </div>
        <div className={styles.shop}>
          <span className={styles.text}>SHOP</span>
        </div>
        <div className={styles.about}>
          <span className={styles.text}>ABOUT</span>
        </div>
      </div>
    </>
  );
}
