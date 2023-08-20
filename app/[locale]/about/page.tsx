'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './page.module.scss';

export default function About() {
  const firstAboutT = useTranslations('About.firstAbout');
  const secondAboutT = useTranslations('About.secondAbout');

  const aboutImage1 = '/common/about/img/About01.png';
  const aboutImage2 = '/common/about/img/About02.png';
  const aboutImage3 = '/common/about/img/About03.png';

  return (
    <div className={styles.about_wrapper}>
      <div className={styles.flex_box}>
        <div className={styles.image_box}>
          <Image src={aboutImage1} alt="first about image" fill />
        </div>
        <div className={styles.text_box}>
          <p className={styles.title}>{firstAboutT('title')}</p>
          <p className={styles.sub_title}>{firstAboutT('subTitle1')}</p>
          <p className={styles.sub_title}>{firstAboutT('subTitle2')}</p>
          <p>{firstAboutT('retualText')}</p>
          <p>{firstAboutT('retualTestEng')}</p>
        </div>
      </div>
      <div className={styles.flex_box}>
        <div className={styles.text_box}>
          <p className={styles.title}>{secondAboutT('title')}</p>
          <p className={styles.sub_title}>{secondAboutT('subTitle1')}</p>
          <p className={styles.sub_title}>{secondAboutT('subTitle2')}</p>
          <p>{secondAboutT('retualText')}</p>
          <p>{secondAboutT('retualTestEng')}</p>
        </div>
        <div className={styles.image_box}>
          <Image src={aboutImage2} alt="second about image" fill />
        </div>
      </div>
      <div className={styles.flex_box}>
        <div className={styles.full_image_box}>
          <Image src={aboutImage3} alt="third about image" fill />
        </div>
      </div>
    </div>
  );
}
