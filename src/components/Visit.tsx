'use client';

import { useSyncExternalStore } from 'react';
import type { Dictionary } from '@/i18n';
import styles from './Visit.module.css';

/* The weekday is read from the visitor's own clock, not baked in at build
   time — the server snapshot is -1 so nothing is highlighted until hydration. */
const subscribeToNothing = () => () => {};
/** 0 = Monday … 6 = Sunday, matching the order of `visit.days`. */
const getWeekdayIndex = () => (new Date().getDay() + 6) % 7;
const getServerWeekdayIndex = () => -1;

type Props = { t: Dictionary['visit'] };

export default function Visit({ t }: Props) {
  const today = useSyncExternalStore(
    subscribeToNothing,
    getWeekdayIndex,
    getServerWeekdayIndex
  );

  return (
    <section className={`section ${styles.section}`} id="visit" aria-labelledby="visit-heading">
      <div className="section-inner">
        <div className={styles.header}>
          <p className="section-label">{t.label}</p>
          <h2 id="visit-heading" className={`display-title ${styles.heading}`}>
            {t.headingBefore}
            <br />
            <span className="accent">{t.headingAccent}</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {/* Left: info */}
          <div className={styles.infoCol}>
            {/* Address */}
            <div className={styles.infoBlock}>
              <div className={styles.infoIcon} aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <p className={styles.infoLabel}>{t.address}</p>
                <p className={styles.infoValue}>{t.addressLine1}</p>
                <p className={styles.infoSub}>{t.addressLine2}</p>
                <a
                  id="get-directions-link"
                  href="https://maps.google.com/?q=21+Mohammed+Mazhar+Zamalek+Cairo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapLink}
                >
                  {t.directions} <span className="dir-flip-text">→</span>
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className={styles.infoBlock}>
              <div className={styles.infoIcon} aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6.29 6.29l1.69-1.69a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <p className={styles.infoLabel}>{t.phone}</p>
                <a id="phone-link" href="tel:+201023878913" className={styles.infoValue} dir="ltr">
                  010 2387 8913
                </a>
              </div>
            </div>

            {/* Instagram */}
            <div className={styles.infoBlock}>
              <div className={styles.infoIcon} aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div>
                <p className={styles.infoLabel}>{t.instagram}</p>
                <a
                  id="instagram-visit-link"
                  href="https://www.instagram.com/havenroasters/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.infoValue}
                  dir="ltr"
                >
                  @havenroasters
                </a>
              </div>
            </div>
          </div>

          {/* Right: hours + map */}
          <div className={styles.rightCol}>
            <div className={styles.hoursCard}>
              <h3 className={styles.hoursTitle}>{t.openingHours}</h3>
              <ul className={styles.hoursList}>
                {t.days.map((day, i) => (
                  <li
                    key={day}
                    className={`${styles.hoursRow} ${i === today ? styles.today : ''}`}
                    aria-current={i === today ? 'true' : undefined}
                  >
                    <span className={styles.hoursDay}>
                      {i === today && <span className={styles.todayDot} aria-hidden="true" />}
                      {day}
                      {i === today && <span className={styles.todayBadge}>{t.today}</span>}
                    </span>
                    <span className={styles.hoursTime}>{t.hours}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="https://maps.google.com/?q=21+Mohammed+Mazhar+Zamalek+Cairo"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapPlaceholder}
              aria-label={t.mapAria}
            >
              <div className={styles.mapContent}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <strong>{t.addressLine1}</strong>
                  <span>{t.openMaps}</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
