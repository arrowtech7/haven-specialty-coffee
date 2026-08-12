import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MenuBrowser from './MenuBrowser';

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/menu'>): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = getDictionary(lang);

  return {
    title: d.meta.menuTitle,
    description: d.meta.menuDescription,
    openGraph: { title: d.meta.menuTitle, description: d.meta.menuDescription, type: 'website' },
    alternates: { canonical: `/${lang}/menu`, languages: { en: '/en/menu', ar: '/ar/menu' } },
  };
}

export default async function MenuPage({ params }: PageProps<'/[lang]/menu'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang);

  return (
    <div className="frame">
      <Navbar lang={lang} t={d.nav} />
      <div className="sheet">
        <MenuBrowser lang={lang} t={d.menuPage} tags={d.tags} />
        <Footer lang={lang} t={d.footer} />
      </div>
    </div>
  );
}
