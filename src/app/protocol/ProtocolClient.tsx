'use client';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { clinicalLoops } from '@/data/clinical-loops';
import {
  Pill, Activity, ArrowRight, ShieldCheck, Stethoscope, RefreshCcw,
  FlaskConical, BookOpen, ArrowLeft, BarChart3, CheckCircle2,
} from 'lucide-react';
import CTAButton from '@/components/ui/CTAButton';
import Breadcrumb from '@/components/seo/Breadcrumb';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const METHODOLOGY = [
  {
    step: '01',
    title: 'Medical History Review',
    body: 'Every patient\'s protocol starts with a structured clinical intake. We review existing diagnosis, medication, contraindications, and functional capacity before designing any intervention.',
    icon: <Stethoscope className="w-6 h-6 text-[#C47C5D]" />,
  },
  {
    step: '02',
    title: 'Evidence-Matched Protocol Design',
    body: 'Each asana, pranayama, and meditation element is matched to peer-reviewed research (PubMed, JAMA, NEJM, WHO). No technique is included without a cited physiological mechanism.',
    icon: <BookOpen className="w-6 h-6 text-[#C47C5D]" />,
  },
  {
    step: '03',
    title: 'Outcome Metric Tracking',
    body: 'Progress is measured using the same clinical tools as standard medicine — blood pressure cuffs, FEV1 spirometry, UPDRS scales, cortisol levels, and PHQ-9 depression screens.',
    icon: <BarChart3 className="w-6 h-6 text-[#C47C5D]" />,
  },
  {
    step: '04',
    title: 'Doctor Co-ordination Loop',
    body: 'Outcome reports are sent to the patient\'s treating physician at 4-week intervals. We do not replace the doctor — we extend their capability.',
    icon: <RefreshCcw className="w-6 h-6 text-[#C47C5D]" />,
  },
];

const SAFETY_POINTS = [
  'All protocols include contraindication screening before Day 1',
  'Therapists are certified to C-IAYT standard (highest international credential)',
  'Emergency stop protocol for cardiac and oncology sessions',
  'Protocols modified in real-time based on weekly symptom check-ins',
  'Patients are never asked to stop any prescribed medication',
];

