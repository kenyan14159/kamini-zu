import styles from "../styles/ContentPage.module.css";
import { scheduleStatus } from "../data/content";

export const metadata = {
  title: "スケジュール | かみにーず",
  description: "かみにーずの年間スケジュールをご案内します。",
};

export default function SchedulePage() {
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
          <span className={styles.label}>SCHEDULE</span>
          <h1 className={styles.title}>
            <span className={styles.titleAnimate}>{splitTitle("スケジュール")}</span>
          </h1>
          <p className={styles.lead}>年間の予定をこちらでお知らせします。</p>
        </div>

        <div className={styles.empty}>
          <div className={styles.badge}>{scheduleStatus.status}</div>
          <p className={styles.cardText}>
            現在、年間スケジュールは未定です。
          </p>
          <p className={styles.subText}>{scheduleStatus.note}</p>
        </div>
      </div>
    </section>
  );
}
