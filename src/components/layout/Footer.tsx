'use client';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight, Mail, Phone, MapPin, CheckCircle, Loader2,
  ExternalLink, HeartPulse, Brain, Ribbon, Bone, ShieldCheck,
  Building2, FlaskConical, BookOpen, Users,
} from 'lucide-react';

export default function Footer() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (formData.get('botcheck')) { setStatus('success'); return; }
    setStatus('submitting');
    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      if (response.ok) { setStatus('success'); }
      else { alert('Subscription failed. Please try again.'); setStatus('idle'); }
    } catch {
      alert('Network error. Please check your connection.');
      setStatus('idle');
    }
  };

  return (
    <footer className="bg-[#1a281f] text-[#FAF9F6] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C47C5D] rounded-full blur-[200px] opacity-[0.04] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 relative z-10">

        {/* ── 5-Column Grid ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6 mb-12">

          {/* 1. Brand + Contact */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="font-cormorant text-3xl font-bold tracking-wide block mb-3">
              OMIRA<span className="text-[#C47C5D]">.</span>
            </Link>
            <p className="font-manrope text-[#FAF9F6]/50 text-sm leading-relaxed mb-5 max-w-xs">
              Clinical yoga therapy designed to work alongside your existing medical treatment. Evidence-backed. Measurable outcomes.
            </p>
            <div className="space-y-2 font-manrope text-xs text-[#FAF9F6]/50 mb-5">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#C47C5D] flex-shrink-0" />
                <span>Bengaluru &amp; Sagara, Karnataka</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#C47C5D] flex-shrink-0" />
                <a href="tel:+917349524578" className="hover:text-[#C47C5D] transition-colors">+91 73495 24578</a>
                <span className="opacity-30 mx-0.5">·</span>
                <a href="tel:+918762901838" className="hover:text-[#C47C5D] transition-colors">87629 01838</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#C47C5D] flex-shrink-0" />
                <span className="italic opacity-40">Email coming soon</span>
              </div>
            </div>
            {/* Social */}
            <div className="flex gap-2">
              {['Instagram', 'LinkedIn', 'YouTube'].map((s) => (
                <a key={s} href="#" aria-label={s}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FAF9F6]/6 hover:bg-[#C47C5D] text-[#FAF9F6]/40 hover:text-[#FAF9F6] transition-all duration-300 font-manrope text-[10px] font-bold uppercase tracking-wide">
                  <ExternalLink className="w-3 h-3" />{s.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          {/* 2. For Patients — Deep Links */}
          <nav aria-label="Patient treatments">
            <h4 className="font-manrope font-bold uppercase tracking-widest text-[10px] text-[#FAF9F6]/30 mb-4 flex items-center gap-2">
              <HeartPulse className="w-3 h-3 text-[#C47C5D]" /> For Patients
            </h4>
            <ul className="space-y-2.5 font-manrope text-sm text-[#FAF9F6]/55">
              <li><Link href="/treatments" className="hover:text-[#C47C5D] transition-colors">All Treatments</Link></li>
              <li><Link href="/rehabilitation" className="hover:text-[#C47C5D] transition-colors">Rehabilitation</Link></li>
              <li><Link href="/post-care" className="hover:text-[#C47C5D] transition-colors">Post-Care Recovery</Link></li>
              <li className="pt-1">
                <Link href="/treatments" className="text-[#C47C5D] font-semibold text-xs hover:underline flex items-center gap-1">
                  Browse All Protocols <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </nav>

          {/* 3. For Hospitals */}
          <nav aria-label="Hospital partnerships">
            <h4 className="font-manrope font-bold uppercase tracking-widest text-[10px] text-[#FAF9F6]/30 mb-4 flex items-center gap-2">
              <Building2 className="w-3 h-3 text-[#C47C5D]" /> For Hospitals
            </h4>
            <ul className="space-y-2.5 font-manrope text-sm text-[#FAF9F6]/55">
              <li><Link href="/hospitals" className="hover:text-[#C47C5D] transition-colors">Department Integration</Link></li>
              <li><Link href="/protocol" className="hover:text-[#C47C5D] transition-colors">Evidence Engine</Link></li>
              <li className="pt-1">
                <Link href="/hospitals" className="text-[#C47C5D] font-semibold text-xs hover:underline flex items-center gap-1">
                  Partner With Us <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </nav>

          {/* 4. Resources */}
          <nav aria-label="Resources">
            <h4 className="font-manrope font-bold uppercase tracking-widest text-[10px] text-[#FAF9F6]/30 mb-4 flex items-center gap-2">
              <BookOpen className="w-3 h-3 text-[#C47C5D]" /> Resources
            </h4>
            <ul className="space-y-2.5 font-manrope text-sm text-[#FAF9F6]/55">
              <li><Link href="/protocol" className="hover:text-[#C47C5D] transition-colors">Evidence Engine</Link></li>
              <li><Link href="/blog" className="hover:text-[#C47C5D] transition-colors">Clinical Journal</Link></li>
              <li><Link href="/about" className="hover:text-[#C47C5D] transition-colors">About Omira</Link></li>
              <li><Link href="/contact" className="hover:text-[#C47C5D] transition-colors">Contact Us</Link></li>
            </ul>
          </nav>

          {/* 5. Newsletter */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <h4 className="font-manrope font-bold uppercase tracking-widest text-[10px] text-[#FAF9F6]/30 mb-4 flex items-center gap-2">
              <Mail className="w-3 h-3 text-[#C47C5D]" /> Newsletter
            </h4>
            <p className="font-manrope text-sm text-[#FAF9F6]/45 mb-4 leading-relaxed">
              Clinical research summaries and protocol updates. Zero spam.
            </p>
            {status === 'success' ? (
              <div className="flex items-center gap-2 text-emerald-400 font-manrope text-sm font-semibold bg-emerald-900/30 border border-emerald-500/25 px-4 py-3 rounded-xl">
                <CheckCircle className="w-4 h-4 flex-shrink-0" /> Subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input type="hidden" name="access_key" value="79023ef4-deaf-4608-b861-ebce44da634c" />
                <input type="hidden" name="subject" value="📬 New Newsletter Subscriber | Omira Wellness" />
                <input type="hidden" name="from_name" value="Omira Newsletter Form" />
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                <input type="email" name="email" required placeholder="your@email.com"
                  className="w-full bg-transparent border border-[#FAF9F6]/15 rounded-xl px-4 py-2.5 font-manrope text-sm focus:outline-none focus:border-[#C47C5D] transition-colors text-[#FAF9F6] placeholder:text-[#FAF9F6]/25" />
                <button type="submit" disabled={status === 'submitting'}
                  className="w-full bg-[#C47C5D] text-[#FAF9F6] px-5 py-2.5 rounded-xl hover:bg-[#a66448] transition-colors flex items-center justify-center gap-2 font-manrope text-sm font-bold disabled:opacity-60">
                  {status === 'submitting' ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ArrowRight className="w-4 h-4" /> Subscribe</>}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── Trust bar ───────────────────────────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 border-t border-[#FAF9F6]/8 pt-8 pb-6">
          {[
            { icon: <ShieldCheck className="w-4 h-4" />, text: 'Medically Supervised' },
            { icon: <FlaskConical className="w-4 h-4" />, text: 'Evidence-Based Protocols' },
            { icon: <Users className="w-4 h-4" />, text: 'C-IAYT Certified Therapists' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-[#FAF9F6]/25 font-manrope text-[10px] font-bold uppercase tracking-wider">
              <span className="text-[#C47C5D]/50">{icon}</span> {text}
            </div>
          ))}
        </div>

        {/* ── Legal bar ───────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#FAF9F6]/6 pt-6 gap-3">
          <p className="font-manrope text-xs text-[#FAF9F6]/25 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Omira Wellness. Designed for clinical outcomes.
          </p>
          <div className="flex gap-5 font-manrope text-xs text-[#FAF9F6]/25">
            <Link href="/contact" className="hover:text-[#FAF9F6]/50 transition-colors">Privacy</Link>
            <Link href="/contact" className="hover:text-[#FAF9F6]/50 transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-[#FAF9F6]/50 transition-colors">Medical Disclaimer</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}