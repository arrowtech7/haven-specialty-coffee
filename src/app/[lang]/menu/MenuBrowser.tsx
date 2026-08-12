'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { menu, allItems, pick } from '@/data/menu';
import { localePath, formatPrice, type Locale } from '@/i18n/config';
import { t as fill, type Dictionary } from '@/i18n';
import styles from './menu.module.css';

const totalItems = allItems.length;

type Props = {
  lang: Locale;
  t: Dictionary['menuPage'];
  tags: Dictionary['tags'];
};

export default function MenuBrowser({ lang, t, tags }: Props) {
  const [active, setActive] = useState(menu[0].id);
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return null;
    // Search both languages, so "pistachio" and "فستق" both work either way round.
    return allItems.filter((i) =>
      [i.name.en, i.name.ar, i.desc.en, i.desc.ar, i.categoryTitle.en, i.categoryTitle.ar].some(
        (field) => field.toLowerCase().includes(q)
      )
    );
  }, [q]);

  const group = menu.find((g) => g.id === active) ?? menu[0];

  const resultLabel = (count: number) =>
    count === 0
      ? fill(t.noMatches, { query })
      : count === 1
        ? fill(t.matchOne, { query })
        : fill(t.matches, { count, query });

  return (
    <>
      {/* ── Page head ───────────────────────────────── */}
      <header className={styles.head}>
        <div className={styles.headInner}>
          <p className="section-label section-label-center">{t.eyebrow}</p>
          <h1 className={`display-title ${styles.title}`}>
            {t.titleBefore} <span className="accent">{t.titleAccent}</span>
          </h1>
          <p className={styles.lede}>{fill(t.lede, { count: totalItems })}</p>

          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
            <input
              type="search"
              className={styles.search}
              placeholder={t.searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label={t.searchAria}
            />
            {query && (
              <button className={styles.clear} onClick={() => setQuery('')} aria-label={t.clear}>
                ✕
              </button>
            )}
          </div>

          <p className={styles.qrHint}>
            {t.qrHintBefore}{' '}
            <Link href={localePath(lang, '/m')} className={styles.qrLink}>
              {t.qrHintLink}
            </Link>{' '}
            {t.qrHintAfter}
          </p>
        </div>
      </header>

      {/* ── Category bar ────────────────────────────── */}
      {!q && (
        <div className={styles.tabBar}>
          <div className={styles.tabBarInner} role="tablist" aria-label={t.sectionsAria}>
            {menu.map((g) => (
              <button
                key={g.id}
                role="tab"
                aria-selected={active === g.id}
                className={`${styles.tab} ${active === g.id ? styles.tabActive : ''}`}
                onClick={() => setActive(g.id)}
              >
                <span aria-hidden="true">{g.emoji}</span>
                {pick(g.label, lang)}
                <span className={styles.tabCount}>
                  {g.categories.reduce((n, c) => n + c.items.length, 0)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Body ────────────────────────────────────── */}
      <main className={styles.body}>
        {results ? (
          <section className={styles.results}>
            <p className={styles.resultsCount}>{resultLabel(results.length)}</p>

            {results.length === 0 ? (
              <p className={styles.empty}>
                {t.emptyBefore}{' '}
                <button className={styles.linkBtn} onClick={() => setQuery('')}>
                  {t.emptyLink}
                </button>
                .
              </p>
            ) : (
              <ul className={styles.itemGrid}>
                {results.map((item) => (
                  <li key={`${item.groupId}-${item.name.en}`} className={styles.item}>
                    <div className={styles.itemMain}>
                      <h3 className={styles.itemName}>
                        {pick(item.name, lang)}
                        {item.tag && <span className={`tag tag-${item.tag}`}>{tags[item.tag]}</span>}
                      </h3>
                      <p className={styles.itemDesc}>{pick(item.desc, lang)}</p>
                      <p className={styles.itemFrom}>
                        {pick(item.groupLabel, lang)} · {pick(item.categoryTitle, lang)}
                      </p>
                    </div>
                    <span className={styles.price}>{formatPrice(item.price, lang)}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : (
          <section key={group.id} className={styles.groupPanel}>
            {group.categories.map((cat) => (
              <div key={cat.id} className={styles.category} id={cat.id}>
                <div className={styles.catHead}>
                  <div>
                    <h2 className={styles.catTitle}>{pick(cat.title, lang)}</h2>
                    <p className={styles.catTagline}>{pick(cat.tagline, lang)}</p>
                  </div>
                  <span className={styles.catCount}>
                    {fill(t.itemCount, { count: cat.items.length })}
                  </span>
                </div>

                <ul className={styles.itemGrid}>
                  {cat.items.map((item) => (
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
              </div>
            ))}
          </section>
        )}

        {/* Availability */}
        <div className={styles.modes}>
          <p className={styles.modesLabel}>{t.availableFor}</p>
          <div className={styles.chips}>
            {t.modes.map((m) => (
              <span key={m} className={styles.chip}>
                {m}
              </span>
            ))}
          </div>
          <p className={styles.modesNote}>{t.modesNote}</p>
        </div>
      </main>
    </>
  );
}
