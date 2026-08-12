export const locales = ['en', 'ar'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

export const dir = (locale: Locale) => (locale === 'ar' ? 'rtl' : 'ltr');

/** Text shown on the language switcher for the *other* language. */
export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
};

export const localeShort: Record<Locale, string> = {
  en: 'EN',
  ar: 'ع',
};

/** Builds an in-site href for a locale: ('ar', '/menu') → '/ar/menu'. */
export const localePath = (locale: Locale, path = '/') =>
  path === '/' ? `/${locale}` : `/${locale}${path}`;

/** Swaps the locale prefix on the path the visitor is currently viewing. */
export const swapLocale = (pathname: string, next: Locale) => {
  const rest = pathname.replace(/^\/(en|ar)(?=\/|$)/, '');
  return `/${next}${rest}`;
};

/** Prices are written with Western digits in both languages, as Cairo cafés do. */
export const formatPrice = (value: number, locale: Locale) =>
  locale === 'ar' ? `${value} ج.م` : `EGP ${value}`;
