"use client";

import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Index");

  return (
    <>
      <a>{t("title")}</a>
    </>
  );
}
