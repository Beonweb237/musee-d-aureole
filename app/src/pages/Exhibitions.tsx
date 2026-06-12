import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, List, Calendar, X } from 'lucide-react';
import ExhibitionCard from '@/components/ExhibitionCard';
import {
  exhibitions,
  statusFilters,
  typeFilters,
} from '@/data/exhibitionsData';
import type { ExhibitionStatus, ExhibitionType } from '@/data/exhibitionsData';

type ViewMode = 'grid' | 'list';
type StatusFilter = 'Tout' | ExhibitionStatus;
type TypeFilter = 'Tous les types' | ExhibitionType;

/* ------------------------------------------------------------------ */
/*  Animations                                                         */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
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
/*  Section: Hero                                                      */
/* ------------------------------------------------------------------ */
function HeroSection() {
  const { ref, isInView } = useInView<HTMLDivElement>(0.1);

  return (
    <section
      ref={ref}
      className="relative min-h-[45vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/expo-michelangelo-rodin.jpg"
          alt=""
          className="w-full h-full object-cover object-top"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.75) 100%)',
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
            EXPOSITIONS & ÉVÉNEMENTS
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
          La programmation du musée
        </motion.h1>

        <motion.p
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0.7}
          variants={fadeUp}
          className="text-base md:text-lg leading-relaxed text-[#F7F5F0] opacity-70 max-w-[640px] mx-auto"
        >
          Expositions temporaires, conférences, projections et ateliers tout au
          long de l'année.
        </motion.p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Filter Bar                                                */
/* ------------------------------------------------------------------ */
interface FilterBarProps {
  activeStatus: StatusFilter;
  onStatusChange: (s: StatusFilter) => void;
  activeType: TypeFilter;
  onTypeChange: (t: TypeFilter) => void;
  viewMode: ViewMode;
  onViewModeChange: (v: ViewMode) => void;
  resultCount: number;
}

const allStatusOptions: StatusFilter[] = ['Tout', ...statusFilters];
const allTypeOptions: TypeFilter[] = [
  'Tous les types',
  ...typeFilters,
];

