import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Montserrat, Marcellus, Tajawal, Aref_Ruqaa } from 'next/font/google';
import { locales, isLocale, dir, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import '../globals.css';

/* ── Latin ─────────────────────────────────────────────── */

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
});

/**
 * Brand display face is Romelio Sans (licensed, not on Google Fonts).
 * Marcellus carries the same flared-serif proportions and acts as the loaded
 * fallback — drop the real file into /public/fonts and uncomment the
 * @font-face in globals.css to switch over without touching any component.
 */
const marcellus = Marcellus({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-romelio',
});

/* ── Arabic ────────────────────────────────────────────── */

/** Body face for Arabic — Montserrat has no Arabic glyphs. Tajawal is the
    warm, highly legible counterpart to Montserrat's geometry. */
const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-tajawal',
});

/** Display face for Arabic — a calligraphic ruqaa, the elegant counterpart to
    Marcellus's flared serif. Headings only; it is too ornate for body text. */
const arefRuqaa = Aref_Ruqaa({
  subsets: ['arabic'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-aref',
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = getDictionary(lang);

  return {
    title: d.meta.title,
    description: d.meta.description,
    keywords: [
      'Haven Specialty Coffee',
      'havenroasters',
      'specialty coffee Cairo',
      'Zamalek café',
      'coffee shop Zamalek',
      'قهوة مختصة القاهرة',
      'كافيه الزمالك',
      'هيفن',
    ],
    openGraph: {
      title: d.meta.title,
      description: d.meta.description,
      type: 'website',
      locale: lang === 'ar' ? 'ar_EG' : 'en_EG',
    },
    alternates: {
      canonical: `/${lang}`,
      languages: { en: '/en', ar: '/ar' },
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#F9D9B9',
};

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale: Locale = lang;

  // Only the fonts for the active language are requested.
  const fontVars =
    locale === 'ar'
      ? `${tajawal.variable} ${arefRuqaa.variable}`
      : `${montserrat.variable} ${marcellus.variable}`;

  return (
    <html lang={locale} dir={dir(locale)} className={fontVars}>
      <body>{children}</body>
    </html>
  );
}
