import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Copy,
  Facebook,
  Mail,
} from 'lucide-react';
import ArtworkCard from '@/components/ArtworkCard';
import Button from '@/components/Button';
import Tag from '@/components/Tag';
import SectionHeader from '@/components/SectionHeader';
import { artworks, getArtworkById, getRelatedArtworks } from '@/data/artworksData';

/* ------------------------------------------------------------------ */
/*  Share dropdown options                                             */
/* ------------------------------------------------------------------ */

const shareOptions = [
  { key: 'copy', label: 'Copier le lien', icon: Copy },
  { key: 'facebook', label: 'Partager sur Facebook', icon: Facebook },
  { key: 'email', label: 'Envoyer par email', icon: Mail },
] as const;

/* ------------------------------------------------------------------ */
/*  Lightbox (Image Modal)                                            */
/* ------------------------------------------------------------------ */

interface LightboxProps {
  image: string;
  title: string;
  onClose: () => void;
}

function Lightbox({ image, title, onClose }: LightboxProps) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const panStart = useRef({ x: 0, y: 0 });

  /* Close on Escape */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  /* Wheel zoom */
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      setZoom((prev) => {
        const next = prev + (e.deltaY < 0 ? 0.25 : -0.25);
        return Math.max(1, Math.min(4, next));
      });
    },
    []
  );

  /* Pan handlers */
  const onPointerDown = (e: React.PointerEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    panStart.current = { ...pan };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging || zoom <= 1) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPan({
      x: panStart.current.x + dx,
      y: panStart.current.y + dy,
    });
  };

  const onPointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={[
        'fixed inset-0 z-[60] flex items-center justify-center',
        'bg-[rgba(10,10,10,0.95)] transition-opacity duration-300',
      ].join(' ')}
      role="dialog"
      aria-modal="true"
      aria-label={`Image agrandie : ${title}`}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className={[
          'absolute top-5 right-5 z-10 w-11 h-11 rounded-full',
          'bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)]',
          'flex items-center justify-center transition-colors',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]',
        ].join(' ')}
        aria-label="Fermer"
        type="button"
      >
        <X size={22} className="text-[#F7F5F0]" />
      </button>

      {/* Zoom instructions */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] font-mono text-[#F7F5F0] text-opacity-50 uppercase tracking-wider">
        Molette pour zoomer · Glisser pour déplacer · Échap pour fermer
      </div>

      {/* Image */}
      <div
        className="relative max-w-[95vw] max-h-[95vh] flex items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in' }}
      >
        <img
          src={image}
          alt={title}
          className="max-w-full max-h-[95vh] object-contain transition-transform duration-100"
          style={{
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
          }}
          draggable={false}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Provenance Timeline                                                */
/* ------------------------------------------------------------------ */

interface TimelineProps {
  events: string[];
}

function ProvenanceTimeline({ events }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-[#E8E4DC] -translate-x-1/2" />

      <div className="space-y-8 md:space-y-12">
        {events.map((event, i) => {
          const [year, ...textParts] = event.split(' — ');
          const text = textParts.join(' — ');
          const isLeft = i % 2 === 0;

          return (
            <div
              key={i}
              className={[
                'relative flex items-start gap-6 md:gap-0',
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse',
              ].join(' ')}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-[#C9A96E] border-2 border-[#F7F5F0] -translate-x-1/2 mt-1.5 z-10" />

              {/* Content card */}
              <div
                className={[
                  'ml-10 md:ml-0 md:w-[calc(50%-32px)]',
                  isLeft ? 'md:pr-0 md:mr-auto' : 'md:pl-0 md:ml-auto',
                ].join(' ')}
              >
                <div className="bg-[#F7F5F0] p-5 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                  <span className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] text-[#C9A96E]">
                    {year}
                  </span>
                  <p className="mt-2 text-sm font-body text-[#0A0A0A] leading-relaxed">
                    {text}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function ArtworkDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const artwork = id ? getArtworkById(id) : undefined;

  const [isFavorite, setIsFavorite] = useState(artwork?.isFavorite ?? false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  /* Favorite animation trigger */
  const [heartBounce, setHeartBounce] = useState(false);

  /* Description ref for scroll */
  const descRef = useRef<HTMLDivElement>(null);

  /* Sync favorite state when artwork changes */
  useEffect(() => {
    if (artwork) {
      setIsFavorite(artwork.isFavorite);
    }
  }, [artwork]);

  /* Close share dropdown on outside click */
  const shareRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShowShare(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  /* -- callbacks -- */
  const toggleFavorite = useCallback(() => {
    setIsFavorite((prev) => !prev);
    setHeartBounce(true);
    setTimeout(() => setHeartBounce(false), 350);
  }, []);

  const toggleRelatedFavorite = useCallback((relatedId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(relatedId)) next.delete(relatedId);
      else next.add(relatedId);
      return next;
    });
  }, []);

  const handleShare = useCallback(
    (key: string) => {
      const url = window.location.href;
      if (key === 'copy') {
        navigator.clipboard.writeText(url).catch(() => {});
      } else if (key === 'facebook') {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank',
          'width=600,height=400'
        );
      } else if (key === 'email') {
        window.location.href = `mailto:?subject=${encodeURIComponent(
          artwork?.title ?? 'Œuvre du Musée d\'Auréole'
        )}&body=${encodeURIComponent(url)}`;
      }
      setShowShare(false);
    },
    [artwork?.title]
  );

  /* -- handle navigation to prev/next artwork -- */
  const currentIndex = artworks.findIndex((a) => a.id === id);
  const prevId = currentIndex > 0 ? artworks[currentIndex - 1].id : null;
  const nextId =
    currentIndex < artworks.length - 1 ? artworks[currentIndex + 1].id : null;

  /* -- derived -- */
  const related = artwork ? getRelatedArtworks(artwork.relatedIds) : [];

  /* -- paragraphs split for progressive disclosure -- */
  const descriptionParagraphs = artwork
    ? artwork.description.split('\n\n')
    : [];
  const visibleParagraphs = descriptionExpanded
    ? descriptionParagraphs
    : descriptionParagraphs.slice(0, 2);

  /* -- 404 state -- */
  if (!artwork) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 bg-[#F7F5F0]">
        <div className="w-16 h-[2px] bg-[#C9A96E] mx-auto mb-6" />
        <h1 className="font-display font-semibold text-3xl text-[#0A0A0A] mb-4">
          Œuvre introuvable
        </h1>
        <p className="text-[#6B6560] font-body mb-8 text-center max-w-md">
          L&apos;œuvre que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link to="/collections">
          <Button variant="primary">Retour aux collections</Button>
        </Link>
      </div>
    );
  }

  /* -- render -- */
  return (
    <div className="bg-[#F7F5F0]">
      {/* ============================================================ */}
      {/*  Lightbox                                                    */}
      {/* ============================================================ */}
      {showLightbox && (
        <Lightbox
          image={artwork.image}
          title={artwork.title}
          onClose={() => setShowLightbox(false)}
        />
      )}

      {/* ============================================================ */}
      {/*  Section 1 — Breadcrumb + Toolbar                            */}
      {/* ============================================================ */}
      <div className="bg-[#F7F5F0] border-b border-[#E8E4DC]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Breadcrumb */}
            <nav aria-label="Fil d'Ariane">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs font-body text-[#6B6560]">
                <li>
                  <Link
                    to="/"
                    className="hover:text-[#0A0A0A] hover:underline transition-colors"
                  >
                    Accueil
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    to="/collections"
                    className="hover:text-[#0A0A0A] hover:underline transition-colors"
                  >
                    Collections
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    to={`/collections?department=${encodeURIComponent(artwork.department)}`}
                    className="hover:text-[#0A0A0A] hover:underline transition-colors"
                  >
                    {artwork.department}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li
                  className="text-[#0A0A0A] font-medium truncate max-w-[200px]"
                  aria-current="page"
                >
                  {artwork.title}
                </li>
              </ol>
            </nav>

            {/* Toolbar */}
            <div className="flex items-center gap-3">
              {/* Favorite */}
              <button
                onClick={toggleFavorite}
                className={[
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  'border transition-all duration-200',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]',
                  isFavorite
                    ? 'bg-[rgba(201,169,110,0.1)] border-[#C9A96E]'
                    : 'bg-transparent border-[#E8E4DC] hover:border-[#C9A96E]',
                ].join(' ')}
                aria-label={
                  isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'
                }
                aria-pressed={isFavorite}
                title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                type="button"
              >
                <Heart
                  size={18}
                  className={[
                    'transition-all',
                    heartBounce ? 'scale-130' : 'scale-100',
                    isFavorite ? 'text-[#C9A96E] fill-[#C9A96E]' : 'text-[#6B6560]',
                  ].join(' ')}
                  style={{
                    transform: heartBounce ? 'scale(1.3)' : 'scale(1)',
                    transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                />
              </button>

              {/* Share */}
              <div className="relative" ref={shareRef}>
                <button
                  onClick={() => setShowShare((v) => !v)}
                  className={[
                    'w-10 h-10 rounded-full flex items-center justify-center',
                    'border border-[#E8E4DC] hover:border-[#C9A96E]',
                    'bg-transparent hover:bg-[rgba(10,10,10,0.04)]',
                    'transition-all duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]',
                  ].join(' ')}
                  aria-label="Partager"
                  aria-expanded={showShare}
                  title="Partager"
                  type="button"
                >
                  <Share2 size={18} className="text-[#6B6560]" />
                </button>

                {showShare && (
                  <div
                    className={[
                      'absolute top-full right-0 mt-2 w-52 z-50',
                      'bg-white rounded-lg shadow-[0_12px_40px_rgba(0,0,0,0.12)]',
                      'border border-[#E8E4DC] overflow-hidden',
                      'animate-in fade-in slide-in-from-top-1 duration-200',
                    ].join(' ')}
                  >
                    {shareOptions.map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => handleShare(opt.key)}
                        className={[
                          'w-full flex items-center gap-3 px-4 py-3',
                          'text-sm font-body text-[#0A0A0A]',
                          'hover:bg-[#F7F5F0] transition-colors',
                        ].join(' ')}
                        type="button"
                      >
                        <opt.icon size={16} className="text-[#6B6560]" />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Section 2 — Artwork Hero (Image + Quick Info)               */}
      {/* ============================================================ */}
      <section className="bg-[#F7F5F0] pt-8 pb-12 md:pb-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left — Artwork Image */}
            <div className="lg:w-[60%]">
              <div
                className={[
                  'relative bg-white rounded-sm overflow-hidden',
                  'shadow-[0_12px_40px_rgba(0,0,0,0.12)]',
                  'group cursor-zoom-in',
                ].join(' ')}
                onClick={() => setShowLightbox(true)}
                role="button"
                tabIndex={0}
                aria-label="Cliquer pour agrandir l'image"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setShowLightbox(true);
                  }
                }}
              >
                <img
                  src={artwork.image}
                  alt={`${artwork.title} par ${artwork.artist}`}
                  className="w-full max-h-[75vh] object-contain"
                  loading="eager"
                />
                {/* Zoom hint overlay */}
                <div className="absolute inset-0 bg-[rgba(10,10,10,0)] group-hover:bg-[rgba(10,10,10,0.08)] transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-[#F7F5F0] text-xs font-mono uppercase tracking-wider bg-[rgba(10,10,10,0.5)] px-3 py-1.5 rounded-full transition-opacity duration-300">
                    Cliquer pour agrandir
                  </span>
                </div>

                {/* Navigation arrows */}
                {prevId && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/collections/${prevId}`);
                    }}
                    className={[
                      'absolute left-4 top-1/2 -translate-y-1/2',
                      'w-10 h-10 rounded-full bg-[rgba(10,10,10,0.4)]',
                      'hover:bg-[rgba(10,10,10,0.6)]',
                      'flex items-center justify-center transition-all',
                      'opacity-0 group-hover:opacity-100',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]',
                    ].join(' ')}
                    aria-label="Œuvre précédente"
                    type="button"
                  >
                    <ChevronLeft size={20} className="text-[#F7F5F0]" />
                  </button>
                )}
                {nextId && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/collections/${nextId}`);
                    }}
                    className={[
                      'absolute right-4 top-1/2 -translate-y-1/2',
                      'w-10 h-10 rounded-full bg-[rgba(10,10,10,0.4)]',
                      'hover:bg-[rgba(10,10,10,0.6)]',
                      'flex items-center justify-center transition-all',
                      'opacity-0 group-hover:opacity-100',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]',
                    ].join(' ')}
                    aria-label="Œuvre suivante"
                    type="button"
                  >
                    <ChevronRight size={20} className="text-[#F7F5F0]" />
                  </button>
                )}
              </div>
            </div>

            {/* Right — Quick Info Panel */}
            <div className="lg:w-[40%] lg:pl-0">
              <div className="lg:sticky lg:top-[120px]">
                {/* Department tag */}
                <Tag variant="gold-filled" className="mb-4">
                  {artwork.department}
                </Tag>

                {/* Title */}
                <h1 className="font-display font-semibold text-[32px] leading-[1.1] md:text-[42px] md:leading-[1.15] text-[#0A0A0A] text-balance">
                  {artwork.title}
                </h1>

                {/* Artist */}
                <p className="mt-3 font-heading font-medium text-xl md:text-2xl text-[#C9A96E]">
                  {artwork.artist}
                  <span className="text-[#6B6560] text-base ml-2">
                    ({artwork.artistDates})
                  </span>
                </p>

                {/* Date + Origin */}
                <p className="mt-2 text-base font-body text-[#6B6560]">
                  {artwork.date}
                </p>

                {/* Gold accent line */}
                <div className="w-10 h-[2px] bg-[#C9A96E] my-5" />

                {/* Medium + Dimensions */}
                <p className="text-sm font-body text-[#6B6560]">
                  {artwork.medium} · {artwork.dimensions}
                </p>

                {/* Inventory number */}
                <p className="mt-3 text-[11px] font-mono font-medium uppercase tracking-[0.1em] text-[#6B6560]">
                  {artwork.inventoryNumber}
                </p>

                {/* Location badge */}
                <div className="mt-4 inline-flex items-center gap-2 text-xs font-body text-[#6B6560] bg-[rgba(10,10,10,0.04)] px-3 py-2 rounded-full">
                  <MapPin size={14} className="text-[#C9A96E]" />
                  <span>Salle 712 — Grande Galerie</span>
                </div>

                {/* Action buttons */}
                <div className="mt-8 space-y-3">
                  <Button variant="primary" className="w-full">
                    Acheter un billet
                  </Button>
                  <Button variant="secondary" className="w-full">
                    Visite guidée de cette œuvre
                  </Button>
                  <Button
                    variant="ghost"
                    icon={<MapPin size={16} />}
                    iconPosition="left"
                    className="w-full justify-center"
                  >
                    Trouver dans le musée
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 3 — Description & Metadata                          */}
      {/* ============================================================ */}
      <section className="bg-[#F7F5F0] py-12 md:py-16 border-t border-[#E8E4DC]" ref={descRef}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left — Description */}
            <div className="lg:w-[65%]">
              {/* Section label */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-10 h-[1px] bg-[#C9A96E]" />
                <span className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] text-[#8A7550]">
                  À propos de cette œuvre
                </span>
              </div>

              <h2 className="font-display font-medium text-[28px] leading-[1.15] text-[#0A0A0A] mb-6">
                Description
              </h2>

              {/* Description paragraphs */}
              <div className="space-y-5">
                {visibleParagraphs.map((para, i) => (
                  <p
                    key={i}
                    className="text-base md:text-lg font-body text-[#0A0A0A] leading-[1.8]"
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Expand / Collapse */}
              {descriptionParagraphs.length > 2 && (
                <button
                  onClick={() => setDescriptionExpanded((v) => !v)}
                  className="mt-5 text-sm font-body font-medium text-[#C9A96E] hover:text-[#D4B87A] underline underline-offset-4 transition-colors"
                  type="button"
                >
                  {descriptionExpanded ? 'Réduire' : 'Lire la suite'}
                </button>
              )}
            </div>

            {/* Right — Metadata Table */}
            <div className="lg:w-[35%]">
              <div className="bg-white rounded-lg border border-[#E8E4DC] p-6">
                <h3 className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] text-[#8A7550] mb-4">
                  Informations
                </h3>

                <div className="divide-y divide-[#E8E4DC]">
                  {[
                    { label: 'Titre', value: artwork.title },
                    { label: 'Artiste', value: `${artwork.artist} (${artwork.artistDates})` },
                    { label: 'Date', value: artwork.date },
                    { label: 'Technique', value: artwork.medium },
                    { label: 'Dimensions', value: artwork.dimensions },
                    { label: "Numéro d'inventaire", value: artwork.inventoryNumber },
                    { label: 'Département', value: artwork.department },
                    { label: 'Période', value: artwork.period },
                    {
                      label: 'Salle',
                      value: '712 — Grande Galerie',
                    },
                  ].map((row) => (
                    <div key={row.label} className="py-3 flex flex-col gap-0.5">
                      <span className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] text-[#6B6560]">
                        {row.label}
                      </span>
                      <span className="text-sm font-body text-[#0A0A0A]">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 4 — Provenance Timeline                             */}
      {/* ============================================================ */}
      <section className="bg-white py-12 md:py-16 border-t border-[#E8E4DC]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          {/* Section label */}
          <div className="flex items-center gap-2 mb-4 justify-center">
            <span className="w-10 h-[1px] bg-[#C9A96E]" />
            <span className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] text-[#8A7550]">
              Parcours de l&apos;œuvre
            </span>
            <span className="w-10 h-[1px] bg-[#C9A96E]" />
          </div>

          <SectionHeader
            label=""
            title="Provenance"
            align="center"
            variant="light"
          />

          <div className="max-w-[900px] mx-auto">
            <ProvenanceTimeline events={artwork.provenance} />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 5 — Related Works                                   */}
      {/* ============================================================ */}
      {related.length > 0 && (
        <section className="bg-[#F7F5F0] py-12 md:py-16 border-t border-[#E8E4DC]">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
            {/* Section header */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-10 h-[1px] bg-[#C9A96E]" />
              <span className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] text-[#8A7550]">
                Poursuivre la découverte
              </span>
            </div>

            <SectionHeader
              label=""
              title="Œuvres similaires"
              subtitle="Dans la même période, le même département, ou du même artiste."
              align="left"
              variant="light"
            />

            {/* Horizontal scroll gallery */}
            <div
              className={[
                'flex gap-4 overflow-x-auto pb-4',
                'snap-x snap-mandatory scrollbar-thin',
              ].join(' ')}
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#C9A96E transparent',
              }}
            >
              {related.map((rel) => (
                <div
                  key={rel.id}
                  className="flex-shrink-0 w-[280px] md:w-[300px] snap-start"
                >
                  <Link
                    to={`/collections/${rel.id}`}
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] rounded-lg"
                    aria-label={`${rel.title} par ${rel.artist}`}
                  >
                    <ArtworkCard
                      id={rel.id}
                      title={rel.title}
                      artist={rel.artist}
                      date={rel.date}
                      image={rel.image}
                      medium={rel.medium}
                      isFavorite={favorites.has(rel.id)}
                      onFavoriteToggle={toggleRelatedFavorite}
                    />
                  </Link>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-10">
              <Link to="/collections">
                <Button variant="secondary">Explorer toute la collection</Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
