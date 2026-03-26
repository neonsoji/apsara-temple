import { MetadataRoute } from 'next';

const BASE_URL = 'https://apsara-temple.com';
const LOCALES = ['fr', 'en'];

const PAGES = [
  '',
  '/about',
  '/talismans',
  '/bracelets',
  '/journal',
  '/livraison',
  '/contact',
  '/search',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  LOCALES.forEach((locale) => {
    PAGES.forEach((page) => {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : 0.8,
      });
    });
  });

  return sitemapEntries;
}
