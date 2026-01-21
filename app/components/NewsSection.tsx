import Link from "next/link";
import styles from "./NewsSection.module.css";
import { newsItems } from "../data/content";

export default function NewsSection() {
  return (
    <section id="news" className={styles.news}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>NEWS</span>
          <h2 className={styles.title}>最新情報</h2>
          <p className={styles.lead}>
            活動報告やお知らせを更新していきます。
          </p>
        </div>

        <div className={styles.grid}>
          {newsItems.slice(0, 3).map((item) => (
            <article key={item.id} className={styles.card}>
              <div className={styles.meta}>
                <span className={styles.badge}>{item.category}</span>
                <span>{item.date}</span>
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardText}>{item.excerpt}</p>
            </article>
          ))}
        </div>

        <div className={styles.actions}>
          <Link href="/news" className={styles.link}>
            ニュース一覧を見る →
          </Link>
        </div>
      </div>
    </section>
  );
}
