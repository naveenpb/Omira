import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';
import ConditionalLayout from '@/components/layout/ConditionalLayout';
import JsonLd, { buildOrganizationSchema, buildWebSiteSchema } from '@/components/seo/JsonLd';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const BASE_URL = 'https://omirawellness.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Omira Wellness | Clinical Yoga Therapy & Rehabilitation',
    template: '%s | Omira Wellness',
  },
  description:
    'Evidence-based clinical yoga therapy for disease management, post-care recovery, and rehabilitation. Designed to work alongside your allopathic treatment.',
  keywords: [
    'clinical yoga therapy',
    'yoga for disease treatment',
    'yoga for hypertension',
    'cancer supportive yoga',
    'rehabilitation yoga',
    'post surgery yoga recovery',
    'hospital yoga integration',
  ],
  authors: [{ name: 'Omira Wellness', url: BASE_URL }],
  creator: 'Omira Wellness',
  publisher: 'Omira Wellness',
  alternates: {
    canonical: BASE_URL,
    languages: {
      'en': BASE_URL,
      'x-default': BASE_URL,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'Omira Wellness',
    title: 'Omira Wellness | Clinical Yoga Therapy & Rehabilitation',
    description:
      'Evidence-based clinical yoga therapy for disease management, post-care recovery, and rehabilitation.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@OmiraWellness',
    creator: '@OmiraWellness',
    title: 'Omira Wellness | Clinical Yoga Therapy & Rehabilitation',
    description:
      'Evidence-based clinical yoga therapy for disease management, post-care recovery, and rehabilitation.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your Google Search Console verification token here:
    // google: 'your-verification-token',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable}`}
    >
      <body className="bg-[#FAF9F6] text-[#2A4032] font-sans antialiased selection:bg-[#C47C5D] selection:text-white">
        {/* Global Organization + WebSite JSON-LD — injected on every page */}
        <JsonLd data={buildOrganizationSchema()} />
        <JsonLd data={buildWebSiteSchema()} />
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}