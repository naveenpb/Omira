"use client";
import React from "react";

// Data directly extracted from Sheet 5: Yoga + Allopathy Loop
const clinicalData = [
  { disease: "Hypertension", metric: "+22% BP Control", protocol: "Morning Calm" },
  { disease: "COPD Grade 1-2", metric: "+25m 6MWT", protocol: "Breath Therapy" },
  { disease: "Post-MI Rehab", metric: "10% Less Readmission", protocol: "Cardiac Yoga" },
  { disease: "Cancer Care", metric: "40% Fatigue Reduction", protocol: "Cancer Wellness" },
  { disease: "Parkinson's", metric: "-12% UPDRS Motor Score", protocol: "Neuro-Balance" },
  { disease: "Alcohol Rehab", metric: "-35% Craving Intensity", protocol: "De-Addiction" },
];

export default function ClinicalTicker() {
  return (
    <div className="w-full bg-[#2A4032] border-y border-[#C47C5D]/30 py-4 overflow-hidden relative flex items-center">
      {/* Absolute fade gradients for smooth entry/exit of text */}
      <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-[#2A4032] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-[#2A4032] to-transparent z-10 pointer-events-none"></div>

      <div className="flex animate-marquee whitespace-nowrap font-manrope">
        {/* We map the array twice to create an infinite seamless loop */}
        {[...clinicalData, ...clinicalData].map((item, index) => (
          <div key={index} className="flex items-center mx-8">
            <span className="text-[#FAF9F6]/60 text-sm tracking-widest uppercase">{item.disease}</span>
            <span className="mx-3 text-[#C47C5D] font-bold text-lg">{item.metric}</span>
            <span className="text-[#FAF9F6]/40 text-xs px-2 py-1 border border-[#FAF9F6]/20 rounded-full">
              {item.protocol}
            </span>
            <span className="mx-8 text-[#FAF9F6]/20">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}