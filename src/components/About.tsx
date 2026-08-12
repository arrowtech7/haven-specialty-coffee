import Image from 'next/image';
import Link from 'next/link';
import Reveal from './Reveal';
import { localePath, type Locale } from '@/i18n/config';
import { asset } from '@/lib/asset';
import type { Dictionary } from '@/i18n';
import styles from './About.module.css';

const pillarIcons = [
  (
    <svg key="coffee" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <path d="M6 1v3M10 1v3M14 1v3" />
    </svg>
  ),
  (
    <svg key="dessert" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17h18v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      <path d="M4 17a8 8 0 0 1 16 0" />
      <path d="M12 5v4M9 6.5 12 9l3-2.5" />
    </svg>
  ),
  (
    <svg key="tea" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6Z" />
      <path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17" />
      <path d="M8 3c0 1.5 1 2 1 3.5M12 2.5c0 1.5 1 2 1 3.5" />
    </svg>
  ),
];

type Props = { lang: Locale; t: Dictionary['about'] };

export default function About({ lang, t }: Props) {
  return (
    <section className={`section ${styles.about}`} id="about" aria-labelledby="about-heading">
      <div className="section-inner">
        <div className={styles.grid}>
          {/* ── Photo collage ─────────────────────────── */}
          <Reveal className={styles.gallery}>
            <div className={styles.photoMain}>
              <Image
                src={asset('/photo-interior.jpg')}
                alt={t.photoAlt.interior}
                fill
                sizes="(max-width: 900px) 92vw, 44vw"
                className={styles.photoImg}
              />
            </div>

            <div className={styles.photoSmall}>
              <Image
                src={asset('/photo-latte.jpg')}
                alt={t.photoAlt.latte}
                fill
                sizes="(max-width: 900px) 44vw, 22vw"
                className={styles.photoImg}
              />
            </div>

            <div className={styles.photoTall}>
              <Image
                src={asset('/photo-terrace.jpg')}
                alt={t.photoAlt.terrace}
                fill
                sizes="(max-width: 900px) 44vw, 22vw"
                className={styles.photoImg}
              />
            </div>

            {/* Est. stamp */}
            <div className={styles.stamp} aria-hidden="true">
              <span className={styles.stampTop}>{t.stampTop}</span>
              <strong>21</strong>
              <span className={styles.stampBottom}>{t.stampBottom}</span>
            </div>
          </Reveal>

          {/* ── Text ──────────────────────────────────── */}
          <div className={styles.textCol}>
            <Reveal>
              <p className="section-label">{t.label}</p>
              <h2 id="about-heading" className={`display-title ${styles.heading}`}>
                {t.headingBefore} <span className="accent">{t.headingAccent}</span>{' '}
                {t.headingAfter}
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <p className={styles.body}>{t.body1}</p>
              <p className={styles.body}>{t.body2}</p>
            </Reveal>

            <Reveal delay={140} className={styles.pillars}>
              {t.pillars.map((p, i) => (
                <div key={p.title} className={styles.pillar}>
                  <span className={styles.pillarIcon} aria-hidden="true">{pillarIcons[i]}</span>
                  <div>
                    <h3 className={styles.pillarTitle}>{p.title}</h3>
                    <p className={styles.pillarDesc}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </Reveal>

            <Reveal delay={200}>
              <Link href={localePath(lang, '/menu')} className={`btn btn-ghost ${styles.cta}`}>
                {t.cta}
                <svg className="dir-flip" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
