'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { X, CheckCircle, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';

// ─── Event shape dispatched from CTA buttons ────────────────────────────────
export interface LeadModalEvent {
  conditionName?: string;
  crmTag?: string;
  source?: string;
}

declare global {
  interface WindowEventMap {
    'omira:open-lead-modal': CustomEvent<LeadModalEvent>;
  }
}

/**
 * LeadCaptureModal v2
 *
 * Opening: dispatch a CustomEvent from ANY button anywhere on the site:
 *   window.dispatchEvent(new CustomEvent('omira:open-lead-modal', {
 *     detail: { conditionName: 'Hypertension', crmTag: 'hypertension', source: '/treatments/hypertension' }
 *   }))
 *
 * Or use the CTAButton component which handles this automatically.
 *
 * Submit flow:
 *   1. Front-end validation (Indian mobile regex, email regex, honeypot)
 *   2. POST to /api/lead (HubSpot CRM + Web3Forms email)
 *   3. Success state
 */
export default function LeadCaptureModal() {
  const [isOpen,       setIsOpen]       = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess,    setIsSuccess]    = useState(false);
  const [context,      setContext]      = useState<LeadModalEvent>({});
  const [errors,       setErrors]       = useState<{ name?: string; phone?: string; email?: string }>({});

  const modalRef   = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // ── Listen for open events ─────────────────────────────────────────────────
  useEffect(() => {
    const handleOpen = (e: CustomEvent<LeadModalEvent>) => {
      setContext(e.detail || {});
      setIsSuccess(false);
      setErrors({});
      setIsOpen(true);
    };
    window.addEventListener('omira:open-lead-modal', handleOpen);
    // Legacy event fallback
    const legacyOpen = () => setIsOpen(true);
    window.addEventListener('open-booking-modal', legacyOpen);
    return () => {
      window.removeEventListener('omira:open-lead-modal', handleOpen);
      window.removeEventListener('open-booking-modal', legacyOpen);
    };
  }, []);

  // ── GSAP animation ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const closeModal = useCallback(() => {
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setIsOpen(false);
        setIsSuccess(false);
        setContext({});
      },
    });
  }, []);

  // ── Validation ─────────────────────────────────────────────────────────────
  const validate = (data: { name: string; phone: string; email: string }) => {
    const errs: { name?: string; phone?: string; email?: string } = {};
    if (!data.name.trim() || data.name.trim().length < 2) {
      errs.name = 'Please enter your full name.';
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
      errs.phone = 'Please enter a valid 10-digit Indian mobile number.';
    }
    if (/^(\d)\1{9}$/.test(data.phone)) {
      errs.phone = 'Sequential numbers are not valid.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const blocked = ['test.com', 'mailinator.com', '10minutemail.com', 'guerrillamail.com'];
    const domain = data.email.split('@')[1]?.toLowerCase();
    if (!emailRegex.test(data.email)) {
      errs.email = 'Please enter a valid email address.';
    } else if (blocked.includes(domain)) {
      errs.email = 'Disposable email addresses are not accepted.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd   = new FormData(form);

    // Honeypot
    if (fd.get('website_url')) { setIsSuccess(true); return; }

    const name  = (fd.get('name')  as string) || '';
    const phone = (fd.get('phone') as string) || '';
    const email = (fd.get('email') as string) || '';

    if (!validate({ name, phone, email })) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          condition: context.conditionName || (fd.get('condition') as string) || 'general',
          crmTag:    context.crmTag        || (fd.get('condition') as string) || 'general',
          source:    context.source        || window.location.pathname,
          locale:    'en',
          // honeypot field value for API-side check
          website_url: fd.get('website_url') || '',
        }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setIsSuccess(true);
        form.reset();
        setErrors({});
      } else if (result.errors) {
        setErrors(result.errors);
      } else {
        alert(result.error || 'Something went wrong. Please try again.');
      }
    } catch {
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const modalTitle = context.conditionName
    ? `Start Your ${context.conditionName} Protocol`
    : 'Request a Clinical Assessment';

  const modalSubtext = context.conditionName
    ? `Our certified therapists will design a protocol specifically for ${context.conditionName}, working alongside your current treatment.`
    : 'A certified Omira coordinator will contact you within 24 hours to discuss your condition and design your protocol.';

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#2A4032]/80 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
    >
      <div
        ref={contentRef}
        className="bg-[#FAF9F6] w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden relative"
      >
        {/* Close */}
        <button
          onClick={closeModal}
          aria-label="Close modal"
          className="absolute top-6 right-6 text-[#2A4032]/50 hover:text-[#C47C5D] transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* ── Success State ─────────────────────────────────────────────── */}
        {isSuccess ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="font-cormorant text-4xl text-[#2A4032] mb-4">Request Received</h3>
            <p className="font-manrope text-[#2A4032]/70 leading-relaxed mb-8 max-w-xs">
              Our clinical coordination team will contact you within <strong>24 hours</strong> to
              schedule your initial assessment and discuss your specific protocol.
            </p>
            <button
              onClick={closeModal}
              className="bg-[#2A4032] text-[#FAF9F6] font-manrope font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full hover:bg-[#C47C5D] transition-colors"
            >
              Return to Website
            </button>
          </div>
        ) : (
          /* ── Form State ───────────────────────────────────────────────── */
          <div className="p-8 sm:p-12">
            {/* Condition context badge */}
            {context.conditionName && (
              <div className="inline-flex items-center gap-2 bg-[#C47C5D]/10 text-[#C47C5D] font-manrope text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
                {context.conditionName}
              </div>
            )}

            <div className="flex items-center gap-2 text-[#C47C5D] font-manrope font-bold uppercase tracking-widest text-xs mb-4">
              <ShieldCheck className="w-4 h-4" />
              Secure Clinical Portal
            </div>

            <h2 className="font-cormorant text-4xl text-[#2A4032] leading-tight mb-2">
              {modalTitle}
            </h2>
            <p className="font-manrope text-sm text-[#2A4032]/60 mb-8 leading-relaxed">
              {modalSubtext}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Honeypot */}
              <input type="text" name="website_url" tabIndex={-1} autoComplete="off"
                className="hidden absolute opacity-0 -z-50" />

              {/* Name */}
              <div>
                <label className="block font-manrope text-xs font-bold uppercase text-[#2A4032]/60 mb-2 tracking-wider">
                  Full Name
                </label>
                <input required type="text" name="name" placeholder="e.g., Ananya Sharma"
                  className={`w-full bg-white border ${errors.name ? 'border-red-500' : 'border-[#2A4032]/10'} rounded-xl px-4 py-3.5 font-manrope text-[#2A4032] focus:outline-none focus:border-[#C47C5D] transition-colors text-sm`} />
                {errors.name && (
                  <p className="text-red-500 text-xs font-manrope mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />{errors.name}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block font-manrope text-xs font-bold uppercase text-[#2A4032]/60 mb-2 tracking-wider">
                  Mobile Number
                </label>
                <input required type="tel" name="phone" placeholder="10-digit Indian mobile number"
                  className={`w-full bg-white border ${errors.phone ? 'border-red-500' : 'border-[#2A4032]/10'} rounded-xl px-4 py-3.5 font-manrope text-[#2A4032] focus:outline-none focus:border-[#C47C5D] transition-colors text-sm`} />
                {errors.phone && (
                  <p className="text-red-500 text-xs font-manrope mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />{errors.phone}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block font-manrope text-xs font-bold uppercase text-[#2A4032]/60 mb-2 tracking-wider">
                  Email Address
                </label>
                <input required type="email" name="email" placeholder="you@example.com"
                  className={`w-full bg-white border ${errors.email ? 'border-red-500' : 'border-[#2A4032]/10'} rounded-xl px-4 py-3.5 font-manrope text-[#2A4032] focus:outline-none focus:border-[#C47C5D] transition-colors text-sm`} />
                {errors.email && (
                  <p className="text-red-500 text-xs font-manrope mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />{errors.email}
                  </p>
                )}
              </div>

              {/* Condition dropdown — only shown when not pre-filled by context */}
              {!context.conditionName && (
                <div>
                  <label className="block font-manrope text-xs font-bold uppercase text-[#2A4032]/60 mb-2 tracking-wider">
                    Primary Concern
                  </label>
                  <select name="condition"
                    className="w-full bg-white border border-[#2A4032]/10 rounded-xl px-4 py-3.5 font-manrope text-[#2A4032] focus:outline-none focus:border-[#C47C5D] transition-colors text-sm">
                    <option value="hypertension">Hypertension / High BP</option>
                    <option value="cancer-support">Cancer Supportive Care</option>
                    <option value="cardiac-rehab">Cardiac Rehabilitation</option>
                    <option value="neurological">Parkinson&apos;s / Neurological</option>
                    <option value="addiction">Addiction Recovery</option>
                    <option value="post-surgical">Post-Surgical Recovery</option>
                    <option value="diabetes">Type 2 Diabetes</option>
                    <option value="other">Other / General Wellness</option>
                  </select>
                </div>
              )}

              {/* Submit */}
              <button disabled={isSubmitting} type="submit"
                className="w-full bg-[#2A4032] text-[#FAF9F6] font-manrope font-bold uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-[#C47C5D] transition-colors mt-4 disabled:opacity-70 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#FAF9F6]/40 border-t-[#FAF9F6] rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Submit Request <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </button>

              <p className="text-center text-[10px] text-[#2A4032]/40 font-manrope">
                Your data is encrypted and never shared. No spam — ever.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}