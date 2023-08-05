'use client';

import CarouselImages from '@/components/carouselImages/carouselImages';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.home}>
      <CarouselImages />
    </div>
  );
}
