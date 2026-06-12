import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Brush,
  Users,
  Image,
  BookOpen,
  Check,
  ChevronDown,
  Quote,
} from 'lucide-react';
import {
  impactStats,
  donationTiers,
  testimonial,
  membershipBenefits,
} from '@/data/supportData';
import type { DonationTier } from '@/data/supportData';

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

/* ------------------------------------------------------------------ */
/*  useInView hook                                                     */
/* ------------------------------------------------------------------ */
function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

/* ------------------------------------------------------------------ */
/*  useCountUp hook                                                    */
/* ------------------------------------------------------------------ */
function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return count;
}

/* ------------------------------------------------------------------ */
/*  Icon map for impact stats                                          */
/* ------------------------------------------------------------------ */
const iconMap: Record<string, React.ElementType> = {
  brush: Brush,
  users: Users,
  image: Image,
  'book-open': BookOpen,
};

/* ------------------------------------------------------------------ */
/*  Section: Hero                                                      */
/* ------------------------------------------------------------------ */
function HeroSection() {
  const { ref, isInView } = useInView<HTMLDivElement>(0.1);

  return (
    <section
      ref={ref}
      className="relative min-h-[50vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/support-patron.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.75) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-container mx-auto px-6 md:px-12 lg:px-20 text-center py-24 pt-32">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0.2}
          variants={fadeUp}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <span className="w-10 h-[1px] bg-[#C9A96E]" />
          <span className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] text-[#C9A96E]">
            SOUTENIR LE MUSÉE
          </span>
          <span className="w-10 h-[1px] bg-[#C9A96E]" />
        </motion.div>

        <motion.h1
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0.4}
          variants={fadeUp}
          className="font-display font-semibold text-[32px] leading-[1.1] md:text-[56px] md:leading-[1.1] text-[#F7F5F0] text-balance mb-4"
        >
          Devenez acteur de la transmission
        </motion.h1>

        <motion.p
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0.7}
          variants={fadeUp}
          className="text-base md:text-lg leading-relaxed text-[#F7F5F0] opacity-70 max-w-[640px] mx-auto"
        >
          Votre soutien permet de restaurer des œuvres, financer des
          expositions, développer l'éducation artistique et préserver notre
          patrimoine pour les générations futures.
        </motion.p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Impact Stats                                              */
/* ------------------------------------------------------------------ */
function ImpactStatCard({
  stat,
  isInView,
}: {
  stat: (typeof impactStats)[number];
  isInView: boolean;
}) {
  const count = useCountUp(stat.numericValue, 1.5, isInView);
  const IconComponent = iconMap[stat.icon] || Users;

  const formattedCount =
    stat.numericValue >= 1000
      ? count.toLocaleString('fr-FR')
      : String(count);

  return (
    <motion.div
      variants={staggerItem}
      className="bg-[#FFFFFF] rounded-radius-md p-6 shadow-sm text-center"
    >
      <div className="flex justify-center mb-4">
        <div className="w-11 h-11 flex items-center justify-center text-[#C9A96E]">
          <IconComponent size={44} strokeWidth={1.5} aria-hidden="true" />
        </div>
      </div>
      <div className="font-display font-semibold text-[28px] md:text-[42px] leading-[1.15] text-[#C9A96E] mb-2">
        {formattedCount}
        {stat.suffix}
      </div>
      <h4 className="font-heading font-medium text-lg leading-[1.35] text-[#0A0A0A] mb-2">
        {stat.label}
      </h4>
      <p className="text-sm font-body text-[#6B6560]">{stat.description}</p>
    </motion.div>
  );
}

