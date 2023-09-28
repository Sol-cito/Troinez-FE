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

  return (
    <div className={styles.carouselBox}>
      <Carousel
        autoPlay={props.autoPlay || false}
        infiniteLoop
        interval={interval}
        transitionTime={transitionTime}
        showStatus={props.showStatus || false}
        showIndicators={props.showIndicators || false}
        showThumbs={
          (props.showThumbs && props.imageUrlList.length > 1) || false
        }
        showArrows={(props.showArrow && props.imageUrlList.length > 1) || false}
        renderThumbs={(thumb) => {
          return thumb;
        }}
        className={styles.carousel}
      >
        {props.imageUrlList &&
          props.imageUrlList.map((url: string) => (
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