function FilterBar({
  activeStatus,
  onStatusChange,
  activeType,
  onTypeChange,
  viewMode,
  onViewModeChange,
  resultCount,
}: FilterBarProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.45;
      setIsSticky(window.scrollY > heroHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hasActiveFilters = activeStatus !== 'Tout' || activeType !== 'Tous les types';

  const clearFilters = useCallback(() => {
    onStatusChange('Tout');
    onTypeChange('Tous les types');
  }, [onStatusChange, onTypeChange]);

  return (
    <div
      className={[
        'w-full border-b border-[#E8E4DC] transition-all duration-300 z-40',
        isSticky
          ? 'sticky top-16 md:top-[72px] bg-[rgba(247,245,240,0.95)] backdrop-blur-[8px]'
          : 'bg-[#F7F5F0]',
      ].join(' ')}
    >
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20 py-4">
        {/* Filter row */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Status filter pills */}
          <div
            className="flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Filtrer par statut"
          >
            {allStatusOptions.map((status) => (
              <button
                key={status}
                onClick={() => onStatusChange(status)}
                className={[
                  'px-4 py-1.5 rounded-full text-[11px] font-body font-medium uppercase tracking-[0.05em] border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]',
                  activeStatus === status
                    ? 'bg-[#0A0A0A] text-[#F7F5F0] border-[#0A0A0A]'
                    : 'bg-transparent text-[#6B6560] border-[#E8E4DC] hover:border-[#C9A96E] hover:text-[#0A0A0A]',
                ].join(' ')}
                aria-pressed={activeStatus === status}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-[#E8E4DC] hidden md:block" />

          {/* Type filter dropdown (styled as select) */}
          <div className="relative">
            <select
              value={activeType}
              onChange={(e) => onTypeChange(e.target.value as TypeFilter)}
              aria-label="Filtrer par type d'événement"
              className="appearance-none bg-transparent text-[12px] font-body font-medium text-[#6B6560] uppercase tracking-[0.05em] border border-[#E8E4DC] rounded-full px-4 py-1.5 pr-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] cursor-pointer hover:border-[#C9A96E] transition-colors"
            >
              {allTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6560]">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="flex-1" />

          {/* Result count */}
          <span className="text-[12px] font-body text-[#6B6560]">
            {resultCount} résultat{resultCount !== 1 ? 's' : ''}
          </span>

          {/* View toggle */}
          <div
            className="flex items-center gap-1 border border-[#E8E4DC] rounded-full p-0.5"
            role="group"
            aria-label="Changer la vue"
          >
            <button
              onClick={() => onViewModeChange('grid')}
              className={[
                'w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]',
                viewMode === 'grid'
                  ? 'bg-[#C9A96E] text-[#0A0A0A]'
                  : 'text-[#6B6560] hover:text-[#0A0A0A]',
              ].join(' ')}
              aria-label="Vue grille"
              aria-pressed={viewMode === 'grid'}
            >
              <LayoutGrid size={16} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={[
                'w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]',
                viewMode === 'list'
                  ? 'bg-[#C9A96E] text-[#0A0A0A]'
                  : 'text-[#6B6560] hover:text-[#0A0A0A]',
              ].join(' ')}
              aria-label="Vue liste"
              aria-pressed={viewMode === 'list'}
            >
              <List size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Active filters chips */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#E8E4DC]">
                {activeStatus !== 'Tout' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#0A0A0A] text-[#F7F5F0] rounded-full text-[11px] font-body font-medium uppercase tracking-[0.05em]">
                    {activeStatus}
                    <button
                      onClick={() => onStatusChange('Tout')}
                      className="ml-1 hover:text-[#C9A96E] focus:outline-none"
                      aria-label={`Retirer le filtre ${activeStatus}`}
                    >
                      <X size={12} strokeWidth={2} />
                    </button>
                  </span>
                )}
                {activeType !== 'Tous les types' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#0A0A0A] text-[#F7F5F0] rounded-full text-[11px] font-body font-medium uppercase tracking-[0.05em]">
                    {activeType}
                    <button
                      onClick={() => onTypeChange('Tous les types')}
                      className="ml-1 hover:text-[#C9A96E] focus:outline-none"
                      aria-label={`Retirer le filtre ${activeType}`}
                    >
                      <X size={12} strokeWidth={2} />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-[11px] font-body font-medium text-[#C9A96E] hover:text-[#D4B87A] uppercase tracking-[0.05em] underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] rounded-sm"
                >
                  Réinitialiser
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Exhibition Grid                                           */
/* ------------------------------------------------------------------ */
function ExhibitionGridSection({
  viewMode,
  exhibitions: items,
}: {
  viewMode: ViewMode;
  exhibitions: typeof exhibitions;
}) {
  const { ref, isInView } = useInView<HTMLDivElement>(0.05);
  const [visibleCount, setVisibleCount] = useState(6);

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + 3, items.length));
  }, [items.length]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(6);
  }, [items.length]);

  return (
    <section className="bg-[#F7F5F0] py-12 md:py-20">
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20">
        {/* Empty state */}
        {items.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-[2px] bg-[#C9A96E] mx-auto mb-6" />
            <p className="text-lg text-[#6B6560] mb-6">
              Aucun résultat ne correspond à vos critères.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-6 py-3 bg-[#C9A96E] text-[#0A0A0A] text-sm font-body font-medium rounded-sm hover:bg-[#D4B87A] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && items.length > 0 && (
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {visibleItems.map((exhibition) => (
                <motion.div
                  key={exhibition.id}
                  layout
                  variants={staggerItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <ExhibitionCard
                    title={exhibition.title}
                    subtitle={exhibition.description}
                    dateRange={exhibition.dateRange}
                    image={exhibition.image}
                    tag={exhibition.type}
                    href={`/expositions#${exhibition.id}`}
                    variant="default"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* List View */}
        {viewMode === 'list' && items.length > 0 && (
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="flex flex-col gap-4"
          >
            <AnimatePresence mode="popLayout">
              {visibleItems.map((exhibition) => (
                <motion.div
                  key={exhibition.id}
                  layout
                  variants={staggerItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#FFFFFF] rounded-lg p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-500"
                >
                  <ExhibitionCard
                    title={exhibition.title}
                    subtitle={exhibition.description}
                    dateRange={exhibition.dateRange}
                    image={exhibition.image}
                    tag={exhibition.type}
                    href={`/expositions#${exhibition.id}`}
                    variant="compact"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Load more */}
        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={loadMore}
              className="inline-flex items-center px-8 py-3 border border-[#C9A96E] text-[#C9A96E] text-sm font-body font-medium rounded-sm hover:bg-[rgba(201,169,110,0.1)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
            >
              Charger plus
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Calendar CTA                                              */
/* ------------------------------------------------------------------ */
function CalendarCTASection() {
  const { ref, isInView } = useInView<HTMLDivElement>(0.2);

  return (
    <section
      ref={ref}
      className="bg-[#0A0A0A] py-16 md:py-20"
    >
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20 text-center">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0}
          variants={fadeUp}
          className="flex justify-center mb-6"
        >
          <Calendar
            size={48}
            strokeWidth={1.5}
            className="text-[#C9A96E]"
            aria-hidden="true"
          />
        </motion.div>

        <motion.h3
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0.15}
          variants={fadeUp}
          className="font-heading font-semibold text-[22px] leading-[1.25] md:text-[30px] md:leading-[1.25] text-[#F7F5F0] mb-4"
        >
          Ne manquez aucun événement
        </motion.h3>

        <motion.p
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0.25}
          variants={fadeUp}
          className="text-base font-body text-[#F7F5F0] opacity-65 max-w-[500px] mx-auto mb-8"
        >
          Téléchargez le calendrier complet de la saison ou synchronisez-le avec
          votre agenda.
        </motion.p>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0.35}
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 bg-transparent text-[#C9A96E] text-sm font-body font-medium rounded-sm border border-[#C9A96E] hover:bg-[rgba(201,169,110,0.1)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
          >
            Télécharger le calendrier PDF
          </a>
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 bg-transparent text-[#F7F5F0] text-sm font-body font-medium rounded-sm border border-[rgba(255,255,255,0.4)] hover:border-white hover:bg-[rgba(255,255,255,0.06)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
          >
            S'abonner au flux
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */
export default function Exhibitions() {
  const [activeStatus, setActiveStatus] = useState<StatusFilter>('Tout');
  const [activeType, setActiveType] = useState<TypeFilter>('Tous les types');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const filteredExhibitions = useMemo(() => {
    return exhibitions.filter((ex) => {
      const statusMatch =
        activeStatus === 'Tout' || ex.status === activeStatus;
      const typeMatch =
        activeType === 'Tous les types' || ex.type === activeType;
      return statusMatch && typeMatch;
    });
  }, [activeStatus, activeType]);

  return (
    <div>
      <HeroSection />
      <FilterBar
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        activeType={activeType}
        onTypeChange={setActiveType}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        resultCount={filteredExhibitions.length}
      />
      <ExhibitionGridSection
        viewMode={viewMode}
        exhibitions={filteredExhibitions}
      />
      <CalendarCTASection />
    </div>
  );
}
