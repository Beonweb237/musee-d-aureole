import {
  Accessibility,
  Eye,
  VolumeX,
  HeartPulse,
  Users,
  Brain,
} from 'lucide-react';
import type { AccessibilityService } from '@/data/visitData';

interface AccessibilityCardProps {
  service: AccessibilityService;
}

export default function AccessibilityCard({ service }: AccessibilityCardProps) {
  const renderIcon = () => {
    const className = "text-[#C9A96E]";
    switch (service.icon) {
      case 'accessibility':
        return <Accessibility size={36} strokeWidth={1.5} className={className} aria-hidden="true" />;
      case 'eye':
        return <Eye size={36} strokeWidth={1.5} className={className} aria-hidden="true" />;
      case 'volume-x':
        return <VolumeX size={36} strokeWidth={1.5} className={className} aria-hidden="true" />;
      case 'heart-pulse':
        return <HeartPulse size={36} strokeWidth={1.5} className={className} aria-hidden="true" />;
      case 'users':
        return <Users size={36} strokeWidth={1.5} className={className} aria-hidden="true" />;
      case 'brain':
        return <Brain size={36} strokeWidth={1.5} className={className} aria-hidden="true" />;
      default:
        return <Accessibility size={36} strokeWidth={1.5} className={className} aria-hidden="true" />;
    }
  };

  return (
    <div
      className={[
        'bg-[rgba(255,255,255,0.03)] border border-[#2A2A2A] rounded-radius-md p-6',
        'transition-all duration-300 hover:border-[rgba(201,169,110,0.25)]',
      ].join(' ')}
    >
      <div className="mb-4">{renderIcon()}</div>
      <h4 className="font-heading font-medium text-[22px] leading-[1.35] text-[#F7F5F0] mb-3">
        {service.title}
      </h4>
      <p className="text-sm font-body leading-relaxed text-[#F7F5F0] text-opacity-65">
        {service.description}
      </p>
    </div>
  );
}
