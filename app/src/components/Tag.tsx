import type { ReactNode } from 'react';

type TagVariant = 'gold-filled' | 'outline-gold' | 'dark-filled' | 'light-filled' | 'emerald-filled';

interface TagProps {
  children: ReactNode;
  variant?: TagVariant;
  className?: string;
}

const variantClasses: Record<TagVariant, string> = {
  'gold-filled': 'bg-[#C9A96E] text-[#0A0A0A] border-transparent',
  'outline-gold': 'bg-transparent text-[#C9A96E] border-[#C9A96E]',
  'dark-filled': 'bg-[#0A0A0A] text-[#F7F5F0] border-transparent',
  'light-filled': 'bg-[#F7F5F0] text-[#0A0A0A] border-transparent',
  'emerald-filled': 'bg-[#2D6A4F] text-[#F7F5F0] border-transparent',
};

export default function Tag({ children, variant = 'gold-filled', className = '' }: TagProps) {
  return (
    <span
      className={[
        'inline-flex items-center px-3 py-1 rounded-full text-[11px] font-body font-medium uppercase tracking-[0.05em] border',
        variantClasses[variant],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}

export type { TagProps, TagVariant };
