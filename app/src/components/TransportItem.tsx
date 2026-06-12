import { Train, Bus, Bike, Car } from 'lucide-react';

interface TransportItemProps {
  icon: string;
  title: string;
  lines: string;
  caption: string;
  isLast?: boolean;
}

export default function TransportItem({ icon, title, lines, caption, isLast = false }: TransportItemProps) {
  const renderIcon = () => {
    const iconClass = "text-[#8A7550]";
    switch (icon) {
      case 'train':
        return <Train size={28} strokeWidth={1.5} className={iconClass} aria-hidden="true" />;
      case 'bus':
        return <Bus size={28} strokeWidth={1.5} className={iconClass} aria-hidden="true" />;
      case 'bike':
        return <Bike size={28} strokeWidth={1.5} className={iconClass} aria-hidden="true" />;
      case 'car':
        return <Car size={28} strokeWidth={1.5} className={iconClass} aria-hidden="true" />;
      default:
        return <Train size={28} strokeWidth={1.5} className={iconClass} aria-hidden="true" />;
    }
  };

  return (
    <div className={isLast ? '' : 'border-b border-[#E8E4DC] pb-5 mb-5'}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-0.5">{renderIcon()}</div>
        <div>
          <h5 className="font-heading font-medium text-[18px] leading-[1.4] text-[#0A0A0A] mb-1">
            {title}
          </h5>
          <p className="text-base font-body font-medium text-[#0A0A0A] leading-relaxed">
            {lines}
          </p>
          <p className="text-sm font-body text-[#6B6560] leading-relaxed mt-0.5">
            {caption}
          </p>
        </div>
      </div>
    </div>
  );
}
