import { Link } from 'react-router-dom';
import Tag from './Tag';

type ExhibitionVariant = 'default' | 'featured' | 'compact';

interface ExhibitionCardProps {
  title: string;
  subtitle: string;
  dateRange: string;
  image: string;
  tag: string;
  variant?: ExhibitionVariant;
  href?: string;
  className?: string;
}

export default function ExhibitionCard({
  title,
  subtitle,
  dateRange,
  image,
  tag,
  variant = 'default',
  href = '#',
  className = '',
}: ExhibitionCardProps) {
  if (variant === 'compact') {
    return (
      <Link
        to={href}
        className={[
          'group flex gap-4 items-start',
          className,
        ].join(' ')}
        aria-label={`${title} — ${dateRange}`}
      >
        <div className="w-[100px] h-[100px] flex-shrink-0 rounded-md overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <Tag variant="gold-filled" className="mb-2">
            {tag}
          </Tag>
          <h4 className="font-heading font-medium text-lg leading-[1.35] text-[#F7F5F0] line-clamp-2 mb-1">
            {title}
          </h4>
          <p className="text-[12px] font-body font-medium text-[#C9A96E] mb-1">
            {dateRange}
          </p>
        </div>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link
        to={href}
        className={[
          'group block bg-white rounded-lg overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-500 border-t-[3px] border-t-[#C9A96E]',
          className,
        ].join(' ')}
        aria-label={`${title} — ${dateRange}`}
      >
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            loading="lazy"
          />
        </div>
        <div className="p-5">
          <Tag variant="gold-filled" className="mb-3">
            {tag}
          </Tag>
          <h3 className="font-heading font-semibold text-[22px] leading-[1.25] text-[#0A0A0A] line-clamp-2 mb-2">
            {title}
          </h3>
          <p className="text-[12px] font-body font-medium text-[#6B6560] mb-2">
            {dateRange}
          </p>
          <p className="text-sm font-body text-[#6B6560] line-clamp-2">{subtitle}</p>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link
      to={href}
      className={[
        'group block bg-white rounded-lg overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-500',
        className,
      ].join(' ')}
      aria-label={`${title} — ${dateRange}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <Tag variant="gold-filled">{tag}</Tag>
        </div>
      </div>
      <div className="p-5">
        <h4 className="font-heading font-medium text-lg leading-[1.35] text-[#0A0A0A] line-clamp-2 mb-2">
          {title}
        </h4>
        <p className="text-[12px] font-body font-medium text-[#6B6560] mb-2">
          {dateRange}
        </p>
        <p className="text-sm font-body text-[#6B6560] line-clamp-2">{subtitle}</p>
      </div>
    </Link>
  );
}

export type { ExhibitionCardProps, ExhibitionVariant };
