import styles from "../styles/ContentPage.module.css";
import { newsItems } from "../data/content";

export const metadata = {
  title: "ニュース | かみにーず",
  description: "かみにーずの最新ニュースを掲載しています。",
};

export default function NewsPage() {
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
          <span className={styles.label}>NEWS</span>
          <h1 className={styles.title}>
            <span className={styles.titleAnimate}>{splitTitle("ニュース")}</span>
          </h1>
          <p className={styles.lead}>
            活動報告やお知らせをこちらで更新していきます。
          </p>
        </div>

        <div className={styles.grid}>
          {newsItems.map((item) => (
            <article key={item.id} className={styles.card}>
              <div className={styles.meta}>
                <span className={styles.badge}>{item.category}</span>
                <span>{item.date}</span>
              </div>
              <h2 className={styles.cardTitle}>{item.title}</h2>
              <p className={styles.cardText}>{item.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
