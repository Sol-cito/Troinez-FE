'use client';

import CarouselImages from '@/components/carouselImages/carouselImages';
import styles from './page.module.scss';

export default function HomePage() {
  const mainImageUrlList: string[] = [
    'https://d3en4rwu5hlcjb.cloudfront.net/home/Main01.jpg',
    'https://d3en4rwu5hlcjb.cloudfront.net/home/Main02.jpg',
    'https://d3en4rwu5hlcjb.cloudfront.net/home/Main03.jpg',
    'https://d3en4rwu5hlcjb.cloudfront.net/home/Main04.jpg',
  ];

  return (
    <div className={styles.home}>
      <CarouselImages
        autoPlay
        showIndicators={false}
        imageUrlList={mainImageUrlList}
      />
    </div>
  );
}
