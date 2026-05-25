import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'omira_b2b_caseStudy',
  title: '📊 B2B: Hospital Case Study',
  type: 'document',
  groups: [
    { name: 'core',      title: '1. Hospital Details' },
    { name: 'results',   title: '2. Results & Evidence' },
    { name: 'seo',       title: '3. SEO Metadata' },
    { name: 'publishing',title: '4. Publishing' },
  ],
  fields: [
    // ── CORE ───────────────────────────────────────────────────────────
    defineField({
      name: 'hospitalName',
      title: 'Hospital / Partner Name',
      type: 'string',
      group: 'core',
      description: 'e.g., "Apollo Hospitals Bengaluru" or "NIMHANS" or "Manipal Hospital"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'core',
      options: { source: 'hospitalName', maxLength: 80 },
      description: 'Auto-generated. Used for /hospitals/case-studies/[slug] page.',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Hospital Logo',
      type: 'image',
      group: 'core',
      options: { hotspot: false },
      description: 'Hospital logo for the partner section. Use a transparent PNG.',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'e.g., "Apollo Hospitals Bengaluru logo"',
          validation: (R) => R.required(),
        }),
      ],
    }),
    defineField({
      name: 'department',
      title: 'Department(s) Integrated',
      type: 'string',
      group: 'core',
      description: 'e.g., "Oncology & Palliative Care" or "Orthopedics + ICU Step-Down"',
    }),
    defineField({
      name: 'pilotDuration',
      title: 'Pilot Duration',
      type: 'string',
      group: 'core',
      description: 'e.g., "90-day pilot, Q3 2025"',
    }),

    // ── RESULTS ────────────────────────────────────────────────────────
    defineField({
      name: 'keyMetric',
      title: 'Headline Metric (The Big Result)',
      type: 'string',
      group: 'results',
      description:
        'The single most impressive measurable result. e.g., "22% reduction in 30-day readmission rates" or "₹1.2L monthly savings in physiotherapy costs"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'results',
      title: 'Additional Results / Metrics',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'results',
      description:
        'Additional measurable results from the pilot. e.g., ["Patient compliance ↑ 25%", "Sedative usage ↓ 40%", "Average QoL score from 55 → 72"]',
    }),
    defineField({
      name: 'testimonial',
      title: 'Doctor / Department Head Testimonial Quote',
      type: 'text',
      rows: 4,
      group: 'results',
      description:
        'A direct quote from the partner doctor or hospital administrator. Authenticity is critical — use real words, not polished marketing copy.',
    }),
    defineField({
      name: 'testimonialBy',
      title: 'Testimonial Attribution',
      type: 'string',
      group: 'results',
      description:
        'Full name + title + institution. e.g., "Dr. Priya Menon, Head of Oncology, Apollo Hospitals Bengaluru"',
    }),
    defineField({
      name: 'fullCaseStudy',
      title: 'Full Case Study (Rich Text)',
      type: 'array',
      group: 'results',
      description:
        'Detailed narrative: Challenge → Omira Intervention → Methodology → Results → Conclusion. Write in clinical, professional tone.',
      of: [{ type: 'block' }],
    }),

    // ── SEO ────────────────────────────────────────────────────────────
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description:
        '50-60 characters. e.g., "Yoga Therapy at Apollo Hospitals — 22% Less Readmissions | Omira"',
      validation: (R) => R.max(65).warning('⚠️ Keep under 65 characters.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 2,
      group: 'seo',
      description: '150-160 characters. Describe the partnership result.',
      validation: (R) => R.max(165).warning('⚠️ Keep under 165 characters.'),
    }),

    // ── PUBLISHING ─────────────────────────────────────────────────────
    defineField({
      name: 'isPublished',
      title: 'Published on Website',
      type: 'boolean',
      group: 'publishing',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'publishing',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Case Study',
      type: 'boolean',
      group: 'publishing',
      initialValue: false,
      description: 'Featured case studies appear prominently on the /b2b page.',
    }),
  ],
  preview: {
    select: {
      title: 'hospitalName',
      subtitle: 'keyMetric',
      media: 'logo',
      published: 'isPublished',
    },
    prepare({ title, subtitle, media, published }) {
      return {
        title: `${published ? '✅' : '⏸️'} ${title || 'Unnamed Case Study'}`,
        subtitle: subtitle ? `📊 ${subtitle}` : 'No headline metric set',
        media,
      };
    },
  },
})
