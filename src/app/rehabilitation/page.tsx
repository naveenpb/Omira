import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { conditionsByPatientTypeQuery } from '@/lib/sanity-queries';
import Breadcrumb from '@/components/seo/Breadcrumb';
import JsonLd from '@/components/seo/JsonLd';
import ConditionHubClient from '@/components/ui/ConditionHubClient';
import CTAButton from '@/components/ui/CTAButton';
import { ShieldCheck, FlaskConical, Users } from 'lucide-react';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Addiction & Rehabilitation Yoga Therapy | Omira Wellness',
  description:
    'Clinical yoga protocols for addiction recovery, alcohol rehabilitation, smoking cessation, and post-surgical recovery. Evidence-based, therapist-supervised programmes that work alongside medical treatment.',
  alternates: { canonical: 'https://omirawellness.com/rehabilitation' },
  openGraph: {
    title: 'Addiction & Rehabilitation Yoga Therapy | Omira Wellness',
    description:
      'Clinical yoga protocols for addiction recovery, alcohol rehabilitation, smoking cessation, and post-surgical recovery.',
    type: 'website',
    url: 'https://omirawellness.com/rehabilitation',
    siteName: 'Omira Wellness',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Addiction & Rehabilitation Yoga Therapy | Omira Wellness',
    description: 'Clinical yoga protocols for addiction recovery, alcohol rehabilitation, and post-surgical recovery.',
  },
};

// JSON-LD for the hub page itself
const rehabHubSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Addiction & Rehabilitation Yoga Therapy',
  description:
    'Clinical yoga therapy protocols for addiction recovery, rehabilitation, and post-surgical recovery at Omira Wellness.',
  url: 'https://omirawellness.com/rehabilitation',
  about: { '@type': 'MedicalTherapy', name: 'Yoga Therapy for Rehabilitation' },
  publisher: {
    '@type': 'Organization',
    name: 'Omira Wellness',
    url: 'https://omirawellness.com',
  },
};

export default async function RehabilitationHubPage() {
  const conditions = await client.fetch(conditionsByPatientTypeQuery, {
    patientType: 'rehab',
  });

  return (
    <>
      <JsonLd data={rehabHubSchema} />
      <main className="min-h-screen pt-28 pb-24 px-6 relative overflow-hidden bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto">

          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'Rehabilitation', href: '/rehabilitation' },
            ]}
          />

          {/* Header */}
          <div className="max-w-4xl mb-16">
            <span className="inline-block text-[#C47C5D] font-manrope font-bold tracking-[0.2em] uppercase text-sm mb-4">
              Rehabilitation &amp; Recovery Wing
            </span>
            <h1 className="font-cormorant text-5xl md:text-7xl font-medium text-[#2A4032] leading-[1.1] mb-6">
              Beyond Willpower.<br />
              <span className="text-[#C47C5D]">The Physiology of Recovery.</span>
            </h1>
            <p className="font-manrope text-[#2A4032]/70 text-lg md:text-xl leading-relaxed mb-10">
              Addiction and recovery are neurological — not moral — challenges. Our clinical
              protocols use Yoga Nidra, pranayama, and somatic techniques to directly regulate
              the nervous system, restore neurotransmitter balance, and break the physiological
              craving cycle. Each protocol works <em>alongside</em> your existing medical treatment.
            </p>

            {/* Trust stats strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />, stat: 'Medical Detox First', label: 'All protocols require completed medical detox before starting' },
                { icon: <FlaskConical className="w-5 h-5 text-[#C47C5D]" />, stat: 'GABA Stimulation', label: 'Yoga Nidra directly raises GABA — the brain\'s natural calming chemical' },
                { icon: <Users className="w-5 h-5 text-[#2A4032]" />, stat: 'Supervised Care', label: 'All sessions with C-IAYT certified yoga therapists' },
              ].map(({ icon, stat, label }) => (
                <div
                  key={stat}
                  className="bg-white border border-[#2A4032]/10 rounded-2xl p-5 flex items-start gap-4"
                >
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
          <ConditionHubClient basePath="/rehabilitation" conditions={conditions} />

          {/* Empty state for when Sanity has no rehab conditions yet */}
          {conditions.length === 0 && (
            <div className="text-center py-24 border border-dashed border-[#2A4032]/20 rounded-3xl">
              <p className="font-cormorant text-3xl text-[#2A4032]/50 mb-3">
                Protocols Loading
              </p>
              <p className="font-manrope text-sm text-[#2A4032]/40">
                Rehabilitation protocols will appear here once published in Sanity Studio.
              </p>
              <p className="font-manrope text-xs text-[#2A4032]/30 mt-2">
                Studio → B2C: Disease Condition Protocol → patientType: Rehabilitation
              </p>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-20 bg-[#2A4032] text-[#FAF9F6] rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#C47C5D] rounded-full blur-[120px] opacity-15 pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <p className="font-manrope text-[#C47C5D] text-xs font-bold uppercase tracking-widest mb-4">
                Working Alongside Your Medical Team
              </p>
              <h2 className="font-cormorant text-4xl md:text-5xl mb-4 leading-tight">
                Talk to a Clinical Yoga Therapist before starting.
              </h2>
              <p className="font-manrope text-[#FAF9F6]/70 text-sm leading-relaxed mb-8">
                Every patient is assessed individually. We coordinate with your doctor, addiction
                specialist, or psychiatrist before designing your programme.
              </p>
              <CTAButton variant="light" crmTag="rehabilitation-enquiry" id="cta-rehabilitation-hub">
                Request a Free Assessment
              </CTAButton>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
