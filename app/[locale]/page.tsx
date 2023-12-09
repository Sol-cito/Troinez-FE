'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import Image from 'next/image';
import styles from './page.module.scss';

export default function HomePage() {
  const CarouselImagesReackSlickComponent = React.lazy(
    () => import('@/components/carouselImages-react-slick/carouselImages')
  );

  const [isPageReady, setIsPageReady] = useState(false);

  const mainImageUrlList: string[] = [
    'https://d3en4rwu5hlcjb.cloudfront.net/home/Main01.jpg',
    'https://d3en4rwu5hlcjb.cloudfront.net/home/Main02.jpg',
    'https://d3en4rwu5hlcjb.cloudfront.net/home/Main03.jpg',
    'https://d3en4rwu5hlcjb.cloudfront.net/home/Main04.jpg',
  ];

  const imageWidthPixel: number = 300;
  const imageHeightPixel: number = 200;
  const imageQuality: number = 30;

  useEffect(() => {
    setIsPageReady(true);
  }, []);

  return (
    <div>
      {isPageReady && (
        <div className={styles.home}>
          {isMobile ? (
            <div className={styles.mobile_main_images}>
              {mainImageUrlList.map((imageUrl) => (
                <Image
                  key={imageUrl}
                  priority
                  className={styles.main_image}
                  quality={imageQuality}
                  src={imageUrl}
                  alt="img"
                  width={imageWidthPixel}
                  height={imageHeightPixel}
                />
              ))}
            </div>
          ) : (
            <Suspense fallback={<div>Loading...</div>}>
              <CarouselImagesReackSlickComponent
                imageUrlList={mainImageUrlList}
                dots={false}
                infinite
                speed={5000}
                slideToShow={1}
                slideToScroll={1}
                autoplay
              />
            </Suspense>
          )}
        </div>
      )}
    </div>
  );
}
