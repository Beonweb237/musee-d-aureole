import { useState, useRef, useCallback } from 'react';
import type { FaqItem } from '@/data/visitData';
import { ChevronDown } from 'lucide-react';

interface FaqAccordionProps {
  items: FaqItem[];
}

interface AccordionItemProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function AccordionItem({ item, isOpen, onToggle, index }: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const itemId = `faq-item-${index}`;
  const contentId = `faq-content-${index}`;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onToggle();
      }
    },
    [onToggle]
  );

  return (
    <div
      className="border-b border-[#E8E4DC] last:border-b-0"
      role="region"
      aria-label={item.question}
    >
      <button
        id={itemId}
        role="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        className={[
          'w-full flex items-center justify-between py-5 px-1 text-left',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2',
          'transition-colors duration-200 hover:bg-[rgba(201,169,110,0.02)]',
        ].join(' ')}
      >
        <h4 className="font-heading font-medium text-[18px] md:text-[22px] leading-[1.35] text-[#0A0A0A] pr-4">
          {item.question}
        </h4>
        <ChevronDown
          size={20}
          strokeWidth={1.5}
          className={[
            'text-[#6B6560] flex-shrink-0 transition-transform duration-400',
            isOpen ? 'rotate-180' : 'rotate-0',
          ].join(' ')}
          aria-hidden="true"
        />
      </button>
      <div
        id={contentId}
        role="region"
        aria-labelledby={itemId}
        ref={contentRef}
        className="overflow-hidden transition-all duration-400 ease-out"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight ?? 200}px` : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="pb-5 px-1">
          <p className="text-base font-body leading-[1.7] text-[#6B6560]">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div
      className="border-t border-[#E8E4DC]"
      role="region"
      aria-label="Questions fréquentes"
    >
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          item={item}
          index={index}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}
