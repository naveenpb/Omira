import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'omira_content_blog',
  title: '📝 Clinical Journal Article',
  type: 'document',
  groups: [
    { name: 'seo',     title: '⭐ 1. SEO (Complete This First)' },
    { name: 'content', title: '✍️ 2. Article Content' },
    { name: 'funnel',  title: '🎯 3. Conversion Funnel' },
    { name: 'meta',    title: '📋 4. Article Details' },
  ],

  fields: [
    // ── GROUP: SEO (MANDATORY — DO FIRST) ────────────────────────────
    defineField({
      name: 'seoTitle',
      title: 'Google Title (SEO Meta Title)',
      type: 'string',
      group: 'seo',
      description:
        '📏 THIS IS WHAT APPEARS ON GOOGLE. Write like: "[Primary Keyword] | Omira Wellness". Must be 50-60 characters. Example: "Yoga for High Blood Pressure: 5 Clinical Techniques | Omira"',
      validation: (R) =>
        R.required()
          .min(40)
          .max(65)
          .error('❌ SEO title must be 40-65 characters for proper Google display.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Google Description (Meta Description)',
      type: 'text',
      rows: 3,
      group: 'seo',
      description:
        '📏 THIS SUMMARY SHOWS BELOW YOUR TITLE ON GOOGLE. 150-160 characters. Include primary keyword + what the reader will learn. Example: "Discover how clinical pranayama and yoga nidra reduce blood pressure by 10-15 mmHg in 8 weeks, without needing to change your current medication."',
      validation: (R) =>
        R.required()
          .min(120)
          .max(165)
          .error('❌ Meta description must be 120-165 characters.'),
    }),
    defineField({
      name: 'primaryKeyword',
      title: 'Primary Keyword (The #1 Phrase to Rank For)',
      type: 'string',
      group: 'seo',
      description:
        '🎯 The SINGLE most important search phrase. This MUST appear in: your SEO title, the first paragraph, and at least 2 H2 headings. Example: "yoga for hypertension" or "yoga nidra cancer fatigue". One keyword only.',
      validation: (R) =>
        R.required()
          .max(80)
          .error('❌ Primary keyword is required. Without it this article has no SEO target.'),
    }),
    defineField({
      name: 'secondaryKeywords',
      title: 'Secondary Keywords (Supporting / LSI Phrases)',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'seo',
      description:
        '💡 Add 3-6 related phrases. Example: ["high blood pressure yoga", "pranayama for BP", "morning yoga hypertension"]. Weave these naturally into your subheadings and body.',
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
        '🖼️ Appears on WhatsApp/Twitter/LinkedIn shares. Recommended: 1200×630px. Professional clinical imagery only. No stock photo clichés.',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Image Alt Text (Required — Include keyword)',
          description:
            'Describe the image in 5-12 words including your keyword. e.g., "Clinical yoga session for hypertension management at Omira Wellness Bengaluru"',
          validation: (R) =>
            R.required()
              .min(10)
              .max(125)
              .error('❌ Alt text is mandatory for every image.'),
        }),
      ],
      validation: (R) =>
        R.required().error('❌ A social share image is required before publishing.'),
    }),
    defineField({
      name: 'faqSchema',
      title: '❓ FAQ Section (Creates Rich Snippet on Google — High Value)',
      type: 'array',
      group: 'seo',
      description:
        '🌟 FAQs appear EXPANDED directly in Google search results. Add 3-5 questions that patients actually search. e.g., "Does yoga work for high blood pressure?", "How long until yoga lowers my BP?", "Is yoga safe while on blood pressure medication?"',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'FAQ Item',
          fields: [
            defineField({
              name: 'question',
              title: 'Question (Exactly as patients would type it into Google)',
              type: 'string',
              validation: (R) =>
                R.required()
                  .min(10)
                  .error('❌ Question required. Frame it as a natural patient search query.'),
            }),
            defineField({
              name: 'answer',
              title: 'Answer (40-300 characters)',
              type: 'text',
              rows: 3,
              validation: (R) =>
                R.required()
                  .min(40)
                  .max(300)
                  .error('❌ Answer must be 40-300 characters for optimal rich snippet display.'),
            }),
          ],
          preview: { select: { title: 'question' } },
        },
      ],
      validation: (R) =>
        R.min(2).warning('⚠️ Add at least 3 FAQ items to maximize rich snippet chances.'),
    }),

    // ── GROUP: CONTENT ─────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Article Display Title (The Headline Readers See)',
      type: 'string',
      group: 'content',
      description:
        '📰 The large H1 headline shown on the article page. Can be longer/more creative than SEO title. Example: "Beyond Exhaustion: How Yoga Nidra Finally Restored My Energy During Chemotherapy"',
      validation: (R) => R.required().error('❌ Article title is required.'),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug (Auto-Generated — Do Not Edit After Publishing)',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-')
            .slice(0, 96),
      },
      description:
        '🔗 Click "Generate" to auto-create from title. This becomes the URL: /blog/[slug]. ⚠️ Never change after the article is published live.',
      validation: (R) =>
        R.required().custom((slug: any) => {
          if (!slug?.current) return '❌ Slug is required. Click "Generate" button.';
          if (slug.current.includes(' ')) return '❌ Slug must not contain spaces.';
          if (/[A-Z]/.test(slug.current)) return '❌ Slug must be all lowercase.';
          return true;
        }),
    }),
    defineField({
      name: 'excerpt',
      title: 'Article Excerpt (Shown on Blog listing cards)',
      type: 'text',
      rows: 3,
      group: 'content',
      description:
        '📋 A 1-2 sentence teaser. Hook the reader emotionally and clinically. Shown on /blog index page. Example: "The treatment felt worse than the disease — but yoga nidra gave 40% of cancer patients their energy back. Here is the clinical mechanism."',
      validation: (R) =>
        R.required()
          .min(80)
          .max(250)
          .error('❌ Excerpt required. Keep it between 80-250 characters.'),
    }),
    defineField({
      name: 'body',
      title: 'Article Body Content',
      type: 'array',
      group: 'content',
      description: `✍️ WRITING GUIDE (FOLLOW THIS FOR SEO):
1. FIRST PARAGRAPH: Must naturally include your primary keyword.
2. H2 HEADINGS: Use every 200-300 words. Include secondary keywords in H2 text.
3. H3 HEADINGS: Sub-points under H2s. Keep logical hierarchy.
4. TARGET LENGTH: 800-1,500 words for medical articles.
5. BOLD key clinical claims using Strong formatting.
6. CLINICAL CALLOUT BLOCKS: Use for statistics. Always cite the source.
7. INTERNAL LINK: Add at least 1 link to a related condition page.
8. EXTERNAL LINK: Add at least 1 link to a medical study (PubMed, JAMA, WHO, AHA).`,
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal Paragraph', value: 'normal' },
            { title: 'H2 — Major Section (Use keyword here)', value: 'h2' },
            { title: 'H3 — Sub-Section', value: 'h3' },
            { title: 'Pull Quote (Clinical Quote)', value: 'blockquote' },
          ],
          lists: [
            { title: '• Bullet List', value: 'bullet' },
            { title: '1. Numbered List', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold / Strong', value: 'strong' },
              { title: 'Italic / Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'internalLink',
                type: 'object',
                title: '🔗 Internal Link (to Our Own Pages)',
                fields: [
                  {
                    name: 'href',
                    type: 'string',
                    title: 'Internal URL path (start with /)',
                    description: 'e.g., /treatments/hypertension or /blog/yoga-for-blood-pressure',
                  },
                ],
              },
              {
                name: 'externalLink',
                type: 'object',
                title: '📚 External Link (Medical Study / Research)',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Full URL (must be a medical study, PubMed, WHO, AHA, etc.)',
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab?',
                    initialValue: true,
                  },
                  {
                    name: 'noFollow',
                    type: 'boolean',
                    title: 'Add rel="nofollow"? (Use for non-medical/commercial external sites)',
                    initialValue: false,
                  },
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
              title: 'Image Alt Text (Required)',
              description: 'Describe the image. Include keyword if relevant.',
              validation: (R) =>
                R.required().error('❌ Every image must have alt text.'),
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Image Caption (optional, shown below image)',
            }),
          ],
        },
        {
          type: 'object',
          name: 'clinicalCallout',
          title: '🔬 Clinical Evidence Callout Block',
          description:
            'Use this for statistics and research citations. Creates a styled evidence card in the article.',
          fields: [
            defineField({
              name: 'stat',
              title: 'The Statistic or Key Finding',
              type: 'string',
              description: 'e.g., "40% reduction in chemotherapy-related fatigue"',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'source',
              title: 'Research Source',
              type: 'string',
              description:
                'e.g., "NEJM, 2022 — Randomized Controlled Trial (n=120 cancer patients)"',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'context',
              title: 'Context (1-2 sentences explaining the stat)',
              type: 'text',
              rows: 2,
            }),
          ],
          preview: { select: { title: 'stat', subtitle: 'source' } },
        },
      ],
      validation: (R) =>
        R.required().error('❌ Article body cannot be empty.'),
    }),

    // ── GROUP: FUNNEL ──────────────────────────────────────────────────
    defineField({
      name: 'funnelTarget',
      title: '🎯 Conversion Target (Which Condition Protocol Does This Article Send Readers To?)',
      type: 'reference',
      to: [{ type: 'omira_b2c_condition' }],
      group: 'funnel',
      description:
        'MANDATORY: Every article must drive the reader to a specific condition protocol page. This auto-generates the dark CTA block at the bottom. Example: "Yoga for BP" article → Hypertension Protocol page.',
      validation: (R) =>
        R.required().error(
          '❌ Funnel target is required. Every article exists to convert a reader into a clinical lead.'
        ),
    }),
    defineField({
      name: 'funnelCtaText',
      title: 'CTA Button Text',
      type: 'string',
      group: 'funnel',
      description:
        'The text on the conversion button. Be specific to the protocol. Example: "Explore the Morning Calm Hypertension Protocol →"',
      validation: (R) =>
        R.required()
          .max(80)
          .error('❌ CTA text required.'),
    }),

    // ── GROUP: ARTICLE META ────────────────────────────────────────────
    defineField({
      name: 'category',
      title: 'Article Category',
      type: 'string',
      group: 'meta',
      options: {
        list: [
          { title: '❤️ Cardiovascular', value: 'cardiovascular' },
          { title: '🎗️ Oncology', value: 'oncology' },
          { title: '🛡️ Rehabilitation', value: 'rehabilitation' },
          { title: '🧠 Neurology', value: 'neurology' },
          { title: '🌸 Women\'s Health', value: 'womens-health' },
          { title: '👴 Geriatrics', value: 'geriatrics' },
          { title: '🏥 Hospital Integration', value: 'hospital-integration' },
          { title: '🧘 Mental Health', value: 'mental-health' },
        ],
        layout: 'radio',
      },
      validation: (R) => R.required().error('❌ Select a category.'),
    }),
    defineField({
      name: 'author',
      title: 'Author (Must Be a Verified Omira Expert)',
      type: 'reference',
      to: [{ type: 'omira_global_author' }],
      group: 'meta',
      description:
        '🎓 CRITICAL FOR EEAT: Google ranks medical content much higher when authored by credentialed experts. Always assign a real Omira therapist or doctor.',
      validation: (R) =>
        R.required().error(
          '❌ Author is mandatory. Medical content without a named expert author signals low EEAT to Google.'
        ),
    }),
    defineField({
      name: 'reviewedBy',
      title: 'Clinically Reviewed By (Secondary Reviewer)',
      type: 'reference',
      to: [{ type: 'omira_global_author' }],
      group: 'meta',
      description:
        '🏥 If a doctor or second therapist reviewed this article, add them. Displays "Clinically Reviewed by Dr. X" badge — significant EEAT trust signal.',
    }),
    defineField({
      name: 'readTime',
      title: 'Estimated Read Time',
      type: 'string',
      group: 'meta',
      description: 'e.g., "5 Min Read". Calculate: word count ÷ 200.',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'meta',
      validation: (R) =>
        R.required().error('❌ Published date required for Google freshness signals.'),
    }),
    defineField({
      name: 'lastUpdatedAt',
      title: 'Last Updated Date',
      type: 'datetime',
      group: 'meta',
      description:
        '📅 Update this every time you meaningfully revise the article. Google rewards medical content freshness.',
    }),
    defineField({
      name: 'isPublished',
      title: 'Publish to Website',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
      description:
        '⚠️ Only toggle ON when ALL mandatory fields (SEO title, description, keyword, author, image, funnel target) are complete.',
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Related Articles (Internal Linking — max 3)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'omira_content_blog' }] }],
      group: 'meta',
      description:
        '🔗 Select 2-3 related articles shown at the bottom. Creates internal link cluster for SEO authority building.',
      validation: (R) =>
        R.max(3).warning('⚠️ Keep related articles to 3 maximum to avoid diluting link authority.'),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'primaryKeyword',
      media: 'ogImage',
      published: 'isPublished',
    },
    prepare({ title, subtitle, media, published }) {
      return {
        title: `${published ? '✅' : '⏸️'} ${title || 'Untitled Article'}`,
        subtitle: subtitle ? `🎯 ${subtitle}` : '❌ No keyword — SEO incomplete',
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
