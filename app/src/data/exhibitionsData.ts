export type ExhibitionStatus = 'En cours' | 'À venir' | 'Passées';
export type ExhibitionType = 'Exposition' | 'Conférence' | 'Cinéma' | 'Atelier' | 'Concert';

export interface Exhibition {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  dateRange: string;
  status: ExhibitionStatus;
  type: ExhibitionType;
  image: string;
  location: string;
}

export const exhibitions: Exhibition[] = [
  {
    id: 'dialogue-des-corps',
    title: 'Dialogue des Corps — De la Renaissance au Baroque',
    subtitle: 'Deux maîtres de la sculpture dialoguent à travers les siècles.',
    description:
      'Un parcours exceptionnel confrontant les œuvres de sculpteurs de la Renaissance et du Baroque, révélant les continuités et ruptures dans la représentation du corps humain.',
    dateRange: '15 mars – 28 sept. 2025',
    status: 'En cours',
    type: 'Exposition',
    image: '/expo-michelangelo-rodin.jpg',
    location: 'Aile Richelieu, Niveau 0',
  },
  {
    id: 'schongauer-bel-immortel',
    title: 'Martin Schongauer — Le Bel Immortel',
    subtitle: 'Le peintre, dessinateur et graveur virtuose de la fin du Moyen Âge.',
    description:
      'Première rétrospective majeure consacrée à Martin Schongauer en France, présentant ses peintures, dessins et gravures qui ont fasciné les plus grands collectionneurs de la Renaissance.',
    dateRange: '22 avr. – 7 juil. 2025',
    status: 'En cours',
    type: 'Exposition',
    image: '/expo-schongauer.jpg',
    location: 'Aile Denon, Niveau 1',
  },
  {
    id: 'eau-primordiale',
    title: "L'Eau Primordiale — Leçons de Mésopotamie",
    subtitle: 'Mythes et réalités de\'eau dans la civilisation mésopotamienne.',
    description:
      "À travers célèbres tablettes cunéiformes et objets archéologiques, cette exposition explore le rôle central de l'eau dans les mythes, les pratiques religieuses et la vie quotidienne de la Mésopotamie.",
    dateRange: '10 mai – 2 nov. 2025',
    status: 'En cours',
    type: 'Exposition',
    image: '/expo-primordial-water.jpg',
    location: 'Aile Sully, Niveau -1',
  },
  {
    id: 'figures-en-devenir',
    title: 'Figures en Devenir — La poétique du non fini',
    subtitle: "Table ronde autour des œuvres inachevées et de leur pouvoir d'évocation.",
    description:
      'Les conservateurs du musée explorent la fascination exercée par les œuvres laissées inachevées, de l\'esquisse romantique au fragment antique.',
    dateRange: '3 juin 2025',
    status: 'À venir',
    type: 'Conférence',
    image: '/louvre-plus-documentary.jpg',
    location: 'Auditorium',
  },
  {
    id: 'chant-des-statues',
    title: 'Le Chant des Statues',
    subtitle: 'Projection documentaire suivie\'une rencontre avec le réalisateur.',
    description:
      'Un documentaire poétique sur la vie nocturne des sculptures du musée, lorsque les derniers visiteurs ont quitté les salles et que le silence s\'installe.',
    dateRange: '5 juin 2025',
    status: 'À venir',
    type: 'Cinéma',
    image: '/louvre-plus-restoration.jpg',
    location: 'Salle de projection',
  },
  {
    id: 'rendez-vous-jardins',
    title: 'Rendez-vous aux Jardins 2026',
    subtitle: 'Programmation spéciale autour des jardins et du paysage dans l\'art.',
    description:
      "Week-end portes ouvertes dans les jardins du musée avec ateliers, visites guidées et performances artistiques autour du thème du jardin à travers l'histoire de l'art.",
    dateRange: '6–7 juin 2025',
    status: 'À venir',
    type: 'Concert',
    image: '/discover-group.jpg',
    location: 'Jardins du musée',
  },
  {
    id: 'lumieres-ombres-baroque',
    title: "Lumières et Ombres — Le Baroque en Europe",
    subtitle: 'Un parcours à travers l\'Europe baroque, de Rome à Amsterdam.',
    description:
      "Plus de soixante-dix peintures et sculptures baroques européennes réunies pour la première fois, offrant un panorama inédit des écoles italienne, flamande, hollandaise et française.",
    dateRange: '15 sept. – 15 jan. 2026',
    status: 'À venir',
    type: 'Exposition',
    image: '/artwork-caravaggio.jpg',
    location: 'Aile Richelieu, Niveau 2',
  },
  {
    id: 'art-du-portrait',
    title: "L'Art du Portrait — Atelier Pratique",
    subtitle: 'Initiation aux techniques du portrait à l\'huile.',
    description:
      "Un atelier de deux heures pour découvrir les techniques de construction d'un portrait à l'huile, sous la direction d'un artiste-peintre et d'un conservateur.",
    dateRange: '14 juin 2025',
    status: 'À venir',
    type: 'Atelier',
    image: '/discover-education.jpg',
    location: 'Atelier des arts',
  },
  {
    id: 'ivoires-mediévaux',
    title: 'Ivoires Médiévaux — Fragments d\'Éternité',
    subtitle: "Les chefs-d'œuvre de l'ivoirerie gothique réunis pour la première fois.",
    description:
      'Une sélection exceptionnelle de diptyques, triptyques et objets liturgiques en ivoire du XIIIe au XVe siècle, témoignant de la virtuosité des sculpteurs sur ivoire.',
    dateRange: '12 oct. 2024 – 15 fév. 2025',
    status: 'Passées',
    type: 'Exposition',
    image: '/artwork-renaissance.jpg',
    location: 'Aile Denon, Niveau 1',
  },
  {
    id: 'civilisations-fluviales',
    title: 'Civilisations des Fleuves — Du Nil à l\'Euphrate',
    subtitle: 'Les grandes civilisations fluviales à travers leurs trésors archéologiques.',
    description:
      "Un voyage comparatif à travers les trésors de l'Égypte pharaonique, de la Mésopotamie et de la vallée de l'Indus, révélant les liens entre ces grandes civilisations nées au bord des fleuves.",
    dateRange: '18 nov. 2024 – 23 mars 2025',
    status: 'Passées',
    type: 'Exposition',
    image: '/artwork-egyptian.jpg',
    location: 'Aile Sully, Niveau 0',
  },
];

export const statusFilters: ExhibitionStatus[] = ['En cours', 'À venir', 'Passées'];
export const typeFilters: ExhibitionType[] = ['Exposition', 'Conférence', 'Cinéma', 'Atelier', 'Concert'];
