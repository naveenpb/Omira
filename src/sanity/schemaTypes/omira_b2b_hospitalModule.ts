import { defineField, defineType } from 'sanity';

/**
 * Hospital Module (B2B Loop Engine)
 *
 * Represents a specific hospital department integration opportunity with a
 * multi-phase Allopathy + Yoga co-management protocol (the "Loop Plan").
 *
 * CRITICAL NARRATIVE RULE:
 *   NEVER frame yoga as reducing hospital revenue. Always frame as:
 *   "Value-Additive Continuum of Care" → Patient Satisfaction, Optimized
 *   Bed Turnover, Reduced Staff Burnout, Post-Care Patient Retention.
 */
export const omiraHospitalModuleSchema = defineType({
  name: 'omira_b2b_hospitalModule',
  title: '🏥 Hospital Module (Loop Engine)',
  type: 'document',
  icon: () => '🏥',
  groups: [
    { name: 'problem',    title: '1. Pain Point & Current State' },
    { name: 'solution',   title: '2. Yoga Intervention & Value' },
    { name: 'loopEngine', title: '3. Loop Plan (Phase Protocol)' },
    { name: 'metrics',    title: '4. Financial & Clinical Metrics' },
  ],
  fields: [
    // ── PROBLEM ─────────────────────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Module Name',
      type: 'string',
      group: 'problem',
      description: 'e.g., "Oncology Ward Yoga Integration" or "Post-Surgical Recovery Module"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'problem',
      options: { source: 'name', maxLength: 80 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'department',
      title: 'Target Department',
      type: 'reference',
      to: [{ type: 'omira_b2b_department' }],
      group: 'problem',
      description: 'Link to the B2B Department this module belongs to.',
    }),
    defineField({
      name: 'painPoint',
      title: 'Department Pain Point',
      type: 'text',
      rows: 3,
      group: 'problem',
      description: 'The specific clinical/operational challenge this department faces.',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'currentSolution',
      title: 'Current Standard of Care',
      type: 'text',
      rows: 3,
      group: 'problem',
      description: 'What the department currently does to address this (drugs, PT, counselling, etc.).',
    }),
    defineField({
      name: 'unmetNeed',
      title: 'Unmet Clinical Need',
      type: 'text',
      rows: 3,
      group: 'problem',
      description: 'What gap remains even after the current solution? (e.g., high anxiety despite meds)',
    }),

    // ── SOLUTION ────────────────────────────────────────────────────────
    defineField({
      name: 'yogaIntervention',
      title: 'Omira Yoga Intervention',
      type: 'text',
      rows: 4,
      group: 'solution',
      description: 'The specific yoga protocol Omira deploys. (e.g., "Group Yoga Nidra — 3× weekly in oncology ward")',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'valueAdded',
      title: 'Value Added (Continuum of Care)',
      type: 'text',
      rows: 4,
      group: 'solution',
      description:
        '⚠️ NEVER frame as "reducing hospital revenue". Frame as: Increased Patient Satisfaction, ' +
        'Optimized Bed Turnover, Reduced Staff Burnout (Psych/Physio loads), Post-Care Patient Retention.',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'priority',
      title: 'Implementation Priority',
      type: 'string',
      group: 'solution',
      options: {
        list: [
          { title: 'High Priority', value: 'H' },
          { title: 'Medium Priority', value: 'M' },
          { title: 'Low Priority', value: 'L' },
        ],
        layout: 'radio',
      },
      initialValue: 'H',
    }),

    // ── LOOP ENGINE ─────────────────────────────────────────────────────
    defineField({
      name: 'loopPlan',
      title: 'Allopathy + Yoga Co-Management Loop Plan',
      type: 'array',
      group: 'loopEngine',
      description:
        'Each phase in the co-management protocol. The "Loop" shows: What allopathy does → What yoga adds → How we measure delta improvement → What happens next.',
      of: [
        {
          type: 'object',
          name: 'loopPhase',
          title: 'Phase',
          fields: [
            defineField({
              name: 'phaseName',
              title: 'Phase Name',
              type: 'string',
              description: 'e.g., "Phase 1: Acute Ward Recovery (Day 1-7)"',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'duration',
              title: 'Duration',
              type: 'string',
              description: 'e.g., "7 days", "4 weeks", "Ongoing"',
            }),
            defineField({
              name: 'allopathyProtocol',
              title: 'Allopathy Protocol (Standard Care)',
              type: 'text',
              rows: 3,
              description: 'What the hospital does in this phase.',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'allopathyOutcome',
              title: 'Expected Allopathy-Only Outcome',
              type: 'text',
              rows: 2,
              description: 'What typically happens with standard care alone.',
            }),
            defineField({
              name: 'yogaAddedProtocol',
              title: 'Added Yoga Protocol (Omira Layer)',
              type: 'text',
              rows: 3,
              description: 'What Omira adds on top of standard care.',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'yogaAddedOutcome',
              title: 'Combined Allopathy + Yoga Outcome',
              type: 'text',
              rows: 2,
              description: 'The measurable improvement when yoga is added.',
            }),
            defineField({
              name: 'deltaImprovement',
              title: 'Delta Improvement (Δ)',
              type: 'string',
              description: 'The net gain. e.g., "−35% anxiety scores", "+2.4 days earlier discharge"',
            }),
            defineField({
              name: 'frequency',
              title: 'Session Frequency',
              type: 'string',
              description: 'e.g., "3× per week, 30 min per session"',
            }),
            defineField({
              name: 'assessmentMetric',
              title: 'Assessment Metric',
              type: 'string',
              description: 'e.g., "HAM-A anxiety scale", "6-minute walk test", "VAS pain score"',
            }),
            defineField({
              name: 'measurementTimeline',
              title: 'Measurement Timeline',
              type: 'string',
              description: 'When is this metric assessed? e.g., "Baseline → Week 4 → Week 8"',
            }),
            defineField({
              name: 'loopNextStep',
              title: 'Loop Next Step',
              type: 'text',
              rows: 2,
              description: 'What happens after this phase? e.g., "Progress to Phase 2" or "Refer back to hospital if anomaly detected"',
            }),
            defineField({
              name: 'safetyNotes',
              title: 'Safety Notes / Contraindications',
              type: 'text',
              rows: 2,
              description: 'Any safety considerations for this phase.',
            }),
          ],
          preview: {
            select: { title: 'phaseName', subtitle: 'duration' },
            prepare({ title, subtitle }) {
              return { title: title || 'Unnamed Phase', subtitle: subtitle ? `⏱ ${subtitle}` : '' };
            },
          },
        },
      ],
    }),

    // ── METRICS ──────────────────────────────────────────────────────────
    defineField({
      name: 'estimatedMonthlySavings',
      title: 'Estimated Monthly Savings (₹)',
      type: 'number',
      group: 'metrics',
      description: 'Estimated cost savings per month from this module. Used in ROI calculator.',
    }),
    defineField({
      name: 'patientSatisfactionLift',
      title: 'Patient Satisfaction Lift (%)',
      type: 'number',
      group: 'metrics',
      description: 'Estimated % improvement in patient satisfaction scores.',
    }),
    defineField({
      name: 'bedTurnoverOptimization',
      title: 'Bed Turnover Optimization (days saved)',
      type: 'number',
      group: 'metrics',
      description: 'Average reduction in length of stay per patient.',
    }),
    defineField({
      name: 'staffBurnoutReduction',
      title: 'Staff Burnout Reduction (%)',
      type: 'number',
      group: 'metrics',
      description: 'Estimated reduction in physio/psych staff load.',
    }),
    defineField({
      name: 'isPublished',
      title: 'Published?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 50,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'priority' },
    prepare({ title, subtitle }) {
      const p = subtitle === 'H' ? '🔴 High' : subtitle === 'M' ? '🟡 Medium' : '🟢 Low';
      return { title: title || 'Unnamed Module', subtitle: p };
    },
  },
  orderings: [
    { title: 'Sort Order', name: 'sortAsc', by: [{ field: 'sortOrder', direction: 'asc' }] },
  ],
});
