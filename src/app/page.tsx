"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Activity, Building2 } from "lucide-react";
import ClinicalTicker from "@/components/ui/ClinicalTicker";

// Register ScrollTrigger for the new scroll-based homepage sections
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroRef = useRef(null);
  const philosophyRef = useRef(null);
  const portalsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Entrance Animations (From our previous build)
      gsap.fromTo(
        ".hero-text",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power4.out", delay: 0.2 }
      );

      // 2. Philosophy Scroll Reveal (Massive Typography effect)
      gsap.fromTo(
        ".philosophy-line",
        { y: 40, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: "top 70%", // Triggers when the section is 70% down the screen
          }
        }
      );

      // 3. Portal Cards Slide In
      gsap.fromTo(
        ".portal-card",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: portalsRef.current,
            start: "top 80%",
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative bg-[#FAF9F6] overflow-hidden">


      
      
      {/* SECTION 1: THE HERO (100vh height) */}



      {/* SECTION 1: THE HERO (Updated with next/image) */}
      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        
        {/* The Premium Image Background */}
        <div className="absolute inset-0 -z-20">
          {/* <Image 
            src="" 
            alt="Omira Wellness Clinical Facility"
            fill // This tells Next.js to fill the parent container
            className="object-cover" 
            priority // Tells Google to load this image FIRST for SEO speed
            quality={90}
          /> */}
          {/* Glassmorphic Overlay: This ensures your dark text is still perfectly readable on top of any photo */}
          <div className="absolute inset-0 bg-[#FAF9F6]/85 backdrop-blur-[2px]"></div>
        </div>

        {/* Ambient Glows (kept for that Next-Gen feel) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-60">
          <div className="absolute w-[500px] h-[500px] bg-[#2A4032] rounded-full blur-[150px] -top-32 -left-32 opacity-20"></div>
          <div className="absolute w-[500px] h-[500px] bg-[#C47C5D] rounded-full blur-[150px] bottom-10 right-10 opacity-10"></div>
        </div>



        {/* Ambient Glows */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-40">
          <div className="absolute w-[500px] h-[500px] bg-[#2A4032] rounded-full blur-[150px] -top-32 -left-32 opacity-20"></div>
          <div className="absolute w-[500px] h-[500px] bg-[#C47C5D] rounded-full blur-[150px] bottom-10 right-10 opacity-10"></div>
        </div>

        <div className="text-center max-w-5xl z-10">
          <h2 className="hero-text text-[#C47C5D] font-manrope font-bold tracking-[0.25em] uppercase text-xs md:text-sm mb-6">
            Empirical Medicine. Traditional Roots.
          </h2>
          <h1 className="hero-text font-cormorant text-6xl md:text-8xl lg:text-9xl font-medium text-[#2A4032] leading-[1.1] mb-12">
            Omira Wellness
          </h1>
          <p className="hero-text font-manrope text-[#2A4032]/70 max-w-2xl mx-auto text-lg md:text-xl">
            A clinical framework where therapeutic yoga meets allopathic outcomes. Designed for measurable recovery, rehabilitation, and integration.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <span className="font-manrope text-[10px] uppercase tracking-widest text-[#2A4032]">Scroll to Discover</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#2A4032] to-transparent"></div>
        </div>
      </section>

      {/* THE CLINICAL TICKER (Anchors the Hero to the rest of the site) */}
      <ClinicalTicker />

      {/* SECTION 2: THE PHILOSOPHY */}
      <section ref={philosophyRef} className="py-32 md:py-48 px-6 relative">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="philosophy-line font-cormorant text-4xl md:text-6xl lg:text-7xl text-[#2A4032] leading-tight font-medium mb-8">
            Modern medicine saves lives.<br />
            <span className="text-[#C47C5D] italic">Traditional yoga restores them.</span>
          </h2>
          <p className="philosophy-line font-manrope text-[#2A4032]/80 text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto">
            At Omira, we refuse to choose between the two. We bridge the gap by building 
            condition-specific protocols that work <span className="font-bold border-b-2 border-[#C47C5D]/30 pb-1">alongside</span> your current medical treatments, 
            tracking real metrics like blood pressure, FEV1, and UPDRS scores.
          </p>
        </div>
      </section>

      {/* SECTION 3: THE DUAL PORTALS */}
      <section ref={portalsRef} className="py-24 px-6 bg-[#2A4032] relative overflow-hidden rounded-t-[3rem] md:rounded-t-[5rem]">
        {/* Subtle background texture for the dark section */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FAF9F6] to-transparent"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-manrope text-[#C47C5D] text-sm font-bold uppercase tracking-[0.2em] mb-4">Choose Your Path</h2>
            <h3 className="font-cormorant text-5xl md:text-6xl text-[#FAF9F6]">Dedicated Clinical Portals</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Patient Portal Card (B2C) */}
            <Link href="/b2c" className="portal-card group relative bg-[#FAF9F6]/5 hover:bg-[#FAF9F6]/10 border border-[#FAF9F6]/10 p-10 md:p-14 rounded-3xl transition-all duration-500 overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C47C5D] rounded-full blur-[120px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 -mr-20 -mt-20"></div>
              
              <Activity className="w-12 h-12 text-[#C47C5D] mb-8" />
              <h4 className="font-cormorant text-4xl text-[#FAF9F6] mb-4">For Patients & Rehab</h4>
              <p className="font-manrope text-[#FAF9F6]/70 leading-relaxed mb-12 max-w-md">
                Direct access to our clinical yoga modules. Explore condition-specific treatments for cardiovascular health, oncology support, addiction recovery, and more.
              </p>
              
              <div className="flex items-center gap-4 text-[#C47C5D] font-manrope font-bold uppercase tracking-widest text-sm">
                <span>Enter Portal</span>
                <div className="w-10 h-px bg-[#C47C5D] group-hover:w-16 transition-all duration-500"></div>
                <ArrowRight className="w-5 h-5 -ml-2 group-hover:translate-x-2 transition-transform duration-500" />
              </div>
            </Link>

            {/* Hospital Portal Card (B2B) */}
            <Link href="/b2b" className="portal-card group relative bg-[#FAF9F6]/5 hover:bg-[#FAF9F6]/10 border border-[#FAF9F6]/10 p-10 md:p-14 rounded-3xl transition-all duration-500 overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FAF9F6] rounded-full blur-[120px] opacity-10 group-hover:opacity-20 transition-opacity duration-500 -mr-20 -mt-20"></div>
              
              <Building2 className="w-12 h-12 text-[#FAF9F6]/80 mb-8" />
              <h4 className="font-cormorant text-4xl text-[#FAF9F6] mb-4">For Hospitals & Clinics</h4>
              <p className="font-manrope text-[#FAF9F6]/70 leading-relaxed mb-12 max-w-md">
                Partner with Omira to integrate therapeutic yoga into your hospital wards. Reduce readmissions, accelerate post-surgical recovery, and improve patient ROI.
              </p>
              
              <div className="flex items-center gap-4 text-[#FAF9F6] font-manrope font-bold uppercase tracking-widest text-sm">
                <span>Enter Portal</span>
                <div className="w-10 h-px bg-[#FAF9F6] group-hover:w-16 transition-all duration-500"></div>
                <ArrowRight className="w-5 h-5 -ml-2 group-hover:translate-x-2 transition-transform duration-500" />
              </div>
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}