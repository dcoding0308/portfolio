import { readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const artifactDirectory = fileURLToPath(new URL('..', import.meta.url));
const outputDirectory = path.join(artifactDirectory, 'dist', 'public');
const sitemapPath = path.join(outputDirectory, 'sitemap.xml');
const rawSiteUrl = process.env.PORTFOLIO_SITE_URL;

if (!rawSiteUrl) {
  await rm(sitemapPath, { force: true });
  console.info('PORTFOLIO_SITE_URL is unset; skipping canonical URL and sitemap.');
  process.exit(0);
}

let site;
try {
  site = new URL(rawSiteUrl);
} catch {
  throw new Error('PORTFOLIO_SITE_URL must be a valid HTTPS origin.');
}

if (site.protocol !== 'https:' || site.pathname !== '/' || site.search || site.hash) {
  throw new Error('PORTFOLIO_SITE_URL must be an HTTPS origin without a path, query, or fragment.');
}

const origin = site.origin;
const escapeXml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
const canonicalUrl = `${origin}/`;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${escapeXml(canonicalUrl)}</loc></url>\n</urlset>\n`;
const robots = `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`;

await writeFile(sitemapPath, sitemap, 'utf8');
await writeFile(path.join(outputDirectory, 'robots.txt'), robots, 'utf8');

const htmlPath = path.join(outputDirectory, 'index.html');
const html = await readFile(htmlPath, 'utf8');
const canonicalLink = `<link rel="canonical" href="${escapeXml(canonicalUrl)}" />`;
const canonicalPattern = /<link\s+rel=["']canonical["'][^>]*\/?>/i;
const withCanonical = canonicalPattern.test(html)
  ? html.replace(canonicalPattern, canonicalLink)
  : html.replace('</head>', `  ${canonicalLink}\n  </head>`);
// Link previews (LinkedIn, X, WhatsApp) need absolute image and page URLs.
const nextHtml = withCanonical
  .replace(/(<meta\s+(?:property|name)=["'](?:og:image|twitter:image)["']\s+content=["'])\/(?!\/)/gi, `$1${origin}/`)
  .replace('</head>', `  <meta property="og:url" content="${escapeXml(canonicalUrl)}" />\n  </head>`);

if (nextHtml === html && !canonicalPattern.test(html)) {
  throw new Error('Could not insert the canonical URL into the built HTML document.');
}

await writeFile(htmlPath, nextHtml, 'utf8');
console.info(`Generated canonical URL and sitemap for ${origin}.`);
