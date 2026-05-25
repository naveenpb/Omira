import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, FlaskConical, Filter } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import {
  categoryBySlugQuery,
  allCategorySlugsQuery,
  conditionsByCategoryQuery,
} from '@/lib/sanity-queries';
import Breadcrumb from '@/components/seo/Breadcrumb';
import JsonLd from '@/components/seo/JsonLd';

export const revalidate = 3600;

type PageProps = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(allCategorySlugsQuery);
  return slugs.map(({ slug }) => ({ category: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = await client.fetch(categoryBySlugQuery, { category });
  if (!cat) return { title: 'Category Not Found | Omira Wellness' };

  const title = cat.seoTitle || `${cat.name} Yoga Therapy Protocols | Omira Wellness`;
  const description =
    cat.seoDescription ||
    `Browse all Omira Wellness clinical yoga therapy protocols for ${cat.name}. Evidence-based, therapist-supervised programmes.`;

  return {
    title,
    description,
    alternates: { canonical: `https://omirawellness.com/treatments/category/${category}` },
    openGraph: { title, description, type: 'website', url: `https://omirawellness.com/treatments/category/${category}`, siteName: 'Omira Wellness' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function CategoryHubPage({ params }: PageProps) {
  const { category } = await params;

  const [cat, conditions] = await Promise.all([
    client.fetch(categoryBySlugQuery, { category }),
    client.fetch(conditionsByCategoryQuery, { category }),
  ]);

  if (!cat) notFound();

  const patientTypeLabels: Record<string, string> = {
    direct: 'Disease Management',
    complementary: 'Complementary Therapy',
    'post-care': 'Post-Care Recovery',
    rehab: 'Rehabilitation',
  };

  const categorySchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: `${cat.name} Clinical Yoga Protocols`,
    description: cat.seoDescription || `Omira Wellness clinical yoga therapy protocols for ${cat.name}`,
    url: `https://omirawellness.com/treatments/category/${category}`,
    about: { '@type': 'MedicalCondition', name: cat.name },
    publisher: { '@type': 'Organization', name: 'Omira Wellness', url: 'https://omirawellness.com' },
  };

  return (
    <>
      <JsonLd data={categorySchema} />
      <main className="min-h-screen pt-28 pb-24 px-6 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto">

          <Breadcrumb items={[
            { name: 'Home', href: '/' },
            { name: 'Patient Portal', href: '/treatments' },
            { name: cat.name, href: `/treatments/category/${category}` },
          ]} />

          <Link href="/treatments" className="inline-flex items-center gap-2 text-[#2A4032]/50 hover:text-[#C47C5D] transition-colors font-manrope text-xs font-bold mb-8 uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> All Clinical Categories
          </Link>

          {/* Category header */}
          <div className="max-w-3xl mb-16">
            <span className="inline-block text-[#C47C5D] font-manrope font-bold tracking-[0.2em] uppercase text-sm mb-4">
              Clinical Category
            </span>
            <h1 className="font-cormorant text-5xl md:text-7xl font-medium text-[#2A4032] leading-[1.1] mb-6">
              {cat.name}
            </h1>
            {cat.description && (
              <p className="font-manrope text-[#2A4032]/70 text-lg leading-relaxed">
                {cat.description}
              </p>
            )}

            {/* Protocol count badge */}
            <div className="inline-flex items-center gap-2 mt-6 bg-[#2A4032]/8 rounded-full px-4 py-2">
              <Filter className="w-4 h-4 text-[#2A4032]/60" />
              <span className="font-manrope text-sm font-semibold text-[#2A4032]">
                {conditions.length} {conditions.length === 1 ? 'Protocol' : 'Protocols'} available
              </span>
            </div>
          </div>

          {/* Conditions grid */}
          {conditions.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-[#2A4032]/20 rounded-3xl">
              <p className="font-cormorant text-3xl text-[#2A4032]/50 mb-3">
                {cat.name} Protocols Coming Soon
              </p>
              <p className="font-manrope text-sm text-[#2A4032]/40">
                Clinical protocols for this category will appear here once published.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {conditions.map((condition: {
                _id: string;
                diseaseName: string;
                slug: { current: string };
                patientType: string;
                clinicalOutcomeClaim?: string;
                icon?: string;
              }) => {
                // Route to the correct silo based on patientType
                const basePath =
                  condition.patientType === 'rehab' ? '/rehabilitation' :
                  condition.patientType === 'post-care' ? '/post-care' : '/treatments';

                return (
                  <Link
                    key={condition._id}
                    href={`${basePath}/${condition.slug.current}`}
                    className="group bg-white/60 backdrop-blur-md border border-[#2A4032]/10 p-8 rounded-3xl hover:bg-white hover:shadow-2xl hover:shadow-[#2A4032]/5 transition-all duration-500 flex flex-col"
                  >
                    {/* Type badge */}
                    <span className="inline-block font-manrope text-xs font-bold uppercase tracking-wider text-[#2A4032]/50 bg-[#2A4032]/5 px-3 py-1 rounded-full mb-8 self-start">
                      {patientTypeLabels[condition.patientType] ?? 'Clinical Protocol'}
                    </span>

                    <h2 className="font-cormorant text-3xl font-medium text-[#2A4032] group-hover:text-[#C47C5D] transition-colors duration-300 mb-4">
                      {condition.diseaseName}
                    </h2>

                    {condition.clinicalOutcomeClaim && (
                      <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#2A4032]/5 mt-auto mb-4">
                        <span className="block font-manrope text-[10px] uppercase text-[#2A4032]/50 mb-1 font-bold tracking-wider flex items-center gap-1">
                          <FlaskConical className="w-3 h-3" /> Target Outcome
                        </span>
                        <span className="font-manrope text-sm font-semibold text-[#2A4032]">
                          {condition.clinicalOutcomeClaim}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-[#C47C5D] font-manrope text-sm font-bold opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                      View Protocol <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Other categories strip */}
          <div className="mt-20 pt-10 border-t border-[#2A4032]/10">
            <p className="font-manrope text-xs font-bold uppercase tracking-widest text-[#2A4032]/40 mb-4">
              Explore Other Categories
            </p>
            <Link href="/treatments" className="inline-flex items-center gap-2 font-manrope text-sm font-semibold text-[#C47C5D] hover:text-[#2A4032] transition-colors">
              View All Clinical Modules <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}
