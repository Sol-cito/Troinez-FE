/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next';
import Footer from '@/components/footer/footer';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import MainWrapper from '@/components/mainWrapper/mainWrapper';
import { cookies } from 'next/headers';
import dynamic from 'next/dynamic';
import { Providers } from '@/redux/provider';
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

  // false on Server Side Rendering
  const Header = dynamic(() => import('../../components/header/header'), {
    ssr: false,
  });

  return (
    <html className={styles.html} lang={locale}>
      <body>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header isLogin={isLogin} token={token} username={username} />
            <MainWrapper content={children} />
            <Footer />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
