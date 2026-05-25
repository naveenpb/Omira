import { defineField, defineType } from 'sanity';

/**
 * Founder / Leadership Profile schema
 * Allows the Omira team to manage the founder story entirely in Sanity Studio.
 */
export const omiraFounderSchema = defineType({
  name: 'omira_founder',
  title: 'Founder / Leadership Profile',
  type: 'document',
  icon: () => '👤',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title / Role',
      type: 'string',
      placeholder: 'e.g. "Founder & Head of Clinical Protocols"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'tagline',
      title: 'One-line Tagline',
      type: 'string',
      description: 'Short headline shown prominently. e.g. "Bridging therapeutic yoga with clinical medicine since 2018."',
    }),
    defineField({
      name: 'story',
      title: 'Full Story (Portable Text)',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        },
      ],
      description: 'The full origin story. Written in rich text — appears on the About page.',
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'e.g. C-IAYT, E-RYT 500, MBBS, etc.',
    }),
    defineField({
      name: 'yearsExperience',
      title: 'Years of Experience',
      type: 'number',
    }),
    defineField({
      name: 'linkedIn',
      title: 'LinkedIn Profile URL',
      type: 'url',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 1,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'title', media: 'photo' },
  },
});
