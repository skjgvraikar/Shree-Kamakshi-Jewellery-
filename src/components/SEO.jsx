import React from 'react';
import { Helmet } from 'react-helmet-async';

export function SEO({
  title = 'Shree Kamakshi Jewellery Works | Best 916 Hallmark Gold & Silver Jewellery Shop in Talaguppa, Sagar',
  description = 'Shree Kamakshi Jewellery Works (ಶ್ರೀ ಕಾಮಾಕ್ಷಿ ಜ್ಯುವೆಲ್ಲರಿ ವರ್ಕ್ಸ್) - Premier jewellery showroom on B H Road, Talaguppa. BIS 916 Hallmark gold necklaces, bangles, bridal sets, rings & pooja silver. Live market rates & custom orders. Call 9448628575.',
  canonical = 'https://shreekamakshijewellery.com',
  ogImage = 'https://shreekamakshijewellery.com/images/god.jpg',
}) {
  // 1. JewelryStore Local Business Schema
  const jewelryStoreSchema = {
    '@context': 'https://schema.org',
    '@type': 'JewelryStore',
    '@id': 'https://shreekamakshijewellery.com/#store',
    name: 'Shree Kamakshi Jewellery Works',
    alternateName: ['ಶ್ರೀ ಕಾಮಾಕ್ಷಿ ಜ್ಯುವೆಲ್ಲರಿ ವರ್ಕ್ಸ್', 'SKJ Jewellers Talaguppa', 'Shree Kamakshi Jewellers'],
    description: 'Premier authentic jewellery showroom in Talaguppa, Karnataka. Handcrafted BIS 916 Hallmark gold necklaces, bangles, bridal jewellery sets, solitaire rings, and sacred pooja silver ornaments.',
    image: [
      'https://shreekamakshijewellery.com/images/god.jpg',
      'https://shreekamakshijewellery.com/images/products/lakshmi-temple-necklace.webp',
      'https://shreekamakshijewellery.com/images/products/peacock-carved-kada.webp',
    ],
    telephone: ['+91-9448628575', '+91-8660419854'],
    email: 'skjgvraikar@gmail.com',
    url: 'https://shreekamakshijewellery.com',
    logo: 'https://shreekamakshijewellery.com/images/god.jpg',
    founder: {
      '@type': 'Person',
      name: 'Veerendra G. Raikar',
      jobTitle: 'Proprietor & Master Craftsman',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'B H Road, Talaguppa',
      addressLocality: 'Talaguppa',
      addressRegion: 'Karnataka',
      postalCode: '577430',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '14.2185',
      longitude: '74.9667',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '14:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '16:00',
        closes: '21:30',
      },
    ],
    priceRange: '₹₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Google Pay, PhonePe, Credit Card, Debit Card, Net Banking',
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Talaguppa' },
      { '@type': 'AdministrativeArea', name: 'Sagar' },
      { '@type': 'AdministrativeArea', name: 'Shivamogga' },
      { '@type': 'AdministrativeArea', name: 'Karnataka' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Showroom Jewellery Collections',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'BIS 916 Hallmark Gold Necklaces & Haras',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Traditional Gold Bangles & Carved Kadas',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Antique Temple Jewellery & Bridal Sets',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Pure Silver Pooja Deepams, Idols & Ornaments',
        },
      ],
    },
  };

  // 2. Google FAQ Rich Snippet Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Where is Shree Kamakshi Jewellery Works located?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Shree Kamakshi Jewellery Works is centrally located on B H Road, Talaguppa – 577430, Sagar Taluk, Shivamogga District, Karnataka. You can reach the showroom at 9448628575 or 8660419854.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are all gold ornaments BIS 916 Hallmarked?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, 100% of our gold jewellery is certified with government-authorized BIS 916 Hallmark laser stamps, verifying standard 91.6% purity across necklaces, bangles, earrings, and chains.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the daily showroom opening hours?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The showroom is open Monday through Saturday in two sessions: Morning from 10:00 AM to 2:30 PM, and Evening from 4:00 PM to 9:30 PM. Sunday is our weekly holiday.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I order custom-designed bridal jewellery in Talaguppa?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! We specialize in bespoke bridal sets, heirloom temple jewellery, Kasu Malas, and custom silver articles hand-carved to your exact specifications.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I check live gold and silver rates in Talaguppa?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can check real-time daily bullion spot rates for 22 Karat (916) and 24 Karat (999) gold along with fine silver directly on our website, synchronized every 6 hours aligned with Indian bullion market hours.',
        },
      },
    ],
  };

  // 3. WebSite Schema with SearchAction
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://shreekamakshijewellery.com/',
    name: 'Shree Kamakshi Jewellery Works',
    alternateName: 'ಶ್ರೀ ಕಾಮಾಕ್ಷಿ ಜ್ಯುವೆಲ್ಲರಿ ವರ್ಕ್ಸ್',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://shreekamakshijewellery.com/products?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  // 4. BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://shreekamakshijewellery.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Live Rates',
        item: 'https://shreekamakshijewellery.com/#rates',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Collections',
        item: 'https://shreekamakshijewellery.com/products',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Heritage',
        item: 'https://shreekamakshijewellery.com/#heritage',
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Visit Showroom',
        item: 'https://shreekamakshijewellery.com/#visit',
      },
      {
        '@type': 'ListItem',
        position: 6,
        name: 'Contact',
        item: 'https://shreekamakshijewellery.com/#contact',
      },
    ],
  };

  return (
    <Helmet>
      {/* Title & Description */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="Shree Kamakshi Jewellery Works, jewellery shop in Talaguppa, gold shop near me, gold shop in Sagar, 916 Hallmark gold rate today, Talaguppa jewellers, Shivamogga jewellery, Veerendra Raikar, antique bridal jewellery, Karnataka temple jewellery, pure silver pooja items, ಶ್ರೀ ಕಾಮಾಕ್ಷಿ ಜ್ಯುವೆಲ್ಲರಿ ವರ್ಕ್ಸ್, ತಾಳಗುಪ್ಪ ಚಿನ್ನದ ಅಂಗಡಿ, ಸಾಗರ ಜ್ಯುವೆಲ್ಲರಿ"
      />
      <link rel="canonical" href={canonical} />

      {/* Robots Directives */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Google Local SEO Meta Tags */}
      <meta name="geo.region" content="IN-KA" />
      <meta name="geo.placename" content="Talaguppa, Sagar, Shivamogga, Karnataka, India" />
      <meta name="geo.position" content="14.2185;74.9667" />
      <meta name="ICBM" content="14.2185, 74.9667" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Shree Kamakshi Jewellery Works" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:locale:alternate" content="kn_IN" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data for Google Ranking */}
      <script type="application/ld+json">
        {JSON.stringify(jewelryStoreSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
}

export default SEO;
