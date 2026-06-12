import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Ticket, ArrowRight, Download } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';

import OpeningHoursTable from '@/components/OpeningHoursTable';
import TicketCard from '@/components/TicketCard';
import TransportItem from '@/components/TransportItem';
import FaqAccordion from '@/components/FaqAccordion';
import AccessibilityCard from '@/components/AccessibilityCard';
import {
  weeklyHours,
  tickets,
  ticketNote,
  faqItems,
  transportOptions,
  accessibilityServices,
} from '@/data/visitData';

/* ─── Hero Section ─── */
function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <section
      className="relative min-h-[50vh] w-full flex items-center justify-center overflow-hidden"
      aria-label="En-tête de la page Visiter"
    >
      {/* Background Image */}
      <img
        ref={imageRef}
        src="/visit-courtyard.jpg"
        alt="Cour majestueuse du Musée d'Auréole avec sa structure en verre"
        onLoad={handleImageLoad}
        className={[
          'absolute inset-0 w-full h-full object-cover object-center',
          'transition-opacity duration-[1200ms]',
          imageLoaded ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      />

      {/* Dark Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.7) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-[800px] mx-auto">
        {/* Section Label */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] text-[#C9A96E]">
            VISITER
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display font-semibold text-[32px] leading-[1.1] md:text-[56px] md:leading-[1.1] text-[#F7F5F0] text-balance mb-6 tracking-[-0.03em]">
          Planifiez votre visite
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg font-body font-normal text-[#F7F5F0] text-opacity-75 max-w-[560px] mx-auto mb-8 leading-relaxed">
          Tout ce qu'il faut savoir pour une expérience mémorable au musée.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="#billetterie"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#C9A96E] text-[#0A0A0A] text-sm font-body font-medium rounded-full hover:bg-[#D4B87A] hover:shadow-[0_4px_24px_rgba(201,169,110,0.25)] transition-all duration-200 w-full sm:w-auto justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
          >
            <Ticket size={18} strokeWidth={1.5} />
            Réserver un billet
          </Link>
          <Link
            to="#preparer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-transparent text-[#F7F5F0] text-sm font-body font-medium rounded-full border border-[rgba(255,255,255,0.4)] hover:border-white hover:bg-[rgba(255,255,255,0.06)] transition-all duration-200 w-full sm:w-auto justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
          >
            Préparer sa visite
            <ArrowRight size={18} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Opening Hours Section ─── */
function OpeningHoursSection() {
  return (
    <section className="bg-[var(--bg-primary)] py-20 md:py-[80px]">
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-10 h-[1px] bg-[#C9A96E]" />
          <span className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] text-[#8A7550]">
            HORAIRES
          </span>
        </div>
        <h2 className="font-display font-semibold text-[28px] leading-[1.15] md:text-[42px] md:leading-[1.15] text-[#0A0A0A] mb-4 text-balance">
          Heures d&apos;ouverture
        </h2>
        <p className="text-base md:text-lg font-body text-[#6B6560] leading-relaxed max-w-[600px] mb-10 md:mb-12">
          Le musée est ouvert tous les jours sauf le mardi, et propose des nocturnes le vendredi.
        </p>
        <OpeningHoursTable schedules={weeklyHours} />
      </div>
    </section>
  );
}

/* ─── Ticket Pricing Section ─── */
function TicketPricingSection() {
  return (
    <section id="billetterie" className="bg-[var(--bg-dark)] py-20 md:py-[80px]">
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeader
          label="BILLETTERIE"
          title="Tarifs"
          align="center"
          variant="dark"
        />

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.category} ticket={ticket} />
          ))}
        </div>

        {/* Note */}
        <p className="mt-8 text-center text-[12px] font-body text-[#F7F5F0] text-opacity-50 max-w-[600px] mx-auto">
          * {ticketNote}
        </p>
      </div>
    </section>
  );
}

/* ─── Access & Directions Section ─── */
function AccessSection() {
  return (
    <section className="bg-[var(--bg-primary)] py-20 md:py-[80px]">
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left — Map */}
          <div>
            <div className="overflow-hidden rounded-radius-lg shadow-md group">
              <img
                src="/map-museum.jpg"
                alt="Plan du Musée d'Auréole avec les ailes, cours et galeries"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
            <div className="mt-4">
              <Button variant="ghost" className="gap-2">
                <Download size={16} strokeWidth={1.5} />
                Télécharger le plan PDF
              </Button>
            </div>
          </div>

          {/* Right — Transport Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-10 h-[1px] bg-[#C9A96E]" />
              <span className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] text-[#8A7550]">
                ACCÈS
              </span>
            </div>
            <h2 className="font-display font-semibold text-[28px] leading-[1.15] md:text-[42px] md:leading-[1.15] text-[#0A0A0A] mb-8 text-balance">
              Comment venir ?
            </h2>

            <div>
              {transportOptions.map((transport, index) => (
                <TransportItem
                  key={transport.title}
                  icon={transport.icon}
                  title={transport.title}
                  lines={transport.lines}
                  caption={transport.caption}
                  isLast={index === transportOptions.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Prepare Your Visit Section ─── */
function PrepareSection() {
  return (
    <section id="preparer" className="bg-[var(--bg-primary)] py-16 md:py-[64px]">
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeader
          label="PRÉPARER"
          title="Conseils pour votre visite"
        />
        <FaqAccordion items={faqItems} />
      </div>
    </section>
  );
}

/* ─── Accessibility Section ─── */
function AccessibilitySection() {
  return (
    <section id="accessibilite" className="bg-[var(--bg-dark)] py-20 md:py-[80px]">
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeader
          label="ACCESSIBILITÉ"
          title="Un musée pour tous"
          align="center"
          variant="dark"
        />

        {/* Accessibility Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accessibilityServices.map((service) => (
            <AccessibilityCard key={service.title} service={service} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Button variant="secondary">
            <Download size={16} strokeWidth={1.5} />
            Télécharger le guide d&apos;accessibilité (PDF)
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─── Visit Page ─── */
export default function Visit() {
  return (
    <div>
      <HeroSection />
      <OpeningHoursSection />
      <TicketPricingSection />
      <AccessSection />
      <PrepareSection />
      <AccessibilitySection />
    </div>
  );
}
