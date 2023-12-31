'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import styles from './footer.module.scss';

export default function Footer() {
  const t = useTranslations('Footer');
  const companyName: string = t('companyName');
  const companyAddressInfoList: string[] = [
    t('companyAddressInfoList.0'),
    t('companyAddressInfoList.1'),
    t('companyAddressInfoList.2'),
  ];
  const companyBusinessInfoList: string[] = [
    t('companyBusinessInfoList.0'),
    t('companyBusinessInfoList.1'),
    t('companyBusinessInfoList.2'),
    t('companyBusinessInfoList.3'),
    t('companyBusinessInfoList.4'),
    t('companyBusinessInfoList.5'),
  ];
  const iconInfoList = [
    {
      src: '/common/icon/icons8-instagram.svg',
      url: 'https://www.instagram.com/troisnez_fragrances',
    },
    {
      src: '/common/icon/icon-naver.svg',
      url: 'https://smartstore.naver.com/troisnez',
    },
  ];

  const termsOfService: string = t('termsOfService');
  const privatePolicy: string = t('privatePolicy');

  return (
    <footer className={`${styles.footer}`}>
      <div className={styles.left}>
        <div>
          <p>{companyName}</p>
        </div>
        <div>
          {companyAddressInfoList.map((addressInfo) => (
            <p key={addressInfo}>{addressInfo}</p>
          ))}
        </div>
      </div>
      <div className={styles.mid}>
        {companyBusinessInfoList.map((businessInfo) => (
          <p key={businessInfo}>{businessInfo}</p>
        ))}
      </div>
      <div className={styles.right}>
        <div className={styles.tos_policy}>
          <Link href="/termsofservice" target="_blank">
            {termsOfService}
          </Link>
          <span>&nbsp;|&nbsp;</span>
          <Link href="/privatepolicy" target="_blank">
            {privatePolicy}
          </Link>
        </div>
        <div className={styles.sns_icons}>
          {iconInfoList.map((iconInfo) => (
            <a
              key={iconInfo.src}
              href={iconInfo.url}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                key={iconInfo.src}
                className={styles.footer__icon}
                src={iconInfo.src}
                alt="social icon"
                width={32}
                height={32}
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
