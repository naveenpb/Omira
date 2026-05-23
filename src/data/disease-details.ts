// /src/data/disease-details.ts

export type DiseaseDetail = {
  id: string;
  name: string;
  packageName: string;
  seoTitle: string;        // New: For Google Search
  seoDescription: string;  // New: For Google Search
  category: string;
  patientPainPoint: string; // New: Empathy trigger
  pathology: string;
  allopathicDrawbacks: {    // New: The Villain (Meds & Side Effects)
    commonMedicines: string;
    sideEffects: string[];
  };
  targetedRelief: string;   // New: The Hero (Omira's exact solution)
  practices: string[];
  duration: string;
  contraindications: string[];
};

export const diseaseDictionary: Record<string, DiseaseDetail> = {
  "cancer-support": {
    id: "cancer-support",
    name: "Cancer Supportive Care",
    packageName: "Cancer Wellness Protocol",
    seoTitle: "Manage Chemotherapy Fatigue Naturally | Omira Wellness",
    seoDescription: "Combat the severe fatigue, nausea, and neuropathy of cancer treatments with our clinically designed restorative yoga and Yoga Nidra protocols.",
    category: "Oncology",
    patientPainPoint: "The treatment feels worse than the disease. Severe exhaustion, nausea, and anxiety are making daily life impossible.",
    pathology: "Chemotherapy and radiation create massive systemic toxicity, causing cellular damage, central nervous system depression, and profound psychological distress.",
    allopathicDrawbacks: {
      commonMedicines: "Chemotherapy, Corticosteroids, Antiemetics",
      sideEffects: [
        "Profound physical fatigue (affecting 70%+ of patients)",
        "Nausea, appetite loss, and digestive paralysis",
        "Chemo-brain (cognitive fog) and severe anxiety",
        "Insomnia induced by steroid cycles"
      ]
    },
    targetedRelief: "We do not claim to cure cancer. We cure the fatigue. By utilizing Yoga Nidra, we shift the Autonomic Nervous System from 'fight-or-flight' to 'rest-and-digest', dramatically reducing nausea and dropping fatigue levels by up to 40%.",
    practices: ["Yoga Nidra (Deep CNS Rest)", "Restorative Supported Asanas", "Cooling Pranayama (Sheetali)", "Guided Visualization"],
    duration: "45 Min | Ultra-Gentle Pace",
    contraindications: [
      "Strictly supportive — NEVER market as a cure.",
      "Avoid deep twists or abdominal pressure.",
      "Clearance from lead Oncologist is mandatory."
    ]
  },
  "alcohol-rehab": {
    id: "alcohol-rehab",
    name: "Addiction & Substance Recovery",
    packageName: "De-Addiction Recovery Protocol",
    seoTitle: "Natural Addiction Recovery & Craving Management | Omira Wellness",
    seoDescription: "Manage severe withdrawal cravings, restore sleep, and repair dopamine receptors naturally using clinical Yoga Nidra and targeted Pranayama.",
    category: "Rehabilitation",
    patientPainPoint: "Willpower isn't enough. The physical cravings are agonizing, my anxiety is through the roof, and I can't sleep without the substance. I need a way to calm my nervous system.",
    pathology: "Chronic substance abuse severely down-regulates dopamine receptors and causes severe Autonomic Nervous System (ANS) dysfunction. During withdrawal, the central nervous system goes into hyper-arousal, causing severe insomnia, tremors, and intense physiological cravings.",
    allopathicDrawbacks: {
      commonMedicines: "Benzodiazepines, Methadone, Sleep Aids",
      sideEffects: [
        "Replacing one chemical dependency with another",
        "Severe daytime lethargy and cognitive fog",
        "Does not repair the underlying neural pathways"
      ]
    },
    targetedRelief: "We do not rely on just 'talking it out.' We use physiological interventions. Clinical Yoga Nidra directly stimulates GABA production (the brain's calming chemical) to naturally reduce craving intensity by up to 35%, while specific breathwork physically forces the heart rate down during panic states.",
    practices: ["Yoga Nidra (GABA stimulation)", "Nadi Shodhana (Nervous System Balance)", "Gentle Somatic Shaking (Trauma Release)", "Vagus Nerve Toning"],
    duration: "1 Hr | Morning + Evening Routines",
    contraindications: [
      "Medical detox must be completed first.",
      "Avoid hyperventilation (Kapalabhati) in early recovery to prevent panic triggers.",
      "Must be used as an adjunct to professional psychiatric care/support groups."
    ]
  },

  "post-surgical": {
    id: "post-surgical",
    name: "Post-Surgical Rehabilitation",
    packageName: "Accelerated Healing Protocol",
    seoTitle: "Accelerate Post-Surgery Recovery with Clinical Yoga | Omira Wellness",
    seoDescription: "Reduce scar tissue adhesion, flush lymphatic swelling, and regain mobility faster with our gentle, surgeon-approved post-operative yoga therapy.",
    category: "Rehabilitation",
    patientPainPoint: "The surgery was a success, but standard physical therapy hurts too much. I feel incredibly stiff, swollen, and exhausted, and prolonged bed rest is making me depressed.",
    pathology: "Surgical trauma causes fascial adhesions (internal scarring), lymphatic pooling (swelling), and unconscious muscular 'guarding' around the incision site, which severely delays functional mobility.",
    allopathicDrawbacks: {
      commonMedicines: "Opioid Analgesics, Aggressive Traditional PT",
      sideEffects: [
        "Severe constipation and nausea from painkillers",
        "Risk of opioid dependency during long recoveries",
        "High pain threshold required for traditional physical therapy"
      ]
    },
    targetedRelief: "Before you can strengthen muscles, you must release the fascia. Our protocol uses ultra-gentle, breath-led micro-movements to pump the lymphatic system, drastically reducing swelling. We prevent scar tissue from hardening without ever stressing the incision lines.",
    practices: ["Lymphatic Breathing Techniques", "Micro-Joint Rotations (Pawanmuktasana)", "Supported Restorative Elevations", "Guided Visual Healing Meditation"],
    duration: "30-45 Min | Zero-Impact Flow",
    contraindications: [
      "Strict clearance from the lead orthopedic surgeon required.",
      "Absolutely zero tension or stretching across incision lines.",
      "Stop immediately if sharp, localized pain occurs."
    ]
  },

  "senior-companionship": {
    id: "senior-companionship",
    name: "Geriatric Mobility & Wellness",
    packageName: "Silver Vitality Protocol",
    seoTitle: "Online Chair Yoga for Seniors & Fall Prevention | Omira Wellness",
    seoDescription: "Improve balance, prevent dangerous falls, and combat senior isolation with safe, guided, chair-based yoga therapy from the comfort of home.",
    category: "Geriatric Care",
    patientPainPoint: "I worry constantly about my parents falling when I am at work. They feel too isolated and fragile to join a regular fitness class, and their mobility is declining rapidly.",
    pathology: "Age-related sarcopenia (muscle loss), vestibular (inner ear) decline, and social isolation create a dangerous loop leading to falls, fractures, and rapid cognitive deterioration.",
    allopathicDrawbacks: {
      commonMedicines: "Painkillers, Sleeping Pills",
      sideEffects: [
        "Increased fall risk due to drug-induced dizziness",
        "Lethargy leading to further muscle atrophy",
        "Increased feelings of depression and isolation"
      ]
    },
    targetedRelief: "We focus on proprioception and connection. By using safe, chair-supported asanas and cross-body movements, we actively rebuild the brain's neural pathways for balance. Simultaneously, the dedicated 1-on-1 interaction provides vital emotional companionship.",
    practices: ["Chair Surya Namaskar", "Cross-Body Neuro-bics", "Joint Lubrication Routines", "Supported Tree Pose (Wall Assisted)"],
    duration: "45 Min | Live Online Companionship",
    contraindications: [
      "Must assess baseline mobility via video before starting.",
      "No unsupported standing poses.",
      "Family member/Caregiver proximity recommended for the first 3 sessions."
    ]
  }
  // We will structure Hypertension, PCOS, etc., exactly like this.
};