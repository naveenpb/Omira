import { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumb from '@/components/seo/Breadcrumb';
import ProtocolClient from './ProtocolClient';

export const metadata: Metadata = {
  title: 'Evidence Engine — Yoga + Allopathy Clinical Outcome Comparison | Omira Wellness',
  description:
    'Compare standard allopathic outcomes against Omira\'s integrated yoga therapy protocols for hypertension, COPD, cardiac rehab, cancer care, Parkinson\'s, and addiction recovery. Real clinical data. Real improvement deltas.',
  alternates: { canonical: 'https://omirawellness.com/protocol' },
  openGraph: {
    title: 'Evidence Engine — Clinical Outcome Comparison | Omira Wellness',
    description:
      'Compare standard care vs integrated yoga + allopathy protocols. See real improvement deltas for hypertension, COPD, cancer support, and more.',
    type: 'website',
    url: 'https://omirawellness.com/protocol',
    siteName: 'Omira Wellness',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Evidence Engine | Omira Wellness',
    description:
      'Compare standard care vs integrated yoga + allopathy protocols. Real clinical data.',
  },
  keywords: [
    'yoga clinical evidence',
    'yoga vs allopathy comparison',
    'yoga for hypertension evidence',
    'clinical yoga outcome data',
    'evidence based yoga therapy',
    'yoga and allopathy integration',
  ],
};

const protocolSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Evidence Engine — Yoga + Allopathy Clinical Outcome Comparison',
  url: 'https://omirawellness.com/protocol',
  description:
    'Interactive comparison tool showing measurable outcome deltas between standard allopathic care and Omira integrated yoga + allopathy protocols across multiple clinical conditions.',
  about: {
    '@type': 'MedicalCondition',
    name: 'Multiple Clinical Conditions',
    possibleTreatment: {
      '@type': 'TherapeuticProcedure',
      name: 'Integrated Clinical Yoga Therapy',
      howPerformed: 'Condition-specific therapeutic yoga protocols administered alongside standard allopathic treatment under C-IAYT certified therapist supervision.',
    },
  },
  mainEntity: {
    '@type': 'MedicalOrganization',
    name: 'Omira Wellness',
    url: 'https://omirawellness.com',
  },
};

export default function ProtocolPage() {
  return (
    <>
      <JsonLd data={protocolSchema} />
      <ProtocolClient />
    </>
  );
}
