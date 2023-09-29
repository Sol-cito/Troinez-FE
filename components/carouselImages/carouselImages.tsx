import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import styles from './carouselImages.module.scss';

export interface CarouselImageProps {
  imageUrlList: string[];
  autoPlay?: boolean;
  showStatus?: boolean;
  showIndicators?: boolean;
  showArrow?: boolean;
  showThumbs?: boolean;
}

export default function CarouselImages(props: CarouselImageProps) {
  const interval: number = 5000;
  const transitionTime: number = 1500;
  const imageWidthPixel: number = 900;
  const imageHeightPixel: number = 600;
  const imageQuality: number = 80;

  const {
    imageUrlList,
    autoPlay,
    showStatus,
    showIndicators,
    showArrow,
    showThumbs,
  } = props;

  return (
    <div className={styles.carouselBox}>
      <Carousel
        autoPlay={autoPlay || false}
        infiniteLoop
        interval={interval}
        transitionTime={transitionTime}
        showStatus={showStatus || false}
        showIndicators={showIndicators || false}
        showThumbs={(showThumbs && imageUrlList.length > 1) || false}
        showArrows={(showArrow && imageUrlList.length > 1) || false}
        renderThumbs={(thumb) => thumb}
        className={styles.carousel}
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
      </Carousel>
    </div>
  );
}

CarouselImages.defaultProps = {
  autoPlay: false,
  showStatus: false,
  showIndicators: false,
  showArrow: false,
  showThumbs: false,
};
