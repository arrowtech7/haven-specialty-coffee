'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import LangSwitch from '@/components/LangSwitch';
import { menu, allItems, pick } from '@/data/menu';
import { localePath, formatPrice, type Locale } from '@/i18n/config';
import { t as fill, type Dictionary } from '@/i18n';
import styles from './m.module.css';

/** Flattened category list — the QR menu is one long scroll, not tabs. */
const sections = menu.flatMap((g) =>
  g.categories.map((c) => ({ ...c, groupId: g.id, groupLabel: g.label, emoji: g.emoji }))
);

type Props = {
  lang: Locale;
  t: Dictionary['qrMenu'];
  nav: Dictionary['nav'];
  tags: Dictionary['tags'];
};

export default function QrMenu({ lang, t, nav, tags }: Props) {
  const [query, setQuery] = useState('');
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [searchOpen, setSearchOpen] = useState(false);

  const chipBarRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return null;
    return allItems.filter((i) =>
      [i.name.en, i.name.ar, i.desc.en, i.desc.ar].some((field) =>
        field.toLowerCase().includes(q)
      )
    );
  }, [q]);

  // Highlight the chip for whichever section is currently under the header.
  useEffect(() => {
    if (q) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-150px 0px -65% 0px', threshold: 0 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [q]);

  // Keep the active chip in view as you scroll the menu.
  useEffect(() => {
    const bar = chipBarRef.current;
    const chip = bar?.querySelector<HTMLElement>(`[data-chip="${activeSection}"]`);
    if (!bar || !chip) return;
    bar.scrollTo({
      left: chip.offsetLeft - bar.clientWidth / 2 + chip.clientWidth / 2,
      behavior: 'smooth',
    });
  }, [activeSection]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  return (
    <div className={styles.shell}>
      {/* ── Header ──────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <Link href={localePath(lang)} className={styles.brand}>
            <span className={styles.brandName}>Haven</span>
            <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="currentColor" />
            </svg>
          </Link>

          <div className={styles.headerMeta}>
            <span className={styles.open}>
              <span className={styles.dot} aria-hidden="true" />
              {t.hours}
            </span>

            <LangSwitch lang={lang} label={nav.switchLanguage} className={styles.lang} />

            <button
              className={styles.iconBtn}
              onClick={() => {
                setSearchOpen((s) => !s);
                if (searchOpen) setQuery('');
              }}
              aria-label={searchOpen ? t.closeSearch : t.openSearch}
              aria-expanded={searchOpen}
            >
              {searchOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.5" y1="16.5" x2="21" y2="21" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className={styles.searchRow}>
            <input
              ref={searchRef}
              type="search"
              className={styles.search}
              placeholder={t.searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label={t.searchAria}
            />
          </div>
        )}

        {!q && (
          <div className={styles.chipBar} ref={chipBarRef}>
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                data-chip={s.id}
                className={`${styles.chip} ${activeSection === s.id ? styles.chipActive : ''}`}
              >
                <span aria-hidden="true">{s.emoji}</span>
                {pick(s.title, lang)}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ── Menu body ───────────────────────────────── */}
      <main className={styles.main}>
        {results ? (
          <section className={styles.section}>
            <p className={styles.resultCount}>
              {results.length === 0
                ? fill(t.noResults, { query })
                : results.length === 1
                  ? t.resultOne
                  : fill(t.results, { count: results.length })}
            </p>
            <ul className={styles.items}>
              {results.map((item) => (
                <li key={`${item.groupId}-${item.name.en}`} className={styles.item}>
                  <div className={styles.itemMain}>
                    <h3 className={styles.itemName}>
                      {pick(item.name, lang)}
                      {item.tag && <span className={`tag tag-${item.tag}`}>{tags[item.tag]}</span>}
                    </h3>
                    <p className={styles.itemDesc}>{pick(item.desc, lang)}</p>
                    <p className={styles.itemFrom}>{pick(item.categoryTitle, lang)}</p>
                  </div>
                  <span className={styles.price}>{formatPrice(item.price, lang)}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <>
            <div className={styles.welcome}>
              <h1 className={`display-title ${styles.welcomeTitle}`}>{t.welcome}</h1>
              <p className={styles.welcomeSub}>{t.welcomeSub}</p>
            </div>

            {sections.map((s) => (
              <section key={s.id} id={s.id} className={styles.section}>
                <div className={styles.sectionHead}>
                  <h2 className={styles.sectionTitle}>
                    <span aria-hidden="true">{s.emoji}</span>
                    {pick(s.title, lang)}
                  </h2>
                  <p className={styles.sectionTagline}>{pick(s.tagline, lang)}</p>
                </div>

                <ul className={styles.items}>
                  {s.items.map((item) => (
                    <li key={item.name.en} className={styles.item}>
                      <div className={styles.itemMain}>
                        <h3 className={styles.itemName}>
                          {pick(item.name, lang)}
                          {item.tag && (
                            <span className={`tag tag-${item.tag}`}>{tags[item.tag]}</span>
                          )}
                        </h3>
                        <p className={styles.itemDesc}>{pick(item.desc, lang)}</p>
                      </div>
                      <span className={styles.price}>{formatPrice(item.price, lang)}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            <div className={styles.outro}>
              <p className={styles.outroNote}>{t.outroNote}</p>
              <Link href={localePath(lang)} className={styles.outroLink}>
                {t.outroLink}
              </Link>
            </div>
          </>
        )}
      </main>

      {/* ── Sticky actions ──────────────────────────── */}
      <nav className={styles.actionBar} aria-label={t.contactAria}>
        <a href="tel:+201023878913" className={styles.action}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6.29 6.29l1.69-1.69a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          {t.call}
        </a>

        <a
          href="https://maps.google.com/?q=21+Mohammed+Mazhar+Zamalek+Cairo"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {t.directions}
        </a>

        <a
          href="https://www.instagram.com/havenroasters/"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.action} ${styles.actionPrimary}`}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
          {t.follow}
        </a>
      </nav>
    </div>
  );
}
