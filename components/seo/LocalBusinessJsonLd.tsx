import { PHONE, SITE_URL, SITE_NAME, CITY, REGION } from "@/lib/site";

export default function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoBodyShop",
    name: SITE_NAME,
    url: SITE_URL,
    telephone: PHONE,
    address: { "@type": "PostalAddress", addressLocality: CITY, addressRegion: REGION, addressCountry: "US" },
    areaServed: { "@type": "City", name: CITY },
    image: `${SITE_URL}/logos/sp-mark.png`,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
