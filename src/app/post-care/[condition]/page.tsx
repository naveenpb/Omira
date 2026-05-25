import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft, AlertCircle, Pill, HeartHandshake, ShieldAlert,
  CheckCircle2, BookOpen, ArrowRight, FlaskConical,
} from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { conditionBySlugQuery, slugsByPatientTypeQuery } from '@/lib/sanity-queries';
import JsonLd, { buildMedicalWebPageSchema, buildFaqSchema } from '@/components/seo/JsonLd';
import Breadcrumb from '@/components/seo/Breadcrumb';
import AuthorBio from '@/components/seo/AuthorBio';

export const revalidate = 3600;

type PageProps = { params: Promise<{ condition: string }> };

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(slugsByPatientTypeQuery, {
    patientType: 'post-care',
  });
  return slugs.map(({ slug }) => ({ condition: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { condition } = await params;
  const data = await client.fetch(conditionBySlugQuery('en'), { slug: condition });
  if (!data) return { title: 'Protocol Not Found | Omira Wellness' };

  return {
    title: data.seoTitle,
    description: data.seoDescription,
    alternates: { canonical: `https://omirawellness.com/post-care/${condition}` },
    openGraph: {
      title: data.seoTitle,
      description: data.seoDescription,
      type: 'website',
      url: `https://omirawellness.com/post-care/${condition}`,
      siteName: 'Omira Wellness',
    },
    twitter: { card: 'summary_large_image', title: data.seoTitle, description: data.seoDescription },
  };
}

export default async function PostCareConditionPage({ params }: PageProps) {
  const { condition } = await params;
  const data = await client.fetch(conditionBySlugQuery('en'), { slug: condition });

  // Guard — only post-care type conditions live at this URL
  if (!data || data.patientType !== 'post-care') notFound();

  const jsonLdSchemas = [
    buildMedicalWebPageSchema({
      name: data.seoTitle,
      description: data.seoDescription,
      slug: condition,
      condition: data.diseaseName,
      lastReviewed: data.lastReviewedAt,
      reviewer: data.certifiedBy ? { name: data.certifiedBy.name, role: data.certifiedBy.role } : undefined,
    }),
    ...(data.faqSchema?.length > 0 ? [buildFaqSchema(data.faqSchema)] : []),
  ];

  return (
    <>
      {jsonLdSchemas.map((s, i) => <JsonLd key={i} data={s} />)}
      <main className="min-h-screen pt-28 pb-24 px-6 bg-[#FAF9F6]">
        <div className="max-w-5xl mx-auto">

          <Breadcrumb items={[
            { name: 'Home', href: '/' },
            { name: 'Post-Care Recovery', href: '/post-care' },
            { name: data.diseaseName, href: `/post-care/${condition}` },
          ]} />

          {/* Header */}
          <div className="mb-12">
            <Link href="/post-care" className="inline-flex items-center gap-2 text-[#2A4032]/50 hover:text-[#C47C5D] transition-colors font-manrope text-xs font-bold mb-6 uppercase tracking-widest">
              <ArrowLeft className="w-4 h-4" /> Back to Post-Care Recovery
            </Link>

            <span className="inline-block bg-[#2A4032]/8 text-[#2A4032] font-manrope text-xs font-bold uppercase px-4 py-1.5 rounded-full tracking-wider mb-5">
              Post-Care &amp; Recovery Protocol
            </span>

            <h1 className="font-cormorant text-5xl md:text-7xl font-medium text-[#2A4032] leading-tight mb-6">
              {data.diseaseName}
            </h1>

            {data.certifiedBy && (
              <AuthorBio author={data.certifiedBy} reviewedBy={data.reviewedBy} lastReviewedAt={data.lastReviewedAt} variant="compact" />
            )}

            {data.clinicalOutcomeClaim && (
              <div className="inline-flex items-center gap-3 bg-emerald-50 border border-emerald-200 px-5 py-3 rounded-2xl mb-8">
                <FlaskConical className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <span className="font-cormorant text-xl text-emerald-800 font-medium">{data.clinicalOutcomeClaim}</span>
                  {data.evidenceReference && (
                    <span className="block font-manrope text-xs text-emerald-600/70 mt-0.5">Source: {data.evidenceReference}</span>
                  )}
                </div>
              </div>
            )}

            <div className="bg-[#C47C5D]/10 border-l-4 border-[#C47C5D] p-6 rounded-r-2xl">
              <h2 className="font-manrope text-[#C47C5D] text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> The Patient Reality
              </h2>
              <p className="font-manrope text-[#2A4032]/90 text-lg md:text-xl italic leading-relaxed">
                &ldquo;{data.patientPainPoint}&rdquo;
              </p>
            </div>
          </div>

          {/* Pathology + Meds */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#2A4032]/10">
              <h2 className="font-cormorant text-3xl text-[#2A4032] mb-4">Why Recovery Stalls</h2>
              <p className="font-manrope text-[#2A4032]/80 leading-relaxed text-sm">{data.pathology}</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <Pill className="w-6 h-6 text-slate-500" />
                <h2 className="font-cormorant text-3xl text-slate-800">Standard Post-Op Care</h2>
              </div>
              {data.allopathicMedicines && (
                <p className="font-manrope text-sm text-slate-600 mb-4">
                  <strong>Common Prescriptions:</strong> {data.allopathicMedicines}
                </p>
              )}
              {data.allopathicSideEffects?.length > 0 && (
                <ul className="space-y-3">
                  {data.allopathicSideEffects.map((effect: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 font-manrope text-sm text-slate-700">
                      <span className="text-slate-400 mt-0.5 font-bold">✕</span>{effect}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Hero */}
          <div className="bg-[#2A4032] text-[#FAF9F6] p-10 md:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden mb-12">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C47C5D] rounded-full blur-[150px] opacity-20 -mr-20 -mt-20 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <HeartHandshake className="w-8 h-8 text-[#C47C5D]" />
                <span className="font-manrope text-[#C47C5D] text-xs font-bold uppercase tracking-widest">The Omira Post-Care Protocol</span>
              </div>
              <h2 className="font-cormorant text-4xl md:text-5xl mb-8 leading-tight">{data.targetedRelief}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-[#FAF9F6]/10">
                {data.practices?.length > 0 && (
                  <div>
                    <h3 className="font-manrope text-xs font-bold uppercase tracking-widest text-[#FAF9F6]/50 mb-4">Practices in This Protocol</h3>
                    <ul className="space-y-3">
                      {data.practices.map((p: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 font-manrope text-sm text-[#FAF9F6]/90">
                          <CheckCircle2 className="w-4 h-4 text-[#C47C5D] flex-shrink-0 mt-0.5" />{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="bg-[#FAF9F6]/5 p-6 rounded-2xl border border-[#FAF9F6]/10">
                  <h3 className="font-manrope text-xs font-bold uppercase tracking-widest text-[#FAF9F6]/50 mb-2">Module Details</h3>
                  <p className="font-cormorant text-2xl text-[#FAF9F6] mb-1">{data.packageName}</p>
                  {data.duration && <p className="font-manrope text-sm text-[#C47C5D] font-semibold mb-6">{data.duration}</p>}
                  <button
                    id={`cta-postcare-${data.crmTag}`}
                    data-condition={data.diseaseName}
                    data-crm-tag={data.crmTag}
                    className="w-full bg-[#FAF9F6] text-[#2A4032] font-manrope font-bold uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-[#C47C5D] hover:text-[#FAF9F6] transition-colors duration-300"
                  >
                    {data.ctaHeading ?? 'Request Post-Care Assessment'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Safety */}
          <div className="bg-red-50/50 p-8 rounded-3xl border border-red-100 flex flex-col md:flex-row gap-6 items-start mb-12">
            <ShieldAlert className="w-8 h-8 text-red-600 flex-shrink-0" />
            <div>
              <h2 className="font-manrope font-bold text-red-900 tracking-wide mb-2 uppercase text-sm">Safety &amp; Post-Op Contraindications</h2>
              <p className="font-manrope text-sm text-red-800/80 mb-4">Written surgical clearance is required before beginning any post-operative yoga therapy programme.</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                {data.contraindications?.map((w: string, i: number) => (
                  <li key={i} className="font-manrope text-sm text-red-900/90 flex items-start gap-2">
                    <span className="text-red-600 font-bold flex-shrink-0">•</span>{w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* FAQs */}
          {data.faqSchema?.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-5 h-5 text-[#C47C5D]" />
                <h2 className="font-cormorant text-3xl text-[#2A4032]">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-4">
                {data.faqSchema.map((faq: { question: string; answer: string }, idx: number) => (
                  <details key={idx} className="group bg-white border border-[#2A4032]/10 rounded-2xl overflow-hidden">
                    <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer font-manrope font-semibold text-[#2A4032] text-sm list-none hover:bg-[#FAF9F6] transition-colors">
                      {faq.question}
                      <ArrowRight className="w-4 h-4 text-[#C47C5D] flex-shrink-0 group-open:rotate-90 transition-transform duration-300" />
                    </summary>
                    <div className="px-6 pb-6 font-manrope text-sm text-[#2A4032]/75 leading-relaxed border-t border-[#2A4032]/8 pt-4">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}

          {data.certifiedBy && (
            <AuthorBio author={data.certifiedBy} reviewedBy={data.reviewedBy} lastReviewedAt={data.lastReviewedAt} variant="full" />
          )}

          <div className="mt-10 p-5 bg-[#2A4032]/3 border border-[#2A4032]/10 rounded-2xl">
            <p className="font-manrope text-xs text-[#2A4032]/50 leading-relaxed text-center">
              <strong className="text-[#2A4032]/70">Medical Disclaimer:</strong> Post-care yoga protocols are adjunct therapies requiring surgeon and specialist approval. They do not replace medical follow-up, physiotherapy, or prescribed rehabilitation programmes.
            </p>
          </div>

        </div>
      </main>
    </>
  );
}
