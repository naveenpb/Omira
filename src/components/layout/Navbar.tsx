'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import {
  Menu, X, ChevronRight, ChevronDown, ArrowRight, Phone,
  HeartPulse, Building2, FlaskConical, BookOpen, Users,
  Activity, Bone, Brain, Ribbon, Stethoscope, ShieldCheck,
  BarChart3, Award,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════
   NAV DATA
   ═══════════════════════════════════════════════════════════════════════════ */

const navLinks = [
  {
    label: 'Treatments',
    href: '/treatments',
    megaMenu: true,
    columns: [
      {
        title: 'By Condition',
        links: [
          { label: 'All Conditions', href: '/treatments', icon: <Activity className="w-4 h-4" />, desc: 'Browse every clinical protocol' },
          { label: 'Cardiovascular', href: '/treatments', icon: <HeartPulse className="w-4 h-4" />, desc: 'Hypertension, Post-MI rehab' },
          { label: 'Oncology Support', href: '/treatments', icon: <Ribbon className="w-4 h-4" />, desc: 'Cancer fatigue & recovery' },
          { label: 'Neurological', href: '/treatments', icon: <Brain className="w-4 h-4" />, desc: "Parkinson's, stroke rehab" },
        ],
      },
      {
        title: 'Specialised Wings',
        links: [
          { label: 'Rehabilitation', href: '/rehabilitation', icon: <ShieldCheck className="w-4 h-4" />, desc: 'Addiction & recovery protocols' },
          { label: 'Post-Care Recovery', href: '/post-care', icon: <Bone className="w-4 h-4" />, desc: 'Post-surgical healing' },
        ],
      },
    ],
  },
  {
    label: 'For Hospitals',
    href: '/hospitals',
    megaMenu: true,
    columns: [
      {
        title: 'Integration',
        links: [
          { label: 'Department Solutions', href: '/hospitals', icon: <Building2 className="w-4 h-4" />, desc: 'Integrate yoga into hospital wards' },
          { label: 'ROI & Case Studies', href: '/hospitals', icon: <BarChart3 className="w-4 h-4" />, desc: 'Measurable outcomes & data' },
        ],
      },
      {
        title: 'Why Omira',
        links: [
          { label: 'Evidence Engine', href: '/protocol', icon: <FlaskConical className="w-4 h-4" />, desc: 'Clinical comparison data' },
          { label: 'Certifications', href: '/about', icon: <Award className="w-4 h-4" />, desc: 'C-IAYT & medical credentials' },
        ],
      },
    ],
  },
  {
    label: 'Evidence',
    href: '/protocol',
    megaMenu: false,
  },
  {
    label: 'Journal',
    href: '/blog',
    megaMenu: false,
  },
  {
    label: 'About',
    href: '/about',
    megaMenu: true,
    columns: [
      {
        title: 'Company',
        links: [
          { label: 'Our Story', href: '/about', icon: <Users className="w-4 h-4" />, desc: 'The Omira mission & philosophy' },
          { label: 'Clinical Team', href: '/about', icon: <Stethoscope className="w-4 h-4" />, desc: 'C-IAYT certified therapists' },
          { label: 'Contact Us', href: '/contact', icon: <Phone className="w-4 h-4" />, desc: 'Reach our coordination team' },
        ],
      },
    ],
  },
];

