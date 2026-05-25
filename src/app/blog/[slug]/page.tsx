import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  ArrowLeft, Clock, ArrowRight, BookOpen, FlaskConical,
} from 'lucide-react';

import { client } from '@/sanity/lib/client';
import { blogBySlugQuery, allBlogSlugsQuery } from '@/lib/sanity-queries';
import { urlFor } from '@/sanity/lib/image';

import JsonLd, { buildArticleSchema, buildFaqSchema } from '@/components/seo/JsonLd';
import Breadcrumb from '@/components/seo/Breadcrumb';
import AuthorBio from '@/components/seo/AuthorBio';
import PortableTextRenderer from '@/components/ui/PortableTextRenderer';
import CTAButton from '@/components/ui/CTAButton';

export const revalidate = 3600;

type PageProps = { params: Promise<{ slug: string }> };

// ─── generateStaticParams ──────────────────────────────────────────────────
export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(allBlogSlugsQuery);
  return slugs.map(({ slug }) => ({ slug }));
}

// ─── generateMetadata ──────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(blogBySlugQuery, { slug });
  if (!post) return { title: 'Article Not Found | Omira Wellness' };

  const baseUrl = 'https://omirawellness.com';

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: [post.primaryKeyword].filter(Boolean),
    alternates: { canonical: `${baseUrl}/blog/${slug}` },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      type: 'article',
      url: `${baseUrl}/blog/${slug}`,
      siteName: 'Omira Wellness',
      publishedTime: post.publishedAt,
      modifiedTime: post.lastUpdatedAt || post.publishedAt,
      authors: post.author ? [post.author.name] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle,
      description: post.seoDescription,
    },
  };
}

