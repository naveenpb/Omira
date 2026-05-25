import { defineType, defineField } from 'sanity'

// NOTE: Field names in this schema EXACTLY match what B2BClient.tsx expects.
// Fields corrected from the old b2bHospital.ts: savingsValue, hospitalBaseline,
// clinicalOutcome, researchEvidence, priority are all now present.

export default defineType({
  name: 'omira_b2b_department',
  title: '🏥 B2B: Hospital Department Integration',
  type: 'document',
  groups: [
    { name: 'core',       title: '1. Core Department Data' },
    { name: 'clinical',   title: '2. Clinical Outcomes' },
    { name: 'business',   title: '3. Business & ROI Data' },
    { name: 'publishing', title: '4. Publishing Controls' },
  ],

  fields: [
    // ── CORE DATA ────────────────────────────────────────────────────
    defineField({
      name: 'department',
      title: 'Department / Ward Name',
      type: 'string',
      group: 'core',
      description: 'e.g., "Oncology & Palliative", "Orthopedics & Post-Op", "Cardiology"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'core',
      options: {
        source: 'department',
        maxLength: 60,
        slugify: (input: string) =>
          input.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').slice(0, 60),
      },
      description: 'Auto-generated. Used for /hospitals/departments/[slug] page.',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'priority',
      title: 'Priority Level',
      type: 'string',
      group: 'core',
      options: {
        list: [
          { title: '🔴 High — Immediate ROI, urgent pain point', value: 'High' },
          { title: '🟡 Medium — Strong value, longer sales cycle', value: 'Medium' },
          { title: '🟢 Low — Good add-on, not primary focus', value: 'Low' },
        ],
        layout: 'radio',
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Lucide Icon Name',
      type: 'string',
      group: 'core',
      description:
        'Exact Lucide icon name for the department card. e.g., Ribbon, Bone, HeartPulse, Brain, Activity',
    }),
    defineField({
      name: 'painPoint',
      title: 'Hospital Bottleneck / Pain Point',
      type: 'text',
      group: 'core',
      description:
        'What specific problem does this department face today? e.g., "High patient anxiety pre-chemo, poor treatment compliance, severe fatigue persists in 70% of patients."',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'hospitalBaseline',
      title: 'Current Hospital Status (Before Omira)',
      type: 'text',
      group: 'core',
      description:
        'What does the hospital currently do WITHOUT Omira? e.g., "Psychiatric consult (expensive, limited slots) + Sedatives. QoL score: 55."',
    }),
    defineField({
      name: 'omiraIntervention',
      title: 'Omira Yoga Intervention',
      type: 'text',
      group: 'core',
      description:
        'Exactly what Omira delivers. e.g., "Group Yoga Nidra + cooling breathing pre-chemo. Supported restorative poses for fatigue management."',
      validation: (R) => R.required(),
    }),

    // ── CLINICAL OUTCOMES ────────────────────────────────────────────
    defineField({
      name: 'clinicalOutcome',
      title: 'Projected Clinical Outcome',
      type: 'text',
      group: 'clinical',
      description:
        'What measurable results does Omira produce? e.g., "Patient compliance ↑ 25%, drastically reduced sedative use. QoL score increases from 55 to 72."',
    }),
    defineField({
      name: 'researchEvidence',
      title: 'Supporting Research Evidence',
      type: 'string',
      group: 'clinical',
      description:
        'Cite the most credible study. e.g., "NEJM 2022 / Studies show cancer fatigue reduced by 40% with targeted yoga interventions."',
    }),
    defineField({
      name: 'patientMetrics',
      title: 'Measurable Patient Metrics to Track',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'clinical',
      description:
        'Specific metrics tracked during the pilot. e.g., ["FACIT-F fatigue score", "Sedative dosage per week", "Patient-reported QoL (EORTC QLQ-C30)"]',
    }),

    // ── BUSINESS & ROI DATA ───────────────────────────────────────────
    defineField({
      name: 'savingsValue',
      title: 'Estimated Monthly Savings (₹ — numbers only)',
      type: 'number',
      group: 'business',
      description:
        'Enter only the number. e.g., 80000. The UI formats it as ₹80,000. This is the GSAP animated counter value.',
      validation: (R) =>
        R.required()
          .positive()
          .error('❌ Monthly savings value is required. Used for the animated ROI counter on the B2B page.'),
    }),
    defineField({
      name: 'financialSavings',
      title: 'Savings Display Label',
      type: 'string',
      group: 'business',
      description:
        'Human-readable version shown as a label. e.g., "₹80,000 / month" or "₹1,20,000 / month"',
    }),
    defineField({
      name: 'pilotDuration',
      title: 'Pilot Program Duration',
      type: 'string',
      group: 'business',
      description: 'e.g., "90-day zero-CapEx pilot"',
      initialValue: '90 days',
    }),
    defineField({
      name: 'commissionModel',
      title: 'Commission / Partnership Model',
      type: 'text',
      group: 'business',
      description:
        'Describe the revenue sharing arrangement for this department. e.g., "15% referral fee on B2C packages sourced from this ward. ₹800/group session for inpatient ward yoga."',
    }),

    // ── PUBLISHING ────────────────────────────────────────────────────
    defineField({
      name: 'isPublished',
      title: 'Published (Visible on /b2b page)',
      type: 'boolean',
      group: 'publishing',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Display Order on B2B Page',
      type: 'number',
      group: 'publishing',
      description: 'Lower numbers appear first in the department sidebar. e.g., 1 = shown first.',
    }),
  ],

  preview: {
    select: {
      title: 'department',
      subtitle: 'financialSavings',
      priority: 'priority',
      published: 'isPublished',
    },
    prepare({ title, subtitle, priority, published }) {
      const priorityIcon = { High: '🔴', Medium: '🟡', Low: '🟢' }[priority as string] || '';
      return {
        title: `${published ? '✅' : '⏸️'} ${priorityIcon} ${title || 'Unnamed Department'}`,
        subtitle: subtitle ? `💰 ${subtitle}` : 'No savings value set',
      };
    },
  },
  orderings: [
    {
      title: 'Sort Order (Display)',
      name: 'sortOrderAsc',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
    {
      title: 'Priority (High First)',
      name: 'priorityDesc',
      by: [{ field: 'priority', direction: 'asc' }],
    },
  ],
})
