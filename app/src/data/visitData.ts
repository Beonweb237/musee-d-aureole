/* ─── Opening Hours ─── */
export interface DaySchedule {
  day: string;
  dayShort: string;
  hours: string;
  isClosed: boolean;
  note?: string;
}

export const weeklyHours: DaySchedule[] = [
  { day: 'Lundi', dayShort: 'Lun', hours: '9h00 – 18h00', isClosed: false },
  { day: 'Mardi', dayShort: 'Mar', hours: 'Fermé', isClosed: true },
  { day: 'Mercredi', dayShort: 'Mer', hours: '9h00 – 18h00', isClosed: false },
  { day: 'Jeudi', dayShort: 'Jeu', hours: '9h00 – 18h00', isClosed: false },
  { day: 'Vendredi', dayShort: 'Ven', hours: '9h00 – 21h45', isClosed: false, note: 'Nocturne' },
  { day: 'Samedi', dayShort: 'Sam', hours: '9h00 – 18h00', isClosed: false },
  { day: 'Dimanche', dayShort: 'Dim', hours: '9h00 – 18h00', isClosed: false },
];

export const exceptionalClosures = [
  '1er mai',
  '25 décembre',
];

/* ─── Ticket Pricing ─── */
export interface Ticket {
  category: string;
  price: number;
  condition: string;
  ctaLabel: string;
  ctaVariant: 'primary' | 'outline-light';
}

export const tickets: Ticket[] = [
  {
    category: 'Plein tarif',
    price: 22,
    condition: 'Adulte à partir de 18 ans',
    ctaLabel: 'Acheter',
    ctaVariant: 'primary',
  },
  {
    category: 'Tarif réduit',
    price: 18,
    condition: '18-25 ans (hors UE), enseignants, demandeurs d\'emploi',
    ctaLabel: 'Acheter',
    ctaVariant: 'primary',
  },
  {
    category: 'Gratuit',
    price: 0,
    condition: '-18 ans, 18-25 ans résidents UE, handicapés + accompagnateur',
    ctaLabel: 'Réserver',
    ctaVariant: 'outline-light',
  },
  {
    category: 'Nocturne',
    price: 18,
    condition: 'Vendredi soir à partir de 18h',
    ctaLabel: 'Acheter',
    ctaVariant: 'primary',
  },
];

export const ticketNote =
  'Le billet donne accès aux collections permanentes et aux expositions temporaires. Réservation en ligne recommandée.';

/* ─── FAQ ─── */
export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: 'Combien de temps dure une visite ?',
    answer:
      'En moyenne, comptez 2 à 3 heures pour une première visite des collections permanentes. Pour les passionnés, une journée entière permet d\'explorer plus en profondeur. Nous recommandons de télécharger notre application pour créer votre parcours personnalisé.',
  },
  {
    question: 'Puis-je entrer avec un sac à dos ?',
    answer:
      'Les sacs de petite taille sont autorisés. Les valises, sacs de voyage et sacs à dos de grande taille doivent être déposés aux consignes (gratuites). Les objets dangereux sont interdits.',
  },
  {
    question: 'Le musée est-il accessible en fauteuil roulant ?',
    answer:
      'Oui, l\'ensemble du musée est accessible aux personnes à mobilité réduite. Des fauteuils roulants et des sièges de cannes sont disponibles gratuitement à l\'accueil. Les ascenseurs desservent tous les niveaux.',
  },
  {
    question: 'Puis-je prendre des photographies ?',
    answer:
      'La photographie sans flash est autorisée dans les collections permanentes pour un usage privé. Elle est interdite dans les expositions temporaires sauf indication contraire. Les trépieds et perches à selfie ne sont pas autorisés.',
  },
  {
    question: 'Où puis-je manger au musée ?',
    answer:
      'Plusieurs options s\'offrent à vous : le Café du Musée au rez-de-chaussée, le Restaurant panoramique au 1er étage, et plusieurs points de restauration rapide. Réservation recommandée pour le restaurant.',
  },
];

/* ─── Key Information Cards ─── */
export interface KeyInfoCard {
  icon: string;
  title: string;
  value: string;
  caption: string;
}

export const keyInfoCards: KeyInfoCard[] = [
  {
    icon: 'clock',
    title: 'Dernière entrée',
    value: '1h avant la fermeture',
    caption: 'Les salles commencent à se vider 30 min avant la fermeture',
  },
  {
    icon: 'ticket',
    title: 'Entrée gratuite',
    value: 'Tous les premiers samedis du mois, de 18h à 21h45',
    caption: 'Sur présentation d\'un justificatif pour les moins de 26 ans résidents de l\'UE',
  },
  {
    icon: 'moon',
    title: 'Nocturnes',
    value: 'Vendredi jusqu\'à 21h45',
    caption: 'Une ambiance unique pour découvrir les collections',
  },
];

/* ─── Transport Info ─── */
export interface TransportInfo {
  icon: string;
  title: string;
  lines: string;
  caption: string;
}

export const transportOptions: TransportInfo[] = [
  {
    icon: 'train',
    title: 'Métro',
    lines: 'Ligne 1 — Station Palais-Royal',
    caption: 'À 5 min à pied de l\'entrée principale',
  },
  {
    icon: 'bus',
    title: 'Bus',
    lines: 'Lignes 21, 24, 27, 39, 48, 68, 72, 81, 95',
    caption: 'Arrêt Carrousel du Louvre',
  },
  {
    icon: 'bike',
    title: 'Vélib\'',
    lines: 'Station n°1015 — Rue de Rivoli',
    caption: 'Parking vélo sécurisé disponible',
  },
  {
    icon: 'car',
    title: 'Parking',
    lines: 'Parking Carrousel du Louvre — 1 avenue du Général Lemonnier',
    caption: 'Accès direct aux salles du musée',
  },
];

/* ─── Accessibility Services ─── */
export interface AccessibilityService {
  title: string;
  icon: string;
  description: string;
}

export const accessibilityServices: AccessibilityService[] = [
  {
    title: 'Mobilité réduite',
    icon: 'accessibility',
    description:
      'Toutes les salles sont accessibles en fauteuil roulant. Prêt de fauteuils et sièges-cannes gratuits à l\'accueil.',
  },
  {
    title: 'Malvoyance & Cécité',
    icon: 'eye',
    description:
      'Parcours tactiles, maquettes en relief, visites descriptive et toucher. Documentation en gros caractères et braille.',
  },
  {
    title: 'Malentendance & Surdité',
    icon: 'volume-x',
    description:
      'Boucles à induction magnétique, visites en Langue des Signes Française (LSF), sous-titrage des vidéos.',
  },
  {
    title: 'Handicap psychique',
    icon: 'heart-pulse',
    description:
      'Visites adaptées, espaces de repos identifiés, signalétique claire et rassurante.',
  },
  {
    title: 'Visites sensibilisées',
    icon: 'users',
    description:
      'Des créneaux à faible affluence, lumière tamisée et absence de sonorisation pour un confort optimal.',
  },
  {
    title: 'Handicap mental & cognitif',
    icon: 'brain',
    description:
      'Documents facile à lire et à comprendre (FALC), parcours simplifiés, médiation adaptée.',
  },
];
