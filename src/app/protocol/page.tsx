"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { clinicalLoops } from "@/data/clinical-loops";
import { Pill, Activity, ArrowRight, ShieldCheck, Stethoscope, RefreshCcw } from "lucide-react";

export default function ProtocolHub() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeData = clinicalLoops[activeIndex];
  
  const headerRef = useRef(null);
  const engineRef = useRef(null);

  // Initial Page Load Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".protocol-header-anim",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
      );
    }, headerRef);
    return () => ctx.revert();
  }, []);

  // Animation that triggers every time the user selects a new disease tab
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".data-refresh-anim",
        { y: 20, opacity: 0, filter: "blur(4px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
      
      // Specifically animate the Delta number to pop
      gsap.fromTo(
        ".delta-pop",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.3 }
      );
    }, engineRef);
    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div ref={headerRef} className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="protocol-header-anim text-[#C47C5D] font-manrope font-bold tracking-[0.2em] uppercase text-sm mb-4">
            The Evidence Engine
          </h2>
          <h1 className="protocol-header-anim font-cormorant text-5xl md:text-7xl font-medium text-[#2A4032] leading-tight mb-6">
            The Yoga + Allopathy Loop
          </h1>
          <p className="protocol-header-anim font-manrope text-[#2A4032]/70 text-lg md:text-xl">
            Select a clinical condition below to compare standard allopathic outcomes against the Omira Integrated Protocol. Real metrics, real deltas.
          </p>
        </div>

        {/* Disease Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {clinicalLoops.map((loop, index) => (
            <button
              key={loop.id}
              onClick={() => setActiveIndex(index)}
              className={`font-manrope px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeIndex === index 
                  ? "bg-[#2A4032] text-[#FAF9F6] shadow-lg scale-105" 
                  : "bg-white text-[#2A4032]/60 hover:bg-[#2A4032]/10 border border-[#2A4032]/10"
              }`}
            >
              {loop.disease}
            </button>
          ))}
        </div>

        {/* The Interactive Comparison Engine */}
        <div ref={engineRef} className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#2A4032]/10 relative overflow-hidden">
          
          {/* Top Phase Indicator */}
          <div className="data-refresh-anim flex items-center justify-between border-b border-[#2A4032]/10 pb-6 mb-8">
            <div>
              <h3 className="font-manrope text-[#2A4032]/50 text-xs uppercase tracking-widest font-bold mb-1">Treatment Phase</h3>
              <p className="font-cormorant text-2xl text-[#2A4032] font-medium">{activeData.phase}</p>
            </div>
            <div className="text-right">
              <h3 className="font-manrope text-[#2A4032]/50 text-xs uppercase tracking-widest font-bold mb-1">Duration</h3>
              <p className="font-manrope text-[#2A4032] font-semibold">{activeData.duration}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 items-stretch">
            
            {/* Column 1: Allopathy Only (Baseline) */}
            <div className="data-refresh-anim lg:col-span-3 bg-[#FAF9F6] p-8 rounded-2xl border border-[#2A4032]/5 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <Pill className="w-6 h-6 text-[#2A4032]/40" />
                <h3 className="font-manrope text-lg font-bold text-[#2A4032]/60 uppercase tracking-wide">Allopathy Only</h3>
              </div>
              <p className="font-manrope text-[#2A4032]/80 leading-relaxed mb-8 flex-grow">
                {activeData.allopathy.protocol}
              </p>
              <div className="bg-white p-4 rounded-xl border border-[#2A4032]/5 mt-auto">
                <span className="block font-manrope text-[10px] uppercase text-[#2A4032]/50 mb-1 font-bold">Standard Outcome</span>
                <span className="font-cormorant text-xl text-[#2A4032]/70">{activeData.allopathy.outcome}</span>
              </div>
            </div>

            {/* Middle: The Delta Arrow */}
            <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
              <ArrowRight className="w-12 h-12 text-[#2A4032]/20" />
            </div>

            {/* Column 2: Omira Integrated (The Solution) */}
            <div className="data-refresh-anim lg:col-span-3 bg-[#2A4032] text-[#FAF9F6] p-8 rounded-2xl shadow-xl relative overflow-hidden flex flex-col">
              {/* Subtle background glow in the dark card */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C47C5D] rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
              
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <Activity className="w-6 h-6 text-[#C47C5D]" />
                <h3 className="font-manrope text-lg font-bold text-[#FAF9F6] uppercase tracking-wide">Yoga + Allopathy</h3>
              </div>
              <p className="font-manrope text-[#FAF9F6]/90 leading-relaxed mb-6 relative z-10 flex-grow">
                {activeData.integrated.protocol}
              </p>
              
              {/* The massive Delta number */}
              <div className="delta-pop bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 relative z-10 mt-auto">
                <span className="block font-manrope text-[10px] uppercase text-[#FAF9F6]/60 mb-2 font-bold tracking-wider">Omira Improvement Delta</span>
                <span className="font-cormorant text-4xl text-[#C47C5D] font-bold block mb-2">{activeData.delta}</span>
                <span className="font-manrope text-sm text-[#FAF9F6]/90">{activeData.integrated.outcome}</span>
              </div>
            </div>

          </div>

          {/* Bottom Clinical Metadata Row */}
          <div className="data-refresh-anim grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-[#2A4032]/10">
            <div className="flex gap-4">
              <Stethoscope className="w-5 h-5 text-[#2A4032]/50 shrink-0" />
              <div>
                <span className="block font-manrope text-xs font-bold uppercase text-[#2A4032]/50 mb-1">Assessment Metric</span>
                <p className="font-manrope text-sm text-[#2A4032]">{activeData.metrics}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <RefreshCcw className="w-5 h-5 text-[#2A4032]/50 shrink-0" />
              <div>
                <span className="block font-manrope text-xs font-bold uppercase text-[#2A4032]/50 mb-1">Loop Next Step</span>
                <p className="font-manrope text-sm text-[#2A4032]">{activeData.nextStep}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="block font-manrope text-xs font-bold uppercase text-[#2A4032]/50 mb-1">Safety & Governance</span>
                <p className="font-manrope text-sm text-[#2A4032]">{activeData.safety}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}