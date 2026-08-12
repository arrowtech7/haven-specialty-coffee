import { NextResponse, type NextRequest } from 'next/server';
import { locales, defaultLocale } from '@/i18n/config';

/**
 * Sends locale-less URLs to a language. Preference order:
 *   1. a `lang` cookie set by the in-page language switcher
 *   2. the browser's Accept-Language header
 *   3. English
 *
 * (In Next 16 this file convention is `proxy`, not `middleware`.)
 */
function resolveLocale(request: NextRequest) {
  const fromCookie = request.cookies.get('lang')?.value;
  if (fromCookie && (locales as readonly string[]).includes(fromCookie)) {
    return fromCookie;
  }

  const header = request.headers.get('accept-language') ?? '';
  const prefersArabic = header
    .split(',')
    .some((part) => part.trim().toLowerCase().startsWith('ar'));

  return prefersArabic ? 'ar' : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return;

  request.nextUrl.pathname = `/${resolveLocale(request)}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals and anything that looks like a static file.
  matcher: ['/((?!_next|.*\\..*).*)'],
};
