"use client";

import { useEffect } from "react";
import Link from "next/link";
import Button from "./components/Button";
import styles from "./error.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // エラーログを送信（Sentry等）
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>エラーが発生しました</h1>
        <p className={styles.description}>
          申し訳ございません。予期しないエラーが発生しました。
        </p>
        <div className={styles.actions}>
          <Button variant="primary" onClick={reset}>
            再試行
          </Button>
          <Link href="/">
            <Button variant="ghost">
              ホームに戻る
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

