import type { Metadata } from "next";
import { Bebas_Neue, Inter, Noto_Sans_JP, Space_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StructuredData from "./components/StructuredData";
import SkipLink from "./components/SkipLink";
import WebVitals from "./components/WebVitals";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto",
  display: "swap",
  preload: true,
  weight: ["400", "500", "700"],
  fallback: ["system-ui", "arial"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "かみにーず | 富山県富山市立大沢野 陸上クラブ",
  description: "富山県富山市立大沢野を拠点に活動する陸上クラブチーム「かみにーず」。小学生・中学生が全国中学駅伝出場を目指して日々練習に励んでいます。",
  keywords: ["陸上", "クラブ", "小学生", "中学生", "トラック", "フィールド", "富山", "大沢野", "駅伝", "陸上競技"],
  authors: [{ name: "かみにーず" }],
  creator: "かみにーず",
  publisher: "かみにーず",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://kamini-zu.jp"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "かみにーず | 富山県富山市立大沢野 陸上クラブ",
    description: "小学生・中学生向けの陸上クラブチーム。すべての一歩が、未来を刻む。全国中学駅伝出場を目指して。",
    type: "website",
    locale: "ja_JP",
    siteName: "かみにーず",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://kamini-zu.jp",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "かみにーず 陸上クラブ",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "かみにーず | 富山県富山市立大沢野 陸上クラブ",
    description: "小学生・中学生向けの陸上クラブチーム。すべての一歩が、未来を刻む。",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${bebasNeue.variable} ${inter.variable} ${notoSansJP.variable} ${spaceMono.variable}`}
      >
        <WebVitals />
        <StructuredData />
        <SkipLink />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
