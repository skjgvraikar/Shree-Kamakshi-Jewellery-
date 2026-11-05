import React from 'react';
import { Helmet } from 'react-helmet-async';

export function SEO() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    "name": "Shree Kamakshi Jewellery Works",
    "image": "https://shreekamakshijewellery.com/images/god.jpg",
    "telephone": ["+919448628575", "+918660419854"],
    "email": "skjgvraikar@gmail.com",
    "url": "https://shreekamakshijewellery.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "B H Road",
      "addressLocality": "Talaguppa",
      "postalCode": "577430",
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "14.2185",
      "longitude": "74.9667"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "14:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "16:00",
        "closes": "21:30"
      }
    ],
    "priceRange": "₹₹₹",
    "paymentAccepted": "Cash, UPI, Card, Net Banking",
    "currenciesAccepted": "INR"
  };

  return (
    <Helmet>
      <title>Shree Kamakshi Jewellery Works | Pure 916 Gold & Silver | Talaguppa</title>
      <meta
        name="description"
        content="Shree Kamakshi Jewellery Works, Talaguppa. Premium handcrafted 916 BIS Hallmarked gold necklaces, bangles, bridal sets, rings, chains, and sacred pooja silver ornaments. Serving generations with trust."
      />
      <meta
        name="keywords"
        content="Shree Kamakshi Jewellery Works, Talaguppa Jewellery, Gold Shop Talaguppa, 916 Hallmark Gold, Gold Rate Talaguppa, Silver Ornaments, Veerendra Raikar"
      />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content="Shree Kamakshi Jewellery Works | Talaguppa" />
      <meta
        property="og:description"
        content="Exquisite handcrafted 916 Hallmark gold and pure silver jewellery in Talaguppa. Live rates, bridal collections, custom designs."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://shreekamakshijewellery.com" />
      <meta property="og:image" content="/images/god.jpg" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Shree Kamakshi Jewellery Works" />
      <meta
        name="twitter:description"
        content="Exquisite handcrafted 916 Hallmark gold and silver jewellery in Talaguppa. Trusted across generations."
      />
      <meta name="twitter:image" content="/images/god.jpg" />

      {/* Canonical Link */}
      <link rel="canonical" href="https://shreekamakshijewellery.com" />

      {/* LocalBusiness JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
}

export default SEO;

