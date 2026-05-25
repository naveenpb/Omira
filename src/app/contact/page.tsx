import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck, AlertCircle, ExternalLink } from 'lucide-react';
import Breadcrumb from '@/components/seo/Breadcrumb';
import JsonLd from '@/components/seo/JsonLd';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us — Reach Our Clinical Coordination Team | Omira Wellness',
  description:
    'Get in touch with Omira Wellness. Book a clinical assessment, discuss a hospital partnership, or visit our Bengaluru practice. Call +91 73495 24578.',
  alternates: { canonical: 'https://omirawellness.com/contact' },
  openGraph: {
    title: 'Contact Omira Wellness | Clinical Yoga Therapy',
    description: 'Reach our clinical coordination team. Book assessments, hospital partnerships, or general enquiries.',
    type: 'website',
    url: 'https://omirawellness.com/contact',
    siteName: 'Omira Wellness',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Omira Wellness',
    description: 'Reach our clinical coordination team. Book assessments, hospital partnerships, or general enquiries.',
  },
};

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: 'Omira Wellness',
  url: 'https://omirawellness.com',
  telephone: ['+917349524578', '+918762901838'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+917349524578',
      contactType: 'Customer Service',
      availableLanguage: ['English', 'Kannada', 'Hindi'],
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactSchema} />
      <main className="min-h-screen pt-28 pb-24 px-6 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto">

          <Breadcrumb items={[
            { name: 'Home', href: '/' },
            { name: 'Contact Us', href: '/contact' },
          ]} />

          {/* Header */}
          <div className="max-w-3xl mb-16">
            <span className="inline-block text-[#C47C5D] font-manrope font-bold tracking-[0.2em] uppercase text-sm mb-4">
              Reach Us
            </span>
            <h1 className="font-cormorant text-5xl md:text-7xl font-medium text-[#2A4032] leading-[1.1] mb-6">
              Meet the Clinical<br />
              <span className="text-[#C47C5D]">Team Behind Omira.</span>
            </h1>
            <p className="font-manrope text-[#2A4032]/70 text-lg leading-relaxed">
              Whether you&apos;re a patient exploring a protocol, a hospital department head discussing
              integration, or a doctor seeking a referral pathway — we respond to every enquiry
              within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* ── Left: Contact info ─────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Phone */}
              <div className="bg-white border border-[#2A4032]/10 rounded-3xl p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[#C47C5D]/10 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#C47C5D]" />
                  </div>
                  <div>
                    <p className="font-manrope text-xs font-bold uppercase tracking-widest text-[#2A4032]/50">
                      Phone
                    </p>
                    <p className="font-manrope text-sm font-semibold text-[#2A4032]">
                      Call or WhatsApp
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <a
                    href="tel:+917349524578"
                    className="flex items-center justify-between group bg-[#FAF9F6] px-5 py-3.5 rounded-xl hover:bg-[#C47C5D]/8 transition-colors"
                  >
                    <span className="font-manrope font-semibold text-[#2A4032] text-sm">+91 73495 24578</span>
                    <ArrowRight className="w-4 h-4 text-[#C47C5D] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a
                    href="tel:+918762901838"
                    className="flex items-center justify-between group bg-[#FAF9F6] px-5 py-3.5 rounded-xl hover:bg-[#C47C5D]/8 transition-colors"
                  >
                    <span className="font-manrope font-semibold text-[#2A4032] text-sm">+91 87629 01838</span>
                    <ArrowRight className="w-4 h-4 text-[#C47C5D] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white border border-[#2A4032]/10 rounded-3xl p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[#2A4032]/8 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#2A4032]" />
                  </div>
                  <div>
                    <p className="font-manrope text-xs font-bold uppercase tracking-widest text-[#2A4032]/50">
                      Email
                    </p>
                    <p className="font-manrope text-sm font-semibold text-[#2A4032]">
                      Clinical enquiries
                    </p>
                  </div>
                </div>
                <div className="bg-[#FAF9F6] px-5 py-3.5 rounded-xl">
                  <span className="font-manrope text-sm text-[#2A4032]/60 italic">
                    Custom domain email coming soon
                  </span>
                </div>
                <p className="font-manrope text-xs text-[#2A4032]/40 mt-3">
                  Use the enquiry form on the right in the meantime — we respond within 24 hours.
                </p>
              </div>

              {/* Location */}
              <div className="bg-white border border-[#2A4032]/10 rounded-3xl p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-manrope text-xs font-bold uppercase tracking-widest text-[#2A4032]/50">
                      Location
                    </p>
                    <p className="font-manrope text-sm font-semibold text-[#2A4032]">
                      Practice Centres
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-[#FAF9F6] px-5 py-4 rounded-xl">
                    <p className="font-manrope font-semibold text-[#2A4032] text-sm">Bengaluru</p>
                    <p className="font-manrope text-xs text-[#2A4032]/60 mt-1">Karnataka, India</p>
                  </div>
                  <div className="bg-[#FAF9F6] px-5 py-4 rounded-xl">
                    <p className="font-manrope font-semibold text-[#2A4032] text-sm">Sagara</p>
                    <p className="font-manrope text-xs text-[#2A4032]/60 mt-1">Shivamogga Dist., Karnataka</p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white border border-[#2A4032]/10 rounded-3xl p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-manrope text-xs font-bold uppercase tracking-widest text-[#2A4032]/50">
                      Availability
                    </p>
                    <p className="font-manrope text-sm font-semibold text-[#2A4032]">
                      Coordination Hours
                    </p>
                  </div>
                </div>
                <div className="space-y-2 font-manrope text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#2A4032]/70">Monday – Saturday</span>
                    <span className="text-[#2A4032] font-semibold">9:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#2A4032]/70">Sunday</span>
                    <span className="text-[#2A4032] font-semibold">Closed</span>
                  </div>
                  <p className="text-xs text-[#2A4032]/40 mt-3 leading-relaxed">
                    Online form enquiries are monitored 7 days. Expect a reply within 24 hours.
                  </p>
                </div>
              </div>

              <div className="bg-[#2A4032]/5 border border-dashed border-[#2A4032]/20 rounded-3xl p-7">
                <p className="font-manrope text-xs font-bold uppercase tracking-widest text-[#2A4032]/40 mb-4">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 bg-white border border-[#2A4032]/10 px-4 py-2.5 rounded-xl opacity-50">
                    <ExternalLink className="w-4 h-4 text-[#2A4032]" />
                    <span className="font-manrope text-xs text-[#2A4032]">Instagram (soon)</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white border border-[#2A4032]/10 px-4 py-2.5 rounded-xl opacity-50">
                    <ExternalLink className="w-4 h-4 text-[#2A4032]" />
                    <span className="font-manrope text-xs text-[#2A4032]">LinkedIn (soon)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right: Enquiry form ────────────────────────────────── */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-[#2A4032]/10 rounded-3xl p-8 md:p-10 sticky top-28">
                <div className="flex items-center gap-2 text-[#C47C5D] font-manrope font-bold uppercase tracking-widest text-xs mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  Secure Enquiry Form
                </div>
                <h2 className="font-cormorant text-3xl text-[#2A4032] mb-2">
                  Send Us an Enquiry
                </h2>
                <p className="font-manrope text-sm text-[#2A4032]/60 mb-8 leading-relaxed">
                  Tell us about your condition, your hospital&apos;s needs, or any question you have.
                  One of our clinical coordinators will personally respond.
                </p>

                {/* Client-side form component */}
                <ContactForm />

                <div className="mt-6 flex items-start gap-3 bg-[#FAF9F6] rounded-xl p-4">
                  <AlertCircle className="w-4 h-4 text-[#2A4032]/40 flex-shrink-0 mt-0.5" />
                  <p className="font-manrope text-xs text-[#2A4032]/50 leading-relaxed">
                    <strong className="text-[#2A4032]/70">Medical Disclaimer:</strong> This form
                    is for administrative enquiries only. For medical emergencies, call 108 or
                    visit your nearest hospital immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="mt-16 bg-[#2A4032]/5 border border-dashed border-[#2A4032]/20 rounded-3xl h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-[#2A4032]/30 mx-auto mb-3" />
              <p className="font-manrope text-sm text-[#2A4032]/40 font-semibold">
                Google Maps Embed
              </p>
              <p className="font-manrope text-xs text-[#2A4032]/30 mt-1">
                Add &lt;iframe&gt; src from Google Maps after confirming exact address
              </p>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
