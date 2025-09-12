import React from 'react';
import { BookingPageClient } from '../../../components/BookingPageClient';
import { Metadata } from 'next';

// Generate static params for static export
export async function generateStaticParams() {
  return [{ lang: 'bg' }, { lang: 'en' }];
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const isBg = resolvedParams.lang === 'bg';

  return {
    title: isBg
      ? 'Резервация на автомобил | SOF Car'
      : 'Car Rental Booking | SOF Car',
    description: isBg
      ? 'Резервирайте вашия автомобил онлайн. Бърза и лесна резервация с най-добри цени в София.'
      : 'Book your car rental online. Fast and easy booking with the best prices in Sofia.',
    keywords: isBg
      ? 'резервация автомобил, наем кола, софия, българия, онлайн резервация'
      : 'car rental booking, car hire, sofia, bulgaria, online booking',
    openGraph: {
      title: isBg
        ? 'Резервация на автомобил | SOF Car'
        : 'Car Rental Booking | SOF Car',
      description: isBg
        ? 'Резервирайте вашия автомобил онлайн. Бърза и лесна резервация с най-добри цени в София.'
        : 'Book your car rental online. Fast and easy booking with the best prices in Sofia.',
      type: 'website',
      locale: isBg ? 'bg_BG' : 'en_US',
      siteName: 'SOF Car',
    },
    twitter: {
      card: 'summary_large_image',
      title: isBg
        ? 'Резервация на автомобил | SOF Car'
        : 'Car Rental Booking | SOF Car',
      description: isBg
        ? 'Резервирайте вашия автомобил онлайн. Бърза и лесна резервация с най-добри цени в София.'
        : 'Book your car rental online. Fast and easy booking with the best prices in Sofia.',
    },
    alternates: {
      canonical: `https://sof-car.eu/${resolvedParams.lang}/booking`,
      languages: {
        bg: 'https://sof-car.eu/bg/booking',
        en: 'https://sof-car.eu/en/booking',
      },
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
  };
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  return <BookingPageClient lang={resolvedParams.lang} />;
}
