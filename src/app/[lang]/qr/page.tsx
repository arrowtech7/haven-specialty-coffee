import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import QrPoster from './QrPoster';

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/qr'>): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = getDictionary(lang);

  return {
    title: d.meta.qrPageTitle,
    description: d.meta.qrPageDescription,
    robots: { index: false, follow: false },
  };
}

export default async function QrPage({ params }: PageProps<'/[lang]/qr'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang);

  return <QrPoster lang={lang} t={d.qrPage} />;
}
