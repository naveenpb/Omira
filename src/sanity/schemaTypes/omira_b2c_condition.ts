import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'omira_b2c_condition',
  title: '🩺 B2C: Disease Condition Protocol',
  type: 'document',
  groups: [
    { name: 'seo',        title: '⭐ 1. SEO Metadata (Complete First)' },
    { name: 'eeat',       title: '🎓 2. EEAT & Trust Signals' },
    { name: 'identity',   title: '🏥 3. Condition Identity' },
    { name: 'clinical',   title: '🔬 4. Clinical Content' },
    { name: 'protocol',   title: '🧘 5. Yoga Protocol' },
    { name: 'funnel',     title: '🎯 6. Lead Capture & CRM' },
    { name: 'i18n',       title: '🌐 7. Translations' },
    { name: 'publishing', title: '📅 8. Publishing Controls' },
  ],

  fields: [
    // ── GROUP: IDENTITY ───────────────────────────────────────────────
    defineField({
      name: 'diseaseName',
      title: 'Disease / Condition Name (English)',
      type: 'string',
      group: 'identity',
      description:
        'The official medical name. e.g., "Hypertension", "Type 2 Diabetes Mellitus", "Parkinson\'s Disease"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug (Auto-Generated — Do Not Edit After Publishing)',
      type: 'slug',
      group: 'identity',
      options: {
        source: 'diseaseName',
        maxLength: 80,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-')
            .slice(0, 80),
      },
      description:
        '⚠️ This becomes the permanent URL: /treatments/[slug]. Never change after publishing — it breaks all existing Google rankings.',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'category',
      title: 'Clinical Category',
      type: 'reference',
      to: [{ type: 'omira_b2c_category' }],
      group: 'identity',
      description:
        'Select the clinical category this condition belongs to. Categories must be created first.',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'patientType',
      title: 'Patient Engagement Type',
      type: 'string',
      group: 'identity',
      options: {
        list: [
          { title: '💊 Direct Disease Management', value: 'direct' },
          { title: '🔄 Complementary to Allopathy', value: 'complementary' },
          { title: '🏥 Post-Care & Recovery', value: 'post-care' },
          { title: '🛡️ Rehabilitation', value: 'rehab' },
        ],
        layout: 'radio',
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Lucide Icon Name',
      type: 'string',
      group: 'identity',
      description:
        'Exact Lucide icon name. e.g., HeartPulse, Brain, Ribbon, Flower2, Activity, ShieldAlert',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Page Hero Image',
      type: 'image',
      group: 'identity',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Image Alt Text (Required — include condition name)',
          description:
            'Describe image + condition. e.g., "Patient practising morning calm yoga for hypertension management"',
          validation: (R) =>
            R.required()
              .min(10)
              .error('❌ Alt text is mandatory for every image.'),
        }),
      ],
    }),

    // ── GROUP: SEO (MANDATORY) ────────────────────────────────────────
    defineField({
      name: 'seoTitle',
      title: 'Google Title (Meta Title)',
      type: 'string',
      group: 'seo',
      description:
        '📏 THIS IS WHAT APPEARS ON GOOGLE. Lead with keyword. Format: "[Keyword] | Omira Wellness". Target: 50-60 characters. Example: "Yoga for Hypertension: Clinical Protocols | Omira Wellness"',
      validation: (R) =>
        R.required()
          .min(40)
          .max(65)
          .error('❌ Must be 40-65 characters for optimal Google display.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Google Description (Meta Description)',
      type: 'text',
      rows: 3,
      group: 'seo',
      description:
        '📏 SHOWN BELOW YOUR TITLE ON GOOGLE. 150-160 characters. Include primary keyword + measurable benefit. Example: "Our Morning Calm Protocol uses clinical pranayama to reduce blood pressure by 10-15 mmHg in 8-12 weeks, working alongside your medication."',
      validation: (R) =>
        R.required()
          .min(120)
          .max(165)
          .error('❌ Must be 120-165 characters.'),
    }),
    defineField({
      name: 'primaryKeyword',
      title: 'Primary Keyword (Single Most Important Phrase)',
      type: 'string',
      group: 'seo',
      description:
        '🎯 The single phrase you most want to rank for. MUST appear in H1, first paragraph, and at least 2 subheadings. e.g., "yoga for hypertension" or "clinical yoga Parkinson\'s India"',
      validation: (R) =>
        R.required()
          .max(80)
          .error('❌ Primary keyword is required.'),
    }),
    defineField({
      name: 'secondaryKeywords',
      title: 'Secondary / LSI Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'seo',
      description:
        '💡 3-6 related search phrases. e.g., ["high blood pressure yoga", "pranayama for BP", "yoga morning routine hypertension"]',
      validation: (R) =>
        R.max(8).warning('⚠️ Too many secondary keywords causes dilution. Keep under 8.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image (Open Graph — 1200×630px)',
      type: 'image',
      group: 'seo',
      options: { hotspot: true },
      description:
        '🖼️ Shown when shared on WhatsApp, Twitter, LinkedIn. Recommended: 1200×630px. Do NOT use stock photo clichés.',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text (Required)',
          validation: (R) => R.required(),
        }),
      ],
    }),
    defineField({
      name: 'faqSchema',
      title: '❓ FAQ Section (Creates FAQ Rich Snippet on Google — High Value)',
      type: 'array',
      group: 'seo',
      description:
        '🌟 FAQ answers appear expanded directly on Google results. Dramatically boosts click-through rate. Add 4-6 questions patients would search. e.g., "Is yoga safe with blood pressure medication?", "How many weeks to see BP results from yoga?"',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'FAQ Item',
          fields: [
            defineField({
              name: 'question',
              title: 'Question (Exactly as patients would search it)',
              type: 'string',
              validation: (R) =>
                R.required()
                  .min(10)
                  .error('❌ Question required.'),
            }),
            defineField({
              name: 'answer',
              title: 'Answer (40-300 words, factual and clinical)',
              type: 'text',
              rows: 4,
              validation: (R) =>
                R.required()
                  .min(40)
                  .max(300)
                  .error('❌ Answer must be 40-300 characters.'),
            }),
          ],
          preview: { select: { title: 'question' } },
        },
      ],
      validation: (R) =>
        R.min(2).warning(
          '⚠️ Add at least 4 FAQ items to maximise rich snippet chances on Google.'
        ),
    }),

    // ── GROUP: EEAT & TRUST SIGNALS ───────────────────────────────────
    defineField({
      name: 'certifiedBy',
      title: 'Protocol Designed By (Primary Yoga Therapist)',
      type: 'reference',
      to: [{ type: 'omira_global_author' }],
      group: 'eeat',
      description:
        '🎓 MANDATORY for YMYL pages. The certified yoga therapist who designed this protocol. Their credentials are displayed on the page.',
      validation: (R) =>
        R.required().error(
          '❌ A certified therapist must be credited. Google YMYL requires verifiable author expertise on all health pages.'
        ),
    }),
    defineField({
      name: 'reviewedBy',
      title: 'Medically Reviewed By (Doctor / Second Expert)',
      type: 'reference',
      to: [{ type: 'omira_global_author' }],
      group: 'eeat',
      description:
        '🏥 If a doctor has reviewed the medical claims on this page, link them here. Displays "Medically Reviewed by Dr. X, MBBS" badge — significant trust signal.',
    }),
    defineField({
      name: 'lastReviewedAt',
      title: 'Last Clinical Review Date',
      type: 'datetime',
      group: 'eeat',
      description:
        '📅 CRITICAL: Google penalises outdated medical content. Update this every time clinical content is reviewed. Must be set before publishing.',
      validation: (R) =>
        R.required().error(
          '❌ Clinical review date is mandatory for all YMYL health content.'
        ),
    }),
    defineField({
      name: 'evidenceReference',
      title: 'Primary Supporting Research',
      type: 'string',
      group: 'eeat',
      description:
        'The most authoritative study supporting claims on this page. e.g., "JAMA Internal Medicine, 2018 — Meta-analysis of 28 RCTs (n=3,500). Yoga reduces systolic BP by 10-15 mmHg."',
      validation: (R) =>
        R.required().error(
          '❌ At least one research reference is mandatory for all clinical claims on YMYL pages.'
        ),
    }),
    defineField({
      name: 'disclaimerAcknowledged',
      title: '⚠️ Medical Disclaimer Acknowledged (Read Before Checking)',
      type: 'boolean',
      group: 'eeat',
      description:
        'Check ONLY after confirming: (1) No curative claims are made. (2) Doctor clearance is mentioned where required. (3) All contraindications are listed. (4) "Works alongside, not instead of, your doctor" is communicated.',
      initialValue: false,
      validation: (R) =>
        R.required().custom((val: boolean | undefined) =>
          val === true
            ? true
            : '❌ You must acknowledge the medical disclaimer before publishing. This is a legal and YMYL compliance requirement.'
        ),
    }),

    // ── GROUP: CLINICAL CONTENT ───────────────────────────────────────
    defineField({
      name: 'patientPainPoint',
      title: 'Patient Reality Statement (The Empathy Hook)',
      type: 'text',
      rows: 3,
      group: 'clinical',
      description:
        '💬 Write exactly what the patient feels in THEIR voice. 1st person. Must emotionally resonate. Example: "The medication keeps my BP stable, but I\'m exhausted all day, my feet are cold, and I can\'t think clearly. Is this what the rest of my life looks like?"',
      validation: (R) =>
        R.required()
          .min(50)
          .error('❌ Patient pain point is required and must be at least 50 characters.'),
    }),
    defineField({
      name: 'pathology',
      title: 'Clinical Pathology (The Medical Explanation)',
      type: 'text',
      rows: 6,
      group: 'clinical',
      description:
        '🔬 Explain the disease mechanism clinically, but in language a patient can understand. What goes wrong physiologically? This section builds your clinical authority with Google.',
      validation: (R) =>
        R.required()
          .min(100)
          .error('❌ Pathology description required. Minimum 100 characters.'),
    }),
    defineField({
      name: 'allopathicMedicines',
      title: 'Common Allopathic Medicines for This Condition',
      type: 'string',
      group: 'clinical',
      description:
        'e.g., "Beta-Blockers (Metoprolol), ACE Inhibitors (Ramipril), Calcium Channel Blockers (Amlodipine)"',
    }),
    defineField({
      name: 'allopathicSideEffects',
      title: 'Known Side Effects of Standard Medication',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'clinical',
      description:
        '📋 Each item = one bullet in the "Hidden Cost of Medication" section. Be factual, cite published data. Do not fear-monger.',
    }),
    defineField({
      name: 'targetedRelief',
      title: 'The Omira Intervention (The Hero Section)',
      type: 'text',
      rows: 6,
      group: 'clinical',
      description:
        '🦸 The precise, mechanistic explanation of HOW yoga solves this problem. Which pranayama activates which nerve? Which asana improves which biomarker? Be specific. NEVER say "yoga cures" anything.',
      validation: (R) =>
        R.required()
          .min(100)
          .error('❌ Intervention description is mandatory. It is the core conversion section.'),
    }),
    defineField({
      name: 'clinicalOutcomeClaim',
      title: 'Measurable Outcome Metric (Headline Stat)',
      type: 'string',
      group: 'clinical',
      description:
        'The single most impressive, evidence-backed outcome claim. Shown as large display text. e.g., "10–15 mmHg systolic BP reduction in 8-12 weeks (JAMA 2018)"',
    }),
    defineField({
      name: 'richBodyContent',
      title: 'Extended Clinical Body Content (Rich Text — Optional)',
      type: 'array',
      group: 'clinical',
      description:
        'Add additional clinical detail, research citations, or explanatory sections here as rich text.',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'internalLink',
                type: 'object',
                title: '🔗 Internal Link',
                fields: [
                  {
                    name: 'href',
                    type: 'string',
                    title: 'Internal URL (e.g., /blog/yoga-for-blood-pressure)',
                  },
                ],
              },
              {
                name: 'externalLink',
                type: 'object',
                title: '📚 External Link (Medical Study)',
                fields: [
                  { name: 'href', type: 'url', title: 'URL' },
                  { name: 'blank', type: 'boolean', title: 'Open in new tab?', initialValue: true },
                  { name: 'noFollow', type: 'boolean', title: 'NoFollow?', initialValue: false },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt Text (Required)',
              validation: (R) => R.required(),
            }),
          ],
        },
      ],
    }),

    // ── GROUP: YOGA PROTOCOL ─────────────────────────────────────────
    defineField({
      name: 'packageName',
      title: 'Yoga Package Name',
      type: 'string',
      group: 'protocol',
      description:
        'e.g., "Morning Calm Package", "Neuro-Balance Protocol", "Cancer Wellness Protocol"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Session Duration & Schedule',
      type: 'string',
      group: 'protocol',
      description: 'e.g., "1 Hour | Morning + Evening | 5 days/week | 8-week program"',
    }),
    defineField({
      name: 'practices',
      title: 'Yoga Practices in This Protocol',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'protocol',
      description:
        'Each practice as a separate item with brief description. e.g., "Yoga Nidra (CNS Deep Rest — 20 min)", "Nadi Shodhana Pranayama (Nervous system balance)"',
    }),
    defineField({
      name: 'contraindications',
      title: '⛔ Contraindications & Safety Rules (MANDATORY)',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'protocol',
      description:
        '🛡️ CRITICAL: Every restriction, when to stop, when doctor clearance is required. These protect patients AND Omira legally. e.g., "NEVER perform Kapalabhati during the first 2 weeks of cardiac rehabilitation", "Stop immediately and call your doctor if chest pain occurs."',
      validation: (R) =>
        R.required()
          .min(2)
          .error(
            '❌ Minimum 2 contraindications required on all clinical protocols. Non-negotiable safety requirement.'
          ),
    }),
    defineField({
      name: 'relatedConditions',
      title: 'Related Conditions (Internal SEO Linking)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'omira_b2c_condition' }] }],
      group: 'protocol',
      description:
        '🔗 Link to 2-3 conditions commonly co-morbid or related. Creates an internal SEO cluster. e.g., Hypertension → links to CAD, COPD → links to Cardiac Rehab',
      validation: (R) =>
        R.max(4).warning('⚠️ Keep related conditions to 4 maximum.'),
    }),

    // ── GROUP: LEAD FUNNEL ────────────────────────────────────────────
    defineField({
      name: 'crmTag',
      title: 'CRM Lead Tag (for HubSpot / Odoo Pipeline Segmentation)',
      type: 'string',
      group: 'funnel',
      description:
        '🏷️ This tag is sent to the CRM with every lead from this page. Use the slug value. e.g., "hypertension", "cancer-support". Must be lowercase with hyphens only.',
      validation: (R) =>
        R.required()
          .lowercase()
          .regex(/^[a-z0-9-]+$/, { name: 'slug-safe', invert: false })
          .error(
            '❌ CRM tag required. Must be lowercase with hyphens only (no spaces or capitals).'
          ),
    }),
    defineField({
      name: 'ctaHeading',
      title: 'CTA Box Heading',
      type: 'string',
      group: 'funnel',
      description:
        'e.g., "Ready to take control of your hypertension naturally?" Make it specific to the condition.',
    }),
    defineField({
      name: 'ctaSubtext',
      title: 'CTA Box Sub-text',
      type: 'string',
      group: 'funnel',
      description:
        'e.g., "Our certified clinical yoga therapists will design a protocol around your current medication plan."',
    }),

    // ── GROUP: TRANSLATIONS ───────────────────────────────────────────
    defineField({
      name: 'localizedContent',
      title: 'Translations (Add after English content is complete)',
      type: 'object',
      group: 'i18n',
      description:
        '🌐 Translate core content into Indian languages. English content is already in the main fields above. Only translate after the English version is fully complete and published.',
      fields: [
        {
          name: 'hi',
          title: '🇮🇳 Hindi (हिन्दी)',
          type: 'object',
          fields: [
            { name: 'seoTitle',         type: 'string', title: 'SEO Title (Hindi)' },
            { name: 'seoDescription',   type: 'text',   title: 'SEO Description (Hindi)', rows: 2 },
            { name: 'patientPainPoint', type: 'text',   title: 'Patient Pain Point (Hindi)', rows: 3 },
            { name: 'targetedRelief',   type: 'text',   title: 'Omira Intervention (Hindi)', rows: 4 },
          ],
        },
        {
          name: 'kn',
          title: '🌿 Kannada (ಕನ್ನಡ)',
          type: 'object',
          fields: [
            { name: 'seoTitle',         type: 'string', title: 'SEO Title (Kannada)' },
            { name: 'seoDescription',   type: 'text',   title: 'SEO Description (Kannada)', rows: 2 },
            { name: 'patientPainPoint', type: 'text',   title: 'Patient Pain Point (Kannada)', rows: 3 },
            { name: 'targetedRelief',   type: 'text',   title: 'Omira Intervention (Kannada)', rows: 4 },
          ],
        },
        {
          name: 'ta',
          title: '🌺 Tamil (தமிழ்)',
          type: 'object',
          fields: [
            { name: 'seoTitle',         type: 'string', title: 'SEO Title (Tamil)' },
            { name: 'seoDescription',   type: 'text',   title: 'SEO Description (Tamil)', rows: 2 },
            { name: 'patientPainPoint', type: 'text',   title: 'Patient Pain Point (Tamil)', rows: 3 },
            { name: 'targetedRelief',   type: 'text',   title: 'Omira Intervention (Tamil)', rows: 4 },
          ],
        },
        {
          name: 'te',
          title: '⭐ Telugu (తెలుగు)',
          type: 'object',
          fields: [
            { name: 'seoTitle',         type: 'string', title: 'SEO Title (Telugu)' },
            { name: 'seoDescription',   type: 'text',   title: 'SEO Description (Telugu)', rows: 2 },
            { name: 'patientPainPoint', type: 'text',   title: 'Patient Pain Point (Telugu)', rows: 3 },
            { name: 'targetedRelief',   type: 'text',   title: 'Omira Intervention (Telugu)', rows: 4 },
          ],
        },
      ],
    }),

    // ── GROUP: PUBLISHING ─────────────────────────────────────────────
    defineField({
      name: 'isPublished',
      title: 'Publish to Website',
      type: 'boolean',
      group: 'publishing',
      initialValue: false,
      description:
        '⚠️ Only toggle ON when: SEO metadata, EEAT author, disclaimer, and contraindications are all complete.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'publishing',
    }),
    defineField({
      name: 'sortPriority',
      title: 'Display Priority in B2C Catalog',
      type: 'number',
      group: 'publishing',
      description:
        'Lower numbers appear first in the /b2c page grid. Use 1-20. e.g., 1 = Hypertension shows first.',
    }),
  ],

  preview: {
    select: {
      title: 'diseaseName',
      subtitle: 'primaryKeyword',
      media: 'featuredImage',
      published: 'isPublished',
      disclaimer: 'disclaimerAcknowledged',
    },
    prepare({ title, subtitle, media, published, disclaimer }) {
      const flags: string[] = [];
      if (!published) flags.push('⏸️ Draft');
      if (!disclaimer) flags.push('⚠️ Disclaimer');
      return {
        title: `${flags.length ? flags.join(' ') + ' — ' : '✅ '}${title || 'Unnamed Condition'}`,
        subtitle: subtitle ? `🎯 ${subtitle}` : '❌ No keyword — SEO incomplete',
        media,
      };
    },
  },
  orderings: [
    { title: 'Priority (Featured First)', name: 'sortPriorityAsc', by: [{ field: 'sortPriority', direction: 'asc' }] },
    { title: 'Disease Name A-Z', name: 'diseaseNameAsc', by: [{ field: 'diseaseName', direction: 'asc' }] },
  ],
})
