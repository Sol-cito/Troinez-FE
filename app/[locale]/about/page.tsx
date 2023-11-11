'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './page.module.scss';
import localFont from 'next/font/local';

const koreanFont = localFont({
  src: '../../fonts/AppleSDGothicNeoT.ttf',
});

const englishTitleFont = localFont({
  src: '../../fonts/BodoniModa_18pt-SemiBold.ttf',
});

const englishContentFont = localFont({
  src: '../../fonts/EBGaramond-Regular.ttf',
});

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
          <p className={styles.title} style={englishTitleFont.style}>
            {firstAboutT('title')}
          </p>
          <p className={styles.subtitle} style={koreanFont.style}>
            {firstAboutT('subtitle')}
          </p>
          <p className={styles.content}>
            <span style={koreanFont.style}>{firstAboutT('content1-1')} </span>
            <strong>심미안</strong>
            <span style={koreanFont.style}>{firstAboutT('content1-2')} </span>
            <strong>독창성</strong>
            <span style={koreanFont.style}>{firstAboutT('content1-3')} </span>
            <strong>에민함</strong>
            <span style={koreanFont.style}>{firstAboutT('content1-4')} </span>
          </p>
          <p className={styles.content} style={englishContentFont.style}>
            {firstAboutT('content2')}
          </p>
        </div>
      </div>
      <div className={styles.text_box_middle}>
        <p className={styles.title} style={englishTitleFont.style}>
          {secondAboutT('title')}
        </p>
        <p className={styles.subtitle} style={koreanFont.style}>
          {secondAboutT('subtitle')}
        </p>
        <br />
        <p style={koreanFont.style}>{secondAboutT('content.sentence1')}</p>
        <p style={koreanFont.style}>{secondAboutT('content.sentence2')}</p>
        <p style={koreanFont.style}>{secondAboutT('content.sentence3')}</p>
        <br />
        <p style={koreanFont.style}>{secondAboutT('content.sentence4')}</p>
        <br />
        <p style={englishContentFont.style}>
          {secondAboutT('content.sentence5')}
        </p>
        <p style={englishContentFont.style}>
          {secondAboutT('content.sentence6')}
        </p>
        <p style={englishContentFont.style}>
          {secondAboutT('content.sentence7')}
        </p>
        <br />
        <p style={englishContentFont.style}>
          {secondAboutT('content.sentence8')}
        </p>
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
          <p className={styles.content} style={koreanFont.style}>
            {thirdAboutT('content1')}
          </p>
          <p className={styles.content} style={englishContentFont.style}>
            {thirdAboutT('content2')}
          </p>
        </div>
      </div>
      <div className={styles.flex_box}>
        <div className={(styles.text_box, styles.text_box_fourth)}>
          <p className={styles.title} style={englishTitleFont.style}>
            {fourthAboutT('title')}
          </p>
          <p className={styles.subtitle} style={koreanFont.style}>
            {fourthAboutT('subtitle')}
          </p>
          <p className={styles.content} style={koreanFont.style}>
            {fourthAboutT('content1')}
          </p>
          <p className={styles.content} style={englishContentFont.style}>
            {fourthAboutT('content2')}
          </p>
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
          <p className={styles.title} style={englishTitleFont.style}>
            {fifthAboutT('title')}
          </p>
          <p className={styles.subtitle} style={koreanFont.style}>
            {fifthAboutT('subtitle')}
          </p>
          <p className={styles.content} style={koreanFont.style}>
            {fifthAboutT('content1')}
          </p>
          <p className={styles.content} style={englishContentFont.style}>
            {fifthAboutT('content2')}
          </p>
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
