'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import LangSwitch from './LangSwitch';
import { localePath, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n';
import styles from './Navbar.module.css';

type Props = { lang: Locale; t: Dictionary['nav'] };

export default function Navbar({ lang, t }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: t.home, href: localePath(lang) },
    { label: t.ourCoffee, href: `${localePath(lang)}/#signature` },
    { label: t.about, href: `${localePath(lang)}/#about` },
    { label: t.menu, href: localePath(lang, '/menu') },
    { label: t.reviews, href: `${localePath(lang)}/#reviews` },
    { label: t.visit, href: `${localePath(lang)}/#visit` },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className={styles.wrap}>
      <header className={`${styles.bar} ${scrolled ? styles.scrolled : ''}`}>
        <Link href={localePath(lang)} className={styles.logo} aria-label={t.homeAria}>
          <span className={styles.logoText}>Haven</span>
          <svg className={styles.star} width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"
              fill="currentColor"
            />
          </svg>
        </Link>

        <nav className={styles.links} aria-label="Main">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className={styles.link}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className={styles.right}>
          <LangSwitch lang={lang} label={t.switchLanguage} className={styles.lang} />

          <Link href={`${localePath(lang)}/#visit`} className={styles.contact}>
            {t.contact}
          </Link>

          <button
            className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? t.closeMenu : t.openMenu}
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}>
        <nav className={styles.drawerNav} aria-label="Mobile">
          {navLinks.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className={styles.drawerLink}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: `${open ? 60 + i * 45 : 0}ms` }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={localePath(lang, '/menu')}
            className={`btn btn-primary ${styles.drawerCta}`}
            onClick={() => setOpen(false)}
          >
            {t.viewFullMenu}
          </Link>

          <div className={styles.drawerFoot}>
            <span className={styles.drawerHours}>{t.openDaily}</span>
            <a href="tel:+201023878913">010 2387 8913</a>
            <span>{t.address}</span>
          </div>
        </nav>
      </div>
    </div>
  );
}
