import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LanguageInit } from '@/components/LanguageInit';
import { APP_CONFIG } from '@/utils/constants';
import { ThemeProviderWrapper, BreakpointProvider } from '@/providers';
import Script from 'next/script';

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

// Generate static params for static export
// export async function generateStaticParams() {
//   return [{ lang: 'bg' }, { lang: 'en' }];
// }

export async function generateMetadata({
  params,
}: LangLayoutProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const isEnglish = lang === 'en';

  return {
    title: {
      default: isEnglish
        ? 'Sof Car Rental Yambol - Best Car Hire Service'
        : 'Соф Кар Rental Ямбол - Най-добрата услуга за коли под наем',
      template: isEnglish
        ? '%s | Sof Car Rental Yambol'
        : '%s | Соф Кар Rental Ямбол',
    },
    description: isEnglish
      ? 'Sof Car Rental offers the best car hire service in Yambol, Bulgaria. Economy, standard, and premium cars from 30 BGN per day with full insurance included.'
      : 'Соф Кар Rental предлага най-добрата услуга за коли под наем в Ямбол, България. Икономичен, стандартен и луксозен клас автомобили от 30 лева на ден.',
    keywords: isEnglish
      ? 'car rental yambol, car hire bulgaria, cheap car rental, yambol car hire, car rental service, affordable car rental'
      : 'коли под наем ямбол, автомобили под наем българия, евтини коли под наем, рента кар ямбол, услуга коли под наем',
    openGraph: {
      type: 'website',
      locale: isEnglish ? 'en_US' : 'bg_BG',
      url: `${APP_CONFIG.url}/${lang}`,
      siteName: APP_CONFIG.name,
      title: isEnglish
        ? 'Sof Car Rental Yambol - Best Car Hire Service'
        : 'Соф Кар Rental Ямбол - Най-добрата услуга за коли под наем',
      description: isEnglish
        ? 'Sof Car Rental offers the best car hire service in Yambol, Bulgaria. Economy, standard, and premium cars from 30 BGN per day with full insurance included.'
        : 'Соф Кар Rental предлага най-добрата услуга за коли под наем в Ямбол, България. Икономичен, стандартен и луксозен клас автомобили от 30 лева на ден.',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${APP_CONFIG.url}/${lang}`,
      languages: {
        bg: `${APP_CONFIG.url}/bg`,
        en: `${APP_CONFIG.url}/en`,
        'x-default': `${APP_CONFIG.url}/bg`,
      },
    },
    other: {
      'geo.region': 'BG-28',
      'geo.placename': 'Yambol',
      'geo.position': '42.4931;26.5062',
      ICBM: '42.4931, 26.5062',
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: LangLayoutProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  // Validate language - if invalid, redirect to default
  // if (!['bg', 'en'].includes(lang)) {
  //   redirect('/bg');
  // }

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CarRental',
    name: 'Sof Car Rental',
    alternateName: 'Соф Кар Rental',
    description:
      lang === 'en'
        ? 'Professional car rental service in Yambol, Bulgaria offering economy, standard and premium class vehicles'
        : 'Професионална услуга за коли под наем в Ямбол, България предлагаща икономичен, стандартен и луксозен клас автомобили',
    url: `${APP_CONFIG.url}/${lang}`,
    telephone: '+359879994212',
    email: '2016.sofcar@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        lang === 'en'
          ? 'Western Industrial Zone, ul. "Yambolen" 18, 8601 Yambol'
          : 'Западна промишлена зона, ул. "Ямболен" 18, 8601 Ямбол',
      addressLocality: 'Yambol',
      postalCode: '8600',
      addressCountry: 'BG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 42.4931,
      longitude: 26.5062,
    },
    openingHours:
      lang === 'en'
        ? ['Mo-Fr 08:00-18:00', 'Sa 09:00-16:00']
        : ['Mo-Fr 08:00-18:00', 'Sa 09:00-16:00'],
    priceRange: '30-80 BGN',
    paymentAccepted: ['Cash', 'Credit Card', 'Visa', 'MasterCard'],
    currenciesAccepted: 'BGN',
    areaServed: {
      '@type': 'City',
      name: 'Yambol',
      sameAs: 'https://en.wikipedia.org/wiki/Yambol',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: lang === 'en' ? 'Car Rental Services' : 'Услуги за коли под наем',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: lang === 'en' ? 'Economy Class Rental' : 'Икономикачен клас',
            description:
              lang === 'en'
                ? 'Small, practical city cars'
                : 'Малки, практични градски автомобили',
          },
          price: '30.00',
          priceCurrency: 'BGN',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '30.00',
            priceCurrency: 'BGN',
            unitText: lang === 'en' ? 'per day' : 'на ден',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: lang === 'en' ? 'Standard Class Rental' : 'Стандартен клас',
            description:
              lang === 'en'
                ? 'Family sedans and wagons'
                : 'Семейни седани и комби',
          },
          price: '50.00',
          priceCurrency: 'BGN',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '50.00',
            priceCurrency: 'BGN',
            unitText: lang === 'en' ? 'per day' : 'на ден',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: lang === 'en' ? 'Premium Class Rental' : 'Луксозен клас',
            description:
              lang === 'en'
                ? 'Business sedans and SUVs'
                : 'Бизнес седани и SUV',
          },
          price: '80.00',
          priceCurrency: 'BGN',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '80.00',
            priceCurrency: 'BGN',
            unitText: lang === 'en' ? 'per day' : 'на ден',
          },
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <ThemeProviderWrapper>
      <BreakpointProvider>
        <LanguageInit />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <Header />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </div>
      </BreakpointProvider>
    </ThemeProviderWrapper>
  );
}
