'use client';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './page.module.scss';
import CarouselImages from '@/components/carouselImages/carouselImages';

export default function Home() {
  return (
    <div className={styles.home}>
      <CarouselImages />
    </div>
  );
}
