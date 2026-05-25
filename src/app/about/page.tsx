import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Award, Clock, ArrowRight, ShieldCheck, FlaskConical } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { allAuthorsQuery } from '@/lib/sanity-queries';
import { urlFor } from '@/sanity/lib/image';
import Breadcrumb from '@/components/seo/Breadcrumb';
import JsonLd from '@/components/seo/JsonLd';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Our Clinical Team — Expert Yoga Therapists & Doctors | Omira Wellness',
  description:
    'Meet the C-IAYT certified yoga therapists, MBBS doctors, and clinical specialists behind every Omira Wellness protocol. Every expert is verified, credentialed, and published.',
  alternates: { canonical: 'https://omirawellness.com/about' },
  openGraph: {
    title: 'Our Clinical Team — Expert Yoga Therapists & Doctors | Omira Wellness',
    description:
      'Meet the C-IAYT certified yoga therapists, MBBS doctors, and clinical specialists behind every Omira Wellness protocol.',
    type: 'website',
    url: 'https://omirawellness.com/about',
    siteName: 'Omira Wellness',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Clinical Team | Omira Wellness',
    description: 'Meet the C-IAYT certified yoga therapists and doctors behind every Omira protocol.',
  },
};

type Author = {
  _id: string;
  name: string;
  slug: { current: string };
  role: string;
  photo?: { asset: { url?: string; _ref?: string }; alt?: string };
  bio?: string;
  certifications?: string[];
  yearsExperience?: number;
  specializations?: string[];
  linkedIn?: string;
  schemaOrgType?: string;
};

