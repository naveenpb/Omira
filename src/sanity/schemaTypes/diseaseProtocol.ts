import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'diseaseProtocol',
  title: 'Clinical Disease Protocols',
  type: 'document',
  fields: [
    defineField({
      name: 'diseaseName',
      title: 'Disease Name',
      type: 'string',
      description: 'e.g., Hypertension, Type 2 Diabetes, CAD',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'targetAudience',
      title: 'Target Audience',
      type: 'string',
      options: {
        list: ['B2C', 'B2B New', 'B2C + B2B'],
      },
    }),
    defineField({
      name: 'yogaContribution',
      title: 'Yoga Contribution to Treatment (%)',
      type: 'string',
      description: 'e.g., 30–40%',
    }),
    defineField({
      name: 'bestPhase',
      title: 'Best Phase of Disease for Yoga',
      type: 'string',
      description: 'e.g., Stage 1 & 2 (Mild-Moderate)',
    }),
    defineField({
      name: 'clinicalRationale',
      title: 'Why This Phase? (Clinical Rationale)',
      type: 'text',
    }),
    defineField({
      name: 'evidenceReference',
      title: 'Evidence / Study Reference',
      type: 'string',
      description: 'e.g., JAMA 2019: 10-15 mmHg reduction',
    }),
    defineField({
      name: 'yogaModule',
      title: 'Yoga Module Used',
      type: 'string',
      description: 'e.g., Morning Calm Package',
    }),
    defineField({
      name: 'yogaAllopathyBenefit',
      title: 'Yoga + Allopathy Benefit (Outcome)',
      type: 'text',
    }),
    defineField({
      name: 'allopathyOnlyOutcome',
      title: 'Allopathy Only Outcome',
      type: 'text',
    }),
    defineField({
      name: 'safetyNotes',
      title: 'Safety / Contraindication Notes',
      type: 'text',
      description: 'e.g., Physician clearance mandatory. NEVER market as cure.',
    }),
  ],
  preview: {
    select: {
      title: 'diseaseName',
      subtitle: 'yogaModule',
    },
  },
})