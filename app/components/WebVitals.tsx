"use client";

import { useEffect } from "react";
import { onCLS, onFCP, onLCP, onTTFB, onINP } from "web-vitals";

export default function WebVitals() {
  useEffect(() => {
    const sendToAnalytics = (metric: any) => {
      // Google Analytics 4 に送信
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", metric.name, {
          value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
          event_label: metric.id,
          non_interaction: true,
          metric_id: metric.id,
          metric_value: metric.value,
          metric_delta: metric.delta,
        });
      }
      
      // コンソールにも出力（開発時）
      if (process.env.NODE_ENV === "development") {
        console.log(metric);
      }
    };

    onCLS(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
    onINP(sendToAnalytics);
  }, []);

  return null;
}

