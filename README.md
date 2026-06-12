# Musée d'Auréole — Prototype MVP

Prototype web inspiré de l'esprit muséal et patrimonial du Louvre. Design original, contenu authentique, architecture technique prête pour la production.

---

## 🌐 Accès en ligne

**Prototype déployé :** https://z3m3oxnmpubkc.kimi.page

---

## 📋 Résumé des choix créatifs

### Identité du musée
Le **Musée d'Auréole** est une institution culturelle fictive qui capture l'ambiance d'un grand musée patrimonial sans copier le contenu protégé du Louvre. Le nom "Auréole" évoque la lumière qui entoure les chefs-d'œuvre, le halo doré de l'art.

### Deux variantes de design

| | **Style 1 — Modern / Minimal** | **Style 2 — Chaleureux / Patrimonial** |
|---|---|---|
| **Ambiance** | Élégante, contemporaine, aérienne | Historisée, chaleureuse, immersive |
| **Fond** | Crème chaud `#F7F5F0` | Parchemin antique `#F0EBE3` |
| **Texte** | Noir profond `#0A0A0A` | Brun chaud `#2C2420` |
| **Accent** | Or `#C9A96E` | Ombre brûlée `#8B4513` |
| **Typographie** | Playfair Display + Inter | Mêmes fontes, tons plus chauds |
| **Usage** | Défaut du prototype, expérience moderne | Variante thématique, évocations historiques |

### Direction artistique
- **Hiérarchie visuelle** claire : les œuvres d'art sont mises en valeur par des espaces généreux et une typographie discrète
- **Navigation muséale** : parcours intuitif par public (famille, groupe, recherche, mécénat)
- **CTA dorés** : boutons d'action en or sur fond sombre, créant un contraste élégant
- **Animations subtiles** : hover sur les œuvres, transitions fluides, compteurs animés
- **Contenu original** : textes, titres et descriptions entièrement créés, images générées par IA

---

## 🏗️ Structure des composants

```
src/
├── components/
│   ├── Navbar.tsx              # Navigation fixe (transparent→solid au scroll)
│   ├── Footer.tsx              # Footer 5 colonnes
│   ├── Layout.tsx              # Wrapper Navbar + Footer + ScrollToTop
│   ├── ScrollToTop.tsx         # Bouton retour en haut
│   ├── SectionHeader.tsx       # En-tête de section (label + titre + sous-titre)
│   ├── ExhibitionCard.tsx      # Carte exposition (default/featured/compact)
│   ├── ArtworkCard.tsx         # Carte œuvre (hover overlay + favoris)
│   ├── Button.tsx              # Bouton (6 variantes)
│   ├── Tag.tsx                 # Badge pill
│   ├── OpeningHoursTable.tsx   # Tableau horaires d'ouverture
│   ├── TicketCard.tsx          # Carte tarif billet
│   ├── FaqAccordion.tsx        # Accordéon FAQ accessible
│   ├── TransportItem.tsx       # Ligne transport (icon + texte)
│   └── AccessibilityCard.tsx   # Carte service accessibilité
├── pages/
│   ├── Home.tsx                # Accueil (hero vidéo + 7 sections)
│   ├── Visit.tsx               # Visiter (horaires, tarifs, accès, FAQ)
│   ├── Exhibitions.tsx         # Expositions (filtres + grille/liste)
│   ├── Collections.tsx         # Collections (recherche + filtres + grille)
│   ├── ArtworkDetail.tsx       # Fiche œuvre (image, métadonnées, provenance)
│   ├── Education.tsx           # Éducation (ressources, ateliers, outils)
│   └── Support.tsx             # Soutenir (don, mécénat, statistiques)
├── data/
│   ├── artworksData.ts         # 16 œuvres avec métadonnées complètes
│   ├── exhibitionsData.ts      # 10 expositions
│   ├── visitData.ts            # Horaires, tarifs, FAQ, transports
│   ├── educationData.ts        # Ateliers, ressources, outils de recherche
│   └── supportData.ts          # Tiers de don, statistiques, témoignages
├── App.tsx                     # Router HashRouter (7 routes)
├── index.css                   # Tokens CSS, variables, styles globaux
└── main.tsx                    # Point d'entrée
```

### Props principaux des composants critiques

| Composant | Props clés |
|-----------|-----------|
| **Navbar** | `isScrolled`, `isMobileMenuOpen`, `currentLang`, `onSearchOpen`, `onLanguageChange` |
| **ExhibitionCard** | `title`, `subtitle`, `dateRange`, `image`, `tag`, `variant`, `href` |
| **ArtworkCard** | `id`, `title`, `artist`, `date`, `image`, `isFavorite`, `onFavoriteToggle` |
| **Button** | `variant` (primary/secondary/dark/outline-light/ghost/pill), `size`, `href`, `icon`, `isLoading` |
| **SectionHeader** | `label`, `title`, `subtitle`, `align`, `variant` (light/dark) |

---

## ⚡ Liste des optimisations UX & techniques (priorisées)

### 🔴 Haute priorité — MVP

| # | Optimisation | Impact | Effort |
|---|-------------|--------|--------|
| 1 | **Lazy-loading images** — `loading="lazy"` + placeholder blur | LCP < 1.2s | Faible |
| 2 | **WebP avec fallback JPEG** — Format moderne pour tous les assets | -30% poids images | Faible |
| 3 | **Font-display: swap** — Éviter FOIT, texte visible immédiatement | Perçu perf | Faible |
| 4 | **Preconnect fonts.googleapis.com & fonts.gstatic.com** | -100ms chargement fonts | Faible |
| 5 | **Code-splitting par route** — `React.lazy()` pour chaque page | -40% JS initial | Moyen |
| 6 | **Hero video: preload="none"** + poster frame | LCP critique | Faible |

