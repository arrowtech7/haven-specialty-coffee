'use client';

import { useState } from 'react';
import Link from 'next/link';
import { menu, pick } from '@/data/menu';
import { localePath, formatPrice, type Locale } from '@/i18n/config';
import { t as fill, type Dictionary } from '@/i18n';
import styles from './MenuPreview.module.css';

/** How many items to show per category in the landing-page teaser. */
const PREVIEW_COUNT = 4;

type Props = {
  lang: Locale;
  t: Dictionary['menuPreview'];
  tags: Dictionary['tags'];
};

export default function MenuPreview({ lang, t, tags }: Props) {
  const [active, setActive] = useState(menu[0].id);
  const group = menu.find((g) => g.id === active) ?? menu[0];

  const totalItems = menu.reduce(
    (n, g) => n + g.categories.reduce((m, c) => m + c.items.length, 0),
    0
  );

  return (
    <section className={`section ${styles.section}`} id="menu" aria-labelledby="menu-heading">
      <div className="section-inner">
        <div className={styles.header}>
          <div>
            <p className="section-label">{t.label}</p>
            <h2 id="menu-heading" className={`display-title ${styles.heading}`}>
              {t.headingBefore} <span className="accent">{t.headingAccent}</span>
            </h2>
          </div>
          <p className={styles.sub}>{fill(t.sub, { count: totalItems })}</p>
        </div>

        {/* Tabs */}
        <div className={styles.tabs} role="tablist" aria-label={t.categoriesAria}>
          {menu.map((g) => (
            <button
              key={g.id}
              role="tab"
              id={`preview-tab-${g.id}`}
              aria-selected={active === g.id}
              aria-controls={`preview-panel-${g.id}`}
              className={`${styles.tab} ${active === g.id ? styles.tabActive : ''}`}
              onClick={() => setActive(g.id)}
            >
              <span aria-hidden="true">{g.emoji}</span>
              {pick(g.label, lang)}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div
          role="tabpanel"
          id={`preview-panel-${group.id}`}
          aria-labelledby={`preview-tab-${group.id}`}
          className={styles.panel}
          key={group.id}
        >
          {group.categories.slice(0, 2).map((cat) => (
            <div key={cat.id} className={styles.category}>
              <div className={styles.catHead}>
                <h3 className={styles.catTitle}>{pick(cat.title, lang)}</h3>
                <span className={styles.catLine} aria-hidden="true" />
                <span className={styles.catCount}>
                  {fill(t.itemCount, { count: cat.items.length })}
                </span>
              </div>

              <ul className={styles.items}>
                {cat.items.slice(0, PREVIEW_COUNT).map((item) => (
                  <li key={item.name.en} className={styles.item}>
                    <div className={styles.itemHead}>
                      <h4 className={styles.itemName}>
                        {pick(item.name, lang)}
                        {item.tag && <span className={`tag tag-${item.tag}`}>{tags[item.tag]}</span>}
                      </h4>
                      <span className={styles.dotted} aria-hidden="true" />
                      <span className={styles.price}>{formatPrice(item.price, lang)}</span>
                    </div>
                    <p className={styles.desc}>{pick(item.desc, lang)}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <Link href={localePath(lang, '/menu')} className="btn btn-primary">
            {t.viewFull}
            <svg className="dir-flip" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <p className={styles.actionsNote}>{t.note}</p>
        </div>
      </div>
    </section>
  );
}
