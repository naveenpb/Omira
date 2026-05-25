import { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Omira Wellness — Clinical Yoga Therapy for Disease Management & Rehabilitation',
  description:
    'Evidence-based therapeutic yoga protocols designed to work alongside your allopathic treatment. Clinically supervised programs for hypertension, cancer support, addiction recovery, post-surgical rehabilitation, and more. C-IAYT certified. Bengaluru & Karnataka.',
  alternates: { canonical: 'https://omirawellness.com' },
  openGraph: {
    title: 'Omira Wellness — Clinical Yoga Therapy for Disease Management & Rehabilitation',
    description:
      'Condition-specific therapeutic yoga protocols that work alongside allopathic medicine. C-IAYT certified therapists. Measurable outcomes.',
    type: 'website',
    url: 'https://omirawellness.com',
    siteName: 'Omira Wellness',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Omira Wellness — Clinical Yoga Therapy',
    description:
      'Evidence-based yoga protocols for disease management, rehabilitation, and post-care recovery. Works alongside your existing treatment.',
  },
  keywords: [
    'clinical yoga therapy india',
    'yoga for disease treatment',
    'therapeutic yoga bangalore',
    'yoga for hypertension',
    'yoga for cancer support',
    'post surgery yoga rehabilitation',
    'yoga hospital integration',
    'evidence based yoga therapy',
    'yoga alongside allopathic medicine',
    'C-IAYT certified yoga therapist',
  ],
};

const homeSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: 'Omira Wellness',
  url: 'https://omirawellness.com',
  description:
    'Clinical yoga therapy company integrating evidence-based therapeutic yoga with allopathic medicine for disease management, rehabilitation, and post-care recovery.',
  medicalSpecialty: [
    'Yoga Therapy',
    'Cardiovascular Rehabilitation',
    'Oncology Support',
    'Neurological Rehabilitation',
    'Addiction Recovery',
    'Post-Surgical Rehabilitation',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  telephone: ['+917349524578', '+918762901838'],
  sameAs: [],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeSchema} />
      <HomeClient />
    </>
  );
}