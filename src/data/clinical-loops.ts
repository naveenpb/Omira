// /src/data/clinical-loops.ts

export type ClinicalLoop = {
  id: string;
  disease: string;
  phase: string;
  duration: string;
  allopathy: {
    protocol: string;
    outcome: string;
  };
  integrated: {
    protocol: string;
    module: string;
    frequency: string;
    outcome: string;
  };
  delta: string;
  metrics: string;
  nextStep: string;
  safety: string;
};

export const clinicalLoops: ClinicalLoop[] = [
  {
    id: "hypertension",
    disease: "Hypertension",
    phase: "Phase 1: Initiation",
    duration: "0–4 weeks",
    allopathy: {
      protocol: "ACE inhibitor + lifestyle counseling. Target BP <140/90.",
      outcome: "BP control: 40% achieve target.",
    },
    integrated: {
      protocol: "ACE inhibitor + Morning Calm Yoga daily. Pranayama 20 min AM.",
      module: "Morning Calm Package",
      frequency: "7 days/week",
      outcome: "BP control: 62% achieve target.",
    },
    delta: "+22% Control",
    metrics: "BP mmHg (sys/dia) monitored weekly.",
    nextStep: "If controlled, reduce medication dose. Reassess Month 2.",
    safety: "Monitor BP daily first 2 weeks."
  },
  {
    id: "copd",
    disease: "COPD Grade 1–2",
    phase: "Phase 1: Stable COPD",
    duration: "0–12 weeks",
    allopathy: {
      protocol: "SABA + ICS. Smoking cessation. No pulm rehab often.",
      outcome: "6MWT: +22m. FEV1: minimal change.",
    },
    integrated: {
      protocol: "Bronchodilators + Breath Therapy Yoga. Pranayama 30 min/day.",
      module: "Breath Therapy Package",
      frequency: "7 days/week",
      outcome: "6MWT: +47m. FEV1: +8–12%.",
    },
    delta: "+25m 6MWT",
    metrics: "6MWT, FEV1, exacerbations/yr monitored at 12 weeks.",
    nextStep: "Reassess FEV1 at 3 months. Target exacerbation reduction.",
    safety: "Baseline spirometry mandatory."
  },
  {
    id: "post-mi",
    disease: "Post-MI Cardiac Rehab",
    phase: "Phase 1: Early Rehab",
    duration: "6–12 weeks post-MI",
    allopathy: {
      protocol: "Standard cardiac rehab: supervised exercise + medications.",
      outcome: "30-day readmission: 18%. MACE at 1yr: 25%.",
    },
    integrated: {
      protocol: "Cardiac Yoga package added to standard rehab. Group yoga.",
      module: "Cardiac Yoga Package",
      frequency: "5 days/week",
      outcome: "30-day readmission: 8%. MACE at 1yr: 16%.",
    },
    delta: "-10% Readmission",
    metrics: "MACE rate, 6MWT, ejection fraction monitored monthly.",
    nextStep: "Transition to home yoga program at Month 3.",
    safety: "Stress ECG clearance before yoga."
  },
  {
    id: "cancer-support",
    disease: "Cancer Supportive",
    phase: "Across all chemo cycles",
    duration: "Ongoing through treatment",
    allopathy: {
      protocol: "Chemotherapy + antiemetics + steroids. Fatigue management: rest.",
      outcome: "Fatigue (FACIT): 35% severe fatigue.",
    },
    integrated: {
      protocol: "Yoga Nidra + Restorative Yoga added to chemo regimen.",
      module: "Cancer Wellness Package",
      frequency: "3 days/week",
      outcome: "Fatigue (FACIT): 20% severe fatigue.",
    },
    delta: "-40% Fatigue",
    metrics: "FACIT-F score, sleep quality monitored bi-weekly.",
    nextStep: "Adjust physical asana intensity based on WBC count.",
    safety: "NEVER market as cancer cure. Strictly supportive."
  }
];