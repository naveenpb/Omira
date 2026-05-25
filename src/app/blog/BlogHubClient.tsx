'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { Clock, ArrowRight, BookOpen, User } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';

type BlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  seoTitle: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  primaryKeyword?: string;
  ogImage?: { asset: { _ref: string }; alt?: string };
  author?: { name: string; role: string };
};

const categoryColours: Record<string, string> = {
  cardiovascular:      'text-red-600 bg-red-50',
  oncology:            'text-purple-700 bg-purple-50',
  rehabilitation:      'text-blue-700 bg-blue-50',
  neurology:           'text-indigo-700 bg-indigo-50',
  'womens-health':     'text-pink-700 bg-pink-50',
  geriatrics:          'text-amber-700 bg-amber-50',
  'hospital-integration': 'text-emerald-700 bg-emerald-50',
  'mental-health':     'text-violet-700 bg-violet-50',
};
const defaultColour = 'text-[#C47C5D] bg-[#C47C5D]/10';

export default function BlogHubClient({ posts }: { posts: BlogPost[] }) {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.blog-header-anim',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power4.out' }
      );
      gsap.fromTo(
        '.blog-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'power3.out', delay: 0.3 }
      );
    }, headerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen pt-28 pb-24 px-6 bg-[#FAF9F6]" ref={headerRef}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="max-w-3xl mb-20">
          <div className="blog-header-anim flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 text-[#C47C5D]" />
            <span className="text-[#C47C5D] font-manrope font-bold tracking-[0.2em] uppercase text-sm">
              The Omira Journal
            </span>
          </div>
          <h1 className="blog-header-anim font-cormorant text-5xl md:text-7xl font-medium text-[#2A4032] leading-tight mb-6">
            Clinical Insights &amp; Patient Education.
          </h1>
          <p className="blog-header-anim font-manrope text-[#2A4032]/70 text-lg md:text-xl leading-relaxed">
            Understand the science behind your symptoms. Every article is written or reviewed
            by a certified clinical yoga therapist or doctor.
          </p>
        </div>

        {/* Empty state */}
        {posts.length === 0 && (
          <div className="text-center py-24 border border-dashed border-[#2A4032]/20 rounded-3xl">
            <p className="font-cormorant text-3xl text-[#2A4032]/50 mb-3">Articles Coming Soon</p>
            <p className="font-manrope text-sm text-[#2A4032]/40">
              Publish articles in Sanity Studio → Clinical Journal Article
            </p>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const catClass = categoryColours[post.category] ?? defaultColour;
            return (
              <Link
                href={`/blog/${post.slug.current}`}
                key={post._id}
                className="blog-card group flex flex-col bg-white border border-[#2A4032]/10 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-[#2A4032]/5 transition-all duration-500 relative"
              >
                {/* OG Image */}
                {post.ogImage?.asset && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={urlFor(post.ogImage).width(600).height(400).url()}
                      alt={post.ogImage.alt || post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-col flex-1 p-7">
                  {/* Category + read time */}
                  <div className="flex justify-between items-center mb-5">
                    <span className={`font-manrope text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${catClass}`}>
                      {post.category.replace('-', ' ')}
                    </span>
                    <div className="flex items-center gap-1.5 font-manrope text-xs text-[#2A4032]/50 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime || '5 min read'}
                    </div>
                  </div>

                  <h2 className="font-cormorant text-2xl text-[#2A4032] font-medium mb-3 group-hover:text-[#C47C5D] transition-colors duration-300 leading-snug">
                    {post.title}
                  </h2>

                  <p className="font-manrope text-sm text-[#2A4032]/70 leading-relaxed mb-6 flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Author + CTA */}
                  <div className="mt-auto pt-5 border-t border-[#2A4032]/8 flex items-center justify-between">
                    {post.author && (
                      <div className="flex items-center gap-2 font-manrope text-xs text-[#2A4032]/50">
                        <User className="w-3.5 h-3.5" />
                        <span>{post.author.name}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-[#2A4032] font-manrope text-sm font-bold group-hover:text-[#C47C5D] group-hover:translate-x-1 transition-all duration-300 ml-auto">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
