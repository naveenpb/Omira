'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import {
  ArrowRight, Activity, Building2, FlaskConical,
  HeartPulse, Brain, Ribbon, Bone, CheckCircle2,
  Quote, Users, Award, TrendingUp, BookOpen,
  Clock, ChevronRight, Star, BadgeCheck,
  Stethoscope, ShieldCheck,
} from 'lucide-react';
import ClinicalTicker from '@/components/ui/ClinicalTicker';
import CTAButton from '@/components/ui/CTAButton';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

/* ─── Static data ──────────────────────────────────────────────────────────── */

const BENTO_METRICS = [
  { value: '12+', label: 'Clinical Protocols', sub: 'Across 6 disease categories', size: 'hero' },
  { value: 'C-IAYT', label: 'Certified Therapists', sub: 'International gold standard', size: 'md' },
  { value: '3×', label: 'Better Outcomes', sub: 'vs standard care alone', size: 'md' },
  { value: '40%', label: 'Fatigue Reduction', sub: 'Cancer supportive care', size: 'sm' },
  { value: '11mmHg', label: 'BP Reduction', sub: 'In 8-week protocol', size: 'sm' },
  { value: '2.4d', label: 'Earlier Discharge', sub: 'Post-surgical recovery', size: 'sm' },
];

const FEATURED_PROTOCOLS = [
  {
    icon: <HeartPulse className="w-6 h-6" />,
    name: 'Hypertension & Cardiovascular',
    outcome: 'Average 11 mmHg systolic reduction in 8 weeks',
    type: 'Disease Management',
    href: '/treatments',
    gradient: 'from-rose-500/10 to-rose-500/5',
    accent: 'text-rose-600',
  },
  {
    icon: <Ribbon className="w-6 h-6" />,
    name: 'Cancer Supportive Care',
    outcome: 'Reduced chemo-induced fatigue by 40% (PubMed, 2022)',
    type: 'Complementary Therapy',
    href: '/treatments',
    gradient: 'from-violet-500/10 to-violet-500/5',
    accent: 'text-violet-600',
  },
  {
    icon: <Brain className="w-6 h-6" />,
    name: 'Neurological Rehabilitation',
    outcome: 'UPDRS score improvement of 22% alongside medication',
    type: 'Rehabilitation',
    href: '/rehabilitation',
    gradient: 'from-sky-500/10 to-sky-500/5',
    accent: 'text-sky-600',
  },
  {
    icon: <Bone className="w-6 h-6" />,
    name: 'Post-Surgical Recovery',
    outcome: 'Hospital discharge 2.4 days earlier on average',
    type: 'Post-Care',
    href: '/post-care',
    gradient: 'from-emerald-500/10 to-emerald-500/5',
    accent: 'text-emerald-600',
  },
];

const TESTIMONIALS = [
  {
    quote: 'After 3 months of Omira\'s hypertension protocol alongside my beta-blockers, my cardiologist reduced my medication dosage for the first time in six years.',
    name: 'Kavitha R.',
    detail: 'Hypertension Patient, Bengaluru',
    rating: 5,
  },
  {
    quote: 'We integrated Omira\'s oncology module into our chemotherapy ward. Patient-reported fatigue scores dropped by 35% in the first quarter.',
    name: 'Dr. Suresh M., MD',
    detail: 'Oncology Dept Head, Private Hospital',
    rating: 5,
  },
  {
    quote: 'The post-surgical programme was designed around my specific surgery. I was walking normally three weeks ahead of my physio\'s estimate.',
    name: 'Ranjit P.',
    detail: 'Hip Replacement Patient, Shivamogga',
    rating: 5,
  },
];

const BLOG_PLACEHOLDER = [
  {
    title: 'How Pranayama Directly Lowers Diastolic Blood Pressure',
    category: 'Cardiovascular',
    readTime: '6 min read',
    href: '/blog',
  },
  {
    title: 'Yoga Nidra and GABA: The Neurological Case for Addiction Recovery',
    category: 'Rehabilitation',
    readTime: '8 min read',
    href: '/blog',
  },
  {
    title: 'Post-Mastectomy Yoga: Restoring Shoulder Mobility Without Risk',
    category: 'Oncology',
    readTime: '5 min read',
    href: '/blog',
  },
];

