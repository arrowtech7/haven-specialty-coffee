import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { isLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import QrMenu from './QrMenu';

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/m'>): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = getDictionary(lang);

  return {
    title: d.meta.qrMenuTitle,
    description: d.meta.qrMenuDescription,
    robots: { index: false, follow: false },
  };
}

export const viewport: Viewport = {
  themeColor: '#5E1F13',
  // The QR menu is a phone experience — keep it fixed at device width.
  width: 'device-width',
  initialScale: 1,
};

export default async function QrMenuPage({ params }: PageProps<'/[lang]/m'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang);

  return <QrMenu lang={lang} t={d.qrMenu} nav={d.nav} tags={d.tags} />;
}
