'use client';

import { useTranslations } from 'next-intl';
import styles from './page.module.scss';

export default function About() {
  const t = useTranslations('About');

  return (
    <div>
      <span className={styles.test}>{t('title')}</span>
    </div>
  );
}
