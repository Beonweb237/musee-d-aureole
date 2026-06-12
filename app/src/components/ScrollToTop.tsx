import { useState, useEffect, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Retour en haut de page"
      className={[
        'fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full',
        'bg-[#C9A96E] text-[#0A0A0A] shadow-[0_4px_24px_rgba(201,169,110,0.35)]',
        'flex items-center justify-center',
        'hover:bg-[#D4B87A] hover:scale-110 transition-all duration-300',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]',
        'animate-in fade-in slide-in-from-bottom-4 duration-300',
      ].join(' ')}
    >
      <ArrowUp size={20} strokeWidth={2} />
    </button>
  );
}
