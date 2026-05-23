"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  // Detect scroll to add a delicate shadow and deeper blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileDropdown = (menu: string) => {
    setOpenMobileDropdown(openMobileDropdown === menu ? null : menu);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setTimeout(() => setOpenMobileDropdown(null), 300);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled || mobileMenuOpen
          ? "bg-[#FAF9F6]/95 backdrop-blur-md border-[#2A4032]/10 py-4 shadow-sm"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-50">
        
        {/* Brand Logo */}
        <Link href="/" onClick={closeMobileMenu} className="font-cormorant text-2xl md:text-3xl font-bold text-[#2A4032] tracking-wide">
          OMIRA<span className="text-[#C47C5D]">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-manrope text-sm font-semibold text-[#2A4032]/80">
          
          {/* B2C Dropdown Group */}
          <div className="relative group py-6">
            <Link href="/b2c" className="hover:text-[#C47C5D] transition-colors flex items-center gap-1">
              Patient Rehab (B2C)
            </Link>
            <div className="absolute top-full left-0 mt-0 w-64 bg-white border border-[#2A4032]/10 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 overflow-hidden">
              <div className="p-2 flex flex-col">
                <span className="text-[10px] uppercase font-bold text-[#2A4032]/40 tracking-widest px-4 py-2">Clinical Modules</span>
                <Link href="/b2c/cancer-support" className="px-4 py-2.5 hover:bg-[#FAF9F6] rounded-xl text-[#2A4032] transition-colors">Oncology Support</Link>
                <Link href="/b2c/hypertension" className="px-4 py-2.5 hover:bg-[#FAF9F6] rounded-xl text-[#2A4032] transition-colors">Cardiovascular Care</Link>
                <Link href="/b2c/alcohol-rehab" className="px-4 py-2.5 hover:bg-[#FAF9F6] rounded-xl text-[#2A4032] transition-colors">Addiction Recovery</Link>
                <Link href="/b2c/post-surgical" className="px-4 py-2.5 hover:bg-[#FAF9F6] rounded-xl text-[#2A4032] transition-colors">Post-Surgical Healing</Link>
                <div className="h-px bg-[#2A4032]/5 my-1 mx-2"></div>
                <Link href="/b2c" className="px-4 py-2.5 text-[#C47C5D] hover:bg-[#FAF9F6] rounded-xl transition-colors font-bold">View All Conditions →</Link>
              </div>
            </div>
          </div>

          {/* B2B Dropdown Group */}
          <div className="relative group py-6">
            <Link href="/b2b" className="hover:text-[#C47C5D] transition-colors flex items-center gap-1">
              Hospital Integration (B2B)
            </Link>
            <div className="absolute top-full left-0 mt-0 w-64 bg-white border border-[#2A4032]/10 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 overflow-hidden">
              <div className="p-2 flex flex-col">
                <span className="text-[10px] uppercase font-bold text-[#2A4032]/40 tracking-widest px-4 py-2">Partnerships</span>
                <Link href="/b2b" className="px-4 py-2.5 hover:bg-[#FAF9F6] rounded-xl text-[#2A4032] transition-colors">Hospital Networks</Link>
                <Link href="/b2b" className="px-4 py-2.5 hover:bg-[#FAF9F6] rounded-xl text-[#2A4032] transition-colors">Specialty Clinics</Link>
                <Link href="/b2b" className="px-4 py-2.5 hover:bg-[#FAF9F6] rounded-xl text-[#2A4032] transition-colors">Corporate Wellness</Link>
                <div className="h-px bg-[#2A4032]/5 my-1 mx-2"></div>
                <Link href="/b2b" className="px-4 py-2.5 text-[#C47C5D] hover:bg-[#FAF9F6] rounded-xl transition-colors font-bold">Partner With Us →</Link>
              </div>
            </div>
          </div>

          {/* Protocol Dropdown Group */}
          <div className="relative group py-6">
            <Link href="/protocol" className="hover:text-[#C47C5D] transition-colors flex items-center gap-1">
              Evidence Engine
            </Link>
            <div className="absolute top-full left-0 mt-0 w-64 bg-white border border-[#2A4032]/10 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 overflow-hidden">
              <div className="p-2 flex flex-col">
                <span className="text-[10px] uppercase font-bold text-[#2A4032]/40 tracking-widest px-4 py-2">Research & Data</span>
                <Link href="/protocol" className="px-4 py-2.5 hover:bg-[#FAF9F6] rounded-xl text-[#2A4032] transition-colors">Clinical Trials</Link>
                <Link href="/protocol" className="px-4 py-2.5 hover:bg-[#FAF9F6] rounded-xl text-[#2A4032] transition-colors">Our Methodology</Link>
                <div className="h-px bg-[#2A4032]/5 my-1 mx-2"></div>
                <Link href="/protocol" className="px-4 py-2.5 text-[#C47C5D] hover:bg-[#FAF9F6] rounded-xl transition-colors font-bold">View Evidence →</Link>
              </div>
            </div>
          </div>

          {/* Blog Dropdown Group */}
          <div className="relative group py-6">
            <Link href="/blog" className="hover:text-[#C47C5D] transition-colors flex items-center gap-1">
              Clinical Journal
            </Link>
            <div className="absolute top-full left-0 mt-0 w-64 bg-white border border-[#2A4032]/10 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 overflow-hidden">
              <div className="p-2 flex flex-col">
                <span className="text-[10px] uppercase font-bold text-[#2A4032]/40 tracking-widest px-4 py-2">Publications</span>
                <Link href="/blog" className="px-4 py-2.5 hover:bg-[#FAF9F6] rounded-xl text-[#2A4032] transition-colors">Latest Articles</Link>
                <Link href="/blog" className="px-4 py-2.5 hover:bg-[#FAF9F6] rounded-xl text-[#2A4032] transition-colors">Case Studies</Link>
                <div className="h-px bg-[#2A4032]/5 my-1 mx-2"></div>
                <Link href="/blog" className="px-4 py-2.5 text-[#C47C5D] hover:bg-[#FAF9F6] rounded-xl transition-colors font-bold">Browse Journal →</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new Event("open-booking-modal"));
            }}
            className="bg-[#2A4032] text-[#FAF9F6] font-manrope text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-[#C47C5D] transition-colors duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 inline-block"
          >
            Book Assessment
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-[#2A4032]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown (Flawless Grid Animation) */}
      <div
        className={`md:hidden absolute top-0 left-0 w-full h-[100dvh] overflow-y-auto bg-[#FAF9F6] flex flex-col pt-24 pb-12 px-6 transition-transform duration-500 origin-top ${
          mobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col w-full font-manrope font-semibold text-[#2A4032] justify-start">
          
          {/* Mobile B2C Group */}
          <div className="border-b border-[#2A4032]/10 flex flex-col">
            <button 
              onClick={() => toggleMobileDropdown("b2c")}
              className="flex items-center justify-between w-full py-5 text-lg hover:text-[#C47C5D] transition-colors"
            >
              Patient Rehab (B2C)
              <ChevronDown size={20} className={`transition-transform duration-300 ${openMobileDropdown === "b2c" ? "rotate-180 text-[#C47C5D]" : ""}`} />
            </button>
            <div className={`grid transition-all duration-300 ease-in-out ${openMobileDropdown === "b2c" ? "grid-rows-[1fr] opacity-100 mb-5" : "grid-rows-[0fr] opacity-0 mb-0"}`}>
              <div className="overflow-hidden">
                <div className="flex flex-col gap-4 pl-4 border-l-2 border-[#C47C5D]/20 ml-2">
                  <span className="text-[10px] uppercase font-bold text-[#2A4032]/40 tracking-widest mt-2">Clinical Modules</span>
                  <Link href="/b2c/cancer-support" onClick={closeMobileMenu} className="text-sm text-[#2A4032]/80 hover:text-[#C47C5D]">Oncology Support</Link>
                  <Link href="/b2c/hypertension" onClick={closeMobileMenu} className="text-sm text-[#2A4032]/80 hover:text-[#C47C5D]">Cardiovascular Care</Link>
                  <Link href="/b2c/alcohol-rehab" onClick={closeMobileMenu} className="text-sm text-[#2A4032]/80 hover:text-[#C47C5D]">Addiction Recovery</Link>
                  <Link href="/b2c/post-surgical" onClick={closeMobileMenu} className="text-sm text-[#2A4032]/80 hover:text-[#C47C5D]">Post-Surgical Healing</Link>
                  <Link href="/b2c" onClick={closeMobileMenu} className="text-sm text-[#C47C5D] font-bold pt-2">View All Conditions →</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile B2B Group */}
          <div className="border-b border-[#2A4032]/10 flex flex-col">
            <button 
              onClick={() => toggleMobileDropdown("b2b")}
              className="flex items-center justify-between w-full py-5 text-lg hover:text-[#C47C5D] transition-colors"
            >
              Hospital Integration (B2B)
              <ChevronDown size={20} className={`transition-transform duration-300 ${openMobileDropdown === "b2b" ? "rotate-180 text-[#C47C5D]" : ""}`} />
            </button>
            <div className={`grid transition-all duration-300 ease-in-out ${openMobileDropdown === "b2b" ? "grid-rows-[1fr] opacity-100 mb-5" : "grid-rows-[0fr] opacity-0 mb-0"}`}>
              <div className="overflow-hidden">
                <div className="flex flex-col gap-4 pl-4 border-l-2 border-[#C47C5D]/20 ml-2">
                  <span className="text-[10px] uppercase font-bold text-[#2A4032]/40 tracking-widest mt-2">Partnerships</span>
                  <Link href="/b2b" onClick={closeMobileMenu} className="text-sm text-[#2A4032]/80 hover:text-[#C47C5D]">Hospital Networks</Link>
                  <Link href="/b2b" onClick={closeMobileMenu} className="text-sm text-[#2A4032]/80 hover:text-[#C47C5D]">Specialty Clinics</Link>
                  <Link href="/b2b" onClick={closeMobileMenu} className="text-sm text-[#C47C5D] font-bold pt-2">Partner With Us →</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Protocol Group */}
          <div className="border-b border-[#2A4032]/10 flex flex-col">
            <button 
              onClick={() => toggleMobileDropdown("protocol")}
              className="flex items-center justify-between w-full py-5 text-lg hover:text-[#C47C5D] transition-colors"
            >
              Evidence Engine
              <ChevronDown size={20} className={`transition-transform duration-300 ${openMobileDropdown === "protocol" ? "rotate-180 text-[#C47C5D]" : ""}`} />
            </button>
            <div className={`grid transition-all duration-300 ease-in-out ${openMobileDropdown === "protocol" ? "grid-rows-[1fr] opacity-100 mb-5" : "grid-rows-[0fr] opacity-0 mb-0"}`}>
              <div className="overflow-hidden">
                <div className="flex flex-col gap-4 pl-4 border-l-2 border-[#C47C5D]/20 ml-2">
                  <span className="text-[10px] uppercase font-bold text-[#2A4032]/40 tracking-widest mt-2">Research & Data</span>
                  <Link href="/protocol" onClick={closeMobileMenu} className="text-sm text-[#2A4032]/80 hover:text-[#C47C5D]">Clinical Trials</Link>
                  <Link href="/protocol" onClick={closeMobileMenu} className="text-sm text-[#2A4032]/80 hover:text-[#C47C5D]">Our Methodology</Link>
                  <Link href="/protocol" onClick={closeMobileMenu} className="text-sm text-[#C47C5D] font-bold pt-2">View Evidence →</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Blog Group */}
          <div className="border-b border-[#2A4032]/10 flex flex-col">
            <button 
              onClick={() => toggleMobileDropdown("blog")}
              className="flex items-center justify-between w-full py-5 text-lg hover:text-[#C47C5D] transition-colors"
            >
              Clinical Journal
              <ChevronDown size={20} className={`transition-transform duration-300 ${openMobileDropdown === "blog" ? "rotate-180 text-[#C47C5D]" : ""}`} />
            </button>
            <div className={`grid transition-all duration-300 ease-in-out ${openMobileDropdown === "blog" ? "grid-rows-[1fr] opacity-100 mb-5" : "grid-rows-[0fr] opacity-0 mb-0"}`}>
              <div className="overflow-hidden">
                <div className="flex flex-col gap-4 pl-4 border-l-2 border-[#C47C5D]/20 ml-2">
                  <span className="text-[10px] uppercase font-bold text-[#2A4032]/40 tracking-widest mt-2">Publications</span>
                  <Link href="/blog" onClick={closeMobileMenu} className="text-sm text-[#2A4032]/80 hover:text-[#C47C5D]">Latest Articles</Link>
                  <Link href="/blog" onClick={closeMobileMenu} className="text-sm text-[#2A4032]/80 hover:text-[#C47C5D]">Case Studies</Link>
                  <Link href="/blog" onClick={closeMobileMenu} className="text-sm text-[#C47C5D] font-bold pt-2">Browse Journal →</Link>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Mobile CTA */}
        <div className="mt-10 mb-8">
          <button
            onClick={(e) => {
              e.preventDefault();
              closeMobileMenu();
              window.dispatchEvent(new Event("open-booking-modal"));
            }}
            className="w-full bg-[#2A4032] text-[#FAF9F6] py-4 rounded-xl text-sm font-bold tracking-widest uppercase hover:bg-[#C47C5D] transition-colors text-center shadow-lg"
          >
            Book Assessment
          </button>
        </div>
      </div>
    </header>
  );
}