import { Metadata } from 'next';
import { HomePage } from '@/components/HomePage/HomePage';

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
    ? 'Sof Car Rental Yambol - Best Car Hire Service in Bulgaria'
    : 'Соф Кар Rental Ямбол - Най-добрата услуга за коли под наем в България';

  const description = isEnglish
    ? 'Sof Car Rental offers the best car hire service in Yambol, Bulgaria. Economy, standard, and premium cars from 30 BGN per day. Fast, reliable, and affordable car rental with full insurance included.'
    : 'Соф Кар Rental предлага най-добрата услуга за коли под наем в Ямбол, България. Икономичен, стандартен и луксозен клас автомобили от 30 лева на ден.';

  const keywords = isEnglish
    ? 'car rental yambol, car hire bulgaria, cheap car rental, yambol car hire, car rental service, affordable car rental'
    : 'коли под наем ямбол, автомобили под наем българия, евтини коли под наем, рента кар ямбол, услуга коли под наем';

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
      url: `https://sof-car.eu/${lang}`,
      siteName: 'Sof Car Rental',
      title,
      description,
      images: [
        {
          url: '/favicon.png',
          width: 1200,
          height: 630,
          alt: 'Sof Car Rental Yambol',
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
      canonical: `https://sof-car.eu/${lang}`,
      languages: {
        en: '/en',
        bg: '/bg',
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

export default function HomePageRoute() {
  return <HomePage />;
}
