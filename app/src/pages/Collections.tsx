import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, Grid3X3, List, X, ChevronDown } from 'lucide-react';
import ArtworkCard from '@/components/ArtworkCard';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import {
  artworks,
  departments,
  periods,
  techniques,
} from '@/data/artworksData';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FilterState {
  department: string;
  period: string;
  technique: string;
}

type ViewMode = 'grid' | 'list';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const INITIAL_COUNT = 12;
const LOAD_MORE_COUNT = 8;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function matchesFilters(
  artwork: (typeof artworks)[0],
  filters: FilterState,
  search: string
): boolean {
  // Search text
  if (search.trim()) {
    const q = search.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
    const haystack = `${artwork.title} ${artwork.artist} ${artwork.department} ${artwork.medium}`
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '');
    if (!haystack.includes(q)) return false;
  }

  if (filters.department !== 'Tous' && filters.department !== artwork.department)
    return false;
  if (filters.period !== 'Toutes' && filters.period !== artwork.period)
    return false;
  if (filters.technique !== 'Toutes') {
    const t = filters.technique.toLowerCase();
    const match =
      artwork.technique.toLowerCase().includes(t) ||
      artwork.medium.toLowerCase().includes(t);
    if (!match) return false;
  }

  return true;
}

/* ------------------------------------------------------------------ */
/*  Dropdown component                                                  */
/* ------------------------------------------------------------------ */

interface FilterDropdownProps {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}

