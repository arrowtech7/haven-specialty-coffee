'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { localePath, type Locale } from '@/i18n/config';
import { asset } from '@/lib/asset';
import type { Dictionary } from '@/i18n';
import styles from './Hero.module.css';

/** Decorative roasted bean. */
function Bean({ className, size = 26 }: { className?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <ellipse cx="16" cy="16" rx="10" ry="13.5" transform="rotate(-28 16 16)" fill="#4A1C0F" />
      <path
        d="M10.6 7.4c3.4 4.2 4.4 12.4 1.6 17.6"
        stroke="#8C4A32"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

const avatars = [
  { initials: 'NW', hue: 12 },
  { initials: 'NS', hue: 350 },
  { initials: 'VS', hue: 24 },
  { initials: 'HT', hue: 4 },
];

type Props = { lang: Locale; t: Dictionary['hero'] };

export default function Hero({ lang, t }: Props) {
  const visualRef = useRef<HTMLDivElement>(null);

  // Light parallax — the cup drifts slower than the page.
  useEffect(() => {
    const el = visualRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--parallax', `${window.scrollY * 0.08}px`);
        frame = 0;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className={styles.hero} id="hero" aria-label="Haven Specialty Coffee">
      {/* Warm blob behind the cup */}
      <div className={styles.blob} aria-hidden="true" />

      {/* Scattered beans */}
      <Bean className={styles.bean1} size={30} />
      <Bean className={styles.bean2} size={20} />
      <Bean className={styles.bean3} size={24} />

      <div className={styles.inner}>
        {/* ── Copy ─────────────────────────────────── */}
        <div className={styles.copy}>
          <p className={`${styles.eyebrow} animate-fade-up`}>
            {t.eyebrow}
            <span className={styles.dots}>....</span>
            <Bean size={16} className={styles.eyebrowBean} />
          </p>

          <h1 className={`display-title ${styles.title} animate-fade-up`}>
            {t.titleLine1}
            <br />
            {t.titleLine2} <span className="accent">{t.titleAccent}</span>
          </h1>

          <p className={`${styles.sub} animate-fade-up`}>{t.sub}</p>

          <div className={`${styles.actions} animate-fade-up`}>
            <Link href={localePath(lang, '/menu')} className="btn btn-primary">
              {t.orderNow}
            </Link>

            <a
              href="https://www.instagram.com/havenroasters/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.play}
            >
              <span className={styles.playCircle} aria-hidden="true">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              {t.seeVibe}
            </a>
          </div>

          {/* Trust row */}
          <div className={`${styles.trust} animate-fade-up`}>
            <div className={styles.trustItem}>
              <strong>4.4</strong>
              <span>
                <span className={styles.stars} aria-hidden="true">★★★★★</span>
                {t.rating}
              </span>
            </div>
            <span className={styles.trustDivide} aria-hidden="true" />
            <div className={styles.trustItem}>
              <strong>{t.hours}</strong>
              <span>{t.hoursLabel}</span>
            </div>
          </div>
        </div>

        {/* ── Visual ───────────────────────────────── */}
        <div className={styles.visual} ref={visualRef}>
          <div className={styles.cupWrap}>
            <Image
              src={asset('/cup.png')}
              alt={t.cupAlt}
              width={850}
              height={930}
              preload
              quality={90}
              sizes="(max-width: 900px) 70vw, 40vw"
              className={styles.cup}
            />
          </div>

          {/* Floating badge — rating */}
          <div className={`${styles.badge} ${styles.badgeTop}`}>
            <strong>{t.since}</strong>
            <span>{t.sinceLabel}</span>
            <span className={styles.badgeStars} aria-hidden="true">★★★★★</span>
          </div>

          {/* Floating badge — customers */}
          <div className={`${styles.badge} ${styles.badgeBottom}`}>
            <span className={styles.badgeLabel}>{t.regulars}</span>
            <div className={styles.avatarRow}>
              {avatars.map((a) => (
                <span
                  key={a.initials}
                  className={styles.avatar}
                  style={{ background: `hsl(${a.hue}, 46%, 42%)` }}
                  aria-hidden="true"
                >
                  {a.initials}
                </span>
              ))}
              <span className={styles.avatarCount}>425+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling ticker at the foot of the hero */}
      <div className={styles.ticker} aria-hidden="true">
        <div className={styles.tickerTrack}>
          {Array.from({ length: 2 }).map((_, dup) => (
            <span key={dup} className={styles.tickerGroup}>
              {t.ticker.map((label) => (
                <span key={label} className={styles.tickerItem}>
                  {label}
                  <Bean size={13} />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