// Mobile-friendly flat list
const mobileLinks = [
  {
    label: 'Treatments',
    href: '/treatments',
    sub: [
      { label: 'All Conditions', href: '/treatments' },
      { label: 'Rehabilitation', href: '/rehabilitation' },
      { label: 'Post-Care Recovery', href: '/post-care' },
    ],
  },
  {
    label: 'For Hospitals',
    href: '/hospitals',
    sub: [
      { label: 'Department Solutions', href: '/hospitals' },
      { label: 'Evidence Engine', href: '/protocol' },
    ],
  },
  { label: 'Evidence', href: '/protocol' },
  { label: 'Journal', href: '/blog' },
  {
    label: 'About',
    href: '/about',
    sub: [
      { label: 'Our Story', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpand, setMobileExpand] = useState<string | null>(null);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const pathname = usePathname();

  // Close everything on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileExpand(null);
    setActiveMega(null);
  }, [pathname]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const openModal = useCallback(() => {
    window.dispatchEvent(new CustomEvent('omira:open-lead-modal', { detail: {} }));
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* ═══ HEADER BAR ═══════════════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-3 flex items-center justify-between">

          {/* Brand */}
          <Link href="/" className="font-cormorant text-2xl lg:text-3xl font-bold text-[#2A4032] tracking-wide flex-shrink-0">
            OMIRA<span className="text-[#C47C5D]">.</span>
          </Link>

          {/* ── Desktop Nav (lg+) ──────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.megaMenu ? setActiveMega(link.label) : setActiveMega(null)}
                onMouseLeave={() => setActiveMega(null)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 px-3 py-2 rounded-full font-manrope text-[13px] font-semibold transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-[#C47C5D] bg-[#C47C5D]/8'
                      : 'text-[#2A4032]/70 hover:text-[#2A4032] hover:bg-[#2A4032]/5'
                  }`}
                >
                  {link.label}
                  {link.megaMenu && (
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        activeMega === link.label ? 'rotate-180 text-[#C47C5D]' : 'text-[#2A4032]/30'
                      }`}
                    />
                  )}
                </Link>

                {/* Mega Menu Panel */}
                {link.megaMenu && link.columns && activeMega === link.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                    <div
                      className="glass-mega-menu rounded-2xl overflow-hidden"
                      style={{ minWidth: link.columns.length > 1 ? '480px' : '280px' }}
                    >
                      <div className={`grid gap-0 p-2 ${link.columns.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                        {link.columns.map((col) => (
                          <div key={col.title} className="p-3">
                            <p className="font-manrope text-[10px] font-bold uppercase tracking-[0.15em] text-[#2A4032]/35 mb-3 px-3">
                              {col.title}
                            </p>
                            <div className="space-y-0.5">
                              {col.links.map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-[#FAF9F6] transition-all duration-200 group"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-[#2A4032]/5 flex items-center justify-center flex-shrink-0 text-[#2A4032]/50 group-hover:bg-[#C47C5D]/10 group-hover:text-[#C47C5D] transition-colors">
                                    {item.icon}
                                  </div>
                                  <div>
                                    <span className="font-manrope text-sm font-semibold text-[#2A4032] group-hover:text-[#C47C5D] transition-colors block leading-tight">
                                      {item.label}
                                    </span>
                                    <span className="font-manrope text-xs text-[#2A4032]/40 mt-0.5 leading-snug block">
                                      {item.desc}
                                    </span>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Mega menu footer CTA */}
                      <div className="border-t border-[#2A4032]/6 bg-[#FAF9F6]/60 px-5 py-3 flex items-center justify-between">
                        <span className="font-manrope text-xs text-[#2A4032]/40">
                          {link.label === 'Treatments' ? 'Find your condition-specific protocol' :
                           link.label === 'For Hospitals' ? 'Reduce readmissions with clinical yoga' :
                           'Learn more about Omira'}
                        </span>
                        <Link
                          href={link.href}
                          className="font-manrope text-xs font-bold text-[#C47C5D] hover:text-[#2A4032] transition-colors flex items-center gap-1"
                        >
                          View All <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* ── Desktop CTA ────────────────────────────────────────── */}
          <div className="hidden lg:block ml-3">
            <button
              onClick={openModal}
              id="navbar-cta-desktop"
              className="bg-[#2A4032] text-[#FAF9F6] font-manrope text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#C47C5D] transition-all duration-300 shadow-sm animate-pulse-glow"
            >
              Book Assessment
            </button>
          </div>

          {/* ── Hamburger (< lg) ───────────────────────────────────── */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[#2A4032]/8 text-[#2A4032] hover:bg-[#2A4032]/15 transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={20} strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* ═══ MOBILE FULL-SCREEN OVERLAY ═══════════════════════════════════ */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] transition-all duration-400 ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop blur */}
        <div
          className="absolute inset-0 bg-[#2A4032]/60 backdrop-blur-md"
          onClick={() => setMobileOpen(false)}
        />

        {/* Content panel */}
        <div
          className={`absolute inset-y-0 right-0 w-full max-w-sm bg-[#FAF9F6] shadow-2xl flex flex-col transition-transform duration-400 ease-out ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A4032]/8">
            <Link href="/" onClick={() => setMobileOpen(false)} className="font-cormorant text-2xl font-bold text-[#2A4032]">
              OMIRA<span className="text-[#C47C5D]">.</span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#2A4032]/8 text-[#2A4032] hover:bg-[#2A4032]/15 transition-colors"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile navigation">
            {mobileLinks.map((link) => (
              <div key={link.label} className="mb-1">
                {link.sub ? (
                  <>
                    <button
                      onClick={() => setMobileExpand(mobileExpand === link.label ? null : link.label)}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl font-manrope font-semibold text-[15px] transition-colors ${
                        isActive(link.href)
                          ? 'bg-[#C47C5D]/10 text-[#C47C5D]'
                          : 'text-[#2A4032] hover:bg-[#2A4032]/5'
                      }`}
                    >
                      {link.label}
                      <ChevronRight
                        size={16}
                        className={`text-[#2A4032]/30 transition-transform duration-200 ${
                          mobileExpand === link.label ? 'rotate-90' : ''
                        }`}
                      />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${mobileExpand === link.label ? 'max-h-64' : 'max-h-0'}`}>
                      <div className="pl-4 pr-2 pb-2 space-y-0.5">
                        {link.sub.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center px-4 py-2.5 rounded-xl font-manrope text-sm transition-colors ${
                              isActive(item.href) && pathname === item.href
                                ? 'text-[#C47C5D] font-semibold bg-[#C47C5D]/5'
                                : 'text-[#2A4032]/70 hover:text-[#2A4032] hover:bg-[#2A4032]/5'
                            }`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center px-4 py-3.5 rounded-xl font-manrope font-semibold text-[15px] transition-colors ${
                      isActive(link.href)
                        ? 'bg-[#C47C5D]/10 text-[#C47C5D]'
                        : 'text-[#2A4032] hover:bg-[#2A4032]/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="px-4 pb-8 pt-4 border-t border-[#2A4032]/8 space-y-3">
            <button
              id="navbar-cta-mobile"
              onClick={() => { setMobileOpen(false); openModal(); }}
              className="w-full bg-[#2A4032] text-[#FAF9F6] py-3.5 rounded-xl font-manrope font-bold uppercase tracking-widest text-xs hover:bg-[#C47C5D] transition-colors flex items-center justify-center gap-2"
            >
              Book Assessment <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <div className="flex gap-2">
              <a href="tel:+917349524578"
                className="flex-1 py-2.5 bg-[#2A4032]/5 rounded-xl text-center font-manrope text-xs text-[#2A4032]/60 hover:bg-[#2A4032]/10 transition-colors">
                73495 24578
              </a>
              <a href="tel:+918762901838"
                className="flex-1 py-2.5 bg-[#2A4032]/5 rounded-xl text-center font-manrope text-xs text-[#2A4032]/60 hover:bg-[#2A4032]/10 transition-colors">
                87629 01838
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}