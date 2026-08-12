import Link from 'next/link';
import QrCode from './QrCode';
import Reveal from './Reveal';
import { localePath, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n';
import styles from './QrCta.module.css';

type Props = { lang: Locale; t: Dictionary['qrCta'] };

export default function QrCta({ lang, t }: Props) {
  return (
    <section className={styles.section} aria-labelledby="qr-heading">
      <div className={`section-inner ${styles.inner}`}>
        <Reveal className={styles.copy}>
          <p className={`section-label ${styles.label}`}>{t.label}</p>
          <h2 id="qr-heading" className={`display-title ${styles.heading}`}>
            {t.headingBefore} <span className={styles.accent}>{t.headingAccent}</span>
          </h2>
          <p className={styles.sub}>{t.sub}</p>

          <ol className={styles.steps}>
            {t.steps.map((s, i) => (
              <li key={s.title} className={styles.step}>
                <span className={styles.stepNum}>{`0${i + 1}`}</span>
                <div>
                  <strong>{s.title}</strong>
                  <span>{s.desc}</span>
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.actions}>
            <Link href={localePath(lang, '/m')} className="btn btn-cream">
              {t.openMenu}
            </Link>
            <Link href={localePath(lang, '/qr')} className={styles.secondary}>
              {t.printable}
              <svg className="dir-flip" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </Reveal>

        {/* QR card */}
        <Reveal delay={120} className={styles.cardWrap}>
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <span className={styles.brand}>
                Haven
                <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="currentColor" />
                </svg>
              </span>
              <span className={styles.cardTag}>{t.cardTag}</span>
            </div>

            <QrCode path={localePath(lang, '/m')} size={188} className={styles.qr} />

            <p className={styles.cardFoot}>{t.cardFoot}</p>
          </div>

          <span className={styles.cornerA} aria-hidden="true" />
          <span className={styles.cornerB} aria-hidden="true" />
        </Reveal>
      </div>
    </section>
  );
}
