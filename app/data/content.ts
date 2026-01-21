export type NewsItem = {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  category: string;
};

export type ResultItem = {
  id: string;
  date: string;
  title: string;
  category: string;
  summary: string;
  place: string;
};

export const newsItems: NewsItem[] = [
  {
    id: "news-2026-01-10",
    date: "2026.01.10",
    title: "【テスト】冬季トレーニングが始まりました",
    excerpt: "基礎体力づくりを中心に、フォームの確認と走り込みを行っています。",
    category: "お知らせ",
  },
  {
    id: "news-2026-01-05",
    date: "2026.01.05",
    title: "【テスト】新年走り初めを実施",
    excerpt: "全員で安全祈願を行い、2026年の目標を共有しました。",
    category: "活動報告",
  },
  {
    id: "news-2025-12-20",
    date: "2025.12.20",
    title: "【テスト】冬季練習会のご案内",
    excerpt: "見学・体験をご希望の方はお問い合わせフォームよりご連絡ください。",
    category: "募集",
  },
];

export const resultItems: ResultItem[] = [
  {
    id: "result-2025-12-15",
    date: "2025.12.15",
    title: "【テスト】県秋季選手権",
    category: "中学男子",
    summary: "1500m ベスト更新",
    place: "県総合運動公園",
  },
  {
    id: "result-2025-11-02",
    date: "2025.11.02",
    title: "【テスト】市記録会",
    category: "小学女子",
    summary: "100m 目標突破",
    place: "市営陸上競技場",
  },
  {
    id: "result-2025-10-12",
    date: "2025.10.12",
    title: "【テスト】地区大会",
    category: "中学女子",
    summary: "800m 入賞",
    place: "海浜公園コース",
  },
];

export const scheduleStatus = {
  status: "未定",
  note: "決まり次第、こちらでご案内します。",
};
