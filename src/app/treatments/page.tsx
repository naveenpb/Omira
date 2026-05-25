import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { allConditionsQuery } from '@/lib/sanity-queries';
import B2CHubClient from './B2CHubClient';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Patient Portal — Clinical Yoga Protocols | Omira Wellness',
  description:
    'Browse Omira\'s evidence-based yoga therapy protocols for disease management, rehabilitation, and post-care recovery. Clinically designed to work alongside your existing treatment.',
  alternates: {
    canonical: 'https://omirawellness.com/treatments',
  },
  openGraph: {
    title: 'Patient Portal — Clinical Yoga Protocols | Omira Wellness',
    description:
      'Browse Omira\'s evidence-based yoga therapy protocols for disease management, rehabilitation, and post-care recovery.',
    type: 'website',
    url: 'https://omirawellness.com/treatments',
    siteName: 'Omira Wellness',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Patient Portal — Clinical Yoga Protocols | Omira Wellness',
    description:
      'Browse Omira\'s evidence-based yoga therapy protocols for disease management, rehabilitation, and post-care recovery.',
  },
};

export default async function B2CHubPage() {
  const protocols = await client.fetch(allConditionsQuery);
  return <B2CHubClient protocols={protocols} />;
}