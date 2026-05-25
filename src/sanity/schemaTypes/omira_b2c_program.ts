import { defineField, defineType } from 'sanity';

/**
 * B2C Program (SEO Power Categories + Sub-Niches)
 *
 * A flexible, master template for high-intent consumer-facing programs.
 * Supports the 10 SEO Power Categories plus specialized tracks:
 *   1. Weight Loss Yoga
 *   2. Stress Relief / Mental Wellness
 *   3. Detox & Gut Health
 *   4. Sleep & Insomnia
 *   5. Back Pain & Posture
 *   6. Women-Centric Yoga
 *   7. Corporate Productivity
 *   8. Diabetes / BP / Lifestyle Disease
 *   9. Face Yoga & Beauty
 *  10. Spiritual / Inner Healing
 *
 * Plus specialized tracks: Pediatric, Adaptive, Geriatric, Addiction Rehab
 *
 * Dynamic routing: /programs/[slug]
 */
export const omiraProgramSchema = defineType({
  name: 'omira_b2c_program',
  title: '🎯 B2C Program (SEO Categories)',
  type: 'document',
  icon: () => '🎯',
  groups: [
    { name: 'core',       title: '1. Core Info' },
    { name: 'seo',        title: '2. SEO & Keywords' },
    { name: 'content',    title: '3. Content Blocks' },
    { name: 'clinical',   title: '4. Clinical Detail' },
    { name: 'package',    title: '5. Package & Safety' },
    { name: 'authority',  title: '6. EEAT Authority' },
  ],
  fields: [
    // ── CORE ────────────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Program Title',
      type: 'string',
      group: 'core',
      description: 'e.g., "PCOS Weight Loss Yoga Program" or "Corporate Desk Yoga for Focus"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'core',
      options: { source: 'title', maxLength: 100 },
      description: 'Auto-generated. Used for /programs/[slug]',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'category',
      title: 'SEO Power Category',
      type: 'string',
      group: 'core',
      options: {
        list: [
          { title: '1. Weight Loss Yoga', value: 'weight-loss' },
          { title: '2. Stress Relief / Mental Wellness', value: 'stress-relief' },
          { title: '3. Detox & Gut Health', value: 'detox-gut-health' },
          { title: '4. Sleep & Insomnia', value: 'sleep-insomnia' },
          { title: '5. Back Pain & Posture', value: 'back-pain-posture' },
          { title: '6. Women-Centric Yoga', value: 'womens-health' },
          { title: '7. Corporate Productivity', value: 'corporate-wellness' },
          { title: '8. Diabetes / BP / Lifestyle Disease', value: 'lifestyle-disease' },
          { title: '9. Face Yoga & Beauty', value: 'face-yoga' },
          { title: '10. Spiritual / Inner Healing', value: 'spiritual-healing' },
          { title: 'Pediatric / Children', value: 'pediatric' },
          { title: 'Adaptive / Handicap Yoga', value: 'adaptive' },
          { title: 'Geriatric / Senior Care', value: 'geriatric' },
          { title: 'Addiction Rehab', value: 'addiction-rehab' },
        ],
        layout: 'dropdown',
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'subNicheKeyword',
      title: 'Sub-Niche Keyword',
      type: 'string',
      group: 'core',
      description:
        'Programmatic targeting keyword. e.g., "PCOS weight loss yoga", "IT employee posture correction", "jawline yoga exercises"',
    }),
    defineField({
      name: 'icon',
      title: 'Lucide Icon Name',
      type: 'string',
      group: 'core',
      description: 'e.g., "Flame", "Brain", "Moon", "Dumbbell". Used for UI rendering.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'core',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Descriptive alt text including the primary keyword.',
          validation: (R) => R.required(),
        }),
      ],
    }),

    // ── SEO ──────────────────────────────────────────────────────────────
    defineField({
      name: 'metaTitle',
      title: 'Meta Title (50-60 chars)',
      type: 'string',
      group: 'seo',
      description: 'e.g., "PCOS Weight Loss Yoga — Evidence-Based Protocol | Omira"',
      validation: (R) =>
        R.required().min(30).max(65).warning('Optimal meta title is 50-60 characters.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description (150-160 chars)',
      type: 'text',
      rows: 2,
      group: 'seo',
      description: 'Include primary + secondary keywords naturally.',
      validation: (R) =>
        R.required().min(100).max(165).warning('Optimal meta description is 150-160 characters.'),
    }),
    defineField({
      name: 'primaryKeyword',
      title: 'Primary SEO Keyword',
      type: 'string',
      group: 'seo',
      description: 'The exact keyword this page targets. e.g., "PCOS weight loss yoga"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'secondaryKeywords',
      title: 'Secondary Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'seo',
      options: { layout: 'tags' },
      description: 'Long-tail variants. e.g., ["yoga for PCOS weight loss at home", "hormonal belly yoga"]',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQ Schema (Google Rich Snippets)',
      type: 'array',
      group: 'seo',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({ name: 'question', type: 'string', title: 'Question', validation: (R) => R.required() }),
            defineField({ name: 'answer', type: 'text', title: 'Answer', rows: 3, validation: (R) => R.required() }),
          ],
          preview: { select: { title: 'question' } },
        },
      ],
    }),

    // ── CONTENT BLOCKS ──────────────────────────────────────────────────
    defineField({
      name: 'patientReality',
      title: 'Empathy Hook (1st Person)',
      type: 'text',
      rows: 4,
      group: 'content',
      description:
        'A raw, empathetic quote from the patient perspective. ' +
        'e.g., "I\'ve tried every diet but my PCOS makes it impossible to lose weight..."',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'clinicalPathology',
      title: 'Clinical Pathology (What Goes Wrong)',
      type: 'text',
      rows: 5,
      group: 'content',
      description:
        'Mechanistic explanation of what goes wrong in the body. Written for a layperson but clinically accurate.',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'omiraIntervention',
      title: 'Omira Intervention (How Yoga Fixes It)',
      type: 'text',
      rows: 5,
      group: 'content',
      description:
        'Mechanistic physiological breakdown of how the specific yoga protocol targets the pathology. ' +
        'e.g., "Ustrasana increases abdominal compression, stimulating hepatic portal blood flow..."',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'outcomeMetric',
      title: 'Big Bold Outcome Metric',
      type: 'string',
      group: 'content',
      description: 'e.g., "62% of participants lost 4+ kg in 12 weeks (PubMed, 2021)"',
    }),

    // ── CLINICAL DETAIL ─────────────────────────────────────────────────
    defineField({
      name: 'allopathicMedicines',
      title: 'Common Allopathic Medicines',
      type: 'text',
      rows: 2,
      group: 'clinical',
      description: 'What drugs are typically prescribed for this condition?',
    }),
    defineField({
      name: 'medicationSideEffects',
      title: 'Medication Side Effects',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'clinical',
      description: 'Common side effects of standard medication.',
    }),
    defineField({
      name: 'supportingResearch',
      title: 'Supporting Research / Citations',
      type: 'text',
      rows: 5,
      group: 'clinical',
      description: 'Peer-reviewed citations. One per line. e.g., "Cramer H. et al., JAMA Internal Medicine, 2017"',
    }),

    // ── PACKAGE & SAFETY ────────────────────────────────────────────────
    defineField({
      name: 'packageDetails',
      title: 'Package Details',
      type: 'object',
      group: 'package',
      fields: [
        defineField({ name: 'packageName', type: 'string', title: 'Package Name', validation: (R) => R.required() }),
        defineField({ name: 'duration', type: 'string', title: 'Duration', description: 'e.g., "8 weeks"' }),
        defineField({ name: 'schedule', type: 'string', title: 'Schedule', description: 'e.g., "5× per week, 45 min"' }),
        defineField({
          name: 'practices',
          type: 'array',
          of: [{ type: 'string' }],
          title: 'Included Practices',
          description: 'e.g., "Surya Namaskar (modified)", "Kapalbhati Pranayama"',
        }),
        defineField({
          name: 'contraindications',
          type: 'array',
          of: [{ type: 'string' }],
          title: 'Contraindications / Safety Warnings',
          description: '⚠️ Critical safety information. e.g., "Not suitable during active menstruation"',
          validation: (R) => R.required().min(1).error('At least one safety note is mandatory.'),
        }),
      ],
    }),

    // ── EEAT AUTHORITY ──────────────────────────────────────────────────
    defineField({
      name: 'designedBy',
      title: 'Designed By',
      type: 'reference',
      to: [{ type: 'omira_global_author' }],
      group: 'authority',
      description: 'The therapist who designed this protocol.',
    }),
    defineField({
      name: 'medicallyReviewedBy',
      title: 'Medically Reviewed By',
      type: 'reference',
      to: [{ type: 'omira_global_author' }],
      group: 'authority',
      description: 'The doctor who reviewed and approved this protocol.',
    }),
    defineField({
      name: 'lastReviewDate',
      title: 'Last Review Date',
      type: 'date',
      group: 'authority',
    }),

    // ── PUBLISHING ──────────────────────────────────────────────────────
    defineField({
      name: 'isPublished',
      title: 'Published?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 50,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'heroImage' },
    prepare({ title, subtitle }) {
      const cats: Record<string, string> = {
        'weight-loss': '🔥 Weight Loss',
        'stress-relief': '🧘 Stress Relief',
        'detox-gut-health': '🌿 Detox & Gut',
        'sleep-insomnia': '🌙 Sleep',
        'back-pain-posture': '🦴 Back Pain',
        'womens-health': '👩 Women\'s Health',
        'corporate-wellness': '💼 Corporate',
        'lifestyle-disease': '💊 Lifestyle Disease',
        'face-yoga': '✨ Face Yoga',
        'spiritual-healing': '🕉️ Spiritual',
        'pediatric': '👶 Pediatric',
        'adaptive': '♿ Adaptive',
        'geriatric': '👴 Geriatric',
        'addiction-rehab': '🔁 Addiction Rehab',
      };
      return { title, subtitle: cats[subtitle || ''] || subtitle || '' };
    },
  },
  orderings: [
    { title: 'Sort Order', name: 'sortAsc', by: [{ field: 'sortOrder', direction: 'asc' }] },
    { title: 'Category', name: 'categoryAsc', by: [{ field: 'category', direction: 'asc' }] },
  ],
});
