'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

type Props = {
  /** Path on this site the code should open, e.g. "/m". */
  path?: string;
  size?: number;
  dark?: string;
  light?: string;
  className?: string;
  /** Show the resolved URL underneath the code. */
  showUrl?: boolean;
};

/**
 * Renders a QR code for a path on whatever origin the page is served from,
 * so the printed code keeps working across localhost, preview and production
 * without anyone regenerating an image.
 */
export default function QrCode({
  path = '/m',
  size = 220,
  dark = '#5E1F13',
  light = '#FFFFFF',
  className = '',
  showUrl = false,
}: Props) {
  const [svg, setSvg] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    let cancelled = false;

    // next/link adds the basePath for us; a hand-built URL has to do it itself,
    // or the printed code points outside the deployment. The trailing slash
    // matches `trailingSlash: true` and saves the phone a redirect hop.
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
    const target = new URL(`${base}${path}/`, window.location.origin).toString();

    QRCode.toString(target, {
      type: 'svg',
      margin: 1,
      width: size,
      errorCorrectionLevel: 'M',
      color: { dark, light },
    })
      .then((out) => {
        if (cancelled) return;
        setSvg(out);
        setUrl(target);
      })
      .catch(() => {
        /* leave the placeholder in place */
      });

    return () => {
      cancelled = true;
    };
  }, [path, size, dark, light]);

  return (
    <figure className={className} style={{ margin: 0 }}>
      <div
        style={{ width: size, height: size, lineHeight: 0 }}
        role="img"
        aria-label={url ? `QR code linking to ${url}` : 'QR code'}
        // Markup comes from the local qrcode encoder, never from user input.
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {showUrl && url && (
        <figcaption
          style={{
            marginTop: '0.75rem',
            fontSize: '0.72rem',
            wordBreak: 'break-all',
            color: 'var(--text-meta)',
            textAlign: 'center',
            maxWidth: size,
          }}
        >
          {url}
        </figcaption>
      )}
    </figure>
  );
}
