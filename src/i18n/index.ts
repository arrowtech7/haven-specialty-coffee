import en, { type Dictionary } from './dictionaries/en';
import ar from './dictionaries/ar';
import type { Locale } from './config';

const dictionaries: Record<Locale, Dictionary> = { en, ar };

/**
 * Dictionaries are plain objects rather than dynamic imports so they can be
 * handed straight to Client Components as props — the site is fully static and
 * both languages together are a few kilobytes.
 */
export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];

/** Replaces {placeholders} in a dictionary string. */
export const t = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (match, key) =>
    key in values ? String(values[key]) : match
  );

export type { Dictionary };
export * from './config';
