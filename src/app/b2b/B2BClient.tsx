"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { 
  Building2, 
  TrendingDown, 
  ShieldCheck, 
  Bone, 
  Ribbon, 
  HeartPulse, 
  Brain, 
  Activity, 
  ArrowRight, 
  BookOpen, 
  Stethoscope, 
  FileText 
} from "lucide-react";

// Update icon mapping to handle strings from Sanity gracefully
const iconMap: Record<string, React.ReactNode> = {
  Bone: <Bone className="w-6 h-6" />,
  Ribbon: <Ribbon className="w-6 h-6" />,
  HeartPulse: <HeartPulse className="w-6 h-6" />,
  Brain: <Brain className="w-6 h-6" />,
  Activity: <Activity className="w-6 h-6" />,
  Stethoscope: <Stethoscope className="w-6 h-6" />,
  FileText: <FileText className="w-6 h-6" />,
};

// Accept the Sanity data as a prop
export default function B2BClient({ initialData }: { initialData: any[] }) {
  // Use the Sanity data instead of the hardcoded file
  const [activeDeptId, setActiveDeptId] = useState(initialData[0]?._id);
  const activeData = initialData.find((d) => d._id === activeDeptId) || initialData[0];
  
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  // Initial Page Load Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".b2b-header-anim", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power4.out" }
      );
    }, headerRef);
    return () => ctx.revert();
  }, []);

  // Animate content when clicking a new department tab
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in the text blocks
      gsap.fromTo(".data-fade", 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      );

      // Animate the Financial Savings Number counting up
      if (numberRef.current && activeData) {
        gsap.fromTo(numberRef.current, 
          { innerHTML: 0 }, 
          { 
            innerHTML: activeData.savingsValue || 0, 
            duration: 1.5, 
            ease: "power2.out", 
            snap: { innerHTML: 1 },
            onUpdate: function() {
              const val = Math.ceil(Number(this.targets()[0].innerHTML));
              if (numberRef.current) {
                numberRef.current.innerHTML = "₹" + val.toLocaleString('en-IN');
              }
            }
          }
        );
      }
    }, contentRef);
    return () => ctx.revert();
  }, [activeDeptId, activeData]);

  if (!initialData || initialData.length === 0) return null;

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 bg-[#FAF9F6] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div ref={headerRef} className="max-w-4xl mb-20">
          <div className="b2b-header-anim flex items-center gap-3 mb-6">
            <Building2 className="w-6 h-6 text-[#C47C5D]" />
            <h2 className="text-[#C47C5D] font-manrope font-bold tracking-[0.2em] uppercase text-sm">
              Hospital Integration Portal
            </h2>
          </div>
          <h1 className="b2b-header-anim font-cormorant text-5xl md:text-7xl font-medium text-[#2A4032] leading-[1.1] mb-6">
            Transforming Hospital Wards with Clinical Yoga.
          </h1>
          <p className="b2b-header-anim font-manrope text-[#2A4032]/70 text-lg md:text-xl leading-relaxed max-w-3xl">
            We partner with leading hospitals to integrate evidence-based yoga therapy directly into patient care plans. Decrease readmissions, accelerate post-surgical healing, and improve your hospital's operational ROI.
          </p>
        </div>

        {/* The Master-Detail Dashboard Layout */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left Sidebar: Department Selection */}
          <div className="w-full lg:w-1/3 flex flex-col gap-3 sticky top-32">
            <h3 className="font-manrope text-xs font-bold uppercase tracking-widest text-[#2A4032]/50 mb-4 px-2">Select Clinical Department</h3>
            {initialData.map((dept) => (
              <button
                key={dept._id}
                onClick={() => setActiveDeptId(dept._id)}
                className={`flex items-center gap-4 w-full text-left p-5 rounded-2xl transition-all duration-300 border ${
                  activeDeptId === dept._id 
                    ? "bg-[#2A4032] text-[#FAF9F6] border-[#2A4032] shadow-xl scale-[1.02]" 
                    : "bg-white text-[#2A4032]/70 border-[#2A4032]/10 hover:bg-[#2A4032]/5 hover:border-[#2A4032]/30"
                }`}
              >
                <div className={`${activeDeptId === dept._id ? "text-[#C47C5D]" : "text-[#2A4032]/50"}`}>
                  {iconMap[dept.icon] || <Activity className="w-6 h-6" />}
                </div>
                <span className="font-cormorant text-xl font-semibold">{dept.department}</span>
              </button>
            ))}

            {/* Strategic Business Pitch CTA */}
            <div className="mt-8 bg-[#C47C5D]/10 border border-[#C47C5D]/20 p-6 rounded-2xl">
              <h4 className="font-cormorant text-2xl text-[#2A4032] mb-2">Zero-CapEx Pilot</h4>
              <p className="font-manrope text-sm text-[#2A4032]/70 mb-4">Request a 90-day pilot program for your ward. We prove the ROI before you sign an annual contract.</p>
              <button className="flex items-center gap-2 text-[#C47C5D] font-manrope font-bold uppercase text-xs tracking-widest hover:translate-x-2 transition-transform">
                Request Pilot <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Area: The Detailed Data Display */}
          <div ref={contentRef} className="w-full lg:w-2/3 bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-[#2A4032]/10">
            
            <div className="data-fade flex items-center justify-between border-b border-[#2A4032]/10 pb-6 mb-8">
              <h2 className="font-cormorant text-4xl text-[#2A4032]">{activeData.department} Integration</h2>
              <span className="bg-red-50 text-red-700 border border-red-200 font-manrope text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                {activeData.priority} Priority Need
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              {/* Pain Point */}
              <div className="data-fade space-y-4">
                <div className="flex items-center gap-2 text-red-500 font-manrope font-bold text-xs uppercase tracking-widest">
                  <TrendingDown className="w-4 h-4" /> Hospital Bottleneck
                </div>
                <p className="font-manrope text-[#2A4032] text-sm leading-relaxed font-semibold">
                  {activeData.painPoint}
                </p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="block font-manrope text-[10px] uppercase text-slate-500 mb-1">Current Baseline Status</span>
                  <p className="font-manrope text-slate-700 text-sm">{activeData.hospitalBaseline}</p>
                </div>
              </div>

              {/* Omira Solution */}
              <div className="data-fade space-y-4">
                <div className="flex items-center gap-2 text-[#2A4032] font-manrope font-bold text-xs uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4" /> Omira Intervention
                </div>
                <p className="font-manrope text-[#2A4032] text-sm leading-relaxed font-semibold">
                  {activeData.omiraIntervention}
                </p>
                <div className="bg-[#2A4032]/5 p-4 rounded-xl border border-[#2A4032]/10">
                  <span className="block font-manrope text-[10px] uppercase text-[#2A4032]/50 mb-1">Projected Clinical Outcome</span>
                  <p className="font-manrope text-[#2A4032] text-sm">{activeData.clinicalOutcome}</p>
                </div>
              </div>
            </div>

            {/* Bottom Row: Research & Financial ROI */}
            <div className="data-fade grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[#2A4032]/10">
              
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 text-[#C47C5D] font-manrope font-bold text-xs uppercase tracking-widest mb-3">
                  <BookOpen className="w-4 h-4" /> Empirical Research
                </div>
                <p className="font-manrope text-sm text-[#2A4032]/80 leading-relaxed italic">
                  "{activeData.researchEvidence}"
                </p>
              </div>

              {/* The GSAP Animated ROI Counter */}
              <div className="bg-[#2A4032] text-[#FAF9F6] p-6 rounded-2xl flex flex-col justify-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#C47C5D] rounded-full blur-[40px] opacity-20 -mr-10 -mt-10"></div>
                <span className="block font-manrope text-[10px] uppercase text-[#FAF9F6]/60 mb-2 font-bold tracking-widest">Est. Monthly Savings</span>
                <span ref={numberRef} className="font-cormorant text-3xl xl:text-4xl font-bold block">
                  ₹0
                </span>
              </div>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}