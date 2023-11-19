/** 미구현  */
import Image from 'next/image';
import styles from './cartProduct.module.scss';

export default function CartProduct() {
  return (
    <div>
      <div className={styles.product_checkbox_div}>
        <input type="checkbox" checked />
      </div>
      <div className={styles.product_info_div}>
        <div>
          <div className={styles.product_image}>
            <Image
              key={1}
              src="https://d3en4rwu5hlcjb.cloudfront.net/product/perfume/D01_car.jpg"
              alt="D01"
              fill
            />
          </div>
          <div className={styles.product_info}>
            <p>D01 CAR (50ml)</p>
            <p>36,000원</p>
            <p>배송 : 기본배송</p>
            <p>-</p>
            <div>
              <button type="button" className={styles.change_count}>
                -
              </button>
              <input
                type="text"
                value={1}
                readOnly
                className={styles.input_count}
              />
              <button type="button" className={styles.change_count}>
                +
              </button>
              <button type="button" className={styles.apply_count}>
                변경
              </button>
            </div>
          </div>
          <div className={styles.product_total_price}>
            <p>72,000 원</p>
          </div>
        </div>
      </div>
      <hr className={styles.hr_lighter} />
    </div>
  );
}
