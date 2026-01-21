import styles from "../styles/ContentPage.module.css";
import { resultItems } from "../data/content";

export const metadata = {
  title: "リザルト | かみにーず",
  description: "かみにーずの大会結果や記録を掲載しています。",
};

export default function ResultsPage() {
  const splitTitle = (text: string) =>
    text.split("").map((char, index) => (
      <span
        key={`${char}-${index}`}
        className={styles.titleChar}
        style={{ animationDelay: `${index * 0.06}s` }}
      >
        {char}
      </span>
    ));

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <span className={styles.label}>RESULTS</span>
          <h1 className={styles.title}>
            <span className={styles.titleAnimate}>{splitTitle("リザルト")}</span>
          </h1>
          <p className={styles.lead}>
            大会結果や記録の更新情報を掲載します。
          </p>
        </div>

        <div className={styles.grid}>
          {resultItems.map((item) => (
            <article key={item.id} className={styles.card}>
              <div className={styles.meta}>
                <span className={styles.badge}>{item.category}</span>
                <span>{item.date}</span>
              </div>
              <h2 className={styles.cardTitle}>{item.title}</h2>
              <p className={styles.cardText}>{item.summary}</p>
              <div className={styles.subText}>{item.place}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