function ImpactStatsSection() {
  const { ref, isInView } = useInView<HTMLDivElement>(0.15);

  return (
    <section ref={ref} className="bg-[#F7F5F0] py-16 md:py-20">
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0}
          variants={fadeUp}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="font-display font-semibold text-[28px] leading-[1.15] md:text-[42px] md:leading-[1.15] text-[#0A0A0A] text-balance mb-4">
            Votre soutien en action
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-[#6B6560] max-w-[600px] mx-auto">
            Chaque contribution, quelle que soit sa taille, a un impact concret
            sur la vie du musée.
          </p>
        </motion.div>

        {/* Impact grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {impactStats.map((stat) => (
            <ImpactStatCard key={stat.id} stat={stat} isInView={isInView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Donation Tiers                                            */
/* ------------------------------------------------------------------ */
function DonationCard({ tier }: { tier: DonationTier }) {
  return (
    <motion.div
      variants={staggerItem}
      className={[
        'relative flex flex-col rounded-radius-lg p-8 md:p-10 h-full',
        tier.highlighted
          ? 'bg-[rgba(255,255,255,0.03)] border-2 border-[#C9A96E] shadow-[0_4px_24px_rgba(201,169,110,0.25)]'
          : 'bg-[rgba(255,255,255,0.03)] border border-[#2A2A2A]',
      ].join(' ')}
    >
      {/* Badge */}
      {tier.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center px-3 py-1 bg-[#C9A96E] text-[#0A0A0A] rounded-full text-[11px] font-body font-semibold uppercase tracking-[0.05em]">
            {tier.badge}
          </span>
        </div>
      )}

      <h3 className="font-heading font-semibold text-[22px] leading-[1.25] md:text-[30px] md:leading-[1.25] text-[#F7F5F0] mb-2 mt-2">
        {tier.title}
      </h3>

      <div className="mb-4">
        <span className="font-display font-semibold text-[28px] leading-[1.15] text-[#C9A96E]">
          {tier.price}
        </span>
        {tier.period && (
          <span className="text-sm font-body text-[#F7F5F0] opacity-50">
            {tier.period}
          </span>
        )}
      </div>

      <p className="text-base font-body text-[#F7F5F0] opacity-70 mb-6 leading-relaxed">
        {tier.description}
      </p>

      {/* Benefits */}
      <ul className="flex-1 space-y-3 mb-8">
        {tier.benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check
              size={18}
              strokeWidth={2}
              className="text-[#C9A96E] flex-shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <span className="text-sm font-body text-[#F7F5F0] opacity-80 leading-relaxed">
              {benefit}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#"
        className={[
          'block w-full text-center px-6 py-3 text-sm font-body font-medium rounded-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]',
          tier.highlighted
            ? 'bg-[#C9A96E] text-[#0A0A0A] hover:bg-[#D4B87A] hover:shadow-[0_4px_24px_rgba(201,169,110,0.25)]'
            : 'bg-transparent text-[#F7F5F0] border border-[rgba(255,255,255,0.4)] hover:border-white hover:bg-[rgba(255,255,255,0.06)]',
        ].join(' ')}
      >
        {tier.ctaLabel}
      </a>
    </motion.div>
  );
}

function DonationSection() {
  const { ref, isInView } = useInView<HTMLDivElement>(0.1);

  return (
    <section ref={ref} className="bg-[#0A0A0A] py-16 md:py-20">
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0}
          variants={fadeUp}
          className="text-center mb-10 md:mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-10 h-[1px] bg-[#C9A96E]" />
            <span className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] text-[#C9A96E]">
              FAIRE UN DON
            </span>
            <span className="w-10 h-[1px] bg-[#C9A96E]" />
          </div>
          <h2 className="font-display font-semibold text-[28px] leading-[1.15] md:text-[42px] md:leading-[1.15] text-[#F7F5F0] text-balance">
            Choisissez votre manière de soutenir
          </h2>
        </motion.div>

        {/* Donation grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {donationTiers.map((tier) => (
            <DonationCard key={tier.id} tier={tier} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Membership Benefits                                       */
/* ------------------------------------------------------------------ */
function MembershipBenefitsSection() {
  const { ref, isInView } = useInView<HTMLDivElement>(0.1);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section ref={ref} className="bg-[#F7F5F0] py-16 md:py-20">
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0}
          variants={fadeUp}
          className="mb-10 md:mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-10 h-[1px] bg-[#8A7550]" />
            <span className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] text-[#8A7550]">
              LES AMIS DU MUSÉE
            </span>
          </div>
          <h2 className="font-display font-semibold text-[28px] leading-[1.15] md:text-[42px] md:leading-[1.15] text-[#0A0A0A]">
            Vos avantages d'adhérent
          </h2>
        </motion.div>

        {/* 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left — Accordion */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="space-y-0"
          >
            {membershipBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="border-b border-[#E8E4DC]"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2 rounded-sm"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-heading font-medium text-lg leading-[1.35] text-[#0A0A0A]">
                    {benefit.title}
                  </span>
                  <ChevronDown
                    size={20}
                    strokeWidth={1.5}
                    className={[
                      'text-[#6B6560] transition-transform duration-300 flex-shrink-0 ml-4',
                      openIndex === index ? 'rotate-180' : '',
                    ].join(' ')}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className={[
                    'overflow-hidden transition-all duration-300',
                    openIndex === index
                      ? 'max-h-40 opacity-100 pb-4'
                      : 'max-h-0 opacity-0',
                  ].join(' ')}
                >
                  <p className="text-sm font-body text-[#6B6560] leading-relaxed">
                    {benefit.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right — Membership card visual */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
            className="flex items-center justify-center"
          >
            <div className="group relative bg-[#0A0A0A] rounded-radius-xl p-8 md:p-10 border border-[#8A7550] w-full max-w-[380px] rotate-[-2deg] hover:rotate-0 transition-transform duration-500 hover:shadow-[0_4px_24px_rgba(201,169,110,0.25)]">
              {/* Card header */}
              <div className="text-center mb-6">
                <span className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] text-[#C9A96E]">
                  CARTE D'AMIS
                </span>
              </div>

              {/* Gold decorative line */}
              <div className="w-16 h-[2px] bg-[#C9A96E] mx-auto mb-6" />

              {/* Member name */}
              <h3 className="font-heading font-semibold text-[22px] leading-[1.25] text-[#F7F5F0] text-center mb-2">
                Votre Nom
              </h3>

              {/* Member number */}
              <p className="text-[11px] font-mono font-medium tracking-[0.1em] text-[#C9A96E] text-center mb-4">
                N° 2025-0000
              </p>

              {/* Validity */}
              <p className="text-xs font-body text-[#F7F5F0] opacity-50 text-center mb-8">
                Valable du 1er janvier au 31 décembre 2025
              </p>

              {/* Decorative element */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-8 h-[1px] bg-[#8A7550]" />
                <span className="text-[#8A7550] text-xs">♦</span>
                <span className="w-8 h-[1px] bg-[#8A7550]" />
              </div>

              {/* Museum watermark */}
              <p className="font-display font-semibold text-xl text-[#F7F5F0] opacity-10 text-center tracking-tight">
                AURÉOLE
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Corporate Patronage                                       */
/* ------------------------------------------------------------------ */
function CorporateSection() {
  const { ref, isInView } = useInView<HTMLDivElement>(0.15);

  const corporateBenefits = [
    'Visites privées et sur mesure pour vos clients et collaborateurs',
    'Événements corporate dans les salles du musée',
    'Logo sur les supports de communication de l\'exposition',
    'Déduction fiscale : 60% du don dans la limite de 0,5% du CA',
  ];

  return (
    <section ref={ref} className="bg-[#FFFFFF] py-16 md:py-20">
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left — Text content */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0}
            variants={fadeUp}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-10 h-[1px] bg-[#8A7550]" />
              <span className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] text-[#8A7550]">
                MÉCÉNAT D'ENTREPRISE
              </span>
            </div>

            <h2 className="font-display font-semibold text-[28px] leading-[1.15] md:text-[42px] md:leading-[1.15] text-[#0A0A0A] text-balance mb-4">
              Associez votre entreprise au patrimoine
            </h2>

            <p className="text-base font-body text-[#6B6560] leading-relaxed mb-6">
              Le mécénat d'entreprise au Musée d'Auréole, c'est l'opportunité
              de soutenir la création, la recherche et la transmission
              culturelle tout en bénéficiant d'une visibilité nationale et
              d'avantages exclusifs.
            </p>

            <ul className="space-y-3 mb-8">
              {corporateBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check
                    size={18}
                    strokeWidth={2}
                    className="text-[#C9A96E] flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-body text-[#0A0A0A] leading-relaxed">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="inline-flex items-center px-6 py-3 bg-[#C9A96E] text-[#0A0A0A] text-sm font-body font-medium rounded-sm hover:bg-[#D4B87A] hover:shadow-[0_4px_24px_rgba(201,169,110,0.25)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
            >
              Devenir mécène
            </a>
          </motion.div>

          {/* Right — Testimonial */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
            className="flex items-center"
          >
            <div className="relative bg-[#F7F5F0] rounded-radius-lg p-8 md:p-10 shadow-md w-full">
              {/* Quote mark */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 0.3, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-4"
              >
                <Quote
                  size={48}
                  strokeWidth={1.5}
                  className="text-[#C9A96E]"
                  aria-hidden="true"
                />
              </motion.div>

              <blockquote className="font-heading font-medium text-lg md:text-xl leading-relaxed text-[#0A0A0A] mb-6">
                {testimonial.quote}
              </blockquote>

              <cite className="not-italic">
                <span className="block text-sm font-body font-medium text-[#0A0A0A]">
                  — {testimonial.author}
                </span>
                <span className="text-xs font-body text-[#6B6560]">
                  {testimonial.role}, {testimonial.organization}
                </span>
              </cite>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: CTA Banner                                                */
/* ------------------------------------------------------------------ */
function CTABannerSection() {
  const { ref, isInView } = useInView<HTMLDivElement>(0.25);

  return (
    <section ref={ref} className="bg-[#0A0A0A] py-16 md:py-20">
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20 text-center">
        <motion.h3
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0}
          variants={fadeUp}
          className="font-heading font-semibold text-[22px] leading-[1.25] md:text-[30px] md:leading-[1.25] text-[#F7F5F0] mb-4"
        >
          Chaque geste compte
        </motion.h3>

        <motion.p
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0.15}
          variants={fadeUp}
          className="text-base font-body text-[#F7F5F0] opacity-65 max-w-[540px] mx-auto mb-8"
        >
          Rejoignez les milliers de visiteurs qui soutiennent déjà le musée.
          Ensemble, préservons et transmettons notre patrimoine.
        </motion.p>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0.3}
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 bg-[#C9A96E] text-[#0A0A0A] text-sm font-body font-medium rounded-sm hover:bg-[#D4B87A] hover:shadow-[0_4px_24px_rgba(201,169,110,0.25)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
          >
            Faire un don
          </a>
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 bg-transparent text-[#C9A96E] text-sm font-body font-medium rounded-sm border border-[#C9A96E] hover:bg-[rgba(201,169,110,0.1)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
          >
            Devenir Ami
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */
export default function Support() {
  return (
    <div>
      <HeroSection />
      <ImpactStatsSection />
      <DonationSection />
      <MembershipBenefitsSection />
      <CorporateSection />
      <CTABannerSection />
    </div>
  );
}
