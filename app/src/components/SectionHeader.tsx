interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  variant?: 'light' | 'dark';
  className?: string;
}

export default function SectionHeader({
  label,
  title,
  subtitle = '',
  align = 'left',
  variant = 'light',
  className = '',
}: SectionHeaderProps) {
  const isLight = variant === 'light';
  const isCenter = align === 'center';

  return (
    <div
      className={[
        'mb-10 md:mb-12',
        isCenter ? 'text-center' : 'text-left',
        className,
      ].join(' ')}
    >
      {/* Section Label with gold accent line */}
      <div
        className={[
          'flex items-center gap-2 mb-4',
          isCenter ? 'justify-center' : 'justify-start',
        ].join(' ')}
      >
        <span
          className={[
            'w-10 h-[1px] bg-[#C9A96E]',
            isCenter ? 'hidden' : 'block',
          ].join(' ')}
        />
        <span
          className={[
            'text-[11px] font-mono font-medium uppercase tracking-[0.1em]',
            isLight ? 'text-[#8A7550]' : 'text-[#C9A96E]',
          ].join(' ')}
        >
          {label}
        </span>
      </div>

      {/* Title */}
      <h2
        className={[
          'font-display font-semibold text-[28px] leading-[1.15] md:text-[42px] md:leading-[1.15]',
          isLight ? 'text-[#0A0A0A]' : 'text-[#F7F5F0]',
          'text-balance',
        ].join(' ')}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={[
            'mt-4 text-base md:text-lg leading-relaxed max-w-[600px]',
            isLight ? 'text-[#6B6560]' : 'text-[#F7F5F0] text-opacity-70',
            isCenter ? 'mx-auto' : '',
          ].join(' ')}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export type { SectionHeaderProps };
