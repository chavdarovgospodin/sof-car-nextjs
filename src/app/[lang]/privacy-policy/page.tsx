import { Metadata } from 'next';
import { PrivacyPolicyPage } from '@/components/PrivacyPolicyPage/PrivacyPolicyPage';

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
    ? 'Privacy Policy - Sof Car Rental Yambol'
    : 'Политика за поверителност - Соф Кар Rental Ямбол';

  const description = isEnglish
    ? 'Privacy policy for Sof Car Rental services. Learn how we protect your personal data, what information we collect, and your rights under GDPR compliance.'
    : 'Политика за поверителност за услугите на Соф Кар Rental. Научете как защитаваме вашите лични данни и какви права имате според GDPR.';

  const keywords = isEnglish
    ? 'privacy policy car rental, GDPR compliance, data protection, personal data rights, car rental privacy'
    : 'политика поверителност коли под наем, GDPR съответствие, защита данни, права лични данни';

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
      url: `https://sof-car.eu/${lang}/privacy-policy`,
      siteName: 'Sof Car Rental',
      title,
      description,
      images: [
        {
          url: '/favicon.png',
          width: 1200,
          height: 630,
          alt: 'Sof Car Rental Privacy Policy',
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
      canonical: `https://sof-car.eu/${lang}/privacy-policy`,
      languages: {
        en: '/en/privacy-policy',
        bg: '/bg/privacy-policy',
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

export default function PrivacyPolicyPageRoute() {
  return <PrivacyPolicyPage />;
}
