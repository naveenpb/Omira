// /src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { diseaseDictionary } from '@/data/disease-details';
import { blogPosts } from '@/data/blog-posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.omirawellness.com';

  // Base core pages
  const corePages = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/b2c`, lastModified: new Date() },
    { url: `${baseUrl}/b2b`, lastModified: new Date() },
    { url: `${baseUrl}/protocol`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
  ];

  // Dynamically generate links for every disease in your database
  const conditionPages = Object.keys(diseaseDictionary).map((slug) => ({
    url: `${baseUrl}/b2c/${slug}`,
    lastModified: new Date(),
  }));

  // Dynamically generate links for every blog post
  const articlePages = Object.keys(blogPosts).map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
  }));

  return [...corePages, ...conditionPages, ...articlePages];
}