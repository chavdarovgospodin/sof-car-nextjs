import { Metadata } from 'next';
import { Suspense } from 'react';
import { PricingPage } from '@/components/PricingPage';

// Generate static params for static export
export async function generateStaticParams() {
  return [{ lang: 'bg' }, { lang: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const isEnglish = lang === 'en';

  const title = isEnglish
    ? 'Pricing & Rates - Sof Car Rental Yambol'
    : 'Цени и тарифи - Соф Кар Rental Ямбол';

  const description = isEnglish
    ? 'Complete pricing table for car rental in Yambol. Prices from 30 BGN per day, included fees, deposits and additional services. Competitive rates for all car classes.'
    : 'Пълна ценова таблица за коли под наем в Ямбол. Цени от 30 лева на ден, включени такси, депозити и допълнителни услуги.';

  const keywords = isEnglish
    ? 'car rental prices yambol, car hire rates bulgaria, economy car prices, premium car rental, car rental deposits, yambol car hire'
    : 'цени коли под наем ямбол, тарифи рента кар, цени автомобили под наем, депозити коли под наем, такси вземане връщане';

  return {
    metadataBase: new URL('https://sof-car.eu'),
    title,
    description,
    keywords,
    authors: [{ name: 'Sof Car Rental' }],
    creator: 'Sof Car Rental',
    publisher: 'Sof Car Rental',
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
    openGraph: {
      type: 'website',
      locale: isEnglish ? 'en_US' : 'bg_BG',
      url: `https://sof-car.eu/${lang}/pricing`,
      siteName: 'Sof Car Rental',
      title,
      description,
      images: [
        {
          url: '/favicon.png',
          width: 1200,
          height: 630,
          alt: 'Sof Car Rental Pricing',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/favicon.png'],
    },
    alternates: {
      canonical: `https://sof-car.eu/${lang}/pricing`,
      languages: {
        en: '/en/pricing',
        bg: '/bg/pricing',
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

export default function PricingPageRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PricingPage lang={params.then((p) => p.lang)} />
    </Suspense>
  );
}