function FilterDropdown({ label, options, value, onChange }: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const display = value === 'Tous' || value === 'Toutes' ? label : value;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={[
          'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body font-medium',
          'border transition-all duration-200 whitespace-nowrap',
          open || (value !== 'Tous' && value !== 'Toutes')
            ? 'bg-[#C9A96E] bg-opacity-10 border-[#C9A96E] text-[#0A0A0A]'
            : 'bg-transparent border-[#E8E4DC] text-[#6B6560] hover:border-[#C9A96E]',
        ].join(' ')}
        aria-expanded={open}
        aria-haspopup="listbox"
        type="button"
      >
        {display}
        <ChevronDown
          size={14}
          className={['transition-transform duration-200', open ? 'rotate-180' : ''].join(' ')}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <ul
            role="listbox"
            className={[
              'absolute top-full left-0 mt-2 min-w-[180px] z-40',
              'bg-white rounded-lg shadow-[0_12px_40px_rgba(0,0,0,0.12)]',
              'border border-[#E8E4DC] overflow-hidden',
            ].join(' ')}
          >
            {options.map((opt) => (
              <li key={opt}>
                <button
                  role="option"
                  aria-selected={value === opt}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className={[
                    'w-full text-left px-4 py-2.5 text-sm font-body transition-colors',
                    value === opt
                      ? 'bg-[#C9A96E] bg-opacity-10 text-[#0A0A0A] font-medium'
                      : 'text-[#6B6560] hover:bg-[#F7F5F0]',
                  ].join(' ')}
                  type="button"
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function Collections() {
  /* -- state -- */
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    department: 'Tous',
    period: 'Toutes',
    technique: 'Toutes',
  });
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  /* -- callbacks -- */
  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleFilterChange = useCallback(
    (key: keyof FilterState) => (value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
      setVisibleCount(INITIAL_COUNT);
    },
    []
  );

  const clearFilters = useCallback(() => {
    setFilters({ department: 'Tous', period: 'Toutes', technique: 'Toutes' });
    setSearch('');
    setVisibleCount(INITIAL_COUNT);
  }, []);

  /* -- derived data -- */
  const filtered = useMemo(
    () => artworks.filter((a) => matchesFilters(a, filters, search)),
    [filters, search]
  );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const hasActiveFilters =
    filters.department !== 'Tous' ||
    filters.period !== 'Toutes' ||
    filters.technique !== 'Toutes' ||
    search.trim() !== '';

  const activeFilterPills = useMemo(() => {
    const pills: { key: string; label: string }[] = [];
    if (filters.department !== 'Tous')
      pills.push({ key: 'dep', label: filters.department });
    if (filters.period !== 'Toutes')
      pills.push({ key: 'per', label: filters.period });
    if (filters.technique !== 'Toutes')
      pills.push({ key: 'tec', label: filters.technique });
    if (search.trim())
      pills.push({ key: 'search', label: `Recherche : "${search}"` });
    return pills;
  }, [filters, search]);

  /* -- render -- */
  return (
    <div>
      {/* ============================================================ */}
      {/*  Section 1 — Hero                                            */}
      {/* ============================================================ */}
      <section
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ minHeight: '40vh' }}
      >
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/artwork-venus.jpg"
            alt=""
            className="w-full h-full object-cover object-[center_30%]"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.8) 100%)',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 py-16 md:py-24 max-w-[800px] mx-auto">
          {/* Label */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-10 h-[1px] bg-[#C9A96E]" />
            <span className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] text-[#C9A96E]">
              Collections
            </span>
            <span className="w-10 h-[1px] bg-[#C9A96E]" />
          </div>

          {/* Title */}
          <h1 className="font-display font-semibold text-[32px] leading-[1.1] md:text-[56px] md:leading-[1.1] text-[#F7F5F0] text-balance">
            Les œuvres du musée
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base md:text-lg leading-relaxed text-[#F7F5F0] text-opacity-70 max-w-[520px] mx-auto">
            Plus de 35 000 œuvres à découvrir, de l&apos;Antiquité à 1848.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-[600px] mx-auto">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-[#C9A96E] pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setVisibleCount(INITIAL_COUNT);
                }}
                placeholder="Rechercher une œuvre, un artiste, une période..."
                className={[
                  'w-full pl-[52px] pr-6 py-4 rounded-full',
                  'bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.2)]',
                  'text-[#F7F5F0] text-base md:text-lg font-body placeholder:text-[rgba(247,245,240,0.45)]',
                  'transition-all duration-300',
                  'focus:bg-[rgba(255,255,255,0.18)] focus:border-[#C9A96E]',
                  'focus:shadow-[0_4px_24px_rgba(201,169,110,0.25)] focus:outline-none',
                ].join(' ')}
                aria-label="Rechercher une œuvre, un artiste, une période"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 2 — Filter & Sort Bar                               */}
      {/* ============================================================ */}
      <div className="sticky top-[72px] z-40 bg-[#F7F5F0]/90 backdrop-blur-[8px] border-b border-[#E8E4DC]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Left — Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <FilterDropdown
                label="Département"
                options={departments}
                value={filters.department}
                onChange={handleFilterChange('department')}
              />
              <FilterDropdown
                label="Période"
                options={periods}
                value={filters.period}
                onChange={handleFilterChange('period')}
              />
              <FilterDropdown
                label="Technique"
                options={techniques}
                value={filters.technique}
                onChange={handleFilterChange('technique')}
              />
            </div>

            {/* Right — Count + View Toggle */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-body text-[#6B6560] hidden sm:inline">
                {filtered.length} œuvre{filtered.length !== 1 ? 's' : ''}
              </span>

              <div
                className="flex items-center border border-[#E8E4DC] rounded-full overflow-hidden"
                role="group"
                aria-label="Changer l'affichage"
              >
                <button
                  onClick={() => setViewMode('grid')}
                  className={[
                    'p-2 transition-colors',
                    viewMode === 'grid'
                      ? 'bg-[#0A0A0A] text-[#F7F5F0]'
                      : 'bg-transparent text-[#6B6560] hover:text-[#0A0A0A]',
                  ].join(' ')}
                  aria-label="Affichage grille"
                  aria-pressed={viewMode === 'grid'}
                  type="button"
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={[
                    'p-2 transition-colors',
                    viewMode === 'list'
                      ? 'bg-[#0A0A0A] text-[#F7F5F0]'
                      : 'bg-transparent text-[#6B6560] hover:text-[#0A0A0A]',
                  ].join(' ')}
                  aria-label="Affichage liste"
                  aria-pressed={viewMode === 'list'}
                  type="button"
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-[#E8E4DC]">
              {activeFilterPills.map((pill) => (
                <span
                  key={pill.key}
                  className={[
                    'inline-flex items-center gap-1.5 px-3 py-1 rounded-full',
                    'text-xs font-body text-[#0A0A0A]',
                    'bg-[#C9A96E] bg-opacity-10 border border-[#C9A96E]',
                  ].join(' ')}
                >
                  {pill.label}
                  <button
                    onClick={() => {
                      if (pill.key === 'dep') handleFilterChange('department')('Tous');
                      else if (pill.key === 'per') handleFilterChange('period')('Toutes');
                      else if (pill.key === 'tec') handleFilterChange('technique')('Toutes');
                      else if (pill.key === 'search') setSearch('');
                    }}
                    className="hover:text-[#C9A96E] transition-colors"
                    aria-label={`Supprimer le filtre ${pill.label}`}
                    type="button"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
              <button
                onClick={clearFilters}
                className="text-xs font-body text-[#6B6560] hover:text-[#C9A96E] underline transition-colors ml-2"
                type="button"
              >
                Effacer tout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Section 3 — Artwork Grid                                    */}
      {/* ============================================================ */}
      <section className="bg-[#F7F5F0] pt-8 pb-20 md:pb-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          {/* Empty state */}
          {visible.length === 0 && (
            <div className="text-center py-24">
              <div className="w-16 h-[2px] bg-[#C9A96E] mx-auto mb-6" />
              <p className="text-lg font-body text-[#0A0A0A] mb-2">
                Aucune œuvre ne correspond à votre recherche.
              </p>
              <p className="text-sm font-body text-[#6B6560] mb-6">
                Essayez avec d&apos;autres mots-clés ou filtres.
              </p>
              <Button variant="secondary" onClick={clearFilters}>
                Réinitialiser la recherche
              </Button>
            </div>
          )}

          {/* Grid */}
          {visible.length > 0 && viewMode === 'grid' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {visible.map((artwork, index) => {
                const isFeatured = index === 0 || index === 4 || index === 9;
                return (
                  <div
                    key={artwork.id}
                    className={[
                      isFeatured ? 'col-span-2 row-span-2' : '',
                      'group',
                    ].join(' ')}
                  >
                    <Link
                      to={`/collections/${artwork.id}`}
                      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] rounded-lg"
                      aria-label={`${artwork.title} par ${artwork.artist}`}
                    >
                      {isFeatured ? (
                        /* Featured card — larger */
                        <div className="relative h-full">
                          <div className="relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden rounded-lg">
                            <img
                              src={artwork.image}
                              alt={`${artwork.title} par ${artwork.artist}`}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                              loading="lazy"
                            />
                            {/* Gold corner accent */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C9A96E] rounded-tl-lg" />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.85)] via-[rgba(10,10,10,0.3)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                              <p className="text-[#F7F5F0] font-heading font-medium text-lg leading-snug mb-1">
                                {artwork.title}
                              </p>
                              <p className="text-[#F7F5F0] text-opacity-80 text-sm font-body">
                                {artwork.artist}, {artwork.date}
                              </p>
                              <p className="text-[#C9A96E] text-xs font-mono mt-1 uppercase tracking-wider">
                                {artwork.medium}
                              </p>
                            </div>
                            {/* Favorite */}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleFavorite(artwork.id);
                              }}
                              className={[
                                'absolute top-4 right-4 w-9 h-9 rounded-full',
                                'bg-[rgba(10,10,10,0.5)] flex items-center justify-center',
                                'transition-all duration-300',
                                'hover:bg-[rgba(10,10,10,0.7)]',
                                'opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100',
                              ].join(' ')}
                              aria-label={
                                favorites.has(artwork.id)
                                  ? 'Retirer des favoris'
                                  : 'Ajouter aux favoris'
                              }
                              type="button"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill={favorites.has(artwork.id) ? '#C9A96E' : 'none'}
                                stroke={favorites.has(artwork.id) ? '#C9A96E' : '#F7F5F0'}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Standard card */
                        <ArtworkCard
                          id={artwork.id}
                          title={artwork.title}
                          artist={artwork.artist}
                          date={artwork.date}
                          image={artwork.image}
                          medium={artwork.medium}
                          isFavorite={favorites.has(artwork.id)}
                          onFavoriteToggle={toggleFavorite}
                        />
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>
          )}

          {/* List view */}
          {visible.length > 0 && viewMode === 'list' && (
            <div className="flex flex-col gap-4">
              {visible.map((artwork) => (
                <Link
                  key={artwork.id}
                  to={`/collections/${artwork.id}`}
                  className={[
                    'flex gap-5 p-4 rounded-lg bg-white border border-[#E8E4DC]',
                    'hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-300',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]',
                  ].join(' ')}
                  aria-label={`${artwork.title} par ${artwork.artist}`}
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-md overflow-hidden">
                    <img
                      src={artwork.image}
                      alt={`${artwork.title} par ${artwork.artist}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-medium text-lg text-[#0A0A0A] line-clamp-1">
                      {artwork.title}
                    </h3>
                    <p className="text-[#C9A96E] font-heading text-base mt-0.5">
                      {artwork.artist}
                    </p>
                    <p className="text-sm text-[#6B6560] font-body mt-1">
                      {artwork.date} · {artwork.medium}
                    </p>
                    <p className="text-xs text-[#6B6560] font-mono uppercase tracking-wider mt-2">
                      {artwork.department} · {artwork.inventoryNumber}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(artwork.id);
                    }}
                    className={[
                      'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
                      'border border-[#E8E4DC] hover:border-[#C9A96E] transition-colors',
                      favorites.has(artwork.id)
                        ? 'bg-[rgba(201,169,110,0.1)]'
                        : 'bg-transparent',
                    ].join(' ')}
                    aria-label={
                      favorites.has(artwork.id)
                        ? 'Retirer des favoris'
                        : 'Ajouter aux favoris'
                    }
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill={favorites.has(artwork.id) ? '#C9A96E' : 'none'}
                      stroke={favorites.has(artwork.id) ? '#C9A96E' : '#6B6560'}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </button>
                </Link>
              ))}
            </div>
          )}

          {/* Load More */}
          {hasMore && (
            <div className="text-center mt-12">
              <Button
                variant="secondary"
                onClick={() => setVisibleCount((c) => c + LOAD_MORE_COUNT)}
              >
                Charger plus d&apos;œuvres
              </Button>
            </div>
          )}

          {/* End message */}
          {!hasMore && visible.length > 0 && visible.length >= INITIAL_COUNT && (
            <p className="text-center mt-12 text-sm text-[#6B6560] font-body">
              Vous avez vu toutes les œuvres
            </p>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 4 — CTA Banner                                      */}
      {/* ============================================================ */}
      <section className="bg-[#0A0A0A] py-16 md:py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <SectionHeader
            label="Explorer"
            title="Vous ne trouvez pas ce que vous cherchez ?"
            subtitle="Consultez le corpus scientifique complet ou contactez notre service de documentation."
            align="center"
            variant="dark"
          />
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="secondary">Explorer le corpus</Button>
            <Button variant="outline-light">Contacter la documentation</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
