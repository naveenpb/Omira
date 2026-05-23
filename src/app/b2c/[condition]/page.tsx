import { Metadata } from "next";
import Link from "next/link";
import { diseaseDictionary } from "@/data/disease-details";
import { ArrowLeft, AlertCircle, Pill, HeartHandshake, ShieldAlert, CheckCircle2 } from "lucide-react";

// Define params as a Promise for Next.js 15+ compatibility
type PageProps = {
  params: Promise<{ condition: string }>;
};

// 1. DYNAMIC SEO GENERATOR FOR GOOGLE
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Await the params before using them
  const resolvedParams = await params;
  const data = diseaseDictionary[resolvedParams.condition];
  
  if (!data) return { title: "Protocol Not Found | Omira Wellness" };

  return {
    title: data.seoTitle,
    description: data.seoDescription,
    openGraph: {
      title: data.seoTitle,
      description: data.seoDescription,
      type: "website",
    },
  };
}

// 2. THE PAGE COMPONENT (Async Server Component)
export default async function ConditionDetail({ params }: PageProps) {
  // Await the params before using them
  const resolvedParams = await params;
  const data = diseaseDictionary[resolvedParams.condition];

  if (!data) return <div className="min-h-screen flex items-center justify-center font-manrope text-xl text-[#2A4032]">Protocol Not Found</div>;

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 bg-[#FAF9F6]">
      {/* ... The rest of your UI code remains exactly the same from here down ... */}
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation & Header */}
        <div className="mb-16">
          <Link href="/b2c" className="inline-flex items-center gap-2 text-[#2A4032]/60 hover:text-[#C47C5D] transition-colors font-manrope text-sm font-semibold mb-8 uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Back to Clinical Modules
          </Link>
          
          <span className="inline-block bg-[#2A4032]/10 text-[#2A4032] font-manrope text-xs font-bold uppercase px-4 py-1.5 rounded-full tracking-wider mb-4">
            {data.category} Protocol
          </span>

          <h1 className="font-cormorant text-5xl md:text-7xl font-medium text-[#2A4032] leading-tight mb-6">
            {data.name}
          </h1>
          
          {/* The Empathy Hook (Relating to the user's pain) */}
          <div className="bg-[#C47C5D]/10 border-l-4 border-[#C47C5D] p-6 rounded-r-2xl">
            <h3 className="font-manrope text-[#C47C5D] text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> The Patient Reality
            </h3>
            <p className="font-manrope text-[#2A4032]/90 text-lg md:text-xl italic leading-relaxed">
              "{data.patientPainPoint}"
            </p>
          </div>
        </div>

        {/* The Core Narrative: Pathology & The Drawbacks of Standard Treatment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* The Pathology */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#2A4032]/10">
            <h3 className="font-cormorant text-3xl text-[#2A4032] mb-4">Clinical Pathology</h3>
            <p className="font-manrope text-[#2A4032]/80 leading-relaxed">
              {data.pathology}
            </p>
          </div>

          {/* The Allopathic Drawbacks (The Villain) */}
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <Pill className="w-6 h-6 text-slate-500" />
              <h3 className="font-cormorant text-3xl text-slate-800">Standard Medication Profile</h3>
            </div>
            <p className="font-manrope text-sm text-slate-600 mb-4">
              <strong>Common Prescriptions:</strong> {data.allopathicDrawbacks.commonMedicines}
            </p>
            <h4 className="font-manrope text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Associated Side Effects:</h4>
            <ul className="space-y-3">
              {data.allopathicDrawbacks.sideEffects.map((effect, idx) => (
                <li key={idx} className="flex items-start gap-3 font-manrope text-sm text-slate-700">
                  <span className="text-slate-400 mt-0.5">✕</span>
                  {effect}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The Omira Solution (The Hero) */}
        <div className="bg-[#2A4032] text-[#FAF9F6] p-10 md:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C47C5D] rounded-full blur-[150px] opacity-20 -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <HeartHandshake className="w-8 h-8 text-[#C47C5D]" />
              <h3 className="font-manrope text-[#C47C5D] text-sm font-bold uppercase tracking-widest">The Omira Intervention</h3>
            </div>
            
            <h2 className="font-cormorant text-4xl md:text-5xl mb-6 leading-tight">
              {data.targetedRelief}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 pt-10 border-t border-[#FAF9F6]/10">
              <div>
                <h4 className="font-manrope text-xs font-bold uppercase tracking-widest text-[#FAF9F6]/50 mb-4">Custom Module Practices</h4>
                <ul className="space-y-3">
                  {data.practices.map((practice, idx) => (
                    <li key={idx} className="flex items-center gap-3 font-manrope text-sm text-[#FAF9F6]/90">
                      <CheckCircle2 className="w-4 h-4 text-[#C47C5D]" />
                      {practice}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#FAF9F6]/5 p-6 rounded-2xl border border-[#FAF9F6]/10">
                <h4 className="font-manrope text-xs font-bold uppercase tracking-widest text-[#FAF9F6]/50 mb-2">Module Details</h4>
                <p className="font-cormorant text-2xl text-[#FAF9F6] mb-1">{data.packageName}</p>
                <p className="font-manrope text-sm text-[#C47C5D] font-semibold mb-6">{data.duration}</p>
                
                {/* Conversion Button -> Leads to CRM / Contact form */}
                <button className="w-full bg-[#FAF9F6] text-[#2A4032] font-manrope font-bold uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-[#C47C5D] hover:text-[#FAF9F6] transition-colors duration-300">
                  Request Clinical Assessment
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Safety & Contraindications */}
        <div className="bg-red-50/50 p-8 rounded-3xl border border-red-100 flex flex-col md:flex-row gap-6 items-start">
          <ShieldAlert className="w-8 h-8 text-red-600 shrink-0" />
          <div>
            <h3 className="font-manrope font-bold text-red-900 tracking-wide mb-2 uppercase text-sm">Clinical Safety & Contraindications</h3>
            <p className="font-manrope text-sm text-red-800/80 mb-4">
              Our protocols are overseen by certified Yoga Therapists. To ensure complete safety, the following strict guidelines apply to this module:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              {data.contraindications.map((warning, idx) => (
                <li key={idx} className="font-manrope text-sm text-red-900/90 flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span> {warning}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </main>
  );
}