'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import {
  HeartPulse, Activity, Brain, Flower2, Ribbon, ShieldAlert,
  Stethoscope, Bone, ArrowRight, Filter, Loader2,
} from 'lucide-react';

// ─── Icon map (Sanity stores the icon name as a string) ────────────────────
const iconMap: Record<string, React.ReactNode> = {
  HeartPulse:    <HeartPulse   className="w-6 h-6 text-[#C47C5D]" />,
  Activity:      <Activity     className="w-6 h-6 text-[#C47C5D]" />,
  Brain:         <Brain        className="w-6 h-6 text-[#C47C5D]" />,
  Flower2:       <Flower2      className="w-6 h-6 text-[#C47C5D]" />,
  Ribbon:        <Ribbon       className="w-6 h-6 text-[#C47C5D]" />,
  ShieldAlert:   <ShieldAlert  className="w-6 h-6 text-[#C47C5D]" />,
  Stethoscope:   <Stethoscope  className="w-6 h-6 text-[#C47C5D]" />,
  Bone:          <Bone         className="w-6 h-6 text-[#C47C5D]" />,
};
const fallbackIcon = <Flower2 className="w-6 h-6 text-[#C47C5D]" />;

// ─── Type matching Sanity allConditionsQuery output ─────────────────────────
type Protocol = {
  _id: string;
  diseaseName: string;
  slug: { current: string };
  patientType: string;
  icon?: string;
  clinicalOutcomeClaim?: string;
  category?: { name: string; slug: { current: string } };
};

// ─── Client component — receives data as props from server ──────────────────
export default function B2CHubClient({ protocols }: { protocols: Protocol[] }) {
  const headerRef = useRef(null);
  const gridRef   = useRef(null);

  const categories = [
    'All',
    ...Array.from(new Set(
      protocols
        .map((p) => p.category?.name)
        .filter((c): c is string => Boolean(c))
    )),
  ];

  const patientTypeLabels: Record<string, string> = {
    direct:        'Disease Management',
    complementary: 'Complementary Therapy',
    'post-care':   'Post-Care Recovery',
    rehab:         'Rehabilitation',
  };

  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = protocols.filter(
    (p) => activeCategory === 'All' || p.category?.name === activeCategory
  );

  // Page load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.b2c-header-elem',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power4.out' }
      );
    }, headerRef);
    return () => ctx.revert();
  }, []);

  // Grid re-render animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.protocol-card',
        { y: 30, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <main className="min-h-screen pt-28 pb-24 px-6 relative overflow-hidden bg-[#FAF9F6]">
      {/* Ambient glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-[#C47C5D] rounded-full blur-[200px] -top-40 -right-20 opacity-10" />
        <div className="absolute w-[800px] h-[800px] bg-[#2A4032] rounded-full blur-[200px] bottom-10 -left-40 opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-16">
          <p className="b2c-header-elem text-[#C47C5D] font-manrope font-bold tracking-[0.2em] uppercase text-sm mb-4">
            Patient Portal &amp; Rehabilitation
          </p>
          <h1 className="b2c-header-elem font-cormorant text-5xl md:text-7xl font-medium text-[#2A4032] leading-[1.1] mb-6">
            Healing, Rooted in Empirical Science.
          </h1>
          <p className="b2c-header-elem font-manrope text-[#2A4032]/70 text-lg md:text-xl leading-relaxed">
            Select your specific condition below. Each protocol is clinically designed to
            integrate seamlessly with your current allopathic treatments.
          </p>
        </div>

        {/* Filter bar */}
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

        {/* Protocol grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          {filtered.length === 0 ? (
            <div className="col-span-full flex items-center justify-center font-manrope text-[#2A4032]/50">
              No protocols found for this category.
            </div>
          ) : (
            filtered.map((protocol) => (
              <Link
                href={`/treatments/${protocol.slug.current}`}
                key={protocol._id}
                className="protocol-card group relative bg-white/60 backdrop-blur-md border border-[#2A4032]/10 p-8 rounded-3xl hover:bg-white hover:shadow-2xl hover:shadow-[#2A4032]/5 transition-all duration-500 flex flex-col h-full"
              >
                {/* Top: category badge + icon */}
                <div className="flex justify-between items-start mb-8">
                  <span className="font-manrope text-xs font-bold uppercase tracking-wider text-[#2A4032]/50 bg-[#2A4032]/5 px-3 py-1 rounded-full">
                    {protocol.category?.name ?? 'Clinical'}
                  </span>
                  <div className="bg-[#FAF9F6] p-3 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-500">
                    {(protocol.icon && iconMap[protocol.icon]) ?? fallbackIcon}
                  </div>
                </div>

                {/* Name + patient type */}
                <h2 className="font-cormorant text-3xl font-medium text-[#2A4032] mb-1 group-hover:text-[#C47C5D] transition-colors duration-300">
                  {protocol.diseaseName}
                </h2>
                <p className="font-manrope text-xs font-semibold text-[#2A4032]/50 uppercase tracking-wider mb-6">
                  {patientTypeLabels[protocol.patientType] ?? 'Clinical Protocol'}
                </p>

                {/* Outcome metric */}
                <div className="mt-auto space-y-4">
                  {protocol.clinicalOutcomeClaim && (
                    <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#2A4032]/5">
                      <span className="block font-manrope text-[10px] uppercase text-[#2A4032]/50 mb-1 font-bold tracking-wider">
                        Target Outcome
                      </span>
                      <span className="font-manrope text-sm font-semibold text-[#2A4032]">
                        {protocol.clinicalOutcomeClaim}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-[#C47C5D] font-manrope text-sm font-bold opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                    <span>View Full Protocol</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
