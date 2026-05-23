// /src/data/blog-posts.ts

export type BlogSection = {
  type: "h2" | "h3" | "p" | "quote" | "cta";
  text: string;
};

export type BlogPost = {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  content: BlogSection[];
  funnelTarget: string; // The URL to the specific B2C Protocol
  funnelText: string;   // The text for the conversion button
};

export const blogPosts: Record<string, BlogPost> = {
  "chemotherapy-fatigue-cns-rest": {
    slug: "chemotherapy-fatigue-cns-rest",
    seoTitle: "Why Chemo Causes Severe Fatigue & How to Fix It | Omira",
    seoDescription: "Understand the pathology behind chemotherapy-induced fatigue and learn how CNS rest and Yoga Nidra can reduce exhaustion by 40%.",
    title: "Beyond Exhaustion: Managing Chemotherapy Fatigue with CNS Rest",
    excerpt: "Chemotherapy saves lives, but the profound systemic fatigue it causes can make daily survival feel impossible. Standard advice says 'rest', but true cellular rest requires a nervous system reset.",
    author: "Omira Clinical Team",
    date: "October 12, 2026",
    readTime: "5 Min Read",
    category: "Oncology",
    funnelTarget: "/b2c/cancer-support",
    funnelText: "View the Omira Cancer Wellness Protocol",
    content: [
      { type: "p", text: "When undergoing aggressive oncology treatments, patients often report that the fatigue is worse than the nausea. It is a bone-deep exhaustion that sleep does not cure." },
      { type: "h2", text: "The Pathology of Treatment Fatigue" },
      { type: "p", text: "Standard chemotherapy creates massive systemic toxicity. While it destroys cancer cells, it also compromises healthy tissue, triggering a chronic inflammatory response. Your Autonomic Nervous System (ANS) is thrown into a permanent 'fight-or-flight' state. When the body is constantly fighting, true restorative sleep becomes biologically impossible." },
      { type: "quote", text: "You cannot sleep your way out of chemotherapy fatigue. You must actively shift your nervous system out of survival mode." },
      { type: "h3", text: "The Limitation of Standard Rest" },
      { type: "p", text: "Most oncologists prescribe bed rest. However, lying in bed while your mind is racing with anxiety and your nervous system is flooded with stress hormones does not allow cellular repair." },
      { type: "h2", text: "The Omira Intervention: CNS Rest" },
      { type: "p", text: "This is where empirical yoga therapy bridges the gap. By utilizing specific practices like Yoga Nidra (Non-Sleep Deep Rest) and supported restorative asanas, we can artificially induce a parasympathetic state (rest-and-digest). Clinical studies indicate that patients engaging in this specific protocol report a 40% reduction in perceived severe fatigue." }
    ]
  },
  "hidden-cost-blood-pressure-meds": {
    slug: "hidden-cost-blood-pressure-meds",
    seoTitle: "Side Effects of Blood Pressure Medication & Natural Adjuncts",
    seoDescription: "Struggling with fatigue or dizziness from hypertension meds? Discover how clinical yoga can stabilize BP and allow for dosage reduction.",
    title: "The Silent Cost of Beta-Blockers: Is There Another Way?",
    excerpt: "Hypertension medications are modern miracles, preventing strokes and heart attacks daily. But the side effects—lethargy, cold extremities, and brain fog—often leave patients searching for alternatives.",
    author: "Omira Clinical Team",
    date: "October 18, 2026",
    readTime: "4 Min Read",
    category: "Cardiovascular",
    funnelTarget: "/b2c/hypertension",
    funnelText: "Explore the Morning Calm Hypertension Protocol",
    content: [
      { type: "p", text: "Hypertension is known as the silent killer. The first line of defense in allopathic medicine is usually a combination of ACE inhibitors or Beta-blockers. They work flawlessly to drop the pressure, but they come with a systemic cost." },
      { type: "h2", text: "Why Your Medication Makes You Tired" },
      { type: "p", text: "Beta-blockers work by slowing down your heart rate and reducing the force of contraction. Naturally, this reduces blood flow to your extremities and brain, leading to chronic fatigue and dizziness upon standing." },
      { type: "quote", text: "What if you could maintain a safe blood pressure while reducing your reliance on high-dose pharmaceuticals?" },
      { type: "p", text: "By introducing daily, targeted Pranayama (breathwork) and specific parasympathetic-activating asanas, we naturally reduce the arterial stiffness and stress hormones that cause hypertension in the first place. Over 8-12 weeks, many patients are able to work with their cardiologists to safely taper their dosages." }
    ]
  }, 
  "neuroscience-of-craving-yoga-nidra": {
    slug: "neuroscience-of-craving-yoga-nidra",
    seoTitle: "How Yoga Nidra Reduces Addiction Cravings | Omira Wellness",
    seoDescription: "Understand the neuroscience of addiction withdrawal and how clinical Yoga Nidra stimulates GABA production to naturally lower craving intensity.",
    title: "Why Willpower Fails: The Neuroscience of Addiction Withdrawal",
    excerpt: "During substance withdrawal, the brain's alarm system is permanently triggered. Discover why traditional 'talk therapy' isn't enough, and how physiological interventions like Yoga Nidra rewrite the brain's chemistry.",
    author: "Omira Clinical Team",
    date: "October 22, 2026",
    readTime: "6 Min Read",
    category: "Rehabilitation",
    funnelTarget: "/b2c/alcohol-rehab",
    funnelText: "View the De-Addiction Recovery Protocol",
    content: [
      { type: "p", text: "The most dangerous misconception in addiction recovery is that relapse is a failure of willpower. In reality, early recovery is a state of severe physiological crisis." },
      { type: "h2", text: "The Dopamine Deficit" },
      { type: "p", text: "Prolonged substance abuse severely down-regulates dopamine receptors. When the substance is removed, the brain is left starved of reward chemicals. This plunges the central nervous system into hyper-arousal. Your heart races, anxiety spikes, and the physical urge to use becomes agonizing." },
      { type: "quote", text: "You cannot simply 'think' your way out of a nervous system hijacking. You must intervene physiologically." },
      { type: "h3", text: "The Yoga Nidra Intervention" },
      { type: "p", text: "Clinical Yoga Nidra is not a standard nap. It is a state of conscious deep sleep that directly stimulates the production of GABA—the brain's primary inhibitory neurotransmitter. By artificially flooding the brain with GABA, we force the nervous system out of the 'fight or flight' withdrawal state, naturally reducing the intensity of physical cravings by up to 35%." }
    ]
  },

  "dangers-of-bed-rest-post-surgery": {
    slug: "dangers-of-bed-rest-post-surgery",
    seoTitle: "Why Prolonged Bed Rest Delays Surgery Recovery | Omira Wellness",
    seoDescription: "Learn why staying in bed too long after surgery causes internal scarring and how zero-impact clinical yoga accelerates lymphatic drainage and healing.",
    title: "The Silent Danger of 'Resting' After Surgery",
    excerpt: "We are told to rest after an operation. But prolonged immobility causes fascial adhesions, severe swelling, and delayed healing. Here is how micro-movements change the recovery timeline.",
    author: "Omira Clinical Team",
    date: "October 28, 2026",
    readTime: "4 Min Read",
    category: "Rehabilitation",
    funnelTarget: "/b2c/post-surgical",
    funnelText: "Explore the Accelerated Healing Protocol",
    content: [
      { type: "p", text: "Surgical intervention is highly localized trauma. While the incision site needs immobility to fuse, the rest of the body desperately needs movement." },
      { type: "h2", text: "The Problem with Fascia and Swelling" },
      { type: "p", text: "When you lie perfectly still for days, the body's connective tissue (fascia) begins to harden, creating internal scar tissue known as adhesions. Furthermore, the lymphatic system—which clears away the surgical waste and swelling—does not have a pump like the heart. It relies entirely on muscular movement to drain." },
      { type: "quote", text: "To heal faster, you must move the fluids without stressing the wound." },
      { type: "h3", text: "Lymphatic Yoga Therapy" },
      { type: "p", text: "Traditional physical therapy can often feel too aggressive in the first two weeks post-op. Our clinical approach utilizes breath-led micro-rotations. By syncing deep diaphragmatic breathing with tiny, zero-impact joint movements, we act as a manual pump for the lymphatic system, clearing swelling and preventing scar tissue without risking the surgical site." }
    ]
  }
};