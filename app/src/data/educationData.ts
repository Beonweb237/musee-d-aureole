/* ─── Teacher Resources ─── */
export interface TeacherResource {
  title: string;
  description: string;
  type: string;
  downloadCount: string;
}

export const teacherResources: TeacherResource[] = [
  {
    title: 'Parcours "De l\'Antiquité au XIXe siècle"',
    description: 'Un parcours thématique de 10 œuvres pour les classes de collège, avec fiches élèves et guide enseignant.',
    type: 'PDF',
    downloadCount: '2.4k téléchargements',
  },
  {
    title: 'L\'art du portrait — Fiches activités',
    description: 'Exercices pratiques autour du portrait dans la peinture occidentale, du Moyen Âge à la Renaissance.',
    type: 'PDF',
    downloadCount: '1.8k téléchargements',
  },
  {
    title: 'La mythologie dans l\'art',
    description: 'Parcours ludique à travers les représentations mythologiques des collections permanentes.',
    type: 'PDF',
    downloadCount: '3.1k téléchargements',
  },
  {
    title: 'Formations enseignants 2025-2026',
    description: 'Calendrier des journées de formation continue et des séminaires pédagogiques à destination des enseignants.',
    type: 'PDF',
    downloadCount: '850 téléchargements',
  },
];

/* ─── Workshop Types ─── */
export interface Workshop {
  id: string;
  title: string;
  audience: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  minAge?: number;
  maxAge?: number;
}

export const workshops: Workshop[] = [
  {
    id: 'visite-guidée',
    title: 'Visite guidée des collections',
    audience: 'Tous publics',
    description:
      'Un médiateur culturel vous accompagne à travers les collections permanentes. Parcours thématiques ou sélection des chefs-d\'œuvre.',
    duration: '1h30',
    price: '5 € / pers.',
    image: '/discover-group.jpg',
  },
  {
    id: 'atelier-dessin',
    title: 'Atelier dessin et création',
    audience: '8–14 ans',
    description:
      'Initiation au dessin d\'observation devant les œuvres originales. Techniques du croquis, de la perspective et du portrait.',
    duration: '2h',
    price: '12 € / enfant',
    image: '/discover-education.jpg',
    minAge: 8,
    maxAge: 14,
  },
  {
    id: 'visite-famille',
    title: 'Visite en famille',
    audience: 'Familles',
    description:
      'Des parcours ludiques pour découvrir le musée en famille. Jeux de piste, énigmes et anecdotes pour les 6–12 ans.',
    duration: '1h30',
    price: '8 € / famille',
    image: '/discover-family.jpg',
    minAge: 6,
    maxAge: 12,
  },
  {
    id: 'atelier-ado',
    title: 'Atelier "Art & Numérique"',
    audience: '12–17 ans',
    description:
      'Explorer la rencontre entre l\'art classique et les outils numériques. Création d\'une œuvre inspirée des collections.',
    duration: '2h30',
    price: '15 € / adolescent',
    image: '/discover-education.jpg',
    minAge: 12,
    maxAge: 17,
  },
  {
    id: 'conference-adulte',
    title: 'Conférence-rencontre',
    audience: 'Adultes',
    description:
      'Rencontres avec des conservateurs, historiens d\'art et artistes contemporains autour des thématiques des collections.',
    duration: '1h',
    price: 'Gratuit',
    image: '/discover-group.jpg',
  },
  {
    id: 'visite-scolaire',
    title: 'Visite scolaire sur mesure',
    audience: 'Classes',
    description:
      'Parcours adaptés au niveau scolaire, du CP au lycée. En lien avec les programmes officiels et accompagnés d\'un médiateur.',
    duration: '1h30 à 2h',
    price: 'Sur devis',
    image: '/discover-family.jpg',
  },
];

/* ─── Online Resources ─── */
export interface OnlineResource {
  title: string;
  icon: string;
  description: string;
  link: string;
  isExternal: boolean;
}

export const onlineResources: OnlineResource[] = [
  {
    title: 'Base de données des œuvres',
    icon: 'database',
    description:
      'Explorez plus de 35 000 fiches œuvres avec images haute résolution, notices détaillées et bibliographie.',
    link: '/collections',
    isExternal: false,
  },
  {
    title: 'Podcasts éducatifs',
    icon: 'headphones',
    description:
      'Les Odyssées du Musée — des épisodes pour découvrir les œuvres et leur histoire. Disponible sur toutes les plateformes.',
    link: '#',
    isExternal: true,
  },
  {
    title: 'Publications scientifiques',
    icon: 'book-open',
    description:
      'Accédez aux catalogues, revues et articles de recherche produits par les conservateurs du musée.',
    link: '#recherche',
    isExternal: false,
  },
  {
    title: 'Cours en ligne',
    icon: 'monitor',
    description:
      'MOOCs et parcours d\'apprentissage sur l\'histoire de l\'art, la conservation et les techniques artistiques.',
    link: '#',
    isExternal: true,
  },
];

/* ─── Research Tools ─── */
export interface ResearchTool {
  title: string;
  description: string;
}

export const researchTools: ResearchTool[] = [
  {
    title: 'Portail des collections',
    description:
      'Accès aux fiches complètes des œuvres avec images en haute résolution, historique de conservation, bibliographie et documents d\'archives numérisés.',
  },
  {
    title: 'Base de données Corpus',
    description:
      'Corpus thématiques rassemblant des ensembles d\'œuvres autour d\'un sujet, d\'un artiste ou d\'une période, avec notices scientifiques approfondies.',
  },
  {
    title: 'Archives du musée',
    description:
      'Consultation en ligne des archives historiques du musée : inventaires, registres d\'entrée, photographies anciennes et correspondance.',
  },
];

/* ─── Teacher Bullet Points ─── */
export const teacherBenefits = [
  'Parcours pédagogiques par niveau scolaire',
  'Fiches œuvres téléchargeables',
  'Formations continues pour enseignants',
  'Préparation de visites scolaires sur mesure',
];

/* ─── Stats ─── */
export interface Stat {
  value: string;
  label: string;
}

export const educationStats: Stat[] = [
  { value: '150+', label: 'Parcours pédagogiques' },
  { value: '35k', label: '\u0152uvres documentées' },
  { value: '12k', label: '\u00C9lèves accueillis par an' },
];
