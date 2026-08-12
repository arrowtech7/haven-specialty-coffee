/**
 * Prefixes a /public asset with the deployment's basePath.
 *
 * next/link and next/image normally apply basePath for you, but with
 * `images.unoptimized: true` (required for GitHub Pages, which has no image
 * optimiser) the <img src> is emitted verbatim — so files under /public need
 * the prefix adding by hand or they 404 on a sub-path deployment.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const asset = (path: string) => `${basePath}${path}`;
