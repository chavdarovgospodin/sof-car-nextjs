import { Metadata } from 'next';
import { Suspense } from 'react';
import { AboutSection } from '@/components/HomePage/AboutSection';

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
    ? 'About Us - Sof Car Rental Yambol'
    : 'За нас - Соф Кар Rental Ямбол';

  const description = isEnglish
    ? 'Learn more about Sof Car Rental in Yambol. We offer a wide range of well-maintained cars for rent with competitive prices and excellent service.'
    : 'Научете повече за Соф Кар Rental в Ямбол. Предлагаме голям асортимент от добре поддържани автомобили под наем с конкурентни цени и отлично обслужване.';

  const keywords = isEnglish
    ? 'about sof car rental, car rental yambol, about us, car hire yambol, rental company'
    : 'за соф кар rental, коли под наем ямбол, за нас, автомобили под наем ямбол, рента кар компания';

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
      url: `https://sof-car.eu/${lang}/about`,
      siteName: 'Sof Car Rental',
      title,
      description,
      images: [
        {
          url: '/about.webp',
          width: 1200,
          height: 630,
          alt: 'Sof Car Rental About Us',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/about.webp'],
    },
    alternates: {
      canonical: `https://sof-car.eu/${lang}/about`,
      languages: {
        en: '/en/about',
        bg: '/bg/about',
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

export default function AboutPageRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AboutPage lang={params.then((p) => p.lang)} />
    </Suspense>
  );
}

async function AboutPage({ lang }: { lang: Promise<string> }) {
  const resolvedLang = await lang;
  return (
    <div>
      <AboutSection currentLang={resolvedLang} />
    </div>
  );
}