export default function ProtocolClient() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeData = clinicalLoops[activeIndex];

  const headerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<HTMLDivElement>(null);
  const methodRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.protocol-header-anim',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' }
      );
      gsap.fromTo('.method-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: methodRef.current, start: 'top 80%' } }
      );
    }, headerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.data-refresh-anim',
        { y: 20, opacity: 0, filter: 'blur(4px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
      gsap.fromTo('.delta-pop',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 0.3 }
      );
    }, engineRef);
    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <main className="min-h-screen pt-28 pb-24 px-6 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div ref={headerRef} className="max-w-4xl mb-6">
          <Breadcrumb items={[
            { name: 'Home', href: '/' },
            { name: 'Evidence Engine', href: '/protocol' },
          ]} />
          <span className="protocol-header-anim inline-block text-[#C47C5D] font-manrope font-bold tracking-[0.2em] uppercase text-sm mb-4">
            The Evidence Engine
          </span>
          <h1 className="protocol-header-anim font-cormorant text-5xl md:text-7xl font-medium text-[#2A4032] leading-tight mb-6">
            The Yoga + Allopathy Loop.
          </h1>
          <p className="protocol-header-anim font-manrope text-[#2A4032]/70 text-lg md:text-xl leading-relaxed max-w-3xl">
            Select a clinical condition below to compare standard allopathic outcomes against the Omira
            Integrated Protocol. Real measurement metrics, real improvement deltas.
          </p>
        </div>

        {/* ── Tab selector ───────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3 mb-10">
          {clinicalLoops.map((loop, index) => (
            <button
              key={loop.id}
              onClick={() => setActiveIndex(index)}
              className={`font-manrope px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeIndex === index
                  ? 'bg-[#2A4032] text-[#FAF9F6] shadow-lg scale-105'
                  : 'bg-white text-[#2A4032]/60 hover:bg-[#2A4032]/8 border border-[#2A4032]/10'
              }`}
            >
              {loop.disease}
            </button>
          ))}
        </div>

        {/* ── Comparison engine ──────────────────────────────────────── */}
        <div ref={engineRef} className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#2A4032]/10 relative overflow-hidden mb-10">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#C47C5D] rounded-full blur-[120px] opacity-5 pointer-events-none" />

          {/* Phase + duration bar */}
          <div className="data-refresh-anim flex flex-wrap items-center justify-between gap-4 border-b border-[#2A4032]/10 pb-6 mb-8">
            <div>
              <span className="font-manrope text-[#2A4032]/50 text-xs uppercase tracking-widest font-bold block mb-1">Condition</span>
              <p className="font-cormorant text-3xl text-[#2A4032] font-medium">{activeData.disease}</p>
            </div>
            <div className="flex gap-6">
              <div>
                <span className="font-manrope text-[#2A4032]/50 text-xs uppercase tracking-widest font-bold block mb-1">Phase</span>
                <p className="font-manrope text-[#2A4032] font-semibold text-sm">{activeData.phase}</p>
              </div>
              <div>
                <span className="font-manrope text-[#2A4032]/50 text-xs uppercase tracking-widest font-bold block mb-1">Duration</span>
                <p className="font-manrope text-[#2A4032] font-semibold text-sm">{activeData.duration}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">

            {/* Allopathy Only */}
            <div className="data-refresh-anim bg-[#FAF9F6] p-7 rounded-2xl border border-[#2A4032]/5 flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-[#2A4032]/8 rounded-xl flex items-center justify-center">
                  <Pill className="w-5 h-5 text-[#2A4032]/50" />
                </div>
                <div>
                  <span className="font-manrope text-xs font-bold uppercase tracking-widest text-[#2A4032]/40 block">Baseline</span>
                  <h3 className="font-manrope text-sm font-bold text-[#2A4032]/70 uppercase tracking-wide">Allopathy Only</h3>
                </div>
              </div>
              <p className="font-manrope text-[#2A4032]/80 leading-relaxed mb-6 flex-grow text-sm">
                {activeData.allopathy.protocol}
              </p>
              <div className="bg-white p-4 rounded-xl border border-[#2A4032]/8 mt-auto">
                <span className="block font-manrope text-[10px] uppercase text-[#2A4032]/50 mb-1 font-bold tracking-wider">Standard Outcome</span>
                <span className="font-cormorant text-xl text-[#2A4032]/70">{activeData.allopathy.outcome}</span>
              </div>
            </div>

            {/* Delta arrow */}
            <div className="hidden lg:flex flex-col items-center justify-center gap-3 px-2">
              <ArrowRight className="w-8 h-8 text-[#C47C5D]" />
              <span className="font-manrope text-[10px] uppercase tracking-widest text-[#2A4032]/30 font-bold">Omira Protocol</span>
            </div>

            {/* Omira Integrated */}
            <div className="data-refresh-anim bg-[#2A4032] text-[#FAF9F6] p-7 rounded-2xl shadow-lg relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#C47C5D] rounded-full blur-[80px] opacity-20 -mr-16 -mt-16 pointer-events-none" />
              <div className="flex items-center gap-3 mb-5 relative z-10">
                <div className="w-9 h-9 bg-[#FAF9F6]/10 rounded-xl flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[#C47C5D]" />
                </div>
                <div>
                  <span className="font-manrope text-xs font-bold uppercase tracking-widest text-[#FAF9F6]/40 block">Integrated</span>
                  <h3 className="font-manrope text-sm font-bold text-[#FAF9F6] uppercase tracking-wide">Yoga + Allopathy</h3>
                </div>
              </div>
              <p className="font-manrope text-[#FAF9F6]/85 leading-relaxed mb-6 relative z-10 flex-grow text-sm">
                {activeData.integrated.protocol}
              </p>
              <div className="delta-pop bg-[#FAF9F6]/10 backdrop-blur-sm p-5 rounded-xl border border-white/10 relative z-10 mt-auto">
                <span className="block font-manrope text-[10px] uppercase text-[#FAF9F6]/50 mb-2 font-bold tracking-wider">
                  Omira Improvement Delta
                </span>
                <span className="font-cormorant text-4xl text-[#C47C5D] font-bold block mb-1.5">{activeData.delta}</span>
                <span className="font-manrope text-sm text-[#FAF9F6]/85">{activeData.integrated.outcome}</span>
              </div>
            </div>
          </div>

          {/* Clinical metadata */}
          <div className="data-refresh-anim grid grid-cols-1 md:grid-cols-3 gap-5 mt-8 pt-7 border-t border-[#2A4032]/10">
            <div className="flex gap-3">
              <Stethoscope className="w-5 h-5 text-[#2A4032]/40 shrink-0 mt-0.5" />
              <div>
                <span className="block font-manrope text-xs font-bold uppercase text-[#2A4032]/50 mb-1">Assessment Metric</span>
                <p className="font-manrope text-sm text-[#2A4032]">{activeData.metrics}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <RefreshCcw className="w-5 h-5 text-[#2A4032]/40 shrink-0 mt-0.5" />
              <div>
                <span className="block font-manrope text-xs font-bold uppercase text-[#2A4032]/50 mb-1">Loop Next Step</span>
                <p className="font-manrope text-sm text-[#2A4032]">{activeData.nextStep}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="block font-manrope text-xs font-bold uppercase text-[#2A4032]/50 mb-1">Safety &amp; Governance</span>
                <p className="font-manrope text-sm text-[#2A4032]">{activeData.safety}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA below engine */}
        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <CTAButton conditionName={activeData.disease} crmTag={activeData.id} source="/protocol" variant="primary">
            Start {activeData.disease} Protocol
          </CTAButton>
          <Link href="/treatments" className="inline-flex items-center justify-center gap-2 font-manrope font-bold uppercase tracking-widest text-xs py-4 px-8 rounded-xl border-2 border-[#2A4032] text-[#2A4032] hover:bg-[#2A4032] hover:text-[#FAF9F6] transition-all duration-300">
            Browse All Protocols <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ── Methodology ────────────────────────────────────────────── */}
        <section ref={methodRef}>
          <div className="mb-12">
            <span className="inline-block text-[#C47C5D] font-manrope font-bold tracking-[0.2em] uppercase text-sm mb-3">
              How We Design Protocols
            </span>
            <h2 className="font-cormorant text-4xl md:text-5xl text-[#2A4032] font-medium leading-tight">
              Our Clinical Methodology
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {METHODOLOGY.map((m) => (
              <div key={m.step} className="method-card bg-white border border-[#2A4032]/10 rounded-3xl p-8 flex gap-5">
                <div className="flex-shrink-0">
                  <div className="font-cormorant text-4xl font-bold text-[#2A4032]/10 leading-none mb-3">{m.step}</div>
                  <div className="w-10 h-10 bg-[#FAF9F6] rounded-xl flex items-center justify-center">
                    {m.icon}
                  </div>
                </div>
                <div>
                  <h3 className="font-cormorant text-2xl text-[#2A4032] font-medium mb-3 leading-tight">
                    {m.title}
                  </h3>
                  <p className="font-manrope text-sm text-[#2A4032]/70 leading-relaxed">
                    {m.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Safety block */}
          <div className="bg-[#2A4032] text-[#FAF9F6] rounded-3xl p-10 md:p-14 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#C47C5D] rounded-full blur-[120px] opacity-15 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <span className="font-manrope font-bold uppercase tracking-widest text-xs text-[#FAF9F6]/60">
                  Clinical Safety Framework
                </span>
              </div>
              <h3 className="font-cormorant text-3xl md:text-4xl text-[#FAF9F6] mb-8 leading-tight">
                Safety is not optional — it is the protocol.
              </h3>
              <ul className="space-y-4 mb-10">
                {SAFETY_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3 font-manrope text-sm text-[#FAF9F6]/80">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <CTAButton variant="ghost">
                  Book a Clinical Assessment
                </CTAButton>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 font-manrope font-bold uppercase tracking-widest text-xs py-4 px-8 rounded-xl border border-[#FAF9F6]/30 text-[#FAF9F6]/70 hover:text-[#FAF9F6] hover:border-[#FAF9F6] transition-colors"
                >
                  Meet the Therapists <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Citations note */}
          <div className="mt-8 flex items-start gap-3 bg-[#2A4032]/3 border border-[#2A4032]/8 rounded-2xl p-5">
            <FlaskConical className="w-5 h-5 text-[#2A4032]/40 flex-shrink-0 mt-0.5" />
            <p className="font-manrope text-xs text-[#2A4032]/55 leading-relaxed">
              All improvement deltas cited on this page are derived from published peer-reviewed studies
              (PubMed, JAMA, NEJM, WHO, Cochrane Library). Individual outcomes vary. Omira protocols are
              complementary — they do not replace prescribed medication or primary medical care.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}