import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Ticket, ArrowRight, Play, Volume2, CheckCircle } from 'lucide-react';
import ExhibitionCard from '@/components/ExhibitionCard';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import Tag from '@/components/Tag';

/* ─── Data ─── */
const exhibitions = [
  {
    title: 'Dialogue des Corps — De la Renaissance au Baroque',
    subtitle:
      'Deux maîtres de la sculpture occidentale dialoguent à travers les siècles. Leurs œuvres incarnent la force du corps et la profondeur de l\'âme.',
    dateRange: 'Du 15 mars au 28 septembre 2025',
    image: '/expo-michelangelo-rodin.jpg',
    tag: 'Exposition',
  },
  {
    title: 'Martin Schongauer — Le Bel Immortel',
    subtitle:
      'A travers une large sélection d\'œuvres, découvrez le peintre, dessinateur et graveur virtuose, artiste germanique parmi les plus importants de la fin du Moyen Âge.',
    dateRange: 'Du 22 avril au 7 juillet 2025',
    image: '/expo-schongauer.jpg',
    tag: 'Exposition',
  },
  {
    title: 'L\'Eau Primordiale — Leçons de Mésopotamie',
    subtitle:
      'Traversée par les deux fleuves du paradis biblique, la Mésopotamie antique révèle les mythes et réalités de l\'eau dans la civilisation.',
    dateRange: 'Du 10 mai au 2 novembre 2025',
    image: '/expo-primordial-water.jpg',
    tag: 'Exposition',
  },
];

const events = [
  {
    title: 'Figures en Devenir — La poétique du non fini',
    type: 'Conférence',
    date: 'Mercredi 3 juin, 19h',
    description:
      'Table ronde autour des œuvres inachevées qui fascinent par leur mystère.',
  },
  {
    title: 'Le Chant des Statues',
    type: 'Cinéma',
    date: 'Vendredi 5 juin, 19h',
    description:
      'Projection documentaire suivie d\'une rencontre avec le réalisateur.',
  },
  {
    title: 'Rendez-vous aux Jardins 2026',
    type: 'Événement',
    date: '6–7 juin',
    description:
      'Programmation spéciale autour des jardins et de la thématique de la vue.',
  },
  {
    title: 'L\'Art du Portrait — Atelier Pratique',
    type: 'Atelier',
    date: 'Samedi 14 juin, 14h',
    description:
      'Initiation aux techniques du portrait à l\'huile, d\'après les maîtres anciens.',
  },
];

const mediaCards = [
  {
    title: 'Les Grands Formats Restaurés',
    type: 'Vidéo',
    episodes: '6 épisodes',
    image: '/louvre-plus-restoration.jpg',
  },
  {
    title: 'Les Odyssées — Le Podcast',
    type: 'Audio',
    episodes: '15 épisodes',
    image: '/louvre-plus-podcast.jpg',
  },
  {
    title: 'L\'Œuvre en Scène',
    type: 'Vidéo',
    episodes: '47 épisodes',
    image: '/louvre-plus-documentary.jpg',
  },
];

const discoverCards = [
  {
    title: 'Venir en famille',
    description:
      'Des parcours adaptés pour tous les âges, des ateliers créatifs et des contenus pédagogiques.',
    image: '/discover-family.jpg',
    href: '/visiter#famille',
  },
  {
    title: 'Visiter en fonction de votre handicap',
    description:
      'Accessibilité garantie : fauteuils roulants, boucles à induction, visites en LSF et sensibilisées.',
    image: '/discover-accessibility.jpg',
    href: '/visiter#accessibilite',
  },
  {
    title: 'Venir en groupe',
    description:
      'Visites guidées sur mesure pour les groupes, du petit comité aux grandes collectivités.',
    image: '/discover-group.jpg',
    href: '/visiter#groupes',
  },
  {
    title: 'Vous former et transmettre',
    description:
      'Formations pour les enseignants, ateliers scolaires et ressources éducatives en ligne.',
    image: '/discover-education.jpg',
    href: '/education',
  },
  {
    title: 'Ressources scientifiques',
    description:
      'Accédez aux publications, catalogues en ligne et corpus de recherche du musée.',
    image: '/discover-research.jpg',
    href: '/education#recherche',
  },
  {
    title: 'Devenir une entreprise mécène',
    description:
      'Associez votre entreprise à la transmission du patrimoine et bénéficiez d\'avantages exclusifs.',
    image: '/discover-patron.jpg',
    href: '/soutenir',
  },
];

const tagColors: Record<string, 'gold-filled' | 'outline-gold' | 'emerald-filled' | 'dark-filled' | 'light-filled'> = {
  'Conférence': 'gold-filled',
  'Cinéma': 'outline-gold',
  'Événement': 'emerald-filled',
  'Atelier': 'light-filled',
};

