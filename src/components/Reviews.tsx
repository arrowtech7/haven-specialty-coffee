'use client';

import { useRef } from 'react';
import { t as fill, type Dictionary } from '@/i18n';
import styles from './Reviews.module.css';

/* ── Data ──────────────────────────────────────────────── */

const OVERALL = { rating: 4.4, count: 425 };

/**
 * How many times each row's reviews are repeated in the track.
 * The CSS slides the track by exactly 1/COPIES of its width, so one full copy
 * must be at least as wide as the widest viewport we care about.
 */
const COPIES = 3;

const reviews = [
  {
    name: 'N W',
    badge: 'Local Guide',
    rating: 5,
    date: 'a month ago',
    text: 'My absolute favorite spot in Cairo 🙂 I have to go there at least once a week for their pistachio latte. Amazing coffee, great atmosphere & super nice staff 💕 Be sure to try their breakfast menu — it\'s THAT good.',
    highlight: 'pistachio latte',
  },
  {
    name: 'Nora Shoieb',
    badge: 'Local Guide',
    rating: 5,
    date: 'a year ago',
    text: 'I\'ve added this place to my favorites after my experience. Turkey and cheese croissant was flakey and delicious. The omelette was very tasty. Coffee was mouthwatering. Iced Spanish latte was the best I\'ve ever had.',
    highlight: 'iced Spanish latte',
  },
  {
    name: 'Veronica Sameh',
    badge: null,
    rating: 5,
    date: '11 months ago',
    text: 'The place is super nice, the people were very friendly, and when it comes to food it was DELICIOUS, high quality. We ordered iced latte, Spanish latte and cappuccino — they were amazing. Breakfast sandwiches were great and their croissant dessert is a must have. 10/10',
    highlight: 'Spanish latte',
  },
  {
    name: 'Hager Tarek',
    badge: null,
    rating: 5,
    date: '10 months ago',
    text: 'The best Spanish latte I\'ve ever had! Perfectly balanced flavor — not too sweet, not too strong — and the place has such a cozy vibe.',
    highlight: 'Spanish latte',
  },
  {
    name: 'Aisha Saber',
    badge: 'Local Guide',
    rating: 5,
    date: 'a year ago',
    text: 'I feel like this place should have a higher rating. I ordered a flat white and a Spanish omelette and they both were absolutely delicious! The young lady that took my order was unbelievably sweet and attentive.',
    highlight: 'flat white',
  },
  {
    name: 'Yahia Mohamed',
    badge: 'Local Guide',
    rating: 5,
    date: '3 months ago',
    text: 'Amazing café in Zamalek with a very cozy atmosphere and great service. The whole team was friendly and professional. Definitely coming back again 👌',
    highlight: 'cozy atmosphere',
  },
  {
    name: 'Abdulwahab Abdullah',
    badge: 'Local Guide',
    rating: 5,
    date: '4 months ago',
    text: 'The barista Omar has impeccable character and real passion for coffee. One of the best espressos I\'ve had in the world — creamy, no bitterness. The cinnamon roll was absolutely incredible.',
    highlight: 'espresso',
  },
  {
    name: 'Reem Mohamed Amr',
    badge: 'Local Guide',
    rating: 5,
    date: 'a year ago',
    text: 'We went there on Friday morning and it was a little crowded, but the atmosphere was cozy. Turkey cheese omelette: 10/10. Brioche French toast: 10/10.',
    highlight: 'French toast',
  },
  {
    name: 'Serena Haney',
    badge: 'Local Guide',
    rating: 5,
    date: '3 years ago',
    text: 'Some of the best espresso I had while in Cairo! They have all your traditional espresso drinks and some fantastic sandwiches. The grilled chicken sandwich was excellent and done with a fresh, citrusy dressing.',
    highlight: 'espresso',
  },
  {
    name: 'A Becks',
    badge: 'Local Guide',
    rating: 5,
    date: '2 years ago',
    text: 'Cute little cafe serving breakfast and lunch items and specialty coffee and tea drinks. The staff was very kind and the food was made fresh. They have indoor and outdoor seating.',
    highlight: 'specialty coffee',
  },
  {
    name: 'Hasnaa Elshazly',
    badge: null,
    rating: 5,
    date: '2 years ago',
    text: 'This place is so comfortable and warm it\'s hard to leave. Been there twice and can\'t wait to get back! It truly is a haven. I\'ve tried their Spanish omelette, turkey and cheese croissant and their iced latte — all amazing.',
    highlight: 'haven',
  },
  {
    name: 'Haya',
    badge: 'Local Guide',
    rating: 5,
    date: '2 years ago',
    text: 'Ordered coffees only but was really great! Loved every sip. We had flat white, latte, and cortado. Staff were super friendly. The place is spacious, with lots of light. Definitely recommend!',
    highlight: 'flat white',
  },
  {
    name: 'Hadley Vaca',
    badge: 'Local Guide',
    rating: 4,
    date: '4 months ago',
    text: 'GREAT experience!!! Food 10/10. Omelette / scrambles were really good. Orange juice 9/10 — fresh squeezed. Overall a fantastic breakfast spot.',
    highlight: 'breakfast',
  },
  {
    name: 'Sally Bahgat',
    badge: 'Local Guide',
    rating: 5,
    date: 'a year ago',
    text: 'The perfect place with lovely music and best breakfast. We were welcomed by Mariam and her lovely smile and hospitality. Loved the service and the place — will definitely repeat the experience.',
    highlight: 'breakfast',
  },
  {
    name: 'Dalia Tarek',
    badge: 'Local Guide',
    rating: 5,
    date: 'a year ago',
    text: 'Very delicious coffee attached to the Hilton Hotel. They have alternative options like oat milk. I had an iced latte with oat milk — fantastic.',
    highlight: 'oat milk latte',
  },
];

