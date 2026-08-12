'use client';

import Link from 'next/link';
import QrCode from '@/components/QrCode';
import { localePath, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n';
import styles from './qr.module.css';

type Props = { lang: Locale; t: Dictionary['qrPage'] };

export default function QrPoster({ lang, t }: Props) {
  return (
    <div className={styles.page}>
      {/* ── Controls (screen only) ──────────────────── */}
      <div className={styles.intro}>
        <Link href={localePath(lang)} className={styles.back}>
          <svg className="dir-flip" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          {t.back}
        </Link>

        <h1 className={`display-title ${styles.title}`}>
          {t.titleBefore} <span className="accent">{t.titleAccent}</span>
        </h1>
        <p className={styles.lede}>{t.lede}</p>

        <button className={`btn btn-primary ${styles.printBtn}`} onClick={() => window.print()}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          {t.print}
        </button>
      </div>

      {/* ── The printable card ──────────────────────── */}
      <div className={styles.tent}>
        <div className={styles.tentTop}>
          <span className={styles.brand}>
            Haven
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="currentColor" />
            </svg>
          </span>
          <span className={styles.brandSub}>{t.brandSub}</span>
        </div>

        <p className={styles.instruction}>{t.instruction}</p>

        <QrCode path={localePath(lang, '/m')} size={260} className={styles.qr} showUrl />

        <div className={styles.tentFoot}>
          <p>{t.footNote}</p>
          <p className={styles.hours}>{t.hours}</p>
        </div>
      </div>

      <p className={styles.tip}>{t.tip}</p>
    </div>
  );
}
