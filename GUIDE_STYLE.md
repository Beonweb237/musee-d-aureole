# Guide de Style — Musée d'Auréole

## Résumé condensé des tokens de design

---

## 🎨 Palette

### Style 1 — Modern / Minimal (défaut)

| Token | Hex | Usage |
|-------|-----|-------|
| Fond principal | `#F7F5F0` | Page background (crème chaud) |
| Fond sombre | `#0A0A0A` | Sections immersives, footer |
| Fond carte | `#FFFFFF` | Cartes, panneaux |
| Texte principal | `#0A0A0A` | Corps de texte |
| Texte secondaire | `#6B6560` | Légendes, métadonnées |
| Texte clair | `#F7F5F0` | Texte sur fond sombre |
| Or | `#C9A96E` | Accents, CTA, bordures dorées |
| Or hover | `#D4B87A` | Survol boutons |
| Or tamisé | `#8A7550` | Accents secondaires |
| Bordure subtile | `#E8E4DC` | Séparateurs sur fond clair |

### Style 2 — Chaleureux / Patrimonial

| Token | Hex | Usage |
|-------|-----|-------|
| Fond principal | `#F0EBE3` | Parchemin antique |
| Fond sombre | `#1C1814` | Bois vieilli |
| Fond carte | `#FAF7F2` | Panneau parchemin clair |
| Texte principal | `#2C2420` | Brun chaud |
| Texte secondaire | `#7A7169` | Légendes |
| Ombre brûlée | `#8B4513` | Accent patrimonial |
| Or heritage | `#B8860B` | Dark goldenrod |
| Terre cuite | `#C06C4A` | Tags événements |
| Bordure subtile | `#D9D2C8` | Séparateurs |

---

## 🔤 Typographie

| Rôle | Police | Taille desktop | Poids |
|------|--------|---------------|-------|
| Hero H1 | Playfair Display | 96px | 600 |
| Section H2 | Playfair Display | 42px | 500 |
| Sous-section H3 | Cormorant Garamond | 30px | 600 |
| Titre carte H4 | Cormorant Garamond | 22px | 500 |
| Corps | Inter | 16px | 400 |
| Corps large | Inter | 18px | 400 |
| Légende | Inter | 12px | 500 |
| Label technique | IBM Plex Mono | 11px | 500 |

### Espacement lettres
- Titres display : `-0.03em`
- Labels uppercase : `0.05em` à `0.1em`
- Corps : `0`

---

## 📐 Espacements

| Token | Valeur | Usage |
|-------|--------|-------|
| xs | 4px | Micro-gap |
| sm | 8px | Inter-composant serré |
| md | 16px | Padding interne |
| lg | 24px | Padding carte |
| xl | 32px | Gap section |
| 2xl | 48px | Gap sous-section |
| 3xl | 64px | Section padding |
| 4xl | 96px | Section majeure |
| 5xl | 128px | Hero padding |

**Container max-width : 1440px**
**Padding horizontal : 24px (mobile) → 48px (tablet) → 80px (desktop)**

---

## 🎯 Animation

### Transitions
| Nom | Valeur | Usage |
|-----|--------|-------|
| Fast | `0.2s cubic-bezier(0.4, 0, 0.2, 1)` | Hover micro |
| Base | `0.3s cubic-bezier(0.4, 0, 0.2, 1)` | Carte hover |
| Slow | `0.5s cubic-bezier(0.4, 0, 0.2, 1)` | Section reveals |
| Smooth | `0.6s cubic-bezier(0.22, 1, 0.36, 1)` | Page transitions |

### Motions clés
- **Fade-up** : `translateY(40px) → 0`, `opacity 0 → 1`, `0.6s`
- **Scale-in** : `scale(0.95) → 1`, `opacity 0 → 1`, `0.7s`
- **Line-draw** : `scaleX(0) → scaleX(1)`, `transform-origin: left`, `0.6s`
- **Image hover** : `scale(1) → scale(1.06)` dans container `overflow: hidden`

---

## 🧩 Micro-copy FR/EN

### Navigation
| FR | EN |
|-----|-----|
| Visiter | Visit |
| Expositions | Exhibitions |
| Collections | Collections |
| Éducation | Education |
| Soutenir | Support |

### Actions
| FR | EN |
|-----|-----|
| Réserver un billet | Book a Ticket |
| Préparer sa visite | Plan Your Visit |
| En savoir plus | Learn More |
| Acheter un billet | Buy Tickets |
| Ajouter aux favoris | Add to Favorites |
| Retirer des favoris | Remove from Favorites |
| Partager | Share |
| Filtrer | Filter |
| Réinitialiser | Reset |
| Charger plus d'œuvres | Load More Artworks |
| S'inscrire | Subscribe |

### États
| FR | EN |
|-----|-----|
| Chargement... | Loading... |
| Aucun résultat trouvé | No results found |
| Rechercher une œuvre, un artiste... | Search for an artwork, artist... |
| Merci pour votre inscription ! | Thank you for subscribing! |
| Billet ajouté au panier | Ticket added to cart |
| Lien copié ! | Link copied! |

---

## 📱 Responsive

| Breakpoint | Largeur | Comportements clés |
|-----------|---------|-------------------|
| Mobile | < 640px | 1 colonne, hamburger nav, CTA empilés |
| Tablet | 640–1023px | 2 colonnes, padding réduit |
| Desktop | 1024–1279px | Grille complète, nav visible |
| Wide | 1280px+ | Max-width 1440px centrée |