export default async function AboutPage() {
  const authors = await client.fetch<Author[]>(allAuthorsQuery);

  // Build MedicalOrganization + team JSON-LD
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'Omira Wellness',
    url: 'https://omirawellness.com',
    description:
      'Clinical yoga therapy company integrating evidence-based yoga with allopathic medicine for disease management, rehabilitation, and post-care recovery.',
    medicalSpecialty: [
      'Yoga Therapy',
      'Rehabilitation',
      'Oncology Support',
      'Cardiovascular Rehabilitation',
    ],
    employee: authors.map((a) => ({
      '@type': a.schemaOrgType || 'Person',
      name: a.name,
      jobTitle: a.role,
      url: `https://omirawellness.com/about#${a.slug.current}`,
      ...(a.linkedIn && { sameAs: a.linkedIn }),
    })),
  };

  return (
    <>
      <JsonLd data={aboutSchema} />
      <main className="min-h-screen pt-28 pb-24 px-6 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto">

          <Breadcrumb items={[
            { name: 'Home', href: '/' },
            { name: 'Our Team', href: '/about' },
          ]} />

          {/* Hero header */}
          <div className="max-w-4xl mb-20">
            <span className="inline-block text-[#C47C5D] font-manrope font-bold tracking-[0.2em] uppercase text-sm mb-4">
              Expertise &amp; Trust
            </span>
            <h1 className="font-cormorant text-5xl md:text-7xl font-medium text-[#2A4032] leading-[1.1] mb-6">
              The Clinicians Behind Every Protocol.
            </h1>
            <p className="font-manrope text-[#2A4032]/70 text-lg md:text-xl leading-relaxed">
              Every Omira Wellness protocol is designed by certified yoga therapists and reviewed
              by qualified doctors. We believe that health content must be authored by the
              people who are actually qualified to write it.
            </p>
          </div>

          {/* Trust pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
            {[
              {
                icon: <Award className="w-6 h-6 text-[#C47C5D]" />,
                title: 'C-IAYT Certified',
                body: 'All yoga therapists hold the highest international clinical certification from the International Association of Yoga Therapists.',
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
                title: 'Medically Reviewed',
                body: 'Every disease-specific protocol is reviewed by an MBBS or MD doctor before publication. Medical credentials are verified.',
              },
              {
                icon: <FlaskConical className="w-6 h-6 text-[#2A4032]" />,
                title: 'Evidence-Based Only',
                body: 'All clinical claims cite peer-reviewed research from JAMA, NEJM, PubMed, WHO, or equivalent medical journals.',
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="bg-white border border-[#2A4032]/10 rounded-2xl p-6">
                <div className="w-10 h-10 bg-[#FAF9F6] rounded-xl flex items-center justify-center mb-4">
                  {icon}
                </div>
                <h3 className="font-manrope font-bold text-[#2A4032] mb-2">{title}</h3>
                <p className="font-manrope text-sm text-[#2A4032]/65 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          {/* Team header */}
          <div className="mb-10 border-b border-[#2A4032]/10 pb-6">
            <h2 className="font-cormorant text-4xl text-[#2A4032]">Our Clinical Team</h2>
            <p className="font-manrope text-sm text-[#2A4032]/60 mt-2">
              {authors.length > 0
                ? `${authors.length} verified clinical expert${authors.length !== 1 ? 's' : ''}`
                : 'Team profiles will appear here once added in Sanity Studio.'}
            </p>
          </div>

          {/* Author profiles grid */}
          {authors.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-[#2A4032]/20 rounded-3xl">
              <p className="font-cormorant text-3xl text-[#2A4032]/50 mb-3">Team Profiles Coming Soon</p>
              <p className="font-manrope text-sm text-[#2A4032]/40">
                Add expert profiles in Sanity Studio → Expert Profile (Authors / Therapists)
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {authors.map((author) => (
                <article
                  key={author._id}
                  id={author.slug.current}
                  className="bg-white border border-[#2A4032]/10 rounded-3xl p-8 hover:shadow-lg hover:shadow-[#2A4032]/5 transition-shadow duration-300"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Photo */}
                    {author.photo?.asset && (
                      <div className="w-24 h-24 rounded-2xl overflow-hidden ring-2 ring-[#2A4032]/10 flex-shrink-0">
                        <Image
                          src={urlFor(author.photo).width(192).height(192).url()}
                          alt={author.photo.alt || author.name}
                          width={96}
                          height={96}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}

                    <div className="flex-1">
                      {/* Name + role */}
                      <h3 className="font-cormorant text-2xl text-[#2A4032] font-medium leading-tight">
                        {author.name}
                      </h3>
                      <p className="font-manrope text-sm text-[#C47C5D] font-semibold mt-0.5 mb-3">
                        {author.role}
                      </p>

                      {/* Quick stats */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {author.yearsExperience && (
                          <span className="inline-flex items-center gap-1.5 bg-[#2A4032]/5 text-[#2A4032] font-manrope text-xs font-bold px-3 py-1.5 rounded-full">
                            <Clock className="w-3 h-3" />
                            {author.yearsExperience} yrs
                          </span>
                        )}
                        {author.certifications?.slice(0, 2).map((cert, i) => (
                          <span key={i} className="inline-flex items-center gap-1.5 bg-[#C47C5D]/8 text-[#C47C5D] font-manrope text-xs font-bold px-3 py-1.5 rounded-full">
                            <Award className="w-3 h-3" />
                            {cert}
                          </span>
                        ))}
                      </div>

                      {/* Bio */}
                      {author.bio && (
                        <p className="font-manrope text-sm text-[#2A4032]/70 leading-relaxed mb-4 line-clamp-3">
                          {author.bio}
                        </p>
                      )}

                      {/* Specializations */}
                      {author.specializations && author.specializations.length > 0 && (
                        <div className="mb-4">
                          <span className="font-manrope text-[10px] font-bold uppercase tracking-widest text-[#2A4032]/40 block mb-2">
                            Specializes in
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {author.specializations.map((spec, i) => (
                              <span key={i} className="font-manrope text-xs text-[#2A4032]/70 bg-[#2A4032]/5 px-2.5 py-1 rounded-full">
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* LinkedIn */}
                      {author.linkedIn && (
                        <a
                          href={author.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-manrope text-xs font-semibold text-[#2A4032]/50 hover:text-[#2A4032] transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View LinkedIn Profile
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Mission statement */}
          <div className="mt-20 bg-[#2A4032] text-[#FAF9F6] rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#C47C5D] rounded-full blur-[120px] opacity-15 pointer-events-none" />
            <div className="relative z-10 max-w-3xl">
              <p className="font-manrope text-[#C47C5D] text-xs font-bold uppercase tracking-widest mb-6">
                Our Philosophy
              </p>
              <blockquote className="font-cormorant text-4xl md:text-5xl leading-tight mb-6">
                &ldquo;Yoga is not a replacement for medicine. It is the part of medicine that
                medicine forgot.&rdquo;
              </blockquote>
              <p className="font-manrope text-[#FAF9F6]/70 text-sm leading-relaxed mb-8">
                Every Omira protocol is built on three non-negotiables: clinical evidence,
                qualified therapist supervision, and the explicit understanding that yoga works
                <em> alongside </em> your doctor — never instead of them.
              </p>
              <Link
                href="/treatments"
                className="inline-flex items-center gap-2 bg-[#C47C5D] text-[#FAF9F6] font-manrope font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-xl hover:bg-[#FAF9F6] hover:text-[#2A4032] transition-colors duration-300"
              >
                Browse Clinical Protocols <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
