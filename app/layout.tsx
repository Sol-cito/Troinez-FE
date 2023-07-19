import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import ContentWrapper from "@/components/contentWrapper/contentWrapper";
import styles from "./layout.module.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Troinez",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} id="bodytest">
        <Header />
        <ContentWrapper content={children} />
        <Footer />
      </body>
    </html>
  );
}
