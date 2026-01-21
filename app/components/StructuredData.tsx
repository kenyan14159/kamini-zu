export default function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kamini-zu.jp";
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: "かみにーず",
    alternateName: "かみにーず",
    description: "富山県富山市立大沢野を拠点に活動する陸上クラブチーム",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "富山市",
      addressRegion: "富山県",
      addressCountry: "JP",
    },
    sport: "陸上競技",
    memberOf: {
      "@type": "Organization",
      name: "全国中学駅伝",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+81-3-1234-5678",
      contactType: "お問い合わせ",
      email: "contact@kamini-zu.jp",
      areaServed: "JP",
      availableLanguage: "Japanese",
    },
    sameAs: [
      "https://www.instagram.com/hajichan18/",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

