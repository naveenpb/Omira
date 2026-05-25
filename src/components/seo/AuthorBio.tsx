import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { ExternalLink, Award, Clock } from 'lucide-react';

interface Author {
  name: string;
  role: string;
  bio?: string;
  certifications?: string[];
  yearsExperience?: number;
  linkedIn?: string;
  photo?: { asset: { _ref: string }; alt?: string };
}

interface AuthorBioProps {
  author: Author;
  reviewedBy?: Author;
  lastReviewedAt?: string;
  variant?: 'full' | 'compact';
}

/**
 * AuthorBio — EEAT trust signal component.
 * Shows author credentials on every clinical page and blog article.
 *
 * variant="full"    → Used at the bottom of articles (large card)
 * variant="compact" → Used at the top of condition pages (small inline strip)
 */
export default function AuthorBio({
  author,
  reviewedBy,
  lastReviewedAt,
  variant = 'compact',
}: AuthorBioProps) {
  const reviewedDate = lastReviewedAt
    ? new Date(lastReviewedAt).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-manrope text-xs text-[#2A4032]/60 border-t border-b border-[#2A4032]/10 py-4 my-6">
        {/* Protocol author */}
        <div className="flex items-center gap-2">
          {author.photo?.asset && (
            <div className="w-7 h-7 rounded-full overflow-hidden ring-1 ring-[#2A4032]/20 flex-shrink-0">
              <Image
                src={urlFor(author.photo).width(56).height(56).url()}
                alt={author.photo.alt || author.name}
                width={28}
                height={28}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <div>
            <span className="font-bold text-[#2A4032]">{author.name}</span>
            <span className="mx-1.5 text-[#2A4032]/30">—</span>
            <span>{author.role}</span>
          </div>
        </div>

        {/* Reviewed by badge */}
        {reviewedBy && (
          <div className="flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              Reviewed by{' '}
              <span className="font-bold text-[#2A4032]">{reviewedBy.name}</span>
              {reviewedBy.role && `, ${reviewedBy.role}`}
            </span>
          </div>
        )}

        {/* Last reviewed date */}
        {reviewedDate && (
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Last reviewed: {reviewedDate}</span>
          </div>
        )}
      </div>
    );
  }

  // ── FULL variant ─────────────────────────────────────────────────────────
  return (
    <div className="bg-white border border-[#2A4032]/10 rounded-3xl p-8 mt-12">
      <p className="font-manrope text-xs font-bold uppercase tracking-widest text-[#2A4032]/40 mb-6">
        About the Author
      </p>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Photo */}
        {author.photo?.asset && (
          <div className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-[#2A4032]/10 flex-shrink-0">
            <Image
              src={urlFor(author.photo).width(160).height(160).url()}
              alt={author.photo.alt || author.name}
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="flex-1">
          <h3 className="font-cormorant text-2xl text-[#2A4032] font-medium">{author.name}</h3>
          <p className="font-manrope text-sm text-[#C47C5D] font-semibold mb-3">{author.role}</p>

          {/* Bio */}
          {author.bio && (
            <p className="font-manrope text-sm text-[#2A4032]/70 leading-relaxed mb-4">
              {author.bio}
            </p>
          )}

          {/* Credentials row */}
          <div className="flex flex-wrap gap-3">
            {author.yearsExperience && (
              <span className="inline-flex items-center gap-1.5 bg-[#2A4032]/5 text-[#2A4032] font-manrope text-xs font-bold px-3 py-1.5 rounded-full">
                <Clock className="w-3 h-3" />
                {author.yearsExperience} yrs experience
              </span>
            )}
            {author.certifications?.slice(0, 2).map((cert, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 bg-[#C47C5D]/8 text-[#C47C5D] font-manrope text-xs font-bold px-3 py-1.5 rounded-full"
              >
                <Award className="w-3 h-3" />
                {cert}
              </span>
            ))}
            {author.linkedIn && (
              <a
                href={author.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#2A4032]/50 hover:text-[#2A4032] font-manrope text-xs font-semibold transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Reviewed by footer */}
      {(reviewedBy || reviewedDate) && (
        <div className="mt-6 pt-6 border-t border-[#2A4032]/8 flex flex-wrap gap-4 items-center text-xs font-manrope text-[#2A4032]/50">
          {reviewedBy && (
            <div className="flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                Clinically reviewed by{' '}
                <span className="font-bold text-[#2A4032]">{reviewedBy.name}</span>
                {reviewedBy.role && `, ${reviewedBy.role}`}
              </span>
            </div>
          )}
          {reviewedDate && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Last reviewed: {reviewedDate}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
