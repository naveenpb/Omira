/**
 * JsonLd — Reusable JSON-LD structured data injector.
 * Renders a <script type="application/ld+json"> tag in <head> via Next.js.
 * Usage: <JsonLd data={schemaObject} />
 */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ─── Schema builder helpers ────────────────────────────────────────────────

const BASE_URL = 'https://omirawellness.com';

/** BreadcrumbList schema — pass an array of { name, url } */
export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

/** FAQPage schema — pass the faqSchema array from Sanity */
export function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/** MedicalWebPage schema — for /treatments/[condition] pages */
export function buildMedicalWebPageSchema({
  name,
  description,
  slug,
  condition,
  lastReviewed,
  reviewer,
}: {
  name: string;
  description: string;
  slug: string;
  condition: string;
  lastReviewed?: string;
  reviewer?: { name: string; role: string };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name,
    description,
    url: `${BASE_URL}/treatments/${slug}`,
    inLanguage: 'en-IN',
    audience: { '@type': 'Patient' },
    about: {
      '@type': 'MedicalCondition',
      name: condition,
    },
    ...(lastReviewed && { lastReviewed }),
    ...(reviewer && {
      reviewedBy: {
        '@type': 'Person',
        name: reviewer.name,
        jobTitle: reviewer.role,
      },
    }),
    publisher: {
      '@type': 'Organization',
      name: 'Omira Wellness',
      url: BASE_URL,
    },
  };
}

/** Article schema — for /blog/[slug] pages */
export function buildArticleSchema({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  author,
  reviewer,
  imageUrl,
}: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  author: { name: string; role: string };
  reviewer?: { name: string; role: string };
  imageUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': ['Article', 'MedicalWebPage'],
    headline: title,
    description,
    url: `${BASE_URL}/blog/${slug}`,
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    inLanguage: 'en-IN',
    author: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.role,
    },
    ...(reviewer && {
      reviewedBy: {
        '@type': 'Person',
        name: reviewer.name,
        jobTitle: reviewer.role,
      },
    }),
    ...(imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
    }),
    publisher: {
      '@type': 'Organization',
      name: 'Omira Wellness',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/favicon.ico`,
      },
    },
  };
}

/** Organization schema — injected site-wide */
export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'MedicalOrganization'],
    name: 'Omira Wellness',
    url: BASE_URL,
    description:
      'Clinical yoga therapy for disease management, rehabilitation, and post-care recovery. Integrating therapeutic yoga with allopathic medicine under C-IAYT certified therapist supervision.',
    medicalSpecialty: [
      'Yoga Therapy',
      'Cardiovascular Rehabilitation',
      'Oncology Support',
      'Neurological Rehabilitation',
      'Addiction Recovery',
      'Post-Surgical Rehabilitation',
    ],
    address: [
      {
        '@type': 'PostalAddress',
        addressLocality: 'Bengaluru',
        addressRegion: 'Karnataka',
        addressCountry: 'IN',
      },
      {
        '@type': 'PostalAddress',
        addressLocality: 'Sagara',
        addressRegion: 'Karnataka',
        addressCountry: 'IN',
      },
    ],
    telephone: ['+917349524578', '+918762901838'],
    areaServed: [
      { '@type': 'State', name: 'Karnataka' },
      { '@type': 'Country', name: 'India' },
    ],
    knowsAbout: [
      'Clinical Yoga Therapy',
      'Yoga for Hypertension',
      'Cancer Supportive Yoga',
      'Rehabilitation Yoga',
      'Hospital Integration',
      'Post-Surgical Yoga Recovery',
    ],
    sameAs: [],
  };
}

/** WebSite schema — for Google Sitelinks Searchbox */
export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Omira Wellness',
    url: BASE_URL,
    description: 'Evidence-based clinical yoga therapy for disease management, rehabilitation, and post-care recovery.',
    publisher: {
      '@type': 'Organization',
      name: 'Omira Wellness',
      url: BASE_URL,
    },
  };
}
