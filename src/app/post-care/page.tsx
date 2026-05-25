import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { conditionsByPatientTypeQuery } from '@/lib/sanity-queries';
import Breadcrumb from '@/components/seo/Breadcrumb';
import JsonLd from '@/components/seo/JsonLd';
import ConditionHubClient from '@/components/ui/ConditionHubClient';
import CTAButton from '@/components/ui/CTAButton';
import { Stethoscope, FlaskConical, Clock } from 'lucide-react';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Post-Surgery & Post-Care Yoga Recovery | Omira Wellness',
  description:
    'Clinical yoga therapy for post-surgical recovery, post-chemotherapy care, and hospital discharge rehabilitation. Evidence-based protocols that reduce readmission risk and accelerate healing.',
  alternates: { canonical: 'https://omirawellness.com/post-care' },
  openGraph: {
    title: 'Post-Surgery & Post-Care Yoga Recovery | Omira Wellness',
    description:
      'Clinical yoga therapy for post-surgical recovery, post-chemotherapy care, and hospital discharge rehabilitation.',
    type: 'website',
    url: 'https://omirawellness.com/post-care',
    siteName: 'Omira Wellness',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Post-Surgery & Post-Care Yoga Recovery | Omira Wellness',
    description: 'Clinical yoga therapy for post-surgical recovery and hospital discharge rehabilitation.',
  },
};

const postCareHubSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Post-Surgery & Post-Care Yoga Recovery',
  description:
    'Clinical yoga therapy for post-surgical recovery, post-chemotherapy care, and hospital discharge rehabilitation.',
  url: 'https://omirawellness.com/post-care',
  about: { '@type': 'MedicalTherapy', name: 'Post-Operative Yoga Therapy' },
  publisher: { '@type': 'Organization', name: 'Omira Wellness', url: 'https://omirawellness.com' },
};

export default async function PostCareHubPage() {
  const conditions = await client.fetch(conditionsByPatientTypeQuery, {
    patientType: 'post-care',
  });

  return (
    <>
      <JsonLd data={postCareHubSchema} />
      <main className="min-h-screen pt-28 pb-24 px-6 relative overflow-hidden bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto">

          <Breadcrumb items={[
            { name: 'Home', href: '/' },
            { name: 'Post-Care Recovery', href: '/post-care' },
          ]} />

          {/* Header */}
          <div className="max-w-4xl mb-16">
            <span className="inline-block text-[#C47C5D] font-manrope font-bold tracking-[0.2em] uppercase text-sm mb-4">
              Post-Care &amp; Recovery Wing
            </span>
            <h1 className="font-cormorant text-5xl md:text-7xl font-medium text-[#2A4032] leading-[1.1] mb-6">
              The Surgery Succeeded.<br />
              <span className="text-[#C47C5D]">Now Heal What It Couldn&apos;t Fix.</span>
            </h1>
            <p className="font-manrope text-[#2A4032]/70 text-lg md:text-xl leading-relaxed mb-10">
              Surgery and chemotherapy are just the beginning. Fascial adhesions, lymphatic
              stagnation, psychological trauma, and deconditioning persist long after the
              procedure. Our post-care protocols use breath-led micro-movements and restorative
              yoga to complete the healing process — gently and safely, alongside your surgeon&apos;s
              guidance.
            </p>

            {/* Trust stats strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: <Stethoscope className="w-5 h-5 text-[#2A4032]" />, stat: 'Surgeon Clearance Required', label: 'Every post-operative protocol begins with written clearance from the lead surgeon' },
                { icon: <FlaskConical className="w-5 h-5 text-[#C47C5D]" />, stat: 'Lymphatic Flush', label: 'Breath-led techniques clinically shown to reduce post-operative swelling by up to 30%' },
                { icon: <Clock className="w-5 h-5 text-emerald-600" />, stat: 'Zero-Impact Start', label: 'All protocols begin at absolute zero physical stress — intensified only as healing progresses' },
              ].map(({ icon, stat, label }) => (
                <div key={stat} className="bg-white border border-[#2A4032]/10 rounded-2xl p-5 flex items-start gap-4">
                  <div className="flex-shrink-0 mt-0.5">{icon}</div>
                  <div>
                    <p className="font-manrope font-bold text-[#2A4032] text-sm">{stat}</p>
                    <p className="font-manrope text-xs text-[#2A4032]/60 mt-1 leading-relaxed">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conditions grid */}
          <ConditionHubClient basePath="/post-care" conditions={conditions} />

          {conditions.length === 0 && (
            <div className="text-center py-24 border border-dashed border-[#2A4032]/20 rounded-3xl">
              <p className="font-cormorant text-3xl text-[#2A4032]/50 mb-3">Protocols Loading</p>
              <p className="font-manrope text-sm text-[#2A4032]/40">
                Post-care protocols appear here once published in Sanity Studio.
              </p>
              <p className="font-manrope text-xs text-[#2A4032]/30 mt-2">
                Studio → B2C: Disease Condition Protocol → patientType: Post-Care &amp; Recovery
              </p>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-20 bg-[#2A4032] text-[#FAF9F6] rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#C47C5D] rounded-full blur-[120px] opacity-15 pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <p className="font-manrope text-[#C47C5D] text-xs font-bold uppercase tracking-widest mb-4">
                Coordinated With Your Medical Team
              </p>
              <h2 className="font-cormorant text-4xl md:text-5xl mb-4 leading-tight">
                Your recovery doesn&apos;t end at discharge.
              </h2>
              <p className="font-manrope text-[#FAF9F6]/70 text-sm leading-relaxed mb-8">
                We work directly with your hospital&apos;s care team to design a post-discharge
                programme that bridges the gap between hospital and full recovery.
              </p>
              <CTAButton variant="light" crmTag="post-care-enquiry" id="cta-post-care-hub">
                Request a Recovery Assessment
              </CTAButton>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
