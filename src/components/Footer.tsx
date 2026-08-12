import Link from 'next/link';
import { localePath, type Locale } from '@/i18n/config';
import { t as fill, type Dictionary } from '@/i18n';
import styles from './Footer.module.css';

type Props = { lang: Locale; t: Dictionary['footer'] };

export default function Footer({ lang, t }: Props) {
  const year = new Date().getFullYear();
  const base = localePath(lang);

  const quickLinks = [
    { label: t.links.ourCoffee, href: `${base}/#signature` },
    { label: t.links.about, href: `${base}/#about` },
    { label: t.links.fullMenu, href: localePath(lang, '/menu') },
    { label: t.links.qrMenu, href: localePath(lang, '/m') },
    { label: t.links.accessibility, href: `${base}/#good-to-know` },
    { label: t.links.visit, href: `${base}/#visit` },
  ];

  return (
    <footer className={styles.footer} aria-label="Site footer">
      <div className={styles.inner}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logoRow}>
            <span className={styles.mark} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="currentColor" />
              </svg>
            </span>
            <div>
              <p className={styles.brandName}>{t.brandName}</p>
              <p className={styles.brandSub}>{t.brandSub}</p>
            </div>
          </div>
          <p className={styles.tagline}>
            {t.tagline}
            <br />
            <em>{t.taglineEm}</em>
          </p>
          <div className={styles.socials}>
            <a
              href="https://www.instagram.com/havenroasters/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={t.followAria}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>

        {/* Nav */}
        <div className={styles.navBlock}>
          <p className={styles.navHeading}>{t.explore}</p>
          <ul className={styles.navList}>
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className={styles.navLink}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.contactBlock}>
          <p className={styles.navHeading}>{t.contact}</p>
          <address className={styles.address}>
            <a href="tel:+201023878913" className={styles.contactLink} dir="ltr">
              010 2387 8913
            </a>
            <span>{t.brandSub}</span>
            <a
              href="https://maps.google.com/?q=21+Mohammed+Mazhar+Zamalek+Cairo"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              {t.openInMaps} <span className="dir-flip-text">→</span>
            </a>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <p className={styles.copy}>{fill(t.rights, { year })}</p>
        <p className={styles.copy} style={{ opacity: 0.4 }}>
          {t.strapline}
        </p>
      </div>
    </footer>
  );
}
