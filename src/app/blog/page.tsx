"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { blogPosts } from "@/data/blog-posts";
import { Clock, ArrowRight, BookOpen } from "lucide-react";

export default function BlogHub() {
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-header-anim",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power4.out" }
      );

      gsap.fromTo(
        ".blog-card",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.3 }
      );
    });
    return () => ctx.revert();
  }, []);

  // Convert the dictionary object into an array for mapping
  const posts = Object.values(blogPosts);

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto">
        
        <div ref={headerRef} className="max-w-3xl mb-20">
          <div className="blog-header-anim flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 text-[#C47C5D]" />
            <h2 className="text-[#C47C5D] font-manrope font-bold tracking-[0.2em] uppercase text-sm">
              The Omira Journal
            </h2>
          </div>
          <h1 className="blog-header-anim font-cormorant text-5xl md:text-7xl font-medium text-[#2A4032] leading-tight mb-6">
            Clinical Insights & Patient Education.
          </h1>
          <p className="blog-header-anim font-manrope text-[#2A4032]/70 text-lg md:text-xl leading-relaxed">
            Understand the science behind your symptoms. Explore empirical research on how therapeutic yoga integrates with modern allopathic treatments.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              href={`/blog/${post.slug}`} 
              key={post.slug}
              className="blog-card group flex flex-col bg-white border border-[#2A4032]/10 rounded-3xl p-8 hover:shadow-2xl hover:shadow-[#2A4032]/5 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C47C5D] rounded-full blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              
              <div className="flex justify-between items-center mb-6">
                <span className="font-manrope text-[10px] font-bold uppercase tracking-widest text-[#C47C5D] bg-[#C47C5D]/10 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <div className="flex items-center gap-1.5 font-manrope text-xs text-[#2A4032]/50 font-semibold">
                  <Clock className="w-3.5 h-3.5" /> {post.readTime}
                </div>
              </div>

              <h3 className="font-cormorant text-2xl text-[#2A4032] font-medium mb-4 group-hover:text-[#C47C5D] transition-colors duration-300">
                {post.title}
              </h3>
              
              <p className="font-manrope text-sm text-[#2A4032]/70 leading-relaxed mb-8 flex-grow line-clamp-3">
                {post.excerpt}
              </p>

              <div className="mt-auto flex items-center gap-2 text-[#2A4032] font-manrope text-sm font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-300">
                <span>Read Article</span>
                <ArrowRight className="w-4 h-4 text-[#C47C5D]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}