import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import styles from './carouselImages.module.scss';

export default function CarouselImages() {
  const interval: number = 5000;
  const transitionTime: number = 1500;
  const imageWidthPixel: number = 900;
  const imageHeightPixel: number = 600;
  const imageQuality: number = 80;

  const images: string[] = [
    '/common/home/img/Main01.jpg',
    '/common/home/img/Main02.jpg',
    '/common/home/img/Main03.jpg',
    '/common/home/img/Main04.jpg',
  ];

  return (
    <div className={styles.carouselBody}>
      <Carousel
        autoPlay
        infiniteLoop
        interval={interval}
        transitionTime={transitionTime}
        showThumbs={false}
        showArrows={false}
      >
        {images.map((img) => (
          <Image
            key={img}
            priority
            quality={imageQuality}
            className={styles.carousel_image}
            src={img}
            alt="img"
            width={imageWidthPixel}
            height={imageHeightPixel}
          />
        ))}
      </Carousel>
    </div>
  );
}
