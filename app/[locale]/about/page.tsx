"use client";

import styles from "./page.module.scss";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("About");

  return (
    <div>
      <span className={styles.test}>{t("title")}</span>
    </div>
  );
}
