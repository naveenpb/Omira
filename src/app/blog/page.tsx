import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { allBlogPostsQuery } from '@/lib/sanity-queries';
import BlogHubClient from './BlogHubClient';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Clinical Journal — Yoga Therapy Research & Patient Education',
  description:
    'Evidence-based articles on clinical yoga therapy for disease management, rehabilitation, and post-care recovery. Written and reviewed by certified therapists and doctors.',
  alternates: { canonical: 'https://omirawellness.com/blog' },
  openGraph: {
    title: 'The Omira Journal — Clinical Insights & Patient Education',
    description:
      'Evidence-based articles on clinical yoga therapy. Written by certified therapists, reviewed by doctors.',
    type: 'website',
    url: 'https://omirawellness.com/blog',
    siteName: 'Omira Wellness',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Omira Journal | Omira Wellness',
    description: 'Evidence-based articles on clinical yoga therapy for disease management.',
  },
};

export default async function BlogHubPage() {
  const posts = await client.fetch(allBlogPostsQuery);
  return <BlogHubClient posts={posts} />;
}