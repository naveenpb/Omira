// Extracted strictly from Sheet 2 (Disease Mgmt) & Sheet 3 (Rehab)

export const b2cProtocols = [
  {
    id: "hypertension",
    category: "Cardiovascular",
    disease: "Hypertension",
    packageName: "Morning Calm Package",
    duration: "1 Hr | Early Morning",
    outcome: "10–15 mmHg BP reduction (8-12 weeks)",
    contraindications: "Avoid inversions (Sirsasana), No Kumbhak for severe BP",
    icon: "HeartPulse" // We will map this to a Lucide icon in the UI
  },
  {
    id: "cad",
    category: "Cardiovascular",
    disease: "Coronary Artery Disease",
    packageName: "Cardiac Yoga Package",
    duration: "1 Hr | Morning + Evening",
    outcome: "Improved exercise tolerance (12-16 weeks)",
    contraindications: "No vigorous Vinyasa, Avoid Kapalabhati post MI",
    icon: "Activity"
  },
  {
    id: "parkinsons",
    category: "Neurological",
    disease: "Parkinson's Disease",
    packageName: "Neuro-Balance Package",
    duration: "1 Hr | Morning",
    outcome: "Improved UPDRS score, 35% fall risk reduction",
    contraindications: "Use chair support always, Caregiver must be present",
    icon: "Brain"
  },
  {
    id: "pcos",
    category: "Women's Health",
    disease: "PCOS / PCOD",
    packageName: "Hormone Balance Package",
    duration: "1 Hr | Morning",
    outcome: "Improved menstrual regularity (8-12 weeks)",
    contraindications: "Avoid intense inversions during menstruation",
    icon: "Flower2"
  },
  {
    id: "cancer-support",
    category: "Oncology Support",
    disease: "Cancer Fatigue",
    packageName: "Cancer Wellness Package",
    duration: "45 Min | Gentle",
    outcome: "40-50% reduced fatigue, improved QoL",
    contraindications: "NEVER claim curative, Oncologist clearance mandatory",
    icon: "Ribbon"
  },
  {
    id: "alcohol-rehab",
    category: "Rehabilitation",
    disease: "Alcohol Use Disorder",
    packageName: "De-Addiction Recovery",
    duration: "1 Hr | Morning + Evening",
    outcome: "35% craving reduction, improved sleep",
    contraindications: "Avoid Kapalabhati in early detox, Medical detox first",
    icon: "ShieldAlert"
  }, 
  {
    id: "senior-companionship",
    category: "Geriatric Care",
    disease: "Senior Mobility & Wellness",
    packageName: "Silver Vitality (Online Phase 1)",
    duration: "45 Min | Live Online",
    outcome: "Improved joint mobility, reduced isolation, fall prevention.",
    contraindications: "Must assess baseline mobility via video before starting.",
    icon: "HeartPulse" // We will use a suitable Lucide icon
  },
  {
    id: "post-surgical",
    category: "Rehabilitation",
    disease: "Post-Surgical Recovery",
    packageName: "Accelerated Healing Protocol",
    duration: "30-45 Min | Gentle Flow",
    outcome: "Reduced scar tissue adhesion, improved lymphatic drainage.",
    contraindications: "Strict clearance from lead surgeon required. No stretching of incision sites.",
    icon: "Activity"
  }
];