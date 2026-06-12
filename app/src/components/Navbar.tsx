import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, Settings } from 'lucide-react';

const navLinks = [
  { label: 'VISITER', href: '/visiter' },
  { label: 'EXPOSITIONS', href: '/expositions' },
  { label: 'COLLECTIONS', href: '/collections' },
  { label: 'ÉDUCATION', href: '/education' },
  { label: 'SOUTENIR', href: '/soutenir' },
];

interface NavbarProps {
  onAdminClick?: () => void;
}

export default function Navbar({ onAdminClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<'fr' | 'en'>('fr');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = useCallback(() => {
    setCurrentLang((prev) => (prev === 'fr' ? 'en' : 'fr'));
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav
        aria-label="Navigation principale"
        className={[
          'fixed top-0 left-0 right-0 z-50 h-16 md:h-[72px] transition-all duration-300',
          isScrolled
            ? 'bg-[rgba(10,10,10,0.92)] backdrop-blur-[12px] border-b border-[rgba(255,255,255,0.08)]'
            : 'bg-transparent border-b border-transparent',
        ].join(' ')}
      >
        <div className="max-w-[1440px] mx-auto h-full px-4 md:px-6 lg:px-10 xl:px-16 flex items-center justify-between">
          {/* Left: Search + Language */}
          <div className="flex items-center gap-1 md:gap-2 shrink-0">
            <button
              aria-label="Rechercher"
              className="w-10 h-10 flex items-center justify-center text-[#F7F5F0] opacity-80 hover:opacity-100 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] rounded-sm"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button
              aria-label="Changer de langue"
              onClick={toggleLanguage}
              className="text-[11px] md:text-[12px] font-mono font-medium uppercase tracking-[0.1em] text-[#F7F5F0] opacity-80 hover:opacity-100 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] rounded-sm px-1"
            >
              {currentLang === 'fr' ? 'FR' : 'EN'}
            </button>
          </div>

          {/* Center: Logo (mobile/tablet) or Logo + Nav (desktop) */}
          <div className="flex items-center justify-center">
            {/* Desktop: Logo inline with nav */}
            <Link
              to="/"
              onClick={scrollToTop}
              className="text-[#F7F5F0] font-display font-semibold text-lg md:text-xl lg:text-[22px] tracking-tight hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] rounded-sm"
              aria-label="Musée d'Auréole — Accueil"
            >
              AURÉOLE
            </Link>
          </div>

          {/* Nav links - desktop only, separate row below on medium screens */}
          <div className="hidden xl:flex items-center justify-center gap-4 2xl:gap-6 absolute left-1/2 -translate-x-1/2 mt-[72px]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="relative text-[11px] 2xl:text-[12px] font-body font-medium uppercase tracking-[0.06em] text-[#F7F5F0] opacity-70 hover:opacity-100 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] rounded-sm py-1 group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C9A96E] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
          </div>

          {/* Right: CTAs + Hamburger */}
          <div className="flex items-center gap-1 md:gap-2 shrink-0">
            <button
              aria-label="Administration"
              onClick={onAdminClick}
              className="hidden md:flex w-9 h-9 items-center justify-center text-[#C9A96E] opacity-60 hover:opacity-100 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] rounded-sm"
            >
              <Settings size={18} strokeWidth={1.5} />
            </button>
            <div className="hidden lg:flex items-center gap-2">
              <Link
                to="/visiter"
                className="inline-flex items-center px-4 py-2 bg-[#C9A96E] text-[#0A0A0A] text-[13px] font-body font-medium rounded-full hover:bg-[#D4B87A] hover:shadow-[0_4px_24px_rgba(201,169,110,0.25)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] whitespace-nowrap"
              >
                Billetterie
              </Link>
              <Link
                to="/"
                className="hidden xl:inline-flex items-center px-4 py-2 bg-transparent text-[#F7F5F0] text-[13px] font-body font-medium rounded-full border border-[rgba(255,255,255,0.4)] hover:border-white hover:bg-[rgba(255,255,255,0.06)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] whitespace-nowrap"
              >
                E-Boutique
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-[#F7F5F0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] rounded-sm"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Secondary nav bar - nav links on lg/xl screens (below main bar) */}
        <div
          className={[
            'hidden lg:flex xl:hidden absolute left-0 right-0 top-[72px] h-10 items-center justify-center gap-6 transition-all duration-300',
            isScrolled
              ? 'bg-[rgba(10,10,10,0.88)] backdrop-blur-[12px] border-b border-[rgba(255,255,255,0.06)]'
              : 'bg-transparent',
          ].join(' ')}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="relative text-[11px] font-body font-medium uppercase tracking-[0.06em] text-[#F7F5F0] opacity-70 hover:opacity-100 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] rounded-sm py-1 group whitespace-nowrap"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C9A96E] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 bg-[rgba(10,10,10,0.96)] backdrop-blur-[12px] flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center gap-6">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-display font-medium text-[#F7F5F0] opacity-90 hover:opacity-100 hover:text-[#C9A96E] transition-all duration-300"
                style={{
                  animation: `fadeInUp 0.4s ease-out ${index * 0.06}s both`,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col items-center gap-3 mt-10">
            <Link
              to="/visiter"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center px-8 py-3 bg-[#C9A96E] text-[#0A0A0A] text-base font-body font-medium rounded-full hover:bg-[#D4B87A] transition-all duration-200"
            >
              Billetterie
            </Link>
            <button
              onClick={() => { setIsMobileMenuOpen(false); onAdminClick?.(); }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-transparent text-[#C9A96E] text-base font-body font-medium rounded-full border border-[#C9A96E] hover:bg-[rgba(201,169,110,0.1)] transition-all duration-200"
            >
              <Settings size={18} />
              Administration
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
