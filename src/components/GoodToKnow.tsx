import type { Dictionary } from '@/i18n';
import styles from './GoodToKnow.module.css';

/* ── Line icons (24×24, stroked) ───────────────────────── */

const s = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

const icons = {
  wheelchair: (
    <svg viewBox="0 0 24 24" {...s}>
      <circle cx="12.5" cy="4" r="1.8" />
      <path d="M10.5 7v6h5.5l2.5 6" />
      <path d="M15 13.5a5.5 5.5 0 1 1-5.5-3" />
    </svg>
  ),
  chair: (
    <svg viewBox="0 0 24 24" {...s}>
      <path d="M6 4v7M18 4v7M4.5 11h15M7 11v9M17 11v9M7 16h10" />
    </svg>
  ),
  door: (
    <svg viewBox="0 0 24 24" {...s}>
      <rect x="4.5" y="3" width="15" height="18" rx="2.5" />
      <circle cx="15.5" cy="12" r="1" fill="currentColor" stroke="none" />
      <path d="M9 8.5h2" />
    </svg>
  ),
  parking: (
    <svg viewBox="0 0 24 24" {...s}>
      <rect x="3" y="3" width="18" height="18" rx="4.5" />
      <path d="M9.5 17V7.5h3.2a3 3 0 0 1 0 6H9.5" />
    </svg>
  ),
  ear: (
    <svg viewBox="0 0 24 24" {...s}>
      <path d="M8 9.5a4 4 0 1 1 8 0c0 2.2-2.2 3.2-3.3 4.8-.8 1.2-.5 2.7-1.7 3.2" />
      <path d="M9.5 19.5c.4 1 1.3 1.5 2.5 1.5" />
      <path d="M18.5 5a7 7 0 0 1 1.5 4.5" />
    </svg>
  ),
  wifi: (
    <svg viewBox="0 0 24 24" {...s}>
      <path d="M2.5 8.8a15 15 0 0 1 19 0" />
      <path d="M6 12.4a10 10 0 0 1 12 0" />
      <path d="M9.4 15.9a5 5 0 0 1 5.2 0" />
      <circle cx="12" cy="19.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" {...s}>
      <path d="M13.5 2 5 13.5h6L10.5 22 19 10.5h-6z" />
    </svg>
  ),
  toilet: (
    <svg viewBox="0 0 24 24" {...s}>
      <path d="M6 3v7.5a6 6 0 0 0 12 0V10H6" />
      <path d="M9.5 16.5h5l-.8 4.5h-3.4z" />
    </svg>
  ),
  cone: (
    <svg viewBox="0 0 24 24" {...s}>
      <path d="M8 9.5a4 4 0 0 1 8 0z" />
      <path d="M8.6 9.5 12 21l3.4-11.5" />
      <path d="M10.2 15h3.6" />
    </svg>
  ),
  family: (
    <svg viewBox="0 0 24 24" {...s}>
      <circle cx="9" cy="7.5" r="3" />
      <circle cx="17.5" cy="9" r="2.2" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M15.5 20a4.5 4.5 0 0 1 6-3.8" />
    </svg>
  ),
  car: (
    <svg viewBox="0 0 24 24" {...s}>
      <path d="M5 11.5 6.4 7a2 2 0 0 1 1.9-1.4h7.4A2 2 0 0 1 17.6 7L19 11.5" />
      <rect x="3" y="11.5" width="18" height="5.5" rx="2" />
      <path d="M7 20v-3M17 20v-3" />
    </svg>
  ),
  card: (
    <svg viewBox="0 0 24 24" {...s}>
      <rect x="2.5" y="5" width="19" height="14" rx="3" />
      <path d="M2.5 9.5h19" />
      <path d="M6 15h3" />
    </svg>
  ),
  tap: (
    <svg viewBox="0 0 24 24" {...s}>
      <rect x="3.5" y="2.5" width="10" height="19" rx="3" />
      <path d="M7 18.5h3" />
      <path d="M17 9.5a4 4 0 0 1 0 5" />
      <path d="M19.8 7a8 8 0 0 1 0 10" />
    </svg>
  ),
  umbrella: (
    <svg viewBox="0 0 24 24" {...s}>
      <path d="M12 11v9" />
      <path d="M3 11a9 9 0 0 1 18 0z" />
      <path d="M12 20a2.4 2.4 0 0 0 2.4-2.4" />
    </svg>
  ),
  scooter: (
    <svg viewBox="0 0 24 24" {...s}>
      <circle cx="5.5" cy="17.5" r="2.8" />
      <circle cx="18" cy="17.5" r="2.8" />
      <path d="M8.3 17.5h6.9L13 8H10" />
      <path d="M13.6 10h3.6l1.6 5" />
    </svg>
  ),
  tray: (
    <svg viewBox="0 0 24 24" {...s}>
      <path d="M2.5 18.5h19" />
      <path d="M4 18.5a8 8 0 0 1 16 0" />
      <path d="M12 6.5V5" />
      <circle cx="12" cy="3.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
};

type ItemKey = keyof Dictionary['gtk']['items'];
type CategoryKey = keyof Dictionary['gtk']['categories'];

/** Which icon and which group each fact belongs to; the words come from the dictionary. */
const layout: { category: CategoryKey; items: { key: ItemKey; icon: keyof typeof icons }[] }[] = [
  {
    category: 'accessibility',
    items: [
      { key: 'wheelchairEntrance', icon: 'wheelchair' },
      { key: 'accessibleSeating', icon: 'chair' },
      { key: 'accessibleToilet', icon: 'door' },
      { key: 'accessibleParking', icon: 'parking' },
      { key: 'hearingLoop', icon: 'ear' },
    ],
  },
  {
    category: 'amenities',
    items: [
      { key: 'freeWifi', icon: 'wifi' },
      { key: 'upgradedWifi', icon: 'bolt' },
      { key: 'toiletOnSite', icon: 'toilet' },
    ],
  },
  {
    category: 'family',
    items: [
      { key: 'kidsMenu', icon: 'cone' },
      { key: 'familyFriendly', icon: 'family' },
    ],
  },
  { category: 'parking', items: [{ key: 'freeParking', icon: 'car' }] },
  {
    category: 'payment',
    items: [
      { key: 'cards', icon: 'card' },
      { key: 'tapToPay', icon: 'tap' },
    ],
  },
  {
    category: 'service',
    items: [
      { key: 'outdoorSeating', icon: 'umbrella' },
      { key: 'delivery', icon: 'scooter' },
      { key: 'catering', icon: 'tray' },
    ],
  },
];

type Props = { t: Dictionary['gtk'] };

export default function GoodToKnow({ t }: Props) {
  return (
    <section className={`section ${styles.section}`} id="good-to-know" aria-labelledby="gtk-heading">
      <div className={`section-inner ${styles.layout}`}>
        {/* ── Sticky intro ────────────────────────── */}
        <aside className={styles.aside}>
          <p className="section-label">{t.label}</p>
          <h2 id="gtk-heading" className={`display-title ${styles.heading}`}>
            {t.headingLine1}
            <br />
            <span className="accent">{t.headingLine2}</span>
          </h2>
          <p className={styles.sub}>{t.sub}</p>

          <div className={styles.a11yCallout} role="note">
            <span className={styles.a11yIcon} aria-hidden="true">{icons.wheelchair}</span>
            <div>
              <strong>{t.calloutTitle}</strong>
              <p>{t.calloutBody}</p>
            </div>
          </div>
        </aside>

        {/* ── Compact grid ────────────────────────── */}
        <div className={styles.groups}>
          {layout.map(({ category, items }) => (
            <div key={category} className={styles.group}>
              <h3 className={styles.groupLabel}>{t.categories[category]}</h3>
              <div className={styles.grid}>
                {items.map(({ key, icon }) => (
                  <div key={key} className={styles.item}>
                    <span className={styles.icon} aria-hidden="true">{icons[icon]}</span>
                    <div className={styles.itemText}>
                      <p className={styles.itemLabel}>{t.items[key].label}</p>
                      <p className={styles.itemDesc}>{t.items[key].desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
