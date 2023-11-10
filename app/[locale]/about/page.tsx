'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './page.module.scss';

export default function AboutPage() {
  const firstAboutT = useTranslations('About.firstAbout');
  const secondAboutT = useTranslations('About.secondAbout');
  const thirdAboutT = useTranslations('About.thirdAbout');
  const fourthAboutT = useTranslations('About.fourthAbout');
  const fifthAboutT = useTranslations('About.fifthAbout');

  const firstAboutImage = '/common/about/img/01_LOW.jpg';
  const thirdAboutImage = '/common/about/img/02_LOW.jpg';
  const fourthAboutImage = '/common/about/img/03_LOW.jpg';
  const fifthAboutImage = '/common/about/img/04_LOW.jpg';

  return (
    <div className={styles.about_wrapper}>
      <div className={styles.flex_box}>
        <div className={styles.image_box}>
          <Image
            src={firstAboutImage}
            alt="first about image"
            fill
            priority
            sizes="25vw"
          />
        </div>
        <div className={styles.text_box}>
          <p className={styles.title}>{firstAboutT('title')}</p>
          <p>{firstAboutT('content')}</p>
        </div>
      </div>
      <div className={styles.text_box}>
        <p className={styles.title}>{secondAboutT('title')}</p>
        <p>{secondAboutT('content.sentence1')}</p>
        <p>{secondAboutT('content.sentence2')}</p>
        <p>{secondAboutT('content.sentence3')}</p>
        <p>{secondAboutT('content.sentence4')}</p>
      </div>
      <div className={styles.flex_box}>
        <div className={styles.image_box}>
          <Image
            src={thirdAboutImage}
            alt="second about image"
            fill
            sizes="25vw"
          />
        </div>
        <div className={styles.text_box}>
          <p>{thirdAboutT('content')}</p>
        </div>
      </div>
      <div className={styles.flex_box}>
        <div className={styles.text_box}>
          <p className={styles.title}>{fourthAboutT('title')}</p>
          <p>{fourthAboutT('content')}</p>
        </div>
        <div className={styles.image_box}>
          <Image
            src={fourthAboutImage}
            alt="third about image"
            fill
            sizes="25vw"
          />
        </div>
      </div>
      <div className={styles.flex_box}>
        <div className={styles.text_box}>
          <p className={styles.title}>{fifthAboutT('title')}</p>
          <p>{fifthAboutT('content')}</p>
        </div>
        <div className={styles.image_box}>
          <Image
            src={fifthAboutImage}
            alt="fourth about image"
            fill
            sizes="25vw"
          />
        </div>
      </div>
    </div>
  );
}