/* ═══════════════════════════════════════════════════════════════════════════ */

export default function HomeClient() {
  const heroRef         = useRef<HTMLElement>(null);
  const metricsRef      = useRef<HTMLElement>(null);
  const philosophyRef   = useRef<HTMLElement>(null);
  const portalsRef      = useRef<HTMLElement>(null);
  const protocolsRef    = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const blogRef         = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero stagger
      gsap.fromTo('.hero-text',
        { y: 60, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, stagger: 0.15, ease: 'power4.out', delay: 0.15 }
      );
      // Floating stat cards
      gsap.fromTo('.hero-stat-card',
        { y: 40, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.2, ease: 'back.out(1.5)', delay: 0.6 }
      );
      // Bento metrics
      gsap.fromTo('.bento-cell',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: metricsRef.current, start: 'top 80%' } }
      );
      // Philosophy
      gsap.fromTo('.philosophy-line',
        { y: 40, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.5, stagger: 0.3, ease: 'power3.out',
          scrollTrigger: { trigger: philosophyRef.current, start: 'top 70%' } }
      );
      // Portals
      gsap.fromTo('.portal-card',
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'expo.out',
          scrollTrigger: { trigger: portalsRef.current, start: 'top 80%' } }
      );
      // Protocols
      gsap.fromTo('.protocol-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: protocolsRef.current, start: 'top 80%' } }
      );
      // Testimonials
      gsap.fromTo('.testimonial-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: testimonialsRef.current, start: 'top 80%' } }
      );
      // Blog
      gsap.fromTo('.blog-preview-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: blogRef.current, start: 'top 80%' } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="relative bg-[#FAF9F6] overflow-hidden">

      {/* ═══ HERO — Asymmetric Layout ═══════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center px-6 pt-28 pb-16 overflow-hidden">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute w-[700px] h-[700px] bg-[#2A4032] rounded-full blur-[200px] -top-40 -left-60 opacity-[0.08]" />
          <div className="absolute w-[500px] h-[500px] bg-[#C47C5D] rounded-full blur-[180px] bottom-0 right-0 opacity-[0.06]" />
          <div className="absolute inset-0 bg-medical-grid opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left — Text (7 cols) */}
          <div className="lg:col-span-7 z-10">
            <div className="hero-text inline-flex items-center gap-2 bg-[#C47C5D]/10 text-[#C47C5D] font-manrope font-bold tracking-[0.2em] uppercase text-[11px] px-4 py-2 rounded-full mb-6">
              <FlaskConical className="w-3.5 h-3.5" />
              Evidence-Based Clinical Yoga Therapy
            </div>

            <h1 className="hero-text font-cormorant text-[2.8rem] sm:text-6xl md:text-7xl lg:text-[5.2rem] font-medium text-[#2A4032] leading-[1.05] mb-6 tracking-tight">
              Where Medicine<br />
              <span className="text-[#C47C5D] italic">Heals the Body.</span><br />
              Yoga Restores It.
            </h1>

            <p className="hero-text font-manrope text-[#2A4032]/65 max-w-xl text-base sm:text-lg leading-relaxed mb-8">
              Condition-specific therapeutic yoga protocols designed to work <strong className="text-[#2A4032]">alongside</strong> your
              allopathic treatment — not instead of it.
            </p>

            <div className="hero-text flex flex-col sm:flex-row gap-3 mb-8">
              <CTAButton variant="primary" className="min-w-[200px]">
                Book Clinical Assessment
              </CTAButton>
              <Link
                href="/hospitals"
                className="inline-flex items-center justify-center gap-2 font-manrope font-bold uppercase tracking-widest text-xs py-4 px-7 rounded-xl border-2 border-[#2A4032]/15 text-[#2A4032] hover:border-[#2A4032] hover:bg-[#2A4032] hover:text-[#FAF9F6] transition-all duration-300"
              >
                Hospital Partnership <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust badges */}
            <div className="hero-text flex flex-wrap gap-4 sm:gap-6 text-[#2A4032]/45 font-manrope text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
              {[
                { icon: <Award className="w-3.5 h-3.5" />, text: 'C-IAYT Certified' },
                { icon: <CheckCircle2 className="w-3.5 h-3.5" />, text: 'Medically Supervised' },
                { icon: <TrendingUp className="w-3.5 h-3.5" />, text: 'Measurable Outcomes' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-1.5">
                  {icon}<span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Floating Stat Cards (5 cols) */}
          <div className="lg:col-span-5 relative hidden lg:flex flex-col gap-4 items-end">
            {[
              { icon: <HeartPulse className="w-5 h-5 text-rose-500" />, stat: '−11 mmHg', desc: 'Systolic BP reduction', badge: '8 weeks' },
              { icon: <Ribbon className="w-5 h-5 text-violet-500" />, stat: '40%', desc: 'Chemo fatigue reduced', badge: 'PubMed verified' },
              { icon: <Stethoscope className="w-5 h-5 text-emerald-500" />, stat: '2.4 days', desc: 'Earlier discharge', badge: 'Post-surgical' },
            ].map((card, i) => (
              <div
                key={card.stat}
                className={`hero-stat-card glass-card rounded-2xl p-5 w-full max-w-[320px] hover:shadow-lg transition-shadow duration-500 ${i === 1 ? 'mr-8' : i === 2 ? 'mr-16' : ''}`}
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <p className="font-cormorant text-3xl font-semibold text-[#2A4032]">{card.stat}</p>
                    <p className="font-manrope text-xs text-[#2A4032]/60 mt-0.5">{card.desc}</p>
                  </div>
                </div>
                <span className="inline-block mt-3 font-manrope text-[10px] font-bold uppercase tracking-wider text-[#C47C5D] bg-[#C47C5D]/10 px-2.5 py-1 rounded-full">
                  {card.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="font-manrope text-[10px] uppercase tracking-[0.2em] text-[#2A4032]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#2A4032] to-transparent" />
        </div>
      </section>

      <ClinicalTicker />

      {/* ═══ BENTO METRICS ═══════════════════════════════════════════════════ */}
      <section ref={metricsRef} className="py-16 sm:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {BENTO_METRICS.map(({ value, label, sub, size }, i) => (
              <div
                key={label}
                className={`bento-cell glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 hover:shadow-lg transition-all duration-500 group
                  ${size === 'hero' ? 'col-span-2 row-span-2 flex flex-col justify-center' : ''}
                  ${size === 'md' ? 'col-span-1 md:col-span-2 lg:col-span-2' : ''}
                  ${size === 'sm' ? 'col-span-1 lg:col-span-2' : ''}
                `}
              >
                <p className={`font-cormorant font-semibold text-[#C47C5D] mb-1 leading-none
                  ${size === 'hero' ? 'text-5xl sm:text-7xl' : size === 'md' ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'}
                `}>
                  {value}
                </p>
                <p className={`font-manrope font-bold text-[#2A4032] uppercase tracking-wider mb-1
                  ${size === 'hero' ? 'text-sm' : 'text-[10px] sm:text-xs'}
                `}>
                  {label}
                </p>
                <p className="font-manrope text-xs text-[#2A4032]/45">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PHILOSOPHY ═══════════════════════════════════════════════════════ */}
      <section ref={philosophyRef} className="py-20 sm:py-32 md:py-40 px-6 relative bg-medical-grid">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="philosophy-line font-cormorant text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-[#2A4032] leading-tight font-medium mb-6 sm:mb-8">
            Modern medicine saves lives.<br />
            <span className="text-[#C47C5D] italic">Traditional yoga restores them.</span>
          </h2>
          <p className="philosophy-line font-manrope text-[#2A4032]/70 text-base sm:text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto mb-8 sm:mb-12">
            At Omira, we refuse to choose between the two. We bridge the gap by building
            condition-specific protocols that work <span className="font-bold border-b-2 border-[#C47C5D]/40 pb-0.5">alongside</span> your
            current treatments, tracking real metrics — blood pressure, FEV1, UPDRS scores.
          </p>
          <div className="philosophy-line">
            <Link href="/protocol" className="inline-flex items-center gap-2 font-manrope text-sm font-bold text-[#C47C5D] hover:text-[#2A4032] transition-colors">
              View the Evidence Engine <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ DUAL PORTALS ══════════════════════════════════════════════════ */}
      <section ref={portalsRef} className="py-16 sm:py-24 px-6 bg-[#2A4032] relative overflow-hidden rounded-t-[2rem] sm:rounded-t-[3rem] md:rounded-t-[5rem]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_0%,#FAF9F6,transparent)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <p className="font-manrope text-[#C47C5D] text-xs font-bold uppercase tracking-[0.2em] mb-3 sm:mb-4">
              Two Dedicated Pathways
            </p>
            <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl text-[#FAF9F6] leading-tight">
              Choose Your Entry Point
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            {/* Patient portal */}
            <Link href="/treatments" className="portal-card group relative bg-[#FAF9F6]/[0.04] hover:bg-[#FAF9F6]/[0.08] border border-[#FAF9F6]/10 p-8 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl transition-all duration-500 overflow-hidden backdrop-blur-sm hover-glow">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C47C5D] rounded-full blur-[120px] opacity-15 group-hover:opacity-30 transition-opacity -mr-20 -mt-20" />
              <Activity className="w-8 sm:w-10 h-8 sm:h-10 text-[#C47C5D] mb-6 sm:mb-8" />
              <h3 className="font-cormorant text-2xl sm:text-3xl md:text-4xl text-[#FAF9F6] mb-3 sm:mb-4">
                For Patients &amp; Rehab
              </h3>
              <p className="font-manrope text-[#FAF9F6]/60 leading-relaxed mb-6 sm:mb-8 text-sm md:text-base">
                Browse condition-specific clinical protocols for cardiovascular health, oncology
                support, addiction recovery, post-surgical healing, and more.
              </p>
              <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                {['Hypertension', 'Cancer Care', 'Rehabilitation', 'Post-Op'].map((t) => (
                  <span key={t} className="font-manrope text-[10px] font-bold uppercase tracking-wider text-[#FAF9F6]/40 border border-[#FAF9F6]/15 px-2.5 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 text-[#C47C5D] font-manrope font-bold uppercase tracking-widest text-xs sm:text-sm">
                Browse Protocols
                <div className="w-8 h-px bg-[#C47C5D] group-hover:w-14 transition-all duration-500" />
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 -ml-2 group-hover:translate-x-2 transition-transform duration-500" />
              </div>
            </Link>

            {/* Hospital portal */}
            <Link href="/hospitals" className="portal-card group relative bg-[#FAF9F6]/[0.04] hover:bg-[#FAF9F6]/[0.08] border border-[#FAF9F6]/10 p-8 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl transition-all duration-500 overflow-hidden backdrop-blur-sm hover-glow">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FAF9F6] rounded-full blur-[120px] opacity-[0.06] group-hover:opacity-15 transition-opacity -mr-20 -mt-20" />
              <Building2 className="w-8 sm:w-10 h-8 sm:h-10 text-[#FAF9F6]/70 mb-6 sm:mb-8" />
              <h3 className="font-cormorant text-2xl sm:text-3xl md:text-4xl text-[#FAF9F6] mb-3 sm:mb-4">
                For Hospitals &amp; Clinics
              </h3>
              <p className="font-manrope text-[#FAF9F6]/60 leading-relaxed mb-6 sm:mb-8 text-sm md:text-base">
                Partner with Omira to deploy therapeutic yoga into your hospital departments.
                Reduce readmissions and generate measurable ROI data.
              </p>
              <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                {['Oncology Wards', 'Cardiac Rehab', 'Orthopedics', 'Neurology'].map((t) => (
                  <span key={t} className="font-manrope text-[10px] font-bold uppercase tracking-wider text-[#FAF9F6]/40 border border-[#FAF9F6]/15 px-2.5 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 text-[#FAF9F6] font-manrope font-bold uppercase tracking-widest text-xs sm:text-sm">
                Partner With Us
                <div className="w-8 h-px bg-[#FAF9F6] group-hover:w-14 transition-all duration-500" />
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 -ml-2 group-hover:translate-x-2 transition-transform duration-500" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FEATURED PROTOCOLS ═══════════════════════════════════════════ */}
      <section ref={protocolsRef} className="py-16 sm:py-24 px-6 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14">
            <div>
              <p className="text-[#C47C5D] font-manrope font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mb-2 sm:mb-3">
                Clinical Protocols
              </p>
              <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl text-[#2A4032] font-medium leading-tight">
                Condition-Specific. Evidence-Backed.
              </h2>
            </div>
            <Link href="/treatments" className="inline-flex items-center gap-2 font-manrope text-sm font-bold text-[#C47C5D] hover:text-[#2A4032] transition-colors flex-shrink-0">
              All Protocols <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {FEATURED_PROTOCOLS.map((p, i) => (
              <Link
                key={p.name}
                href={p.href}
                className={`protocol-card group relative bg-white border border-[#2A4032]/8 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:shadow-xl hover:shadow-[#2A4032]/5 hover:border-[#C47C5D]/20 transition-all duration-500 flex flex-col overflow-hidden ${i === 0 ? 'sm:row-span-2' : ''}`}
              >
                {/* Subtle gradient bg */}
                <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl`} />

                <div className="relative z-10 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-5 sm:mb-6">
                    <div className={`bg-[#FAF9F6] p-3 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-500 ${p.accent}`}>
                      {p.icon}
                    </div>
                    <span className="font-manrope text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#2A4032]/35 bg-[#2A4032]/5 px-3 py-1 rounded-full">
                      {p.type}
                    </span>
                  </div>
                  <h3 className="font-cormorant text-xl sm:text-2xl text-[#2A4032] font-medium mb-3 group-hover:text-[#C47C5D] transition-colors">
                    {p.name}
                  </h3>
                  <div className="flex items-start gap-2 bg-emerald-50/80 border border-emerald-100 rounded-xl p-3 sm:p-4 mt-auto">
                    <FlaskConical className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <p className="font-manrope text-xs sm:text-sm text-emerald-800 leading-snug">{p.outcome}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ════════════════════════════════════════════════ */}
      <section ref={testimonialsRef} className="py-16 sm:py-24 px-6 bg-[#2A4032] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_100%,#FAF9F6,transparent)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <p className="font-manrope text-[#C47C5D] text-xs font-bold uppercase tracking-[0.2em] mb-3 sm:mb-4">
              Patient &amp; Hospital Outcomes
            </p>
            <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl text-[#FAF9F6] leading-tight">
              Real People. Measurable Results.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {TESTIMONIALS.map((t) => (
              <article key={t.name} className="testimonial-card glass-card-dark rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#C47C5D] fill-[#C47C5D]" />
                  ))}
                </div>
                <Quote className="w-7 h-7 text-[#C47C5D] mb-4 opacity-50" />
                <p className="font-cormorant text-lg sm:text-xl text-[#FAF9F6]/85 leading-relaxed mb-6 sm:mb-8 flex-grow italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-[#FAF9F6]/10 pt-4 sm:pt-5 flex items-center gap-3">
                  <BadgeCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <p className="font-manrope font-bold text-[#FAF9F6] text-sm">{t.name}</p>
                    <p className="font-manrope text-xs text-[#FAF9F6]/45 mt-0.5">{t.detail}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="text-center font-manrope text-xs text-[#FAF9F6]/25 mt-6 sm:mt-8 italic">
            * Testimonials are representative patient accounts. Medical outcomes vary by individual.
          </p>
        </div>
      </section>

      {/* ═══ JOURNAL PREVIEW ═══════════════════════════════════════════════ */}
      <section ref={blogRef} className="py-16 sm:py-24 px-6 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14">
            <div>
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <BookOpen className="w-4 h-4 text-[#C47C5D]" />
                <p className="text-[#C47C5D] font-manrope font-bold tracking-[0.2em] uppercase text-xs sm:text-sm">
                  The Omira Journal
                </p>
              </div>
              <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl text-[#2A4032] font-medium leading-tight">
                Clinical Insights. Patient Education.
              </h2>
            </div>
            <Link href="/blog" className="inline-flex items-center gap-2 font-manrope text-sm font-bold text-[#C47C5D] hover:text-[#2A4032] transition-colors flex-shrink-0">
              Browse Journal <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {BLOG_PLACEHOLDER.map((post, i) => (
              <Link
                key={post.title}
                href={post.href}
                className="blog-preview-card group relative glass-card rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col"
              >
                {/* Accent bar */}
                <div className={`h-1 w-full ${i === 0 ? 'bg-rose-400' : i === 1 ? 'bg-indigo-400' : 'bg-purple-400'}`} />

                <div className="flex flex-col flex-1 p-5 sm:p-7">
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <span className="font-manrope text-[10px] font-bold uppercase tracking-[0.15em] text-[#C47C5D] bg-[#C47C5D]/10 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1.5 font-manrope text-xs text-[#2A4032]/35 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </div>
                  </div>

                  <h3 className="font-cormorant text-lg sm:text-xl md:text-2xl text-[#2A4032] font-medium leading-snug group-hover:text-[#C47C5D] transition-colors duration-300 flex-grow mb-5 sm:mb-6">
                    {post.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-auto pt-4 border-t border-[#2A4032]/6">
                    <span className="font-manrope text-xs font-bold uppercase tracking-widest text-[#2A4032]/35 group-hover:text-[#C47C5D] transition-colors duration-300">
                      Read Article
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C47C5D] -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-6">
        <div className="max-w-4xl mx-auto bg-[#2A4032] text-[#FAF9F6] rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#C47C5D] rounded-full blur-[120px] opacity-20 pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#FAF9F6] rounded-full blur-[120px] opacity-5 pointer-events-none" />

          {/* Trust strip */}
          <div className="relative z-10 flex flex-wrap justify-center gap-4 sm:gap-6 mb-8 text-[#FAF9F6]/30 font-manrope text-[10px] font-bold uppercase tracking-wider">
            {[
              { icon: <ShieldCheck className="w-3.5 h-3.5" />, text: 'Doctor Approved' },
              { icon: <Award className="w-3.5 h-3.5" />, text: 'C-IAYT Certified' },
              { icon: <Users className="w-3.5 h-3.5" />, text: 'Supervised Care' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">{icon}<span>{text}</span></div>
            ))}
          </div>

          <div className="relative z-10">
            <p className="font-manrope text-[#C47C5D] text-xs font-bold uppercase tracking-[0.25em] mb-4 sm:mb-5">
              Your Clinical Journey Starts Here
            </p>
            <h2 className="font-cormorant text-3xl sm:text-4xl md:text-6xl mb-5 sm:mb-6 leading-tight">
              Stop managing symptoms.<br />
              <span className="italic">Start reversing them.</span>
            </h2>
            <p className="font-manrope text-[#FAF9F6]/60 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8 sm:mb-10">
              Our certified yoga therapists will review your medical history and design a
              protocol specific to your condition — working alongside your doctor&apos;s existing treatment.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <CTAButton variant="ghost">
                Book Free Assessment
              </CTAButton>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 font-manrope font-bold uppercase tracking-widest text-xs py-4 px-8 rounded-xl border border-[#FAF9F6]/20 text-[#FAF9F6]/70 hover:border-[#FAF9F6] hover:text-[#FAF9F6] transition-all duration-300"
              >
                Meet the Team <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