### 🟡 Moyenne priorité — Itération 2

| # | Optimisation | Impact | Effort |
|---|-------------|--------|--------|
| 7 | **srcset responsive** — 400w/800w/1200w selon viewport | Images adaptées | Moyen |
| 8 | **Pagination infinie** — IntersectionObserver pour collections | UX fluide | Moyen |
| 9 | **Service Worker** — Cache des assets statiques | Offline + perf | Moyen |
| 10 | **Lighthouse CI** — Audit automatique sur chaque build | Qualité continue | Faible |
| 11 | **i18n complet** — react-i18n ou similar pour FR/EN | Internationalisation | Moyen |
| 12 | **Réduire le bundle GSAP** — Importer uniquement les plugins utilisés | -50kB JS | Faible |

### 🟢 Basse priorité — Polish

| # | Optimisation | Impact | Effort |
|---|-------------|--------|--------|
| 13 | **PWA** — Manifest + icônes + mode offline | Engagement | Moyen |
| 14 | **Tests E2E** — Playwright pour parcours critiques | Qualité | Élevé |
| 15 | **Monitoring RUM** — Real User Metrics (Vercel Analytics) | Données réelles | Faible |
| 16 | **OG tags dynamiques** — Meta Open Graph par page | Social sharing | Faible |

---

## 🚀 Commandes pour démarrer le prototype

### Prérequis
- Node.js 20+
- npm 10+

### Installation

```bash
# Cloner le projet
git clone <repo-url>
cd app

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
# → http://localhost:5173

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

### Audit Lighthouse (local)

```bash
# Build puis audit
npm run build
npx lighthouse http://localhost:4173 --output=html --output-path=./lighthouse-report.html
```

---

## 🎯 Performance & Accessibilité

### Objectifs atteints
- [x] WCAG 2.1 AA — contrastes, navigation clavier, focus visible, ARIA labels
- [x] Animations GPU-accelerated uniquement (transform + opacity)
- [x] `prefers-reduced-motion` supporté
- [x] Skip-to-content link
- [x] Semantic HTML (nav, section, article, main)
- [x] Images avec alt text descriptif
- [x] Boutons icon-only avec aria-label

### Checklist Lighthouse cible
| Catégorie | Score |
|-----------|-------|
| Performance | ≥ 90 |
| Accessibilité | ≥ 90 |
| Bonnes pratiques | ≥ 90 |
| SEO | ≥ 90 |

---

## 📁 Structure des dossiers

```
├── public/                     # Assets statiques (images, vidéo)
│   ├── hero-bg.mp4
│   ├── hero-poster.jpg
│   ├── artwork-*.jpg           # 9 images d'œuvres
│   ├── expo-*.jpg              # 3 images d'expositions
│   ├── louvre-plus-*.jpg       # 3 images médias
│   ├── discover-*.jpg          # 6 images publics
│   ├── visit-courtyard.jpg
│   ├── education-workshop.jpg
│   ├── support-patron.jpg
│   └── map-museum.jpg
├── src/
│   ├── components/             # Composants réutilisables
│   ├── pages/                  # Pages du site (7 routes)
│   ├── data/                   # Données mock (TypeScript)
│   ├── App.tsx                 # Router principal
│   ├── index.css               # Styles globaux + tokens CSS
│   └── main.tsx                # Entry point
├── design/                     # Documents de design
│   ├── design.md               # Design system global
│   ├── home.md                 # Page d'accueil
│   ├── visit.md                # Page visiter
│   ├── exhibitions.md          # Page expositions
│   ├── collections.md          # Page collections
│   ├── artwork.md              # Page fiche œuvre
│   ├── education.md            # Page éducation
│   └── support.md              # Page soutenir
├── mockups/                    # Maquettes haute-fidélité
│   ├── mockup-style1-desktop.jpg
│   ├── mockup-style1-mobile.jpg
│   ├── mockup-style2-desktop.jpg
│   └── mockup-style2-mobile.jpg
├── index.html                  # HTML entry point
├── tailwind.config.js          # Configuration Tailwind
├── vite.config.ts              # Configuration Vite
└── README.md                   # Ce fichier
```

---

## 🛠️ Stack technique

| Technologie | Version | Usage |
|-------------|---------|-------|
| React | 19 | UI library |
| TypeScript | 5.x | Typage statique |
| Vite | 7.x | Bundler + dev server |
| Tailwind CSS | 3.4.19 | Utility-first CSS |
| shadcn/ui | — | Composants UI de base |
| React Router DOM | 7.x | Routing client-side |
| GSAP | 3.x | Animations avancées |
| Lenis | 1.x | Smooth scrolling |
| Framer Motion | 11.x | Transitions de page |
| Lucide React | — | Icônes |

---

## 📄 Licences

- **Code** : Prototype MVP — usage libre pour démonstration
- **Images** : Générées par IA, libres de droits d'auteur
- **Typographies** : Playfair Display, Cormorant Garamond, Inter, IBM Plex Mono (Google Fonts, licences OFL)
- **Contenu** : Textes originaux, aucune copie du site du Louvre

---

*Musée d'Auréole — Prototype MVP, juin 2025*
