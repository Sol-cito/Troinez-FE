'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import ProductData from '@/interfaces/product/productData';
import styles from './page.module.scss';

export default function ProductDetail() {
  const params = useParams();
  const { id } = params;

  const productImg: string = '/common/product/img/D01.png';
  const productSlideImage: string[] = [
    '/common/product/img/D01.png',
    '/common/product/img/D02.png',
    '/common/product/img/D03.png',
    '/common/product/img/D04.png',
  ];

  // data fetch using axios
  const product: ProductData = {
    id: 1,
    name: 'TROISNEZ 트와네즈 디퓨저 D01 200ml',
    price: 45000,
    discountPrice: 36000,
    discountRate: 20,
    image: '/common/product/img/D01.png',
  };

  return (
    <div className={styles.detail_box}>
      <div className={styles.left_cont}>
        <div className={styles.img_box}>
          <Image src={productImg} alt="D01" fill />
        </div>
        <div className={styles.img_slide_box}>
          <div className={styles.img_slide_inner_box}>
            <Image
              src={productSlideImage[0]}
              alt="D01"
              width={50}
              height={50}
            />
            <Image
              src={productSlideImage[1]}
              alt="D02"
              width={50}
              height={50}
            />
            <Image
              src={productSlideImage[2]}
              alt="D03"
              width={50}
              height={50}
            />
            <Image
              src={productSlideImage[3]}
              alt="D04"
              width={50}
              height={50}
            />
          </div>
        </div>
      </div>
      <div className={styles.right_cont}>
        <div className={styles.desc_box}>
          <p className={styles.desc_title}>SW19 6am EAU DE PARFUM (50ml)</p>
          <p className={styles.desc_price}>36,000원</p>
          <hr />
          <p className={styles.desc_product_eng}>
            The scent of enchanted grass created by spellbound forest spirits
            <br />
            Just before the sunrise, the mist of Wimbledon forest drifts along
            and greets you as you take a stroll. Fell the 6AM scent of the
            Wimbledon forest's gilstening morning dew and moist soil.
          </p>
          <p className={styles.desc_product_kor}>
            숲의 정령이 만들어낸 중독적인 묘약. 신비로운 풀의 향취
            <br />
            세상의 아침이 시작되기 전, 웜블던의 숲을 산책하는 당신에게 푸른
            안개가 바람에 실려와 인사를 합니다. 이슬 머금은 잔디와 촉촉한
            흙내음을 품은 윔블던의 새벽 6시를 느껴보세요.
          </p>
          <hr />
          <p className={styles.desc_sub_title}>NOTES</p>
          <p className={styles.desc_sub_elt}>
            - Top: Bergamot, Grapefruit, Anise Seeds
          </p>
          <p className={styles.desc_sub_elt}>
            - Heart: Cardamom, Clary Sage, Basil
          </p>
          <p className={styles.desc_sub_elt}>
            - Base : Wormwood, Cedarwood, Musk
          </p>

          <p className={styles.desc_sub_title}>PERFUMER</p>
          <p className={styles.desc_sub_elt}>Jinman park</p>

          <p className={styles.desc_sub_title}>INGREDIENTS</p>
          <p className={styles.desc_sub_elt}>
            Alcohol, Fragrance, Water, BHT, Denatonium benzoate, Limoene,
            Hydroxycitronellal, Citronellol, Butylphenyl Methylpropional,
            Genaniol
          </p>

          <br />

          <p className={styles.desc_caution}>
            ※ 상품 구매 시, 시향 가능한 샘플 키트가 함께 제공됩니다. ( 품절 시
            제공불가 )
          </p>
          <p className={styles.desc_caution}>
            ※ 선물용 기프트백은 SHOP-ACC 메뉴에서 구매 가능합니다.
          </p>
          <p className={styles.desc_caution}>
            ※ 30,000원 이상 구매 시, 무료 배송
          </p>
          <p className={styles.desc_caution}>
            ※ 사용기한 : 제조일로부터 36개월
          </p>

          <hr />
          <p className={styles.delivery_title}>
            [오늘 도착 서비스]
            <br />
            오후 1시 이전 결제 완료 건 오늘 도착(주말, 공휴일 제외)
          </p>
          <p className={styles.delivery_elt}>
            - 30,000원 이상 구매 시 무료배송
          </p>
          <p className={styles.delivery_elt}>
            - 배송가능 지역을 곡 확인하고 선택해 주세요
          </p>
          <p className={styles.delivery_elt}>- 서울 전 지역/경기 일부 지역</p>
        </div>
        <div className={styles.payment_box}>
          <div className={styles.payment_select_box}>
            <div className={styles.payment_select}>
              <div className={styles.payment_select_title}>
                SW19 6am EAU DE PARFUM (50ml)
              </div>
              <div>
                <button type="button">-</button>
                <input type="text" value="0" readOnly />
                <button type="button">+</button>
              </div>
              <div className={styles.payment_select_price}>36,000원</div>
            </div>
          </div>
          <div className={styles.payment_total_price_box}>
            <span className={styles.payment_total_count}>
              총 상품금액 (1개)
            </span>
            <span className={styles.payment_total_price}>36,000원</span>
          </div>
          <div className={styles.payment_decision_box}>
            <button type="button" className={styles.payment_decision_buy}>
              구매하기
            </button>
            <button type="button" className={styles.payment_decision_basket}>
              장바구니
            </button>
          </div>
          <hr />
          <div className={styles.payment_naverpay}>
            <button type="button">NPay 구매</button>
            <button type="button">찜</button>
          </div>
        </div>
      </div>
    </div>
  );
}
