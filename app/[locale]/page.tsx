'use client';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './page.module.scss';
import CarouselImages from '@/components/carouselImages/carouselImages';

export default function Home() {
  const mainImageUrlList: string[] = [
    '/common/home/img/Main01.jpg',
    '/common/home/img/Main02.jpg',
    '/common/home/img/Main03.jpg',
    '/common/home/img/Main04.jpg',
  ];

  return (
    <div className={styles.home}>
      <CarouselImages
        autoPlay={true}
        showIndicators={false}
        imageUrlList={mainImageUrlList}
      />
    </div>
  );
}
