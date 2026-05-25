import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'omira_b2c_category',
  title: '🏷️ B2C: Clinical Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      description: 'e.g., "Cardiovascular", "Oncology Support", "Neurology"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 60 },
      description: 'Auto-generated. Used in: /treatments/category/[slug]',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'Shown on the category hub page. 1-2 sentences.',
    }),
    defineField({
      name: 'icon',
      title: 'Lucide Icon Name',
      type: 'string',
      description: 'e.g., HeartPulse, Brain, Ribbon, Flower2, Activity',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (for /treatments/category/[slug] page)',
      type: 'string',
      description: '50-60 characters. e.g., "Clinical Yoga for Cardiovascular Disease | Omira"',
      validation: (R) =>
        R.required()
          .min(40)
          .max(65)
          .error('❌ SEO title must be 40-65 characters.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 2,
      description: '150-160 characters. Describe what conditions are in this category.',
      validation: (R) =>
        R.required()
          .min(120)
          .max(165)
          .error('❌ Meta description must be 120-165 characters.'),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower = appears first. e.g., 1 = Cardiovascular shows first.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'seoTitle' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle || 'No SEO title set' };
    },
  },
  orderings: [
    { title: 'Sort Order', name: 'sortOrderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] },
  ],
})
