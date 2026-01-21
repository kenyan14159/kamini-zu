import styles from "../styles/ContentPage.module.css";

export const metadata = {
  title: "チーム紹介 | かみにーず",
  description: "かみにーずのチーム紹介ページです。",
};

export default function TeamPage() {
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
          <span className={styles.label}>MEMBER</span>
          <h1 className={styles.title}>
            <span className={styles.titleAnimate}>{splitTitle("MEMBER")}</span>
          </h1>
          <p className={styles.lead}>
            かみにーずの活動を支えるスタッフをご紹介します。
          </p>
        </div>

        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.meta}>
              <span className={styles.badge}>代表</span>
            </div>
            <h2 className={styles.cardTitle}>
              <ruby>
                石田 一<rt>はじめ</rt>
              </ruby>
            </h2>
          </article>
        </div>
      </div>
    </section>
  );
}
