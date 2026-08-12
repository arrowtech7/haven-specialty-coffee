'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { locales, localeShort, swapLocale, type Locale } from '@/i18n/config';

type Props = {
  lang: Locale;
  label: string;
  className?: string;
};

/**
 * Toggles between the two locales, keeping the visitor on the same page.
 * The choice is remembered in a cookie so `proxy.ts` honours it next time
 * they land on a URL without a locale prefix.
 */
export default function LangSwitch({ lang, label, className = '' }: Props) {
  const pathname = usePathname() || `/${lang}`;
  const next = (locales.find((l) => l !== lang) ?? lang) as Locale;

  const remember = () => {
    document.cookie = `lang=${next}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <Link
      href={swapLocale(pathname, next)}
      onClick={remember}
      className={className}
      aria-label={label}
      title={label}
      hrefLang={next}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" />
        <path d="M2.5 12h19" />
        <path d="M12 2.5c2.6 2.8 4 6 4 9.5s-1.4 6.7-4 9.5c-2.6-2.8-4-6-4-9.5s1.4-6.7 4-9.5z" />
      </svg>
      {localeShort[next]}
    </Link>
  );
}
