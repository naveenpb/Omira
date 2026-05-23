import { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import { ArrowLeft, Clock, User, ArrowRight } from "lucide-react";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// 1. DYNAMIC SEO GENERATOR
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogPosts[resolvedParams.slug];
  
  if (!post) return { title: "Article Not Found | Omira Wellness" };

  return {
    title: post.seoTitle,
    description: post.seoDescription,
  };
}

// 2. ASYNC SERVER COMPONENT
export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = blogPosts[resolvedParams.slug];

  if (!post) return <div className="min-h-screen flex items-center justify-center font-cormorant text-2xl">Article Not Found</div>;

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 bg-[#FAF9F6]">
        {/* JSON-LD Structured Data for Google SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalWebPage",
              "headline": post.title,
              "description": post.seoDescription,
              "author": {
                "@type": "Organization",
                "name": post.author
              },
              "datePublished": post.date,
              "about": {
                "@type": "MedicalCondition",
                "name": post.category
              }
            })
          }}
        />

      <div className="max-w-3xl mx-auto">
        
        {/* Navigation */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-[#2A4032]/60 hover:text-[#C47C5D] transition-colors font-manrope text-sm font-semibold mb-12 uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </Link>

        {/* Article Header */}
        <header className="mb-16">
          <span className="inline-block font-manrope text-xs font-bold uppercase tracking-widest text-[#C47C5D] mb-6">
            {post.category}
          </span>
          <h1 className="font-cormorant text-4xl md:text-6xl text-[#2A4032] font-medium leading-tight mb-8">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 border-y border-[#2A4032]/10 py-6">
            <div className="flex items-center gap-2 font-manrope text-sm text-[#2A4032]/70 font-semibold">
              <User className="w-4 h-4" /> {post.author}
            </div>
            <div className="flex items-center gap-2 font-manrope text-sm text-[#2A4032]/70 font-semibold">
              <Clock className="w-4 h-4" /> {post.readTime}
            </div>
            <div className="font-manrope text-sm text-[#2A4032]/50">
              {post.date}
            </div>
          </div>
        </header>

        {/* The Content Renderer */}
        <article className="prose prose-lg prose-headings:font-cormorant prose-p:font-manrope prose-p:text-[#2A4032]/80 prose-headings:text-[#2A4032] max-w-none mb-20 space-y-6">
          {post.content.map((block, idx) => {
            switch (block.type) {
              case "p":
                return <p key={idx} className="leading-relaxed text-[17px]">{block.text}</p>;
              case "h2":
                return <h2 key={idx} className="text-3xl font-medium mt-12 mb-6">{block.text}</h2>;
              case "h3":
                return <h3 key={idx} className="text-2xl font-medium mt-8 mb-4">{block.text}</h3>;
              case "quote":
                return (
                  <blockquote key={idx} className="border-l-4 border-[#C47C5D] pl-6 py-2 my-10 bg-[#C47C5D]/5 rounded-r-2xl">
                    <p className="font-cormorant text-2xl italic text-[#2A4032] m-0">{block.text}</p>
                  </blockquote>
                );
              default:
                return null;
            }
          })}
        </article>

        {/* THE FUNNEL CONVERSION CTA (Crucial for Business) */}
        <div className="bg-[#2A4032] text-[#FAF9F6] p-10 md:p-12 rounded-[2rem] shadow-xl relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C47C5D] rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
          
          <h3 className="relative z-10 font-cormorant text-3xl mb-4">Ready to seek clinical support?</h3>
          <p className="relative z-10 font-manrope text-[#FAF9F6]/80 mb-8 max-w-lg mx-auto">
            Stop guessing and start tracking. Omira provides evidence-based protocols that work alongside your current medical treatments.
          </p>
          
          <Link 
            href={post.funnelTarget}
            className="relative z-10 inline-flex items-center gap-3 bg-[#FAF9F6] text-[#2A4032] font-manrope font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full hover:bg-[#C47C5D] hover:text-[#FAF9F6] transition-colors duration-300"
          >
            {post.funnelText} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </main>
  );
}