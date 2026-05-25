import { defineField, defineType } from 'sanity';

/**
 * Testimonial schema — for homepage and About page social proof.
 * Managed entirely through Sanity Studio.
 */
export const omiraTestimonialSchema = defineType({
  name: 'omira_testimonial',
  title: 'Patient / Hospital Testimonial',
  type: 'document',
  icon: () => '💬',
  fields: [
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      rows: 4,
      description: 'The full testimonial text. First-person preferred.',
      validation: (R) =>
        R.required().min(40).max(500).error('Please write between 40 and 500 characters.'),
    }),
    defineField({
      name: 'patientName',
      title: 'Name / Attribution',
      type: 'string',
      description: 'e.g. "Kavitha R." or "Dr. Suresh M., MD"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'detail',
      title: 'Detail Line',
      type: 'string',
      description: 'e.g. "Hypertension Patient, Bengaluru" or "Oncology HOD, Private Hospital"',
    }),
    defineField({
      name: 'testimonialType',
      title: 'Testimonial Type',
      type: 'string',
      options: {
        list: [
          { title: 'Patient (B2C)', value: 'patient' },
          { title: 'Hospital / Doctor (B2B)', value: 'hospital' },
          { title: 'Corporate Wellness', value: 'corporate' },
        ],
        layout: 'radio',
      },
      initialValue: 'patient',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'relatedCondition',
      title: 'Related Condition (optional)',
      type: 'string',
      description: 'e.g. "Hypertension" — helps filter testimonials by condition page',
    }),
    defineField({
      name: 'photo',
      title: 'Patient / Doctor Photo (optional)',
      type: 'image',
      options: { hotspot: true },
      description: 'Small avatar shown next to the testimonial. Get written consent before publishing.',
    }),
    defineField({
      name: 'isPublished',
      title: 'Published?',
      type: 'boolean',
      initialValue: false,
      description: 'Only published testimonials appear on the website.',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured on Homepage?',
      type: 'boolean',
      initialValue: false,
      description: 'Featured testimonials appear in the homepage testimonials section.',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 50,
      description: 'Lower number = shown first.',
    }),
  ],
  preview: {
    select: {
      title: 'patientName',
      subtitle: 'testimonialType',
      media: 'photo',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle === 'patient' ? '🧘 Patient' : subtitle === 'hospital' ? '🏥 Hospital' : '💼 Corporate',
      };
    },
  },
  orderings: [
    { title: 'Sort Order', name: 'sortOrderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] },
  ],
});
