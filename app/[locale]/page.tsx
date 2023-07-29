'use client';

// import { useTranslations } from 'next-intl';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import styles from './page.module.scss';

export default function Home() {
  // const t = useTranslations('Index');
  const interval: number = 5000;
  const transitionTime: number = 1500;
  const imageWidth: number = 16 * 23;
  const imageHeight: number = 16 * 23;

  const images: string[] = [
    '/common/home/img/image_1.jpeg',
    '/common/home/img/image_2.jpeg',
    '/common/home/img/image_1.jpeg',
    '/common/home/img/image_2.jpeg',
  ];

  return (
    <main className={styles.main}>
      <Carousel
        autoPlay
        infiniteLoop
        interval={interval}
        transitionTime={transitionTime}
      >
        {images.map((img) => (
          <Image
            key={img}
            src={img}
            alt="img"
            width={imageWidth}
            height={imageHeight}
          />
        ))}
      </Carousel>
    </main>
  );
}
