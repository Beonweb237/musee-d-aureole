# Checklist Performance & Accessibilité

## Objectifs

| Métrique | Cible |
|----------|-------|
| LCP (Largest Contentful Paint) | < 1.2s sur mobile |
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibilité | ≥ 90 |
| Lighthouse Bonnes pratiques | ≥ 90 |
| Lighthouse SEO | ≥ 90 |

---

## Images

- [ ] Toutes les images servies en WebP avec fallback JPEG
- [ ] `srcset` défini avec 4 tailles : 400w, 800w, 1200w, 1600w
- [ ] Attribut `sizes` adapté au layout
- [ ] Hero video : `preload="none"` + poster frame
- [ ] Placeholders LQIP (Low Quality Image Placeholders) — blur inline
- [ ] Images critiques above-fold préchargées avec `<link rel="preload">`
- [ ] Images below-fold en `loading="lazy"`
- [ ] Texte alternatif descriptif sur toutes les images

## Polices

- [ ] Google Fonts chargés avec `display=swap`
- [ ] Uniquement les graisses nécessaires : Playfair 400-700, Cormorant 400-600, Inter 300-600, IBM Plex 400-500
- [ ] `font-display: swap` dans le CSS
- [ ] Fallbacks système définis
- [ ] Preconnect vers `fonts.googleapis.com` et `fonts.gstatic.com`
- [ ] Sous-ensemble de caractères si possible (`&subset=latin`)

## Mise en cache & CDN

- [ ] Assets statiques : Cache-Control `public, max-age=31536000, immutable`
- [ ] HTML : Cache-Control `public, max-age=0, must-revalidate`
- [ ] Compression Brotli/Gzip activée
- [ ] ETags configurés

## Accessibilité WCAG 2.1 AA

### Navigation
- [ ] Skip-to-content link visible au focus
- [ ] Navigation entièrement au clavier (Tab, Shift+Tab, Enter, Escape)
- [ ] Focus visible sur tous les éléments interactifs (outline 2px or)
- [ ] Pas de piège à focus (focus trap dans les modaux uniquement)

### Sémantique
- [ ] Structure de headings cohérente (h1 → h2 → h3, pas de saut)
- [ ] Éléments HTML sémantiques : `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- [ ] Liste des landmarks ARIA correcte
- [ ] Langue de la page définie (`<html lang="fr">`)

### Composants interactifs
- [ ] Boutons icon-only : `aria-label` descriptif
- [ ] Accordéons : `aria-expanded`, `aria-controls`, `role="region"`
- [ ] Modaux : `aria-modal="true"`, focus trap, fermeture Escape
- [ ] Cartes cliquables : `aria-label` sur le lien, focus visible
- [ ] Messages d'état : `aria-live` pour les feedback dynamiques

### Contrastes
- [ ] Texte normal : ratio ≥ 4.5:1
- [ ] Texte large (18px+ gras / 24px+) : ratio ≥ 3:1
- [ ] Composants UI : ratio ≥ 3:1
- [ ] Vérifié avec le simulateur de daltonisme

### Images & médias
- [ ] Toutes les images ont un `alt` pertinent
- [ ] Images décoratives : `alt=""` ou `role="presentation"`
- [ ] Vidéos : sous-titres (si applicable), contrôles accessibles

### Formulaires
- [ ] Labels associés aux inputs (`<label for="id">` ou `aria-labelledby`)
- [ ] Messages d'erreur liés avec `aria-describedby`
- [ ] Validation inline avec feedback visuel + vocal
- [ ] Champs requis indiqués visuellement et via `aria-required`

### Motion
- [ ] `prefers-reduced-motion: reduce` respecté pour toutes les animations
- [ ] Lenis smooth scroll désactivé si réduction de motion demandée
- [ ] Pas d'animation clignotante (seuil flash)

---

## Scripts Lighthouse CI

### package.json

```json
{
  "scripts": {
    "audit": "lighthouse http://localhost:4173 --preset=desktop --output=json --output-path=./lighthouse-desktop.json && lighthouse http://localhost:4173 --preset=desktop --output=html --output-path=./lighthouse-desktop.html",
    "audit:mobile": "lighthouse http://localhost:4173 --output=json --output-path=./lighthouse-mobile.json && lighthouse http://localhost:4173 --output=html --output-path=./lighthouse-mobile.html"
  }
}
```

### Installation

```bash
npm install -g lighthouse
```

### Exécution

```bash
# Build et preview
npm run build
npm run preview &

# Audit desktop + mobile
npm run audit
npm run audit:mobile
```

---

## Commandes de démarrage

```bash
# Installation
npm install

# Développement
npm run dev

# Production build
npm run build

# Preview build
npm run preview

# Audit Lighthouse
npm run audit
```
