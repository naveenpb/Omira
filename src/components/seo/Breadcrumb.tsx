import Link from 'next/link';
import JsonLd, { buildBreadcrumbSchema } from '@/components/seo/JsonLd';

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb — renders both the visual breadcrumb trail and the
 * BreadcrumbList JSON-LD schema in one component.
 *
 * Usage:
 * <Breadcrumb items={[
 *   { name: 'Home', href: '/' },
 *   { name: 'Patient Portal', href: '/treatments' },
 *   { name: 'Hypertension', href: '/treatments/hypertension' },
 * ]} />
 */
export default function Breadcrumb({ items }: BreadcrumbProps) {
  const schemaItems = items.map((item) => ({
    name: item.name,
    url: item.href,
  }));

  return (
    <>
      {/* Inject BreadcrumbList JSON-LD */}
      <JsonLd data={buildBreadcrumbSchema(schemaItems)} />

      {/* Visual Breadcrumb — shown on page */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 font-manrope text-xs font-semibold uppercase tracking-widest text-[#2A4032]/40 mb-8 flex-wrap"
      >
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <span key={item.href} className="flex items-center gap-2">
              {isLast ? (
                <span className="text-[#C47C5D]" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-[#2A4032] transition-colors duration-200"
                >
                  {item.name}
                </Link>
              )}
              {!isLast && (
                <span className="text-[#2A4032]/20 select-none" aria-hidden="true">
                  /
                </span>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
