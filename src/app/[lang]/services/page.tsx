import { Metadata } from 'next';
import { ServicesPage } from '@/components/ServicesPage/ServicesPage';

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
    ? 'Our Services & Cars - Sof Car Rental Yambol'
    : 'Услуги и автомобили - Соф Кар Rental Ямбол';

  const description = isEnglish
    ? 'Detailed description of our car rental services in Yambol. Economy, Standard and Premium class cars with full specifications and competitive prices.'
    : 'Детайлно описание на нашите услуги за коли под наем в Ямбол. Икономичен, стандартен и луксозен клас автомобили с пълни спецификации.';

  const keywords = isEnglish
    ? 'car rental services yambol, car hire yambol, economy cars, standard cars, premium cars, car rental bulgaria'
    : 'услуги коли под наем ямбол, автомобили под наем, икономичен клас, стандартен клас, луксозен клас, рента кар услуги';

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
      url: `https://sof-car.eu/${lang}/services`,
      siteName: 'Sof Car Rental',
      title,
      description,
      images: [
        {
          url: '/favicon.png',
          width: 1200,
          height: 630,
          alt: 'Sof Car Rental Services',
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
      canonical: `https://sof-car.eu/${lang}/services`,
      languages: {
        en: '/en/services',
        bg: '/bg/services',
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

export default function ServicesPageRoute() {
  return <ServicesPage />;
}