// ─── Page Component ────────────────────────────────────────────────────────
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await client.fetch(blogBySlugQuery, { slug });

  if (!post) notFound();

  const baseUrl = 'https://omirawellness.com';
  const ogImageUrl = post.ogImage?.asset
    ? urlFor(post.ogImage).width(1200).height(630).url()
    : undefined;

  // Build JSON-LD schemas
  const jsonLdSchemas = [
    buildArticleSchema({
      title: post.seoTitle,
      description: post.seoDescription,
      slug,
      publishedAt: post.publishedAt,
      updatedAt: post.lastUpdatedAt,
      author: post.author
        ? { name: post.author.name, role: post.author.role }
        : { name: 'Omira Wellness', role: 'Clinical Team' },
      reviewer: post.reviewedBy
        ? { name: post.reviewedBy.name, role: post.reviewedBy.role }
        : undefined,
      imageUrl: ogImageUrl,
    }),
    ...(post.faqSchema?.length > 0 ? [buildFaqSchema(post.faqSchema)] : []),
  ];

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-IN', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : null;

  const categoryColours: Record<string, string> = {
    cardiovascular: 'text-red-600 bg-red-50',
    oncology:       'text-purple-700 bg-purple-50',
    rehabilitation: 'text-blue-700 bg-blue-50',
    neurology:      'text-indigo-700 bg-indigo-50',
  };

  return (
    <>
      {jsonLdSchemas.map((s, i) => <JsonLd key={i} data={s} />)}

      <main className="min-h-screen pt-28 pb-24 px-6 bg-[#FAF9F6]">
        <div className="max-w-3xl mx-auto">

          <Breadcrumb items={[
            { name: 'Home', href: '/' },
            { name: 'Journal', href: '/blog' },
            { name: post.title, href: `/blog/${slug}` },
          ]} />

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#2A4032]/50 hover:text-[#C47C5D] transition-colors font-manrope text-xs font-bold mb-8 uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </Link>

          {/* ── Article Header ─────────────────────────────────────── */}
          <header className="mb-12">
            {/* Category badge */}
            {post.category && (
              <span className={`inline-block font-manrope text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5 ${categoryColours[post.category] ?? 'text-[#C47C5D] bg-[#C47C5D]/10'}`}>
                {post.category.replace('-', ' ')}
              </span>
            )}

            {/* Title — H1 */}
            <h1 className="font-cormorant text-4xl md:text-5xl text-[#2A4032] font-medium leading-tight mb-6">
              {post.title}
            </h1>

            {/* OG Hero image */}
            {post.ogImage?.asset && (
              <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden mb-8">
                <Image
                  src={urlFor(post.ogImage).width(900).height(500).url()}
                  alt={post.ogImage.alt || post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Meta strip */}
            <div className="flex flex-wrap items-center gap-5 border-y border-[#2A4032]/10 py-4 mb-6">
              {post.author && (
                <div className="flex items-center gap-2 font-manrope text-sm text-[#2A4032]/70 font-semibold">
                  {post.author.photo?.asset && (
                    <div className="w-7 h-7 rounded-full overflow-hidden ring-1 ring-[#2A4032]/20 flex-shrink-0">
                      <Image
                        src={urlFor(post.author.photo).width(56).height(56).url()}
                        alt={post.author.name}
                        width={28}
                        height={28}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span>{post.author.name}</span>
                </div>
              )}
              {post.reviewedBy && (
                <span className="font-manrope text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-semibold">
                  Reviewed by {post.reviewedBy.name}
                </span>
              )}
              {post.readTime && (
                <div className="flex items-center gap-1.5 font-manrope text-sm text-[#2A4032]/60">
                  <Clock className="w-3.5 h-3.5" /> {post.readTime}
                </div>
              )}
              {publishedDate && (
                <span className="font-manrope text-sm text-[#2A4032]/40">
                  {publishedDate}
                </span>
              )}
            </div>

            {/* Excerpt / lead */}
            {post.excerpt && (
              <p className="font-cormorant text-xl text-[#2A4032]/80 leading-relaxed italic">
                {post.excerpt}
              </p>
            )}
          </header>

          {/* ── Article Body ─────────────────────────────────────────── */}
          <article>
            {post.body && <PortableTextRenderer value={post.body} />}
          </article>

          {/* ── FAQ Section ──────────────────────────────────────────── */}
          {post.faqSchema?.length > 0 && (
            <div className="mt-12 mb-10">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-5 h-5 text-[#C47C5D]" />
                <h2 className="font-cormorant text-3xl text-[#2A4032]">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="space-y-4">
                {post.faqSchema.map((faq: { question: string; answer: string }, idx: number) => (
                  <details key={idx} className="group bg-white border border-[#2A4032]/10 rounded-2xl overflow-hidden">
                    <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer font-manrope font-semibold text-[#2A4032] text-sm list-none hover:bg-[#FAF9F6] transition-colors">
                      {faq.question}
                      <ArrowRight className="w-4 h-4 text-[#C47C5D] flex-shrink-0 group-open:rotate-90 transition-transform duration-300" />
                    </summary>
                    <div className="px-5 pb-5 font-manrope text-sm text-[#2A4032]/75 leading-relaxed border-t border-[#2A4032]/8 pt-4">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* ── Funnel CTA Block ─────────────────────────────────────── */}
          {post.funnelTarget && (
            <div className="my-12 bg-[#2A4032] text-[#FAF9F6] p-10 md:p-12 rounded-[2rem] shadow-xl relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C47C5D] rounded-full blur-[100px] opacity-20 -mr-20 -mt-20 pointer-events-none" />
              <div className="relative z-10">
                {post.funnelTarget.clinicalOutcomeClaim && (
                  <div className="inline-flex items-center gap-2 bg-[#FAF9F6]/10 rounded-xl px-4 py-2 mb-6">
                    <FlaskConical className="w-4 h-4 text-[#C47C5D]" />
                    <span className="font-manrope text-sm text-[#FAF9F6]/80">
                      {post.funnelTarget.clinicalOutcomeClaim}
                    </span>
                  </div>
                )}
                <h2 className="font-cormorant text-3xl md:text-4xl mb-4 leading-tight">
                  {post.funnelTarget.ctaHeading || 'Ready to start your clinical protocol?'}
                </h2>
                <p className="font-manrope text-[#FAF9F6]/80 text-sm mb-8 max-w-lg mx-auto leading-relaxed">
                  Stop guessing. Our certified therapists will design a protocol for{' '}
                  <strong>{post.funnelTarget.diseaseName}</strong> that works alongside your
                  current medical treatment.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <CTAButton
                    conditionName={post.funnelTarget.diseaseName}
                    crmTag={post.funnelTarget.crmTag}
                    source={`/blog/${slug}`}
                    variant="ghost"
                  >
                    {post.funnelCtaText || `Explore the ${post.funnelTarget.packageName || post.funnelTarget.diseaseName} Protocol`}
                  </CTAButton>
                  <Link
                    href={`/treatments/${post.funnelTarget.slug.current}`}
                    className="inline-flex items-center justify-center gap-2 font-manrope font-bold uppercase tracking-widest text-xs py-4 px-8 rounded-xl border border-[#FAF9F6]/30 text-[#FAF9F6]/80 hover:border-[#FAF9F6] hover:text-[#FAF9F6] transition-colors"
                  >
                    View Full Protocol <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ── Related Articles ─────────────────────────────────────── */}
          {post.relatedArticles?.length > 0 && (
            <div className="mt-12">
              <h2 className="font-cormorant text-3xl text-[#2A4032] mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {post.relatedArticles.map((article: {
                  title: string;
                  slug: { current: string };
                  excerpt?: string;
                  readTime?: string;
                  ogImage?: { asset: { _ref: string } };
                }) => (
                  <Link
                    key={article.slug.current}
                    href={`/blog/${article.slug.current}`}
                    className="group bg-white border border-[#2A4032]/10 p-5 rounded-2xl hover:shadow-md hover:border-[#C47C5D]/30 transition-all duration-300"
                  >
                    <h3 className="font-cormorant text-xl text-[#2A4032] group-hover:text-[#C47C5D] transition-colors mb-2 leading-snug">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="font-manrope text-xs text-[#2A4032]/60 line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    )}
                    {article.readTime && (
                      <div className="flex items-center gap-1.5 font-manrope text-xs text-[#2A4032]/40 mt-3">
                        <Clock className="w-3 h-3" />{article.readTime}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ── Author Bio ───────────────────────────────────────────── */}
          {post.author && (
            <AuthorBio
              author={post.author}
              reviewedBy={post.reviewedBy}
              lastReviewedAt={post.lastUpdatedAt}
              variant="full"
            />
          )}

          {/* ── Medical Disclaimer ───────────────────────────────────── */}
          <div className="mt-10 p-5 bg-[#2A4032]/3 border border-[#2A4032]/10 rounded-2xl">
            <p className="font-manrope text-xs text-[#2A4032]/50 leading-relaxed text-center">
              <strong className="text-[#2A4032]/70">Medical Disclaimer:</strong> This article
              is for educational purposes only and does not constitute medical advice. Always
              consult your doctor or specialist before making changes to your healthcare plan.
            </p>
          </div>

        </div>
      </main>
    </>
  );
}