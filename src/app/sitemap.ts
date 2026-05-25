import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';
import { sitemapQuery } from '@/lib/sanity-queries';

export const revalidate = 3600;

type SitemapData = {
  conditions: { slug: string; lastmod?: string }[];
  blogs:      { slug: string; lastmod?: string }[];
  categories: { slug: string }[];
  b2bDepts:   { slug: string }[];
  caseStudies:{ slug: string; lastmod?: string }[];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://omirawellness.com';

  // Fetch all slugs from Sanity in a single request
  const data = await client.fetch<SitemapData>(sitemapQuery).catch(() => null);

  // ── Static core pages ────────────────────────────────────────────────────
  const corePages: MetadataRoute.Sitemap = [
    { url: baseUrl,                    lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${baseUrl}/treatments`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${baseUrl}/hospitals`,      lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${baseUrl}/blog`,          lastModified: new Date(), changeFrequency: 'daily',   priority: 0.8 },
    { url: `${baseUrl}/rehabilitation`,lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${baseUrl}/post-care`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${baseUrl}/protocol`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];

  if (!data) return corePages;

  // ── Dynamic B2C condition pages (PRIMARY SEO targets — highest priority) ─
  const conditionPages: MetadataRoute.Sitemap = data.conditions.map(({ slug, lastmod }) => ({
    url: `${baseUrl}/treatments/${slug}`,
    lastModified: lastmod ? new Date(lastmod) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.95,
  }));

  // ── Dynamic blog article pages ─────────────────────────────────────────
  const blogPages: MetadataRoute.Sitemap = data.blogs.map(({ slug, lastmod }) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: lastmod ? new Date(lastmod) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // ── Category hub pages ────────────────────────────────────────────────
  const categoryPages: MetadataRoute.Sitemap = data.categories.map(({ slug }) => ({
    url: `${baseUrl}/treatments/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  // ── B2B department pages ──────────────────────────────────────────────
  const b2bPages: MetadataRoute.Sitemap = data.b2bDepts.map(({ slug }) => ({
    url: `${baseUrl}/hospitals/departments/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // ── Case study pages ──────────────────────────────────────────────────
  const caseStudyPages: MetadataRoute.Sitemap = data.caseStudies.map(({ slug, lastmod }) => ({
    url: `${baseUrl}/hospitals/case-studies/${slug}`,
    lastModified: lastmod ? new Date(lastmod) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.65,
  }));

  return [
    ...corePages,
    ...conditionPages,
    ...blogPages,
    ...categoryPages,
    ...b2bPages,
    ...caseStudyPages,
  ];
}