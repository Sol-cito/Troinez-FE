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
        <div className={(styles.image_box, styles.image_box_first)}>
          <Image
            src={firstAboutImage}
            alt="first about image"
            fill
            priority
            sizes="25vw"
          />
        </div>
        <div className={(styles.text_box, styles.text_box_first)}>
          <p className={styles.title}>{firstAboutT('title')}</p>
          <p className={styles.subtitle}>{firstAboutT('subtitle')}</p>
          <p className={styles.content}>{firstAboutT('content1')}</p>
          <p className={styles.content}>{firstAboutT('content2')}</p>
        </div>
      </div>
      <div className={styles.text_box_middle}>
        <p className={styles.title}>{secondAboutT('title')}</p>
        <p className={styles.subtitle}>{secondAboutT('subtitle')}</p>
        <br />
        <p>{secondAboutT('content.sentence1')}</p>
        <p>{secondAboutT('content.sentence2')}</p>
        <p>{secondAboutT('content.sentence3')}</p>
        <br />
        <p>{secondAboutT('content.sentence4')}</p>
        <br />
        <p>{secondAboutT('content.sentence5')}</p>
        <p>{secondAboutT('content.sentence6')}</p>
        <p>{secondAboutT('content.sentence7')}</p>
        <br />
        <p>{secondAboutT('content.sentence8')}</p>
      </div>
      <div className={styles.flex_box}>
        <div className={(styles.image_box, styles.image_box_third)}>
          <Image
            src={thirdAboutImage}
            alt="second about image"
            fill
            sizes="25vw"
          />
        </div>
        <div className={(styles.text_box, styles.text_box_third)}>
          <p className={styles.content}>{thirdAboutT('content1')}</p>
          <p className={styles.content}>{thirdAboutT('content2')}</p>
        </div>
      </div>
      <div className={styles.flex_box}>
        <div className={(styles.text_box, styles.text_box_fourth)}>
          <p className={styles.title}>{fourthAboutT('title')}</p>
          <p className={styles.subtitle}>{fourthAboutT('subtitle')}</p>
          <p className={styles.content}>{fourthAboutT('content1')}</p>
          <p className={styles.content}>{fourthAboutT('content2')}</p>
        </div>
        <div className={(styles.image_box, styles.image_box_fourth)}>
          <Image
            src={fourthAboutImage}
            alt="third about image"
            fill
            sizes="25vw"
          />
        </div>
      </div>
      <div className={styles.flex_box}>
        <div className={(styles.text_box, styles.text_box_fifth)}>
          <p className={styles.title}>{fifthAboutT('title')}</p>
          <p className={styles.title}>{fifthAboutT('subtitle')}</p>
          <p className={styles.content}>{fifthAboutT('content1')}</p>
          <p className={styles.content}>{fifthAboutT('content2')}</p>
        </div>
        <div className={(styles.image_box, styles.image_box_fifth)}>
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
