import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Database,
  Headphones,
  BookOpen,
  Monitor,
  Download,
  ChevronDown,
} from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import Tag from '@/components/Tag';
import {
  teacherResources,
  workshops,
  onlineResources,
  researchTools,
  teacherBenefits,
  educationStats,
} from '@/data/educationData';
import type { Workshop, OnlineResource } from '@/data/educationData';

/* ─── Hero Section ─── */
function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <section
      className="relative min-h-[45vh] w-full flex items-center justify-center overflow-hidden"
      aria-label="En-tête de la page Éducation"
    >
      {/* Background Image */}
      <img
        src="/education-workshop.jpg"
        alt="Atelier éducatif au musée avec des enfants peignant"
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
            'linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.7) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-[800px] mx-auto">
        {/* Section Label */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] text-[#C9A96E]">
            ÉDUCATION & TRANSMISSION
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display font-semibold text-[32px] leading-[1.1] md:text-[56px] md:leading-[1.1] text-[#F7F5F0] text-balance mb-6 tracking-[-0.03em]">
          Apprendre au musée
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg font-body font-normal text-[#F7F5F0] text-opacity-70 max-w-[600px] mx-auto leading-relaxed">
          Des ressources pour tous les âges et tous les publics — enseignants,
          étudiants, familles et chercheurs.
        </p>
      </div>
    </section>
  );
}

/* ─── For Teachers Section ─── */
function TeachersSection() {
  return (
    <section className="bg-[var(--bg-primary)] py-20 md:py-[80px]">
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column — Text */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-10 h-[1px] bg-[#C9A96E]" />
              <span className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] text-[#8A7550]">
                POUR LES ENSEIGNANTS
              </span>
            </div>
            <h2 className="font-display font-semibold text-[28px] leading-[1.15] md:text-[42px] md:leading-[1.15] text-[#0A0A0A] mb-4 text-balance">
              Des ressources pédagogiques pour la classe
            </h2>
            <p className="text-base md:text-lg font-body text-[#6B6560] leading-relaxed mb-6">
              Le musée propose aux enseignants du primaire au supérieur des
              ressources documentaires, des parcours thématiques et des
              formations continues pour préparer et enrichir la visite des
              élèves.
            </p>

            {/* Benefits List */}
            <ul className="space-y-3 mb-8" aria-label="Avantages pour les enseignants">
              {teacherBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle
                    size={18}
                    strokeWidth={1.5}
                    className="text-[#C9A96E] flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-body text-[#0A0A0A]">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            <Button variant="primary">
              Accéder aux ressources enseignants
              <ArrowRight size={16} strokeWidth={1.5} />
            </Button>
          </div>

          {/* Right Column — Image + Stats */}
          <div>
            <div className="overflow-hidden rounded-radius-lg shadow-md mb-8">
              <img
                src="/discover-education.jpg"
                alt="Salle de classe avec des étudiants dessinant d'après des sculptures"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-4"
              role="region"
              aria-label="Statistiques éducatives"
            >
              {educationStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display font-semibold text-[28px] md:text-[36px] leading-[1.0] text-[#C9A96E]">
                    {stat.value}
                  </p>
                  <p className="text-[11px] font-body font-medium text-[#6B6560] mt-1 leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Downloadable Resources */}
        <div className="mt-16 md:mt-20">
          <h3 className="font-heading font-semibold text-[22px] md:text-[30px] leading-[1.25] text-[#0A0A0A] mb-6">
            Ressources téléchargeables
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {teacherResources.map((resource, index) => (
              <div
                key={index}
                className={[
                  'bg-[#FFFFFF] p-5 rounded-radius-md shadow-sm border border-[#E8E4DC]',
                  'transition-all duration-300 hover:shadow-md',
                ].join(' ')}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Tag variant="gold-filled" className="text-[10px]">
                    {resource.type}
                  </Tag>
                </div>
                <h4 className="font-heading font-medium text-[16px] leading-[1.35] text-[#0A0A0A] mb-2 line-clamp-2">
                  {resource.title}
                </h4>
                <p className="text-[12px] font-body text-[#6B6560] leading-relaxed mb-3 line-clamp-3">
                  {resource.description}
                </p>
                <p className="text-[11px] font-body text-[#8A7550] mb-3">
                  {resource.downloadCount}
                </p>
                <button
                  className={[
                    'inline-flex items-center gap-1.5 text-[11px] font-body font-medium',
                    'text-[#C9A96E] hover:text-[#D4B87A] transition-colors',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2',
                  ].join(' ')}
                  aria-label={`Télécharger ${resource.title}`}
                >
                  <Download size={14} strokeWidth={1.5} />
                  Télécharger
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Workshops & Guided Tours Section ─── */
function WorkshopsSection() {
  return (
    <section className="bg-[var(--bg-dark)] py-20 md:py-[80px]">
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeader
          label="ATELIERS & VISITES"
          title="Vivez le musée autrement"
          align="center"
          variant="dark"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.slice(0, 3).map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkshopCard({ workshop }: { workshop: Workshop }) {
  return (
    <div
      className={[
        'group rounded-radius-md overflow-hidden',
        'transition-all duration-300',
        'hover:border-[#C9A96E]',
      ].join(' ')}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden rounded-radius-md">
        <img
          src={workshop.image}
          alt={workshop.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="pt-5 pb-2">
        <Tag variant="outline-gold" className="mb-3">
          {workshop.audience}
        </Tag>
        <h4 className="font-heading font-medium text-[22px] leading-[1.35] text-[#F7F5F0] mb-2">
          {workshop.title}
        </h4>
        <p className="text-sm font-body text-[#F7F5F0] text-opacity-60 leading-relaxed line-clamp-3 mb-3">
          {workshop.description}
        </p>
        <div className="flex items-center gap-1.5 mb-4">
          <Clock size={14} strokeWidth={1.5} className="text-[#C9A96E]" aria-hidden="true" />
          <span className="text-[11px] font-body font-medium text-[#C9A96E] uppercase tracking-[0.05em]">
            {workshop.duration}
          </span>
          <span className="text-[11px] font-body text-[#F7F5F0] text-opacity-40 ml-2">
            {workshop.price}
          </span>
        </div>
        <Button variant="secondary" size="sm">
          Réserver
        </Button>
      </div>
    </div>
  );
}

/* ─── Online Resources Section ─── */
function OnlineResourcesSection() {
  return (
    <section className="bg-[var(--bg-primary)] py-20 md:py-[80px]">
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeader
          label="RESSOURCES EN LIGNE"
          title="Apprenez où que vous soyez"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {onlineResources.map((resource, index) => (
            <OnlineResourceCard key={index} resource={resource} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OnlineResourceCard({ resource }: { resource: OnlineResource }) {
  const renderIcon = () => {
    const className = "text-[#C9A96E] transition-transform duration-300 group-hover:scale-110";
    switch (resource.icon) {
      case 'database':
        return <Database size={40} strokeWidth={1.5} className={className} aria-hidden="true" />;
      case 'headphones':
        return <Headphones size={40} strokeWidth={1.5} className={className} aria-hidden="true" />;
      case 'book-open':
        return <BookOpen size={40} strokeWidth={1.5} className={className} aria-hidden="true" />;
      case 'monitor':
        return <Monitor size={40} strokeWidth={1.5} className={className} aria-hidden="true" />;
      default:
        return <Database size={40} strokeWidth={1.5} className={className} aria-hidden="true" />;
    }
  };

  const linkContent = (
    <>
      <div className="mb-4 transition-transform duration-300 group-hover:-translate-y-1">
        {renderIcon()}
      </div>
      <h4 className="font-heading font-medium text-[22px] leading-[1.35] text-[#0A0A0A] mb-2">
        {resource.title}
      </h4>
      <p className="text-sm font-body text-[#6B6560] leading-relaxed mb-4">
        {resource.description}
      </p>
      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium uppercase tracking-[0.1em] text-[#C9A96E] group-hover:gap-2 transition-all duration-200">
        Explorer
        <ArrowRight size={12} strokeWidth={1.5} />
      </span>
    </>
  );

  const className = [
    'group block bg-[#FFFFFF] p-6 rounded-radius-md shadow-sm',
    'transition-all duration-300 hover:shadow-md',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2',
  ].join(' ');

  if (resource.isExternal) {
    return (
      <a
        href={resource.link}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={`${resource.title} — ouvre dans un nouvel onglet`}
      >
        {linkContent}
      </a>
    );
  }

  return (
    <Link
      to={resource.link}
      className={className}
      aria-label={resource.title}
    >
      {linkContent}
    </Link>
  );
}

/* ─── Research Section ─── */
function ResearchSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section id="recherche" className="bg-[var(--bg-card)] py-20 md:py-[80px]">
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeader
          label="RECHERCHE"
          title="Ressources scientifiques et corpus"
          subtitle="Le musée met à disposition de la communauté scientifique des outils de recherche avancés."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left — Research Tools Accordion */}
          <div>
            <div className="border-t border-[#E8E4DC]">
              {researchTools.map((tool, index) => (
                <div
                  key={index}
                  className="border-b border-[#E8E4DC]"
                  role="region"
                  aria-label={tool.title}
                >
                  <button
                    role="button"
                    aria-expanded={openIndex === index}
                    onClick={() => handleToggle(index)}
                    className={[
                      'w-full flex items-center justify-between py-5 px-1 text-left',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2',
                      'transition-colors duration-200 hover:bg-[rgba(201,169,110,0.02)]',
                    ].join(' ')}
                  >
                    <h4 className="font-heading font-medium text-[18px] md:text-[22px] leading-[1.35] text-[#0A0A0A] pr-4">
                      {tool.title}
                    </h4>
                    <ChevronDown
                      size={20}
                      strokeWidth={1.5}
                      className={[
                        'text-[#6B6560] flex-shrink-0 transition-transform duration-400',
                        openIndex === index ? 'rotate-180' : 'rotate-0',
                      ].join(' ')}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-400 ease-out"
                    style={{
                      maxHeight: openIndex === index ? '300px' : '0px',
                      opacity: openIndex === index ? 1 : 0,
                    }}
                  >
                    <div className="pb-5 px-1">
                      <p className="text-base font-body leading-[1.7] text-[#6B6560]">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Button variant="secondary">
                Accéder au portail de recherche
                <ArrowRight size={16} strokeWidth={1.5} />
              </Button>
            </div>
          </div>

          {/* Right — Image */}
          <div className="overflow-hidden rounded-radius-lg shadow-md">
            <img
              src="/discover-research.jpg"
              alt="Chercheur travaillant dans une bibliothèque avec des livres d'art"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Banner Section ─── */
function CtaBannerSection() {
  return (
    <section className="bg-[var(--bg-dark)] py-16 md:py-[64px]">
      <div className="max-w-[600px] mx-auto px-6 text-center">
        <h3 className="font-heading font-semibold text-[22px] md:text-[30px] leading-[1.25] text-[#F7F5F0] mb-4">
          Vous avez un projet éducatif ?
        </h3>
        <p className="text-base font-body text-[#F7F5F0] text-opacity-65 leading-relaxed mb-8 max-w-[500px] mx-auto">
          Contactez notre équipe pédagogique pour concevoir une visite ou un
          atelier adapté à votre groupe.
        </p>
        <Button variant="primary">
          Contacter l&apos;équipe pédagogique
          <ArrowRight size={16} strokeWidth={1.5} />
        </Button>
      </div>
    </section>
  );
}

/* ─── Education Page ─── */
export default function Education() {
  return (
    <div>
      <HeroSection />
      <TeachersSection />
      <WorkshopsSection />
      <OnlineResourcesSection />
      <ResearchSection />
      <CtaBannerSection />
    </div>
  );
}
