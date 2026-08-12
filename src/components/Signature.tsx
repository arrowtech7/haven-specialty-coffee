import Link from 'next/link';
import Reveal from './Reveal';
import { signatures, pick } from '@/data/menu';
import { localePath, formatPrice, type Locale } from '@/i18n/config';
import { t as fill, type Dictionary } from '@/i18n';
import styles from './Signature.module.css';

/** Simple cup glyph, tinted per card. */
function CupGlyph({ tone }: { tone: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={styles.glyph}>
      <ellipse cx="32" cy="55" rx="19" ry="4" fill="rgba(94,31,19,0.12)" />
      <path d="M16 18h32l-3.5 30a7 7 0 0 1-7 6.2H26.5a7 7 0 0 1-7-6.2Z" fill={tone} />
      <path d="M16 18h32l-1 8H17Z" fill="rgba(255,255,255,0.28)" />
      <path d="M47 24h3.5a6.5 6.5 0 0 1 0 13H46" stroke={tone} strokeWidth="3.4" strokeLinecap="round" />
      <path d="M25 6c0 3.5 3 4 3 7.5M33 4.5c0 3.5 3 4 3 7.5M41 6c0 3.5 3 4 3 7.5"
        stroke="rgba(94,31,19,0.28)" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

const tones = ['#C6453E', '#8F6B3F', '#A8352F', '#664C47'];

type Props = {
  lang: Locale;
  t: Dictionary['signature'];
  tags: Dictionary['tags'];
};

export default function Signature({ lang, t, tags }: Props) {
  return (
    <section className={`section ${styles.section}`} id="signature" aria-labelledby="sig-heading">
      <div className="section-inner">
        <Reveal className={styles.header}>
          <p className="section-label section-label-center">{t.label}</p>
          <h2 id="sig-heading" className={`display-title ${styles.heading}`}>
            {t.headingBefore} <span className="accent">{t.headingAccent}</span>
          </h2>
          <p className={styles.sub}>{t.sub}</p>
        </Reveal>

        <div className={styles.grid}>
          {signatures.map((item, i) => {
            const name = pick(item.name, lang);
            return (
              <Reveal key={item.name.en} delay={i * 90}>
                <article className={styles.card}>
                  <div className={styles.cardTop}>
                    <span className={styles.disc} style={{ background: `${tones[i]}1A` }}>
                      <CupGlyph tone={tones[i]} />
                    </span>
                    {item.tag && <span className={`tag tag-${item.tag}`}>{tags[item.tag]}</span>}
                  </div>

                  <h3 className={styles.name}>{name}</h3>
                  <p className={styles.note}>{t.notes[i]}</p>
                  <p className={styles.desc}>{pick(item.desc, lang)}</p>

                  <div className={styles.foot}>
                    <span className={styles.price}>{formatPrice(item.price, lang)}</span>
                    <Link
                      href={localePath(lang, '/menu')}
                      className={styles.link}
                      aria-label={fill(t.seeOnMenu, { name })}
                    >
                      <svg className="dir-flip" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
