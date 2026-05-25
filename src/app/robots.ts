import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/studio/', '/api/'],
      },
    ],
    sitemap: 'https://omirawellness.com/sitemap.xml',
  };
}
