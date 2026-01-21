import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.spinner}></div>
        <p className={styles.text}>読み込み中...</p>
      </div>
    </div>
  );
}

