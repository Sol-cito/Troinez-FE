'use client';

// import { useTranslations } from 'next-intl';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import styles from './page.module.scss';

export default function Home() {
  // const t = useTranslations('Index');
  const images: string[] = [
    '/common/home/img/image_1.jpeg',
    '/common/home/img/image_2.jpeg',
    '/common/home/img/image_1.jpeg',
    '/common/home/img/image_2.jpeg',
  ];

  return (
    <main className={styles.main}>
      <Carousel autoPlay infiniteLoop interval={5000} transitionTime={1500}>
        {images.map((img) => (
          <Image key={img} src={img} alt="img" width={368} height={368} />
        ))}
      </Carousel>
    </main>
  );
}
