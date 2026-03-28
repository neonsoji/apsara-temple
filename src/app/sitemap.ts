import { MetadataRoute } from 'next';
import { getAllSlugs } from '@/services/products';

const BASE_URL = 'https://apsara-temple.com';
const LOCALES = ['fr', 'en'];

const STATIC_PAGES = [
  { path: '', priority: 1.0, changeFrequency: 'daily' as const },
  { path: '/search', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/livraison', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/journal', priority: 0.6, changeFrequency: 'weekly' as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Pages statiques pour chaque locale
  LOCALES.forEach((locale) => {
    STATIC_PAGES.forEach(({ path, priority, changeFrequency }) => {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
      });
    });
  });

  // Pages produit dynamiques (depuis Supabase)
  try {
    const slugs = await getAllSlugs();
    slugs.forEach((slug) => {
      LOCALES.forEach((locale) => {
        sitemapEntries.push({
          url: `${BASE_URL}/${locale}/products/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.85,
        });
      });
    });
  } catch (e) {
    console.error('Sitemap: impossible de récupérer les slugs produit', e);
  }

  return sitemapEntries;
}
