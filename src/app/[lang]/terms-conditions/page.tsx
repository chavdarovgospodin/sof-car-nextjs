import { Metadata } from 'next';
import { TermsConditionsPage } from '@/components/TermsConditionsPage/TermsConditionsPage';

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
    ? 'Terms & Conditions - Sof Car Rental Yambol'
    : 'Общи условия - Соф Кар Rental Ямбол';

  const description = isEnglish
    ? 'Terms and conditions for Sof Car Rental services. Learn about rental requirements, cancellation policies, insurance coverage, and payment terms for car rental in Yambol.'
    : 'Общи условия за услугите на Соф Кар Rental. Научете за изискванията за наемане, политиката за отказ, застрахователното покритие и условията за плащане.';

  const keywords = isEnglish
    ? 'car rental terms conditions, rental agreement, cancellation policy, car insurance, rental requirements, yambol car hire'
    : 'общи условия коли под наем, договор наемане, политика отказ, застраховане автомобили, изисквания наемане';

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
      url: `https://sof-car.eu/${lang}/terms-conditions`,
      siteName: 'Sof Car Rental',
      title,
      description,
      images: [
        {
          url: '/favicon.png',
          width: 1200,
          height: 630,
          alt: 'Sof Car Rental Terms & Conditions',
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
      canonical: `https://sof-car.eu/${lang}/terms-conditions`,
      languages: {
        en: '/en/terms-conditions',
        bg: '/bg/terms-conditions',
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

export default function TermsConditionsPageRoute() {
  return <TermsConditionsPage />;
}
