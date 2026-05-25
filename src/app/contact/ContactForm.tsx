'use client';
import { useState } from 'react';
import { AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (fd: FormData) => {
    const errs: Record<string, string> = {};
    const name  = (fd.get('name')  as string).trim();
    const phone = (fd.get('phone') as string).trim();
    const email = (fd.get('email') as string).trim();
    const msg   = (fd.get('message') as string).trim();

    if (name.length < 2) errs.name = 'Please enter your full name.';
    if (!/^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''))) errs.phone = 'Enter a valid 10-digit Indian mobile number.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email address.';
    if (msg.length < 10) errs.message = 'Please describe your enquiry in at least 10 characters.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get('website_url')) { setState('success'); return; } // honeypot
    if (!validate(fd)) return;

    setState('submitting');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:      fd.get('name'),
          phone:     fd.get('phone'),
          email:     fd.get('email'),
          condition: 'general-contact',
          crmTag:    'contact-page',
          message:   fd.get('message'),
          enquiryType: fd.get('enquiryType'),
          source:    '/contact',
          locale:    'en',
        }),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setState('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setState('error');
      }
    } catch {
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <div className="flex flex-col items-center text-center py-10">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-5">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="font-cormorant text-3xl text-[#2A4032] mb-3">Enquiry Received</h3>
        <p className="font-manrope text-sm text-[#2A4032]/70 max-w-xs leading-relaxed">
          Thank you. Our clinical coordination team will reply within <strong>24 hours</strong>.
        </p>
      </div>
    );
  }

  const field = (id: string, label: string, el: React.ReactNode) => (
    <div>
      <label htmlFor={id} className="block font-manrope text-xs font-bold uppercase text-[#2A4032]/60 mb-2 tracking-wider">
        {label}
      </label>
      {el}
      {errors[id] && (
        <p className="text-red-500 text-xs font-manrope mt-1.5 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />{errors[id]}
        </p>
      )}
    </div>
  );

  const inputClass = (id: string) =>
    `w-full bg-[#FAF9F6] border ${errors[id] ? 'border-red-400' : 'border-[#2A4032]/10'} rounded-xl px-4 py-3.5 font-manrope text-[#2A4032] text-sm focus:outline-none focus:border-[#C47C5D] transition-colors`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot */}
      <input type="text" name="website_url" tabIndex={-1} autoComplete="off" className="hidden absolute opacity-0" />

      {field('name', 'Full Name',
        <input id="name" name="name" type="text" placeholder="e.g., Ananya Sharma" required className={inputClass('name')} />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {field('phone', 'Mobile Number',
          <input id="phone" name="phone" type="tel" placeholder="10-digit mobile" required className={inputClass('phone')} />
        )}
        {field('email', 'Email Address',
          <input id="email" name="email" type="email" placeholder="you@example.com" required className={inputClass('email')} />
        )}
      </div>

      <div>
        <label className="block font-manrope text-xs font-bold uppercase text-[#2A4032]/60 mb-2 tracking-wider">
          Enquiry Type
        </label>
        <select name="enquiryType"
          className="w-full bg-[#FAF9F6] border border-[#2A4032]/10 rounded-xl px-4 py-3.5 font-manrope text-[#2A4032] text-sm focus:outline-none focus:border-[#C47C5D] transition-colors">
          <option value="patient">Patient — I want a clinical protocol</option>
          <option value="hospital">Hospital / Clinic — Partnership enquiry</option>
          <option value="doctor">Doctor — Referral pathway</option>
          <option value="corporate">Corporate Wellness</option>
          <option value="press">Press / Media</option>
          <option value="general">General question</option>
        </select>
      </div>

      {field('message', 'Your Message',
        <textarea id="message" name="message" rows={4} placeholder="Tell us about your condition, your hospital's needs, or your question..." required
          className={`w-full bg-[#FAF9F6] border ${errors.message ? 'border-red-400' : 'border-[#2A4032]/10'} rounded-xl px-4 py-3.5 font-manrope text-[#2A4032] text-sm focus:outline-none focus:border-[#C47C5D] transition-colors resize-none`} />
      )}

      {state === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 font-manrope text-xs px-4 py-3 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          Something went wrong. Please try again or call us directly.
        </div>
      )}

      <button type="submit" disabled={state === 'submitting'}
        className="w-full bg-[#2A4032] text-[#FAF9F6] font-manrope font-bold uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-[#C47C5D] transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
        {state === 'submitting' ? (
          <><span className="w-4 h-4 border-2 border-[#FAF9F6]/30 border-t-[#FAF9F6] rounded-full animate-spin" />Submitting...</>
        ) : (
          <>Send Enquiry <ArrowRight className="w-4 h-4" /></>
        )}
      </button>
    </form>
  );
}
