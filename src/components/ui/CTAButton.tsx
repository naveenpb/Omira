'use client';

/**
 * CTAButton — Universal lead capture trigger.
 *
 * Drop this anywhere on the site. It fires the 'omira:open-lead-modal' event
 * which LeadCaptureModal (in ConditionalLayout) listens to.
 *
 * Usage:
 *   <CTAButton conditionName="Hypertension" crmTag="hypertension">
 *     Request Assessment
 *   </CTAButton>
 *
 *   <CTAButton variant="ghost" conditionName="Cancer Support" crmTag="cancer-support" />
 */

import { type ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

interface CTAButtonProps {
  conditionName?: string;
  crmTag?: string;
  source?: string;
  children?: ReactNode;
  variant?: 'primary' | 'ghost' | 'outline' | 'light';
  className?: string;
  id?: string;
  fullWidth?: boolean;
}

const variantClasses: Record<string, string> = {
  primary: 'bg-[#2A4032] text-[#FAF9F6] hover:bg-[#C47C5D]',
  ghost:   'bg-[#FAF9F6] text-[#2A4032] hover:bg-[#C47C5D] hover:text-[#FAF9F6]',
  outline: 'bg-transparent border-2 border-[#2A4032] text-[#2A4032] hover:bg-[#2A4032] hover:text-[#FAF9F6]',
  light:   'bg-[#C47C5D] text-[#FAF9F6] hover:bg-[#FAF9F6] hover:text-[#2A4032]',
};

export default function CTAButton({
  conditionName,
  crmTag,
  source,
  children = 'Request Clinical Assessment',
  variant = 'primary',
  className = '',
  id,
  fullWidth = false,
}: CTAButtonProps) {
  const openModal = () => {
    window.dispatchEvent(
      new CustomEvent('omira:open-lead-modal', {
        detail: {
          conditionName: conditionName || '',
          crmTag: crmTag || '',
          source: source || (typeof window !== 'undefined' ? window.location.pathname : ''),
        },
      })
    );
  };

  return (
    <button
      id={id}
      onClick={openModal}
      data-condition={conditionName}
      data-crm-tag={crmTag}
      className={`
        font-manrope font-bold uppercase tracking-widest text-xs py-4 px-8
        rounded-xl transition-colors duration-300 flex items-center justify-center gap-2
        ${variantClasses[variant] ?? variantClasses.primary}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {children}
      <ArrowRight className="w-4 h-4 flex-shrink-0" />
    </button>
  );
}
