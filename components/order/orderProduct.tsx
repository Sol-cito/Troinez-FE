import Image from 'next/image';
import styles from './orderProduct.module.scss';

export default function OrderProduct() {
  return (
    <div>
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
          </div>
          <div className={styles.product_total_price}>
            <div>2</div>
            <div>72,000</div>
          </div>
        </div>
      </div>
      <hr className={styles.hr_lighter} />
    </div>
  );
}
