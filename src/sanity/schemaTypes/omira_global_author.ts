import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'omira_global_author',
  title: '👤 Expert Profile (Authors / Therapists)',
  type: 'document',
  groups: [
    { name: 'identity',    title: '1. Identity & Photo' },
    { name: 'credentials', title: '2. Medical Credentials (EEAT)' },
    { name: 'seo',         title: '3. Public Profile SEO' },
  ],
  fields: [
    // ── IDENTITY ─────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      group: 'identity',
      description: 'e.g., "Dr. Priya Sharma" or "Ravi Kumar"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Profile URL Slug',
      type: 'slug',
      group: 'identity',
      options: { source: 'name', maxLength: 60 },
      description: 'Auto-generated. Used for /about/[slug] profile page.',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Professional Headshot (Required)',
      type: 'image',
      group: 'identity',
      options: { hotspot: true },
      description:
        '🖼️ A real, professional photo. NOT a stock image. Google uses author images in the Knowledge Panel.',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description:
            'e.g., "Dr. Priya Sharma, Certified Yoga Therapist at Omira Wellness, Bengaluru"',
          validation: (R) => R.required(),
        }),
      ],
      validation: (R) =>
        R.required().error('❌ A real professional photo is mandatory for EEAT credibility.'),
    }),
    defineField({
      name: 'role',
      title: 'Professional Title',
      type: 'string',
      group: 'identity',
      description:
        'e.g., "C-IAYT Certified Yoga Therapist", "MBBS, MD (Cardiology) — Clinical Advisor"',
      validation: (R) =>
        R.required().error(
          '❌ Professional title required. Include all relevant qualifications.'
        ),
    }),
    defineField({
      name: 'bio',
      title: 'Expert Biography (3rd person)',
      type: 'text',
      rows: 6,
      group: 'identity',
      description:
        '📝 Write in 3rd person. Include: years of experience, specialisations, institutions trained at. Aim for 100-200 words. Example: "Ravi Kumar is a C-IAYT certified yoga therapist with 12 years of clinical experience specialising in cardiac rehabilitation..."',
      validation: (R) =>
        R.required()
          .min(80)
          .error('❌ Bio must be at least 80 characters. Short bios signal weak EEAT to Google.'),
    }),

    // ── CREDENTIALS (EEAT SIGNALS) ────────────────────────────────────
    defineField({
      name: 'certifications',
      title: 'Professional Certifications',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'credentials',
      description:
        '🎓 List each separately. Examples: "C-IAYT — International Association of Yoga Therapists", "RYT-500 (Yoga Alliance)", "MBBS — Rajiv Gandhi University of Health Sciences"',
      validation: (R) =>
        R.required()
          .min(1)
          .error(
            '❌ At least one certification is mandatory. This is a core EEAT signal for Google YMYL pages.'
          ),
    }),
    defineField({
      name: 'yearsExperience',
      title: 'Years of Clinical Experience',
      type: 'number',
      group: 'credentials',
      description: 'How many years of clinical yoga therapy practice?',
      validation: (R) => R.required().positive().integer(),
    }),
    defineField({
      name: 'specializations',
      title: 'Clinical Specializations',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'credentials',
      description:
        'Which disease categories? e.g., "Oncology Support", "Cardiac Rehabilitation", "Neurology", "Geriatric Wellness"',
    }),
    defineField({
      name: 'institutionAffiliations',
      title: 'Hospital / Institution Affiliations',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'credentials',
      description:
        'Any hospitals, clinics, or universities this expert is affiliated with. Critical for Google authoritativeness signals.',
    }),
    defineField({
      name: 'publishedResearch',
      title: 'Published Research / Papers',
      type: 'array',
      group: 'credentials',
      description:
        'Conference presentations and published studies both count. Adds significant EEAT weight.',
      of: [
        {
          type: 'object',
          name: 'researchItem',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Paper / Presentation Title',
              validation: (R) => R.required(),
            }),
            defineField({ name: 'publication', type: 'string', title: 'Journal / Conference' }),
            defineField({ name: 'year', type: 'number', title: 'Year Published' }),
            defineField({ name: 'url', type: 'url', title: 'Link (if available)' }),
          ],
          preview: { select: { title: 'title', subtitle: 'publication' } },
        },
      ],
    }),

    // ── PUBLIC SEO PROFILE ────────────────────────────────────────────
    defineField({
      name: 'linkedIn',
      title: 'LinkedIn Profile URL',
      type: 'url',
      group: 'seo',
      description:
        '🔗 Google uses LinkedIn to verify expert identity. A real, active LinkedIn profile significantly boosts EEAT.',
    }),
    defineField({
      name: 'seoProfileDescription',
      title: 'Public Profile Page Meta Description',
      type: 'text',
      rows: 2,
      group: 'seo',
      description: '150-160 character description for the /about/[name] page meta tag.',
      validation: (R) => R.max(165).warning('⚠️ Keep under 165 characters for Google SERP display.'),
    }),
    defineField({
      name: 'schemaOrgType',
      title: 'Google Schema.org Type',
      type: 'string',
      group: 'seo',
      options: {
        list: [
          { title: 'Person (Yoga Therapist)', value: 'Person' },
          { title: 'Physician (Medical Doctor)', value: 'Physician' },
          { title: 'HealthcareProvider (Clinic / Org)', value: 'HealthcareProvider' },
        ],
        layout: 'radio',
      },
      initialValue: 'Person',
      description:
        'Used in JSON-LD structured data. Choose "Physician" for MD/MBBS doctors. "Person" for yoga therapists.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: `🎓 ${subtitle || 'No title set'}`, media };
    },
  },
})