/* ── Helpers ───────────────────────────────────────────── */

function Stars({ rating, label }: { rating: number; label?: string }) {
  return (
    <div
      className={styles.stars}
      aria-label={label ? fill(label, { rating }) : undefined}
      aria-hidden={label ? undefined : true}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill={n <= rating ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
          className={n <= rating ? styles.starFilled : styles.starEmpty}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  // Pick a consistent tone from the brand palette
  const tones = ['#C6453E', '#5E1F13', '#664C47', '#A8352F', '#8F6B3F'];
  const tone = tones[name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % tones.length];

  return (
    <div
      className={styles.avatar}
      style={{ background: tone }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

/* ── Component ─────────────────────────────────────────── */

export default function Reviews({ t }: { t: Dictionary['reviews'] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  // Split into two rows for the marquee
  const half = Math.ceil(reviews.length / 2);
  const rowA = reviews.slice(0, half);
  const rowB = reviews.slice(half);

  return (
    <section className={`section ${styles.section}`} id="reviews" aria-labelledby="reviews-heading">
      <div className="section-inner">

        {/* Header */}
        <div className={styles.header}>
          <p className="section-label">{t.label}</p>
          <h2 id="reviews-heading" className={`display-title ${styles.heading}`}>
            {t.headingBefore} <span className="accent">{t.headingAccent}</span>
          </h2>

          {/* Overall score */}
          <div className={styles.score}>
            <span className={styles.scoreNum}>{OVERALL.rating}</span>
            <div className={styles.scoreRight}>
              <Stars rating={Math.round(OVERALL.rating)} label={t.starsAria} />
              <span className={styles.scoreCount}>
                {fill(t.onGoogle, { count: OVERALL.count })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width marquee — outside section-inner for edge-to-edge.
          Each row renders COPIES copies of its reviews and slides by exactly
          one copy, so the loop restarts on an identical frame and never seams. */}
      <div className={styles.marqueeWrap} aria-hidden="true" ref={trackRef}>

        {/* Row A — travels left */}
        <div className={styles.marqueeRow}>
          <div className={`${styles.track} ${styles.trackLeft}`}>
            {Array.from({ length: COPIES }).flatMap((_, copy) =>
              rowA.map((r, i) => <Card key={`a-${copy}-${i}`} review={r} />)
            )}
          </div>
        </div>

        {/* Row B — travels right, against row A */}
        <div className={styles.marqueeRow}>
          <div className={`${styles.track} ${styles.trackRight}`}>
            {Array.from({ length: COPIES }).flatMap((_, copy) =>
              rowB.map((r, i) => <Card key={`b-${copy}-${i}`} review={r} />)
            )}
          </div>
        </div>
      </div>

      <div className="section-inner">
        <p className={styles.originalNote}>{t.originalNote}</p>

        <div className={styles.footer}>
          <a
            id="google-reviews-link"
            href="https://maps.google.com/?q=Haven+Specialty+Coffee+Zamalek+Cairo"
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-ghost ${styles.reviewBtn}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            {fill(t.readAll, { count: OVERALL.count })}
          </a>
        </div>
      </div>
    </section>
  );
}

function Card({ review }: { review: typeof reviews[0] }) {
  return (
    /* Reviews stay in the language they were written in, so each card is its
       own LTR island — otherwise Arabic page direction throws the trailing
       full stops, the "#tag" and the dates to the wrong end of the line. */
    <article className={styles.card} dir="ltr">
      <div className={styles.cardTop}>
        <Avatar name={review.name} />
        <div className={styles.cardMeta}>
          <p className={styles.cardName}>{review.name}</p>
          {review.badge && <p className={styles.cardBadge}>{review.badge}</p>}
        </div>
        <Stars rating={review.rating} />
      </div>
      <p className={styles.cardText}>{review.text}</p>
      <div className={styles.cardBottom}>
        <span className={styles.cardHighlight}>#{review.highlight}</span>
        <span className={styles.cardDate}>{review.date}</span>
      </div>
    </article>
  );
}
