import { Link } from 'react-router-dom';

const footerColumns = [
  {
    title: 'À propos',
    links: [
      { label: "L'établissement", href: '#' },
      { label: 'En France et dans le monde', href: '#' },
      { label: 'Règlement de visite', href: '#' },
      { label: 'Prêts et dépôts', href: '#' },
      { label: 'Actes administratifs', href: '#' },
    ],
  },
  {
    title: 'Nos sites',
    links: [
      { label: 'Billetterie', href: '/visiter' },
      { label: 'Boutique en ligne', href: '#' },
      { label: 'Collections', href: '/collections' },
      { label: 'Corpus', href: '#' },
      { label: 'Presse', href: '#' },
    ],
  },
  {
    title: 'Nous contacter',
    links: [
      { label: 'FAQ', href: '#' },
      { label: 'Contacts', href: '#' },
      { label: 'Donnez-nous votre avis', href: '#' },
      { label: 'Offres d\'emploi', href: '#' },
    ],
  },
];

const socialLinks = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'X/Twitter',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer role="contentinfo" className="bg-[#0A0A0A] pt-20 pb-12">
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20">
        {/* 5-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-10 lg:gap-8 mb-16">
          {/* Column 1: À propos */}
          <div>
            <h3 className="text-[#F7F5F0] font-heading font-medium text-base mb-5">
              {footerColumns[0].title}
            </h3>
            <ul className="space-y-3">
              {footerColumns[0].links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-[#F7F5F0] text-opacity-60 hover:text-opacity-100 hover:text-[#C9A96E] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Nos sites */}
          <div>
            <h3 className="text-[#F7F5F0] font-heading font-medium text-base mb-5">
              {footerColumns[1].title}
            </h3>
            <ul className="space-y-3">
              {footerColumns[1].links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-[#F7F5F0] text-opacity-60 hover:text-opacity-100 hover:text-[#C9A96E] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Nous contacter */}
          <div>
            <h3 className="text-[#F7F5F0] font-heading font-medium text-base mb-5">
              {footerColumns[2].title}
            </h3>
            <ul className="space-y-3">
              {footerColumns[2].links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-[#F7F5F0] text-opacity-60 hover:text-opacity-100 hover:text-[#C9A96E] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Suivez-nous */}
          <div>
            <h3 className="text-[#F7F5F0] font-heading font-medium text-base mb-5">
              Suivez-nous
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={`Suivre sur ${social.label}`}
                  className="w-10 h-10 rounded-full border border-[#2A2A2A] flex items-center justify-center text-[#F7F5F0] text-opacity-60 hover:text-opacity-100 hover:scale-[1.15] hover:border-[#C9A96E] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 5: Soutenez-nous */}
          <div>
            <h3 className="text-[#F7F5F0] font-heading font-medium text-base mb-5">
              Soutenez-nous
            </h3>
            <div className="p-5 rounded-lg border border-[#2A2A2A] bg-[rgba(255,255,255,0.02)] relative overflow-hidden">
              <div className="absolute inset-0 border border-[#C9A96E] opacity-30 animate-pulse rounded-lg pointer-events-none" />
              <p className="text-sm text-[#F7F5F0] text-opacity-70 mb-4 leading-relaxed">
                Devenez mécène et soutenez la préservation et la transmission de notre patrimoine culturel.
              </p>
              <Link
                to="/soutenir"
                className="inline-flex items-center px-5 py-2 bg-[#C9A96E] text-[#0A0A0A] text-sm font-body font-medium rounded-sm hover:bg-[#D4B87A] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
              >
                Devenir mécène
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-[#2A2A2A] mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#F7F5F0] text-opacity-40">
            © 2025 Musée d'Auréole
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {['Mentions légales', 'Données personnelles', 'Cookies', 'Accessibilité', 'Crédits'].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs text-[#F7F5F0] text-opacity-40 hover:text-opacity-80 transition-opacity duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
