import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'b2bHospital',
  title: 'B2B Hospital Integration Data',
  type: 'document',
  fields: [
    defineField({
      name: 'department',
      title: 'Department / Ward',
      type: 'string',
      description: 'e.g., Oncology, Orthopedics, Cardiology',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'painPoint',
      title: 'Pain Point Identified',
      type: 'text',
      description: 'The hospital bottleneck (e.g., High patient anxiety pre-chemo)',
    }),
    defineField({
      name: 'currentSolution',
      title: 'Current Solution (Hospital)',
      type: 'text',
      description: 'What the hospital currently does (e.g., Psychiatric consult + Sedatives)',
    }),
    defineField({
      name: 'gapUnmetNeed',
      title: 'Gap / Unmet Need',
      type: 'text',
      description: 'The missing link (e.g., Not enough mental health support at scale)',
    }),
    defineField({
      name: 'omiraIntervention',
      title: 'How Yoga Addresses It (Omira Intervention)',
      type: 'text',
    }),
    defineField({
      name: 'valueAdded',
      title: 'Value Added (Additive)',
      type: 'text',
      description: 'e.g., Patient compliance up 25%, reduced sedative use',
    }),
    defineField({
      name: 'estCostSaving',
      title: 'Est. Cost Saving (₹/month)',
      type: 'number',
      description: 'Just the number (e.g., 80000). The UI will format it with the ₹ symbol.',
    }),
    defineField({
      name: 'icon',
      title: 'Lucide Icon Name',
      type: 'string',
      description: 'e.g., Ribbon, Bone, HeartPulse',
    }),
  ],
  preview: {
    select: {
      title: 'department',
      subtitle: 'estCostSaving',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title,
        subtitle: subtitle ? `Est. Savings: ₹${subtitle.toLocaleString('en-IN')}` : 'No savings recorded',
      }
    }
  }
})