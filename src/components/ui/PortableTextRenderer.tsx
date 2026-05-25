import { PortableText as SanityPortableText, type PortableTextBlock } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { FlaskConical, ExternalLink } from 'lucide-react';

// ─── Custom components map ─────────────────────────────────────────────────

const components = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="font-manrope text-[#2A4032]/80 leading-relaxed text-[17px] mb-5">
        {children}
      </p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-cormorant text-3xl md:text-4xl text-[#2A4032] font-medium mt-12 mb-6 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-cormorant text-2xl text-[#2A4032] font-medium mt-8 mb-4">
        {children}
      </h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-[#C47C5D] pl-6 py-3 my-10 bg-[#C47C5D]/5 rounded-r-2xl">
        <p className="font-cormorant text-2xl italic text-[#2A4032] m-0 leading-snug">
          {children}
        </p>
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="space-y-3 my-6 pl-1">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="space-y-3 my-6 pl-1 list-decimal list-inside">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="font-manrope text-[#2A4032]/80 flex items-start gap-3 text-[15px]">
        <span className="text-[#C47C5D] font-bold mt-0.5 flex-shrink-0">•</span>
        <span>{children}</span>
      </li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="font-manrope text-[#2A4032]/80 text-[15px]">{children}</li>
    ),
  },

  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold text-[#2A4032]">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic text-[#2A4032]/90">{children}</em>
    ),
    internalLink: ({
      value,
      children,
    }: {
      value?: { href?: string };
      children?: React.ReactNode;
    }) => (
      <a
        href={value?.href}
        className="text-[#C47C5D] font-semibold underline underline-offset-2 hover:text-[#2A4032] transition-colors"
      >
        {children}
      </a>
    ),
    externalLink: ({
      value,
      children,
    }: {
      value?: { href?: string; blank?: boolean; noFollow?: boolean };
      children?: React.ReactNode;
    }) => (
      <a
        href={value?.href}
        target={value?.blank !== false ? '_blank' : undefined}
        rel={`noopener noreferrer${value?.noFollow ? ' nofollow' : ''}`}
        className="inline-flex items-center gap-1 text-[#C47C5D] font-semibold underline underline-offset-2 hover:text-[#2A4032] transition-colors"
      >
        {children}
        <ExternalLink className="w-3 h-3 flex-shrink-0" />
      </a>
    ),
  },

  types: {
    image: ({
      value,
    }: {
      value: { asset: { _ref: string }; alt?: string; caption?: string };
    }) => (
      <figure className="my-10">
        <div className="rounded-2xl overflow-hidden">
          <Image
            src={urlFor(value).width(860).url()}
            alt={value.alt || ''}
            width={860}
            height={540}
            className="w-full h-auto object-cover"
          />
        </div>
        {value.caption && (
          <figcaption className="text-center font-manrope text-xs text-[#2A4032]/50 mt-3 italic">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),

    clinicalCallout: ({
      value,
    }: {
      value: { stat?: string; source?: string; context?: string };
    }) => (
      <div className="my-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex items-start gap-4">
        <FlaskConical className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div>
          {value.stat && (
            <p className="font-cormorant text-2xl text-emerald-800 font-medium mb-1 leading-snug">
              {value.stat}
            </p>
          )}
          {value.source && (
            <p className="font-manrope text-xs font-bold text-emerald-600/80 uppercase tracking-wider mb-2">
              Source: {value.source}
            </p>
          )}
          {value.context && (
            <p className="font-manrope text-sm text-emerald-800/80 leading-relaxed">
              {value.context}
            </p>
          )}
        </div>
      </div>
    ),
  },
};

interface PortableTextProps {
  value: PortableTextBlock[];
}

/**
 * PortableTextRenderer — renders Sanity Portable Text content
 * with clinical styling, internal/external link marks,
 * image support, and the custom ClinicalCallout block.
 */
export default function PortableTextRenderer({ value }: PortableTextProps) {
  if (!value || value.length === 0) return null;
  return (
    <div className="portable-text-body">
      <SanityPortableText value={value} components={components} />
    </div>
  );
}
