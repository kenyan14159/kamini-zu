import Link from "next/link";
import styles from "./ResultsSection.module.css";
import { resultItems } from "../data/content";

export default function ResultsSection() {
  return (
    <section id="results" className={styles.results}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>RESULTS</span>
          <h2 className={styles.title}>リザルト</h2>
          <p className={styles.lead}>
            大会結果や記録の更新を掲載します。
          </p>
        </div>

        <div className={styles.grid}>
          {resultItems.slice(0, 3).map((item) => (
            <article key={item.id} className={styles.card}>
              <div className={styles.meta}>
                <span className={styles.badge}>{item.category}</span>
                <span>{item.date}</span>
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardText}>{item.summary}</p>
              <div className={styles.place}>{item.place}</div>
            </article>
          ))}
        </div>

        <div className={styles.actions}>
          <Link href="/results" className={styles.link}>
            リザルト一覧を見る →
          </Link>
        </div>
      </div>
    </section>
  );
}
