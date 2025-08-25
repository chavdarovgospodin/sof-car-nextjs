import React from 'react';
import { BookingPageClient } from '../../../components/BookingPageClient/BookingPageClient';

// Generate static params for static export
export async function generateStaticParams() {
  return [{ lang: 'bg' }, { lang: 'en' }];
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  return <BookingPageClient lang={resolvedParams.lang} />;
}
