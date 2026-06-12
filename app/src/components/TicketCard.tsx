import type { Ticket } from '@/data/visitData';
import Button from './Button';

interface TicketCardProps {
  ticket: Ticket;
}

export default function TicketCard({ ticket }: TicketCardProps) {
  const isFree = ticket.price === 0;

  return (
    <div
      className={[
        'bg-[rgba(255,255,255,0.04)] border border-[#2A2A2A] rounded-radius-md p-6',
        'flex flex-col h-full transition-all duration-300 hover:border-[rgba(201,169,110,0.3)]',
      ].join(' ')}
    >
      {/* Category */}
      <h4 className="font-heading font-medium text-[22px] leading-[1.35] text-[#F7F5F0] mb-4">
        {ticket.category}
      </h4>

      {/* Price */}
      <div className="flex items-start gap-1 mb-4">
        <span className="font-display font-semibold text-[48px] leading-[1.0] text-[#C9A96E]">
          {isFree ? '0' : ticket.price}
        </span>
        {!isFree && (
          <span className="font-heading font-semibold text-[22px] text-[#C9A96E] mt-1">
            €
          </span>
        )}
      </div>

      {/* Condition */}
      <p className="text-sm font-body text-[#F7F5F0] text-opacity-60 leading-relaxed mb-6 flex-1">
        {ticket.condition}
      </p>

      {/* CTA */}
      <Button
        variant={ticket.ctaVariant}
        className="w-full justify-center"
      >
        {ticket.ctaLabel}
      </Button>
    </div>
  );
}