/* ─── Hero Section ─── */
function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoLoad = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-poster.jpg"
        onLoadedData={handleVideoLoad}
        aria-label="Vue immersive du hall principal du musée"
        className={[
          'absolute inset-0 w-full h-full object-cover',
          'transition-opacity duration-[1200ms]',
          videoLoaded ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.55) 70%, rgba(10,10,10,0.85) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-[900px] mx-auto">
        {/* Opening Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(45,106,79,0.85)] backdrop-blur-[8px] mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-[#F7F5F0] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F7F5F0]" />
          </span>
          <span className="text-[12px] font-body font-medium text-[#F7F5F0]">
            Ouvert aujourd'hui — de 9h à 18h
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-semibold text-[48px] leading-[1.0] md:text-[96px] md:leading-[1.0] text-[#F7F5F0] text-balance mb-6 tracking-[-0.03em]">
          Bienvenue au Musée d'Auréole
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl font-body font-light text-[#F7F5F0] text-opacity-85 max-w-[560px] mx-auto mb-10 leading-relaxed">
          Découvrez plus de 35 000 œuvres, des expositions temporaires et des
          événements uniques au cœur d'un patrimoine vivant.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/visiter"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#C9A96E] text-[#0A0A0A] text-sm font-body font-medium rounded-full hover:bg-[#D4B87A] hover:shadow-[0_4px_24px_rgba(201,169,110,0.25)] transition-all duration-200 w-full sm:w-auto justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
          >
            <Ticket size={18} strokeWidth={1.5} />
            Réserver un billet
          </Link>
          <Link
            to="/visiter"
            className="inline-flex items-center gap-2 px-8 py-3 bg-transparent text-[#F7F5F0] text-sm font-body font-medium rounded-full border border-[rgba(255,255,255,0.4)] hover:border-white hover:bg-[rgba(255,255,255,0.06)] transition-all duration-200 w-full sm:w-auto justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
          >
            Préparer sa visite
            <ArrowRight size={18} strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
        <div className="relative w-[1px] h-10 bg-[#F7F5F0] opacity-30 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#F7F5F0] animate-scroll-dot" />
        </div>
      </div>
    </section>
  );
}

/* ─── Featured Exhibitions Section ─── */
function FeaturedExhibitionsSection() {
  return (
    <section className="bg-[var(--bg-primary)] py-24 md:py-32">
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeader label="À LA UNE" title="Expositions & Événements" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exhibitions.map((expo, i) => (
            <ExhibitionCard
              key={i}
              title={expo.title}
              subtitle={expo.subtitle}
              dateRange={expo.dateRange}
              image={expo.image}
              tag={expo.tag}
              href="/expositions"
            />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button variant="secondary" href="/expositions">
            Toutes les expositions
            <ArrowRight size={16} strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─── Events Section ─── */
function EventsSection() {
  return (
    <section className="bg-[var(--bg-dark)] py-20">
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Column */}
          <div className="lg:w-[40%] lg:flex-shrink-0">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-10 h-[1px] bg-[#C9A96E]" />
              <span className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] text-[#C9A96E]">
                ÉVÉNEMENTS
              </span>
            </div>
            <h2 className="font-display font-semibold text-[28px] leading-[1.15] md:text-[42px] md:leading-[1.15] text-[#F7F5F0] mb-4 text-balance">
              Au programme ce mois-ci
            </h2>
            <p className="text-base font-body text-[#F7F5F0] text-opacity-70 leading-relaxed mb-6">
              Conférences, projections, ateliers et rencontres — une
              programmation riche pour approfondir votre découverte des
              collections.
            </p>
            <Button variant="outline-light" href="/expositions">
              Voir le calendrier
              <ArrowRight size={16} strokeWidth={1.5} />
            </Button>
          </div>

          {/* Right Column: Horizontal Scroll */}
          <div
            className="lg:w-[60%] flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            role="region"
            aria-label="Événements à venir"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {events.map((event, i) => (
              <div
                key={i}
                className="min-w-[300px] max-w-[320px] snap-start flex-shrink-0"
              >
                <div className="flex gap-4 items-start">
                  {/* Color block for event type */}
                  <div className="w-[80px] h-[80px] flex-shrink-0 rounded-md bg-[#1C1814] flex items-center justify-center">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#C9A96E] text-center px-1">
                      {event.type}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <Tag variant={tagColors[event.type] || 'gold-filled'} className="mb-2">
                      {event.type}
                    </Tag>
                    <h4 className="font-heading font-medium text-base leading-snug text-[#F7F5F0] line-clamp-2 mb-1">
                      {event.title}
                    </h4>
                    <p className="text-[11px] font-mono text-[#C9A96E] mb-1">
                      {event.date}
                    </p>
                    <p className="text-sm text-[#F7F5F0] text-opacity-60 line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

/* ─── Media (Musée+) Section ─── */
function MediaSection() {
  return (
    <section className="bg-[var(--bg-primary)] py-24 md:py-32">
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeader
          label="MUSÉE+"
          title="Plongez au cœur du musée"
          subtitle="Restaurations, podcasts, documentaires — découvrez les coulisses et les histoires derrière les œuvres."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mediaCards.map((card, i) => (
            <Link
              key={i}
              to="#"
              className="group block rounded-lg overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
              aria-label={`${card.title} — ${card.episodes}`}
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                {/* Play Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[rgba(10,10,10,0.6)] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[rgba(10,10,10,0.75)]">
                    {card.type === 'Audio' ? (
                      <Volume2 size={24} className="text-[#F7F5F0]" />
                    ) : (
                      <Play size={24} className="text-[#F7F5F0] ml-1" />
                    )}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(201,169,110,0.1)] text-[11px] font-body font-medium uppercase tracking-[0.05em] text-[#8A7550]">
                    {card.type === 'Audio' ? (
                      <Volume2 size={12} />
                    ) : (
                      <Play size={12} />
                    )}
                    {card.type}
                  </span>
                </div>
                <span className="text-[12px] font-body text-[#6B6560]">
                  {card.episodes}
                </span>
              </div>
              <h4 className="mt-2 font-heading font-medium text-lg text-[#0A0A0A] line-clamp-1">
                {card.title}
              </h4>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button variant="secondary" href="#">
            Plus de contenus
            <ArrowRight size={16} strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─── Discover Section ─── */
function DiscoverSection() {
  return (
    <section className="bg-[var(--bg-dark)] py-24 md:py-32">
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeader
          label="DÉCOUVRIR"
          title="Votre visite sur mesure"
          subtitle="Que vous veniez en famille, en groupe, pour vous former ou pour soutenir — trouvez votre chemin."
          align="center"
          variant="dark"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {discoverCards.map((card, i) => (
            <Link
              key={i}
              to={card.href}
              className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] rounded-lg"
              aria-label={card.title}
            >
              <div className="relative aspect-[3/2] overflow-hidden rounded-lg mb-4">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[rgba(10,10,10,0)] group-hover:bg-[rgba(10,10,10,0.5)] transition-all duration-300" />
              </div>
              <h3 className="font-heading font-semibold text-xl md:text-[22px] text-[#F7F5F0] mb-2 transition-transform duration-300 group-hover:-translate-y-1">
                {card.title}
              </h3>
              <p className="text-sm text-[#F7F5F0] text-opacity-60 line-clamp-2">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Immersive Quote Section ─── */
function QuoteSection() {
  return (
    <section
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-fixed bg-center bg-cover"
      style={{ backgroundImage: 'url(/artwork-delacroix.jpg)' }}
      aria-label="Citation inspirante d'Edgar Degas sur l'art"
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[rgba(10,10,10,0.5)]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-[800px] mx-auto">
        <blockquote>
          <p className="font-display font-medium italic text-[32px] leading-[1.2] md:text-[56px] md:leading-[1.15] text-[#F7F5F0] text-balance mb-6">
            &ldquo;L'art n'est pas ce que vous voyez, mais ce que vous faites voir aux autres.&rdquo;
          </p>
          <footer className="text-lg text-[#C9A96E] font-heading">
            — Edgar Degas
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

/* ─── Newsletter Section ─── */
function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
    }
  };

  return (
    <section className="bg-[var(--bg-primary)] py-20">
      <div className="max-w-[600px] mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-10 h-[1px] bg-[#8A7550]" />
          <span className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] text-[#8A7550]">
            RESTONS EN CONTACT
          </span>
          <span className="w-10 h-[1px] bg-[#8A7550]" />
        </div>
        <h3 className="font-display font-semibold text-[24px] md:text-[30px] leading-tight text-[#0A0A0A] mb-4">
          Recevez les nouvelles du musée
        </h3>
        <p className="text-base text-[#6B6560] mb-8">
          Expositions, événements, nouvelles acquisitions — ne manquez rien de
          la vie du musée.
        </p>

        {isSubmitted ? (
          <div
            className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300"
            aria-live="polite"
          >
            <CheckCircle size={48} className="text-[#C9A96E]" />
            <p className="text-lg font-heading font-medium text-[#0A0A0A]">
              Merci pour votre inscription !
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Votre adresse e-mail
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse e-mail"
              required
              aria-describedby="newsletter-privacy"
              className="flex-1 px-4 py-3.5 rounded-sm border border-[#E8E4DC] bg-white text-sm font-body text-[#0A0A0A] placeholder:text-[#6B6560] focus:border-[#C9A96E] focus:shadow-[0_4px_24px_rgba(201,169,110,0.25)] focus:outline-none transition-all duration-200"
            />
            <Button
              type="submit"
              variant="primary"
              className="whitespace-nowrap"
            >
              S&apos;inscrire
            </Button>
          </form>
        )}

        <p
          id="newsletter-privacy"
          className="mt-4 text-[12px] text-[#6B6560]"
        >
          En vous inscrivant, vous acceptez notre{' '}
          <a
            href="#"
            className="underline hover:text-[#0A0A0A] transition-colors"
          >
            politique de confidentialité
          </a>
          .
        </p>
      </div>
    </section>
  );
}

/* ─── Home Page ─── */
export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedExhibitionsSection />
      <EventsSection />
      <MediaSection />
      <DiscoverSection />
      <QuoteSection />
      <NewsletterSection />
    </div>
  );
}
