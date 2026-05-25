'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import {
  HeartPulse, Activity, Brain, Flower2, Ribbon, ShieldAlert,
  Stethoscope, Bone, Dna, Zap, FlaskConical, ArrowRight, Filter,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  HeartPulse:  <HeartPulse  className="w-6 h-6 text-[#C47C5D]" />,
  Activity:    <Activity    className="w-6 h-6 text-[#C47C5D]" />,
  Brain:       <Brain       className="w-6 h-6 text-[#C47C5D]" />,
  Flower2:     <Flower2     className="w-6 h-6 text-[#C47C5D]" />,
  Ribbon:      <Ribbon      className="w-6 h-6 text-[#C47C5D]" />,
  ShieldAlert: <ShieldAlert className="w-6 h-6 text-[#C47C5D]" />,
  Stethoscope: <Stethoscope className="w-6 h-6 text-[#C47C5D]" />,
  Bone:        <Bone        className="w-6 h-6 text-[#C47C5D]" />,
  Dna:         <Dna         className="w-6 h-6 text-[#C47C5D]" />,
  Zap:         <Zap         className="w-6 h-6 text-[#C47C5D]" />,
  FlaskConical:<FlaskConical className="w-6 h-6 text-[#C47C5D]" />,
};
const fallbackIcon = <Flower2 className="w-6 h-6 text-[#C47C5D]" />;

type Condition = {
  _id: string;
  diseaseName: string;
  slug: { current: string };
  patientType: string;
  icon?: string;
  clinicalOutcomeClaim?: string;
  evidenceReference?: string;
  practices?: string[];
  category?: { name: string; slug: { current: string } };
};

interface ConditionHubClientProps {
  /** The page's base path prefix — e.g. "/rehabilitation" or "/post-care" */
  basePath: string;
  conditions: Condition[];
  /** Accent colour class for highlight elements */
  accentClass?: string;
}

export default function ConditionHubClient({
  basePath,
  conditions,
  accentClass = 'text-[#C47C5D]',
}: ConditionHubClientProps) {
  const headerRef = useRef(null);
  const gridRef   = useRef(null);

  const categories = [
    'All',
    ...Array.from(
      new Set(conditions.map((c) => c.category?.name).filter((n): n is string => Boolean(n)))
    ),
  ];

  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = conditions.filter(
    (c) => activeCategory === 'All' || c.category?.name === activeCategory
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hub-header-elem',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power4.out' }
      );
    }, headerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.condition-card',
        { y: 30, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <>
      {/* Ambient glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-[#C47C5D] rounded-full blur-[180px] -top-32 -right-16 opacity-10" />
        <div className="absolute w-[700px] h-[700px] bg-[#2A4032] rounded-full blur-[180px] bottom-10 -left-32 opacity-10" />
      </div>

      {/* Filter bar — only shown if multiple categories exist */}
      {categories.length > 2 && (
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-12 border-b border-[#2A4032]/10 pb-6">
          <div className="flex items-center gap-2 text-[#2A4032]/50 font-manrope text-sm font-bold uppercase tracking-widest mr-4">
            <Filter className="w-4 h-4" />
            Filter By:
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-manrope text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-[#2A4032] text-[#FAF9F6] shadow-md scale-105'
                    : 'bg-white text-[#2A4032]/60 hover:bg-[#2A4032]/5 border border-[#2A4032]/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[300px]"
      >
        {filtered.length === 0 ? (
          <div className="col-span-full flex items-center justify-center font-manrope text-[#2A4032]/50 py-16">
            No protocols found. Check back soon.
          </div>
        ) : (
          filtered.map((condition) => (
            <Link
              key={condition._id}
              href={`${basePath}/${condition.slug.current}`}
              className="condition-card group relative bg-white/60 backdrop-blur-md border border-[#2A4032]/10 p-8 rounded-3xl hover:bg-white hover:shadow-2xl hover:shadow-[#2A4032]/5 transition-all duration-500 flex flex-col h-full"
            >
              {/* Top: category + icon */}
              <div className="flex justify-between items-start mb-8">
                <span className="font-manrope text-xs font-bold uppercase tracking-wider text-[#2A4032]/50 bg-[#2A4032]/5 px-3 py-1 rounded-full">
                  {condition.category?.name ?? 'Clinical'}
                </span>
                <div className="bg-[#FAF9F6] p-3 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-500">
                  {(condition.icon && iconMap[condition.icon]) ?? fallbackIcon}
                </div>
              </div>

              {/* Name */}
              <h2 className="font-cormorant text-3xl font-medium text-[#2A4032] mb-4 group-hover:text-[#C47C5D] transition-colors duration-300 leading-tight">
                {condition.diseaseName}
              </h2>

              {/* Outcome claim */}
              {condition.clinicalOutcomeClaim && (
                <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#2A4032]/5 mb-4 mt-auto">
                  <span className="block font-manrope text-[10px] uppercase text-[#2A4032]/50 mb-1 font-bold tracking-wider">
                    Target Outcome
                  </span>
                  <span className="font-manrope text-sm font-semibold text-[#2A4032] leading-snug">
                    {condition.clinicalOutcomeClaim}
                  </span>
                </div>
              )}

              {/* Evidence badge */}
              {condition.evidenceReference && (
                <p className="font-manrope text-[10px] text-[#2A4032]/40 mb-3 flex items-center gap-1">
                  <FlaskConical className="w-3 h-3 flex-shrink-0" />
                  {condition.evidenceReference}
                </p>
              )}

              <div className="flex items-center gap-2 text-[#C47C5D] font-manrope text-sm font-bold opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 mt-auto">
                <span>View Full Protocol</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
}
