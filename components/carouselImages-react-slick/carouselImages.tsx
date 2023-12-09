/* eslint-disable import/no-extraneous-dependencies */
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './carouselImages.module.scss';

interface CarouselImageProps {
  imageUrlList: string[];
  dots: boolean;
  infinite: boolean;
  speed: number;
  slideToShow: number;
  slideToScroll: number;
  autoplay: boolean;
}

export default function CarouselImagesReactSlick(props: CarouselImageProps) {
  const {
    imageUrlList,
    dots,
    infinite,
    speed,
    slideToShow,
    slideToScroll,
    autoplay,
  } = props;

  const imageWidthPixel: number = 900;
  const imageHeightPixel: number = 600;
  const imageQuality: number = 70;

  return (
    <div className={styles.carouselBox}>
      <Slider
        dots={dots}
        infinite={infinite}
        speed={speed}
        slidesToShow={slideToShow}
        slidesToScroll={slideToScroll}
        autoplay={false}
      >
        {imageUrlList &&
          imageUrlList.map((url: string) => (
            <Image
              key={url}
              priority
              quality={imageQuality}
              className={styles.carousel_image}
              src={url}
              alt="img"
              width={imageWidthPixel}
              height={imageHeightPixel}
            />
          ))}
      </Slider>
    </div>
  );
}
