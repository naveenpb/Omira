// /src/data/b2b-hospitals.ts

export type B2BDepartmentData = {
  id: string;
  department: string;
  priority: string;
  painPoint: string;
  hospitalBaseline: string; // What happens without Omira
  omiraIntervention: string; // The Yoga module used
  researchEvidence: string;
  clinicalOutcome: string;
  financialSavings: string;
  savingsValue: number; // For GSAP counting animations
  icon: string;
};

export const b2bHospitalData: B2BDepartmentData[] = [
  {
    id: "oncology",
    department: "Oncology & Palliative",
    priority: "High",
    painPoint: "High patient anxiety pre-chemo, poor treatment compliance, and severe fatigue (persists in 70% of patients).",
    hospitalBaseline: "Psychiatric consult (expensive, limited slots) + Sedatives. QoL score: 55.",
    omiraIntervention: "Group Yoga Nidra + cooling breathing pre-chemo. Supported restorative poses for fatigue.",
    researchEvidence: "NEJM 2022 / Studies show cancer fatigue reduced by 40% with targeted yoga interventions.",
    clinicalOutcome: "Patient compliance ↑ 25%, drastically reduced sedative use. QoL score increases to 72.",
    financialSavings: "₹80,000 / month",
    savingsValue: 80000,
    icon: "Ribbon"
  },
  {
    id: "orthopedics",
    department: "Orthopedics & Post-Op",
    priority: "High",
    painPoint: "Long post-surgery recovery. Traditional PT is painful, leading to resistance. High daily PT costs.",
    hospitalBaseline: "Daily physio sessions at ₹800–1,200/session for 15-20 sessions.",
    omiraIntervention: "Accelerated lymphatic breathing and zero-impact joint mobility. Reduces need for excessive PT.",
    researchEvidence: "J Ortho Surg 2020: Structured low-impact yoga reduces hospital stay by 1.5 days.",
    clinicalOutcome: "Hospital stay reduced by 1.8 days avg. PT sessions needed reduced by 35%.",
    financialSavings: "₹1,20,000 / month",
    savingsValue: 120000,
    icon: "Bone"
  },
  {
    id: "cardiology",
    department: "Cardiology",
    priority: "High",
    painPoint: "Post-MI cardiac rehab drop-out rate sits at ~55% due to complexity and cost.",
    hospitalBaseline: "Standard clinical Cardiac Rehab program. Readmission rates remain high.",
    omiraIntervention: "Community yoga as an accessible, step-down cardiac rehab extension.",
    researchEvidence: "AHA Guidelines suggest mindfulness and controlled asana significantly lower resting HR and BP.",
    clinicalOutcome: "Readmission rate ↓ 20%, long-term patient engagement ↑.",
    financialSavings: "₹60,000 / month",
    savingsValue: 60000,
    icon: "HeartPulse"
  },
  {
    id: "icu-stepdown",
    department: "ICU / Post-ICU Recovery",
    priority: "Medium",
    painPoint: "Post-Intensive Care Syndrome (PICS), severe muscle atrophy, and ICU delirium.",
    hospitalBaseline: "Prolonged bed rest, standard passive physiotherapy.",
    omiraIntervention: "Bed-bound Pranayama and micro-movements to stimulate vagus nerve and lymphatic flow.",
    researchEvidence: "Early mobilization in ICU step-down significantly reduces delirium and readmission to ICU.",
    clinicalOutcome: "Faster weaning from respiratory support, reduced ICU readmission.",
    financialSavings: "₹1,50,000 / month",
    savingsValue: 150000,
    icon: "Activity"
  },
  {
    id: "psychiatry",
    department: "Psychiatry & Rehab",
    priority: "High",
    painPoint: "High medication dependence, long waitlists for CBT slots.",
    hospitalBaseline: "Pharmacotherapy + limited therapy access.",
    omiraIntervention: "Yoga Nidra and Pranayama as an immediate adjunct to bridge the CBT waitlist.",
    researchEvidence: "Clinical trials show specific breathwork mimics the physiological effects of SSRIs.",
    clinicalOutcome: "Reduced medication dosage in responders, faster discharge rates.",
    financialSavings: "₹45,000 / month",
    savingsValue: 45000,
    icon: "Brain"
  }
];