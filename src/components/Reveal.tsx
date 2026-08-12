'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Stagger in ms — applied as a transition-delay. */
  delay?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Fades + lifts its children into view once, when they first intersect.
 * Falls back to visible immediately if IntersectionObserver is unavailable.
 */
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
