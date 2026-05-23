"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Mail, Phone, MapPin, CheckCircle, Loader2 } from "lucide-react";

export default function Footer() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Honeypot check for spam bots
    if (formData.get("botcheck")) {
      setStatus("success");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setStatus("success");
      } else {
        alert("Subscription failed. Please try again later.");
        setStatus("idle");
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please check your connection.");
      setStatus("idle");
    }
  };

  return (
    <footer className="bg-[#1a281f] text-[#FAF9F6] pt-24 pb-12 px-6 border-t border-[#C47C5D]/20">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <Link href="/" className="font-cormorant text-4xl font-bold tracking-wide block mb-6">
              OMIRA<span className="text-[#C47C5D]">.</span>
            </Link>
            <p className="font-manrope text-[#FAF9F6]/70 text-lg max-w-md leading-relaxed mb-8">
              Where traditional therapeutic yoga meets empirical medical outcomes. Designed for measurable recovery and hospital integration.
            </p>
            <div className="flex items-center gap-4 text-[#FAF9F6]/80 font-manrope text-sm">
              <MapPin className="w-5 h-5 text-[#C47C5D]" />
              <span>Bengaluru, Karnataka, India</span>
            </div>
          </div>

          <div className="bg-[#FAF9F6]/5 p-8 rounded-3xl border border-[#FAF9F6]/10">
            <h3 className="font-cormorant text-2xl mb-2">Join the Clinical Newsletter</h3>
            <p className="font-manrope text-sm text-[#FAF9F6]/60 mb-6">
              Receive empirical research, new protocol updates, and B2B partnership opportunities directly in your inbox.
            </p>
            
            {status === "success" ? (
              <div className="flex items-center gap-3 bg-green-900/30 border border-green-500/30 text-green-400 px-6 py-4 rounded-xl font-manrope text-sm font-semibold">
                <CheckCircle className="w-5 h-5" />
                Successfully subscribed to the Omira Newsletter.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input type="hidden" name="access_key" value="79023ef4-deaf-4608-b861-ebce44da634c" />
                <input type="hidden" name="subject" value="📬 New Newsletter Subscriber | Omira Wellness" />
                <input type="hidden" name="from_name" value="Omira Newsletter Form" />
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="Enter your email address" 
                  className="w-full bg-transparent border border-[#FAF9F6]/20 rounded-xl px-4 py-3 font-manrope text-sm focus:outline-none focus:border-[#C47C5D] transition-colors"
                />
                <button 
                  type="submit" 
                  disabled={status === "submitting"}
                  className="bg-[#C47C5D] text-[#FAF9F6] px-6 py-3 rounded-xl hover:bg-[#a66448] transition-colors flex items-center justify-center disabled:opacity-70"
                >
                  {status === "submitting" ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Section: Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-[#FAF9F6]/10 pt-16 mb-16">
          
          <div>
            <h4 className="font-manrope font-bold uppercase tracking-widest text-xs text-[#FAF9F6]/50 mb-6">Patient Services (B2C)</h4>
            <ul className="space-y-4 font-manrope text-sm text-[#FAF9F6]/80">
              <li><Link href="/b2c/hypertension" className="hover:text-[#C47C5D] transition-colors">Morning Calm (Hypertension)</Link></li>
              <li><Link href="/b2c/cancer-support" className="hover:text-[#C47C5D] transition-colors">Cancer Supportive Care</Link></li>
              <li><Link href="/b2c/alcohol-rehab" className="hover:text-[#C47C5D] transition-colors">Addiction Recovery Protocol</Link></li>
              <li><Link href="/b2c" className="text-[#C47C5D] hover:underline">View All Protocols →</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-manrope font-bold uppercase tracking-widest text-xs text-[#FAF9F6]/50 mb-6">Hospital Solutions (B2B)</h4>
            <ul className="space-y-4 font-manrope text-sm text-[#FAF9F6]/80">
              <li><Link href="/b2b" className="hover:text-[#C47C5D] transition-colors">Orthopedic Integration</Link></li>
              <li><Link href="/b2b" className="hover:text-[#C47C5D] transition-colors">Cardiac Rehab Partnership</Link></li>
              <li><Link href="/b2b" className="hover:text-[#C47C5D] transition-colors">Oncology Support Modules</Link></li>
              <li><Link href="/protocol" className="text-[#C47C5D] hover:underline">View Clinical Data Engine →</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-manrope font-bold uppercase tracking-widest text-xs text-[#FAF9F6]/50 mb-6">Contact & Support</h4>
            <ul className="space-y-4 font-manrope text-sm text-[#FAF9F6]/80">
              <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#C47C5D]" /> clinical@omirawellness.com</li>
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#C47C5D]" /> Request Callback via CRM</li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Legal & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-[#FAF9F6]/10 pt-8 text-center md:text-left">
          <p className="font-manrope text-xs text-[#FAF9F6]/40 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Omira Wellness. All rights reserved. <br className="md:hidden" />
            <span className="md:ml-2 italic">Protocols designed under the guidance of Certified Yoga Therapists.</span>
          </p>
          <div className="flex gap-6 font-manrope text-xs text-[#FAF9F6]/50">
            <Link href="#" className="hover:text-[#FAF9F6] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#FAF9F6] transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-[#FAF9F6] transition-colors">Medical Disclaimer</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}