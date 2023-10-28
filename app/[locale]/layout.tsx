/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import MainWrapper from '@/components/mainWrapper/mainWrapper';
import { cookies } from 'next/headers';
import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: 'Troisnez',
  description: 'Troisnez car room diffuser 트와네즈 차량용 룸용 디퓨저',
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: any;
}) {
  let messages;
  try {
    messages = (await import(`../../locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  const username = cookieStore.get('username')?.value;
  let isLogin = false;
  if (token !== undefined) {
    isLogin = true;
  }

  return (
    <html className={styles.html} lang={locale}>
      <meta name="title" content="Troisnez 주식회사" />
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header isLogin={isLogin} token={token} username={username} />
          <MainWrapper content={children} />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
