export interface DonationTier {
  id: string;
  title: string;
  price: string;
  period: string;
  description: string;
  benefits: string[];
  ctaLabel: string;
  highlighted?: boolean;
  badge?: string;
}

export interface ImpactStat {
  id: string;
  label: string;
  value: string;
  numericValue: number;
  suffix: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
}

export const impactStats: ImpactStat[] = [
  {
    id: 'restauration',
    label: "Restauration d'œuvres",
    value: '120+',
    numericValue: 120,
    suffix: '+',
    description: 'œuvres restaurées chaque année grâce au mécénat',
    icon: 'brush',
  },
  {
    id: 'education',
    label: 'Éducation artistique',
    value: '12 000',
    numericValue: 12000,
    suffix: '',
    description: 'élèves accueillis dans nos ateliers pédagogiques',
    icon: 'users',
  },
  {
    id: 'expositions',
    label: 'Expositions temporaires',
    value: '8',
    numericValue: 8,
    suffix: '',
    description: 'expositions organisées par an, accessibles à tous',
    icon: 'image',
  },
  {
    id: 'recherche',
    label: 'Recherche scientifique',
    value: '50+',
    numericValue: 50,
    suffix: '+',
    description: 'publications et corpus produits annuellement',
    icon: 'book-open',
  },
];

export const donationTiers: DonationTier[] = [
  {
    id: 'don-ponctuel',
    title: 'Don ponctuel',
    price: 'Montant libre',
    period: '',
    description:
      "Faites un don dès aujourd'hui, du montant de votre choix. Déductible à 66% de votre impôt sur le revenu.",
    benefits: ['Reçu fiscal immédat', 'Newsletter exclusive', 'Citation sur le mur des donateurs'],
    ctaLabel: 'Faire un don',
    highlighted: false,
  },
  {
    id: 'ami-du-musee',
    title: 'Ami du Musée',
    price: '75€',
    period: '/an',
    description:
      "Adhérez pour un an et bénéficiez d'un accès illimité, d'invitations privées et de visites exclusives.",
    benefits: [
      'Accès illimité aux collections permanentes',
      'Accès prioritaire aux expositions temporaires',
      'Invitations aux vernissages',
      'Visites exclusives hors les murs',
      'Carnet des Amis trimestriel',
    ],
    ctaLabel: 'Adhérer',
    highlighted: true,
    badge: 'Le plus populaire',
  },
  {
    id: 'mecene-entreprise',
    title: 'Entreprise mécène',
    price: 'Sur mesure',
    period: '',
    description:
      "Associez votre entreprise à la culture. Visites privées, événements sur mesure et visibilité nationale.",
    benefits: [
      'Visites privées pour vos collaborateurs',
      "Événements corporate dans les salles du musée",
      'Logo sur les supports de communication',
      "Déduction fiscale : 60% du don",
      'Relation dédiée avec le musée',
    ],
    ctaLabel: 'Nous contacter',
    highlighted: false,
  },
];

export const testimonial: Testimonial = {
  id: 'temoignage-1',
  quote:
    "Notre partenariat avec le musée est bien plus qu'un soutien culturel — c'est un engagement partagé pour la transmission du savoir et l'accès à l'art pour tous.",
  author: 'Marie Lefebvre',
  role: 'Directrice du Développement Durable',
  organization: 'Lumière Holdings',
};

export const membershipBenefits = [
  {
    title: 'Accès illimité',
    detail: "Entrée libre et illimitée aux collections permanentes toute l'année. Plus besoin de réserver votre créneau horaire.",
  },
  {
    title: 'Expositions prioritaires',
    detail: "Accès réservé et prioritaire à toutes les expositions temporaires, y compris les jours de forte affluence.",
  },
  {
    title: 'Événements exclusifs',
    detail: "Invitations aux vernissages, conférences privées, et visites guidées par les conservateurs et restaurateurs.",
  },
  {
    title: 'Programme de parrainage',
    detail: "Parrainez un nouvel adhérent et recevez un mois supplémentaire sur votre adhésion.",
  },
  {
    title: 'Réductions',
    detail: "-10% à la boutique du musée, -15% au restaurant, tarifs préférentiels sur les ateliers.",
  },
  {
    title: 'Carnet des Amis',
    detail: "Recevez trimestriellement le magazine du musée avec les coulisses, les nouvelles acquisitions et la programmation.",
  },
];
