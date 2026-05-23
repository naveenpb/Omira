import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Clinical Journal (SEO Blogs)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'The URL path (e.g., neuroscience-of-craving)',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Meta Title',
      type: 'string',
      description: 'Optimal length: 50-60 characters',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Meta Description',
      type: 'text',
      description: 'Optimal length: 150-160 characters. This is what shows on Google.',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['Rehabilitation', 'Oncology', 'Cardiology', 'Hospital Integration'] },
    }),
    defineField({
      name: 'funnelTarget',
      title: 'Internal Funnel Target (The Hyperlink Trap)',
      type: 'string',
      description: 'The URL to route the user to after reading (e.g., /b2c/alcohol-rehab)',
    }),
    defineField({
      name: 'content',
      title: 'Article Body',
      type: 'array',
      of: [{ type: 'block' }], // This enables Sanity's Rich Text Editor
    }),
  ],
})