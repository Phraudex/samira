# PROJECT MASTER — LE LIVRE, SAMIRA

> Version : 1.1
> Date : 21 juin 2026
> Statut : Document de référence unique
> Usage : Ce fichier doit être fourni à chaque IA ou développeur intervenant sur le projet. Il contient TOUTES les spécifications. Aucune information ne doit être inventée ou supposée en dehors de ce document.

**Changelog v1.1** : Ajout de la palette rose (accent secondaire féminin), règles d'usage violet/rose par section, rappel critique PWA fullscreen.

---

## 1. IDENTITÉ DU PROJET

**Nom** : Le Livre, Samira
**Type** : PWA premium, installable, mobile-first
**Destinataire** : Meite Samira (utilisatrice unique)
**Concept** : Œuvre numérique immersive présentant Samira comme une personne exceptionnelle à travers un livre interactif premium. Ce n'est PAS un site romantique de couple. C'est un portrait numérique élégant.

**Références d'ambiance** :
- Apple (fluidité, minimalisme, qualité)
- Dior / Vogue (haute couture, éditorial mode)
- Applications iOS premium (navigation native, transitions)
- Glassmorphism moderne
- Expériences cinématiques

**Ton** : Élégant, mature, dosé. Aucune surcharge visuelle. Aucune déclaration d'amour excessive. Sincère sans être mièvre.

---

## 2. DESIGN SYSTEM

### 2.1 Palette de couleurs

```
COULEURS PRINCIPALES (du plus foncé au plus clair) :
┌──────────┬───────────┬──────────────────────────────┐
│ Token    │ Hex       │ Usage                        │
├──────────┼───────────┼──────────────────────────────┤
│ dark-900 │ #0A0515   │ Fond principal, backgrounds  │
│ dark-800 │ #120926   │ Fond cartes, surfaces        │
│ purple-1 │ #34117E   │ Couleur dominante            │
│ purple-2 │ #491AB1   │ Dégradés, fonds secondaires  │
│ purple-3 │ #6631DB   │ Hover, états interactifs     │
│ purple-4 │ #7B45F0   │ Accent principal, CTA        │
│ purple-5 │ #A981FF   │ Textes accent, liens         │
│ purple-6 │ #B796FE   │ Labels, tags                 │
│ purple-7 │ #D0BCFC   │ Textes clairs sur fond dark  │
│ white    │ #FFFFFF   │ Titres, textes principaux    │
│ white-80 │ #FFFFFFcc │ Sous-titres                  │
│ white-60 │ #FFFFFF99 │ Textes secondaires           │
│ white-40 │ #FFFFFF66 │ Textes tertiaires, captions  │
│ white-20 │ #FFFFFF33 │ Bordures, séparateurs        │
└──────────┴───────────┴──────────────────────────────┘

COULEURS SECONDAIRES — ACCENT ROSE (touche féminine) :
┌──────────┬───────────┬──────────────────────────────┐
│ Token    │ Hex       │ Usage                        │
├──────────┼───────────┼──────────────────────────────┤
│ rose-1   │ #F4A6C6   │ Rose doux — fonds/dégradés   │
│ rose-2   │ #E8729F   │ Rose moyen — tags, accents   │
│ rose-3   │ #D6488A   │ Rose profond — CTA, highlight│
└──────────┴───────────┴──────────────────────────────┘
```

**Règle d'usage du rose** : Le violet reste la couleur DOMINANTE sur l'ensemble du projet (couleur préférée de Samira). Le rose est un ACCENT SECONDAIRE, utilisé en touches ciblées :
- Tags et mots-clés (alterner violet/rose) — Chapitre 2 "Une belle âme"
- Dates et labels sur les cartes souvenirs — Chapitre 7
- Dégradé de l'écran de fin (violet → rose)
- Éléments floraux (mélange violet + touches roses)
- Boutons CTA secondaires ou dégradés

**Exception stricte** : le Chapitre 3 "Ses valeurs" reste **100% violet, sans rose**, pour préserver sa sobriété et son ton respectueux.

**Dégradés principaux** :
- Hero : `linear-gradient(135deg, #0A0515 0%, #34117E 50%, #491AB1 100%)`
- Cartes : `linear-gradient(135deg, rgba(52,17,126,0.25), rgba(73,26,177,0.1))`
- Accent : `linear-gradient(135deg, #7B45F0, #A981FF)`
- Overlay photo : `linear-gradient(180deg, transparent 40%, #0A0515 100%)`
- Accent rose/violet (CTA) : `linear-gradient(135deg, #7B45F0, #E8729F)`
- Dégradé doux (fonds carte rosé) : `linear-gradient(135deg, rgba(52,17,126,0.4), rgba(214,72,138,0.25))`
- Écran de fin : `linear-gradient(160deg, #34117E 0%, #6631DB 50%, #B8508F 100%)`

**Glassmorphism** :
- Background : `rgba(52, 17, 126, 0.15)`
- Backdrop-filter : `blur(20px) saturate(180%)`
- Border : `1px solid rgba(123, 69, 240, 0.12)`

### 2.2 Typographie

```
POLICES :
┌────────────┬───────────────────┬──────────────────────────────┐
│ Rôle       │ Police            │ Poids utilisés               │
├────────────┼───────────────────┼──────────────────────────────┤
│ Display    │ Cormorant Garamond│ 300, 400, 600                │
│ Body       │ Josefin Sans      │ 300, 400, 500, 600           │
│ UI/Caption │ Josefin Sans      │ 400, 500                     │
└────────────┴───────────────────┴──────────────────────────────┘

ÉCHELLE TYPOGRAPHIQUE (mobile-first → desktop) :
┌──────────────────┬────────────┬────────────┬─────────┬──────────────┐
│ Token            │ Mobile     │ Desktop    │ Poids   │ Police       │
├──────────────────┼────────────┼────────────┼─────────┼──────────────┤
│ display-hero     │ 48px       │ 80px       │ 300     │ Cormorant    │
│ display-chapter  │ 36px       │ 56px       │ 400     │ Cormorant    │
│ heading-1        │ 28px       │ 40px       │ 600     │ Cormorant    │
│ heading-2        │ 22px       │ 28px       │ 400     │ Cormorant    │
│ heading-3        │ 18px       │ 22px       │ 600     │ Josefin Sans │
│ body-large       │ 16px       │ 18px       │ 300     │ Josefin Sans │
│ body             │ 15px       │ 16px       │ 400     │ Josefin Sans │
│ body-small       │ 13px       │ 14px       │ 400     │ Josefin Sans │
│ caption          │ 11px       │ 12px       │ 500     │ Josefin Sans │
│ overline         │ 10px       │ 11px       │ 600     │ Josefin Sans │
└──────────────────┴────────────┴────────────┴─────────┴──────────────┘

INTERLIGNAGE :
- Display : 1.1
- Headings : 1.2
- Body : 1.7
- Caption : 1.4

LETTER-SPACING :
- Overline / Labels : 2–3px (uppercase)
- Display : -0.02em
- Body : 0 (normal)
```

**Import Google Fonts** :
```
Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400
Josefin+Sans:wght@300;400;500;600
```

### 2.3 Iconographie

```
Set : Lucide React (lucide-react)
Style : Outline (stroke-width: 1.5)
Taille standard : 20px
Taille petite : 16px
Taille grande : 24px
Couleur par défaut : #A981FF (purple-5)
Couleur inactive : rgba(255,255,255,0.3)
```

Icônes utilisées dans le projet :
- `Lock` — écran d'entrée
- `Eye` / `EyeOff` — toggle mot de passe
- `ChevronDown` — scroll indicator
- `ChevronLeft` / `ChevronRight` — navigation galerie
- `X` — fermer modal/lightbox
- `Play` — lecture vidéo
- `Heart` — accent décoratif (sobre, rare)
- `BookOpen` — chapitres
- `Image` — galerie
- `Star` — qualités/valeurs
- `Flower2` — élément floral (si icône nécessaire)

### 2.4 Espacement & Grille

```
SYSTÈME D'ESPACEMENT (base 4px) :
┌────────┬────────┐
│ Token  │ Valeur │
├────────┼────────┤
│ xs     │ 4px    │
│ sm     │ 8px    │
│ md     │ 16px   │
│ lg     │ 24px   │
│ xl     │ 32px   │
│ 2xl    │ 48px   │
│ 3xl    │ 64px   │
│ 4xl    │ 96px   │
│ 5xl    │ 128px  │
└────────┴────────┘

GRILLE :
- Mobile : 1 colonne, padding horizontal 20px
- Tablet : 2 colonnes, padding horizontal 40px
- Desktop : max-width 1200px, centré, padding horizontal 80px
- Gutter : 20px (mobile), 24px (tablet), 32px (desktop)

BORDER-RADIUS :
- Petits éléments (boutons, tags) : 12px
- Cartes : 20px
- Grandes cartes / modales : 24px
- Images portrait : 16px
- Rond complet : 9999px (pills)
```

### 2.5 Ombres & Bordures

```
OMBRES :
- card : 0 8px 32px rgba(10, 5, 21, 0.4)
- card-hover : 0 16px 48px rgba(123, 69, 240, 0.15)
- modal : 0 24px 64px rgba(10, 5, 21, 0.6)
- glow : 0 0 40px rgba(123, 69, 240, 0.2)

BORDURES :
- Subtile : 1px solid rgba(123, 69, 240, 0.08)
- Standard : 1px solid rgba(123, 69, 240, 0.12)
- Active : 1px solid rgba(123, 69, 240, 0.25)
- Accent : 1px solid #7B45F0
```

### 2.6 Éléments floraux

Des fleurs violettes / lavande, avec quelques touches roses, sont utilisées comme éléments décoratifs SUBTILS dans certaines sections. Règles strictes :

- SVG ou PNG avec transparence
- Opacité maximale : 0.15 à 0.25
- Positionnement : coins de sections, arrière-plans
- Couleurs : palette violette dominante (#7B45F0 à #D0BCFC) + touches roses ponctuelles (#E8729F, #F4A6C6) pour les sections autorisées au rose (voir 2.1)
- Le Chapitre 3 (valeurs) garde ses fleurs 100% violettes, sans rose
- Jamais au-dessus du contenu textuel
- Pas de motifs répétitifs visibles
- Style : abstrait, minimaliste, pas réaliste
- Sections concernées : chapitres 2 (Belle âme, violet+rose), 3 (Valeurs, violet uniquement), fin (Merci d'être toi, violet+rose)

---

## 3. SYSTÈME D'ANIMATION

### 3.1 Courbes d'easing

```
EASINGS :
- default    : cubic-bezier(0.4, 0, 0.2, 1)
- enter      : cubic-bezier(0, 0, 0.2, 1)
- exit       : cubic-bezier(0.4, 0, 1, 1)
- spring     : cubic-bezier(0.34, 1.56, 0.64, 1)
- cinematic  : cubic-bezier(0.22, 1, 0.36, 1)

DURÉES :
- micro      : 150ms (hover, toggle)
- short      : 300ms (fade, slide)
- medium     : 500ms (transitions sections)
- long       : 800ms (animations d'entrée)
- cinematic  : 1200–2000ms (séquence déverrouillage)
```

### 3.2 Animations standardisées

```
ENTRÉES (scroll-triggered via Framer Motion) :
- fadeUp     : opacity 0→1, translateY 30px→0, duration 600ms
- fadeIn     : opacity 0→1, duration 500ms
- slideLeft  : opacity 0→1, translateX 40px→0, duration 600ms
- slideRight : opacity 0→1, translateX -40px→0, duration 600ms
- scaleIn    : opacity 0→1, scale 0.95→1, duration 500ms
- blurIn     : opacity 0→1, filter blur(10px)→blur(0), duration 800ms

PARALLAX :
- Intensité faible : 0.05 (textes)
- Intensité moyenne : 0.1 (images secondaires)
- Intensité forte : 0.2 (éléments décoratifs, fleurs)

STAGGER (groupes d'éléments) :
- Délai entre éléments : 100ms
- Maximum d'éléments staggerés : 6

SCROLL :
- Trigger : viewport intersection 20% (élément visible à 20%)
- Animation une seule fois (pas de replay au scroll up)
- Utiliser whileInView de Framer Motion
```

### 3.3 Transitions entre sections

Chaque chapitre est séparé par une transition douce :
- Fade-out du chapitre courant (300ms)
- Espace vide avec dégradé subtil (80px de hauteur)
- Fade-in du nouveau chapitre (600ms)
- Le titre du chapitre entre avec un effet `blurIn`

---

## 4. STRUCTURE COMPLÈTE DES ÉCRANS

### 4.1 Écran d'entrée (Lock Screen)

**Fond** : Dégradé sombre `#0A0515 → #34117E` avec grain subtil (noise texture 2–3% opacity).

**Centre de l'écran** : Une carte premium verticale.

La carte est inspirée des modèles de référence fournis (cartes profil dark avec photo, coins arrondis, glassmorphism). Version DARK uniquement.

Contenu de la carte :
1. Photo de Samira (la photo du selfie en voiture avec le foulard rose/magenta)
2. Photo VOLONTAIREMENT FLOUTÉE (`filter: blur(20px)`)
3. Cadre de la photo : `border-radius: 16px`
4. Carte : glassmorphism, `border-radius: 24px`, ombre `card`
5. Sous la photo : texte "Le Livre, Samira" en Cormorant Garamond, 28px, weight 400
6. Puis : "Entre ton mot de passe" en Josefin Sans, 14px, weight 300, `white-60`
7. Champ mot de passe : fond `rgba(255,255,255,0.05)`, border `rgba(123,69,240,0.15)`, border-radius 12px, hauteur 48px
8. Bouton "Entrer" : fond `#7B45F0`, border-radius 12px, Josefin Sans 14px weight 500

**Mot de passe** : `sogbe`
Stocké en dur dans le code. Aucun backend. Aucune base de données.

### 4.2 Séquence de déverrouillage

Quand le mot de passe est correct, cette séquence se joue (OBLIGATOIRE, dans cet ordre) :

```
TIMELINE D'ANIMATION :
┌───────────┬───────────────────────────────────────────────┐
│ Temps     │ Action                                        │
├───────────┼───────────────────────────────────────────────┤
│ 0ms       │ Bouton → état "validé" (check icon)           │
│ 200ms     │ Vibration haptic si supportée                 │
│ 400ms     │ Le blur de la photo commence à diminuer       │
│ 400–1400  │ blur(20px) → blur(0) progressivement (1s)     │
│ 1000ms    │ Légère lueur violette autour de la photo      │
│ 1400ms    │ Photo entièrement nette, visage révélé        │
│ 1600ms    │ La carte commence à grandir (scale)           │
│ 1600–2600 │ La carte s'expand en plein écran (1s)         │
│ 2600ms    │ Fond entièrement violet profond               │
│ 2800ms    │ Texte apparaît : "Bienvenue, Samira."         │
│ 3800ms    │ Texte change : "Ce livre parle de toi."       │
│ 5000ms    │ Fade-out → transition vers page d'accueil     │
│ 5500ms    │ Page d'accueil visible                        │
└───────────┴───────────────────────────────────────────────┘
```

Cette séquence utilise GSAP timeline pour la précision. Chaque étape doit être fluide à 60 FPS. Les textes "Bienvenue, Samira." et "Ce livre parle de toi." utilisent Cormorant Garamond, weight 300, taille 28px, couleur blanche, centrés.

### 4.3 Page d'accueil (Hero)

Plein écran (100vh). Composition :

- Arrière-plan : photo de Samira (la photo assise sur le canapé, tenue kaki/olive) en plein écran, avec overlay dégradé violet sombre par-dessus (`linear-gradient(180deg, rgba(10,5,21,0.3) 0%, rgba(10,5,21,0.8) 70%, #0A0515 100%)`)
- Texte principal centré verticalement (tiers inférieur) :
  - "Samira" en Cormorant Garamond, display-hero (48px mobile / 80px desktop), weight 300, blanc
  - "Une âme rare dans un monde ordinaire." en Josefin Sans, body-large (16px), weight 300, `white-60`
- Scroll indicator en bas : chevron animé (bounce léger)
- Parallax léger sur la photo (intensité 0.1)

### 4.4 Navigation des chapitres

Pas de barre de navigation classique. Le site est un scroll vertical continu, comme un livre.

Optionnel : un menu discret accessible via un petit bouton (icône `BookOpen`) fixé en haut à droite qui ouvre un overlay avec la liste des chapitres. Au tap sur un chapitre → smooth scroll vers la section.

Chaque chapitre commence par :
1. Overline : "Chapitre X" en Josefin Sans, overline style (10px, uppercase, letter-spacing 3px, `purple-5`)
2. Titre du chapitre en Cormorant Garamond, display-chapter
3. Ligne décorative fine (60px de large, 1px, couleur `purple-4`, centrée, margin 24px)
4. Contenu du chapitre

### 4.5 Chapitre 1 — Qui est Samira ?

Présentation générale. Mise en page éditorial.

Contenu à mettre en avant :
- Sa personnalité
- Son authenticité
- Sa douceur
- Son intelligence
- Son élégance naturelle

Format : texte éditorial en Josefin Sans body-large, weight 300, ligne par ligne avec fadeUp au scroll. Possibilité d'une citation mise en exergue en Cormorant Garamond italique, taille heading-2, couleur `purple-5`, avec une fine ligne verticale `purple-4` à gauche (style blockquote premium).

NOTE POUR LE DÉVELOPPEUR : Les textes de contenu de chaque chapitre devront être rédigés. Prévoir des placeholders structurés que le créateur du projet pourra remplir. Format : blocs de texte éditables dans un fichier de contenu séparé (`content.ts` ou `content.json`).

### 4.6 Chapitre 2 — Une belle âme

Mettre en avant : sa gentillesse, son grand cœur, son empathie, sa bienveillance, son aide envers les autres.

Mots-clés à intégrer visuellement (comme des tags ou des éléments flottants) :
- Bienveillante
- Généreuse
- Inspirante
- Rayonnante
- Attentionnée
- Authentique
- Respectueuse
- Sincère

Format suggéré : les mots-clés peuvent être présentés comme des "tags" glassmorphism flottants, révélés au scroll avec un stagger, autour d'un texte central. Tags en alternance violet/rose (voir palette 2.1 — `tag-purple` et `tag-rose`). Fleurs violettes et roses subtiles en arrière-plan de cette section.

### 4.7 Chapitre 3 — Ses valeurs

Mettre en avant :
- Son attachement à l'islam
- Son respect des principes religieux
- Sa pudeur
- Son voile
- Son élégance spirituelle

**RÈGLE ABSOLUE** : cette section doit être respectueuse et sobre. Aucune interprétation artistique excessive. Ton sincère, mature, respectueux. Fleurs violettes discrètes en arrière-plan.

### 4.8 Chapitre 4 — Ses talents

Sous-section : cuisine. Montrer un véritable talent culinaire.

Format :
- Grille de photos (2 colonnes mobile, 3 colonnes desktop)
- Chaque photo : border-radius 16px, ombre card
- Possibilité d'intégrer des vidéos courtes (lecteur minimaliste)
- Mise en scène élégante, pas de layout "blog recette"

### 4.9 Chapitre 5 — Sa force

Mettre en avant : son courage, sa résilience, sa détermination, sa capacité à avancer.

Format : texte inspirant, typographie large (heading-2 pour les phrases clés), animations fadeUp. Cette section doit inspirer. Ton empowering sans être cliché.

### 4.10 Chapitre 6 — Galerie immersive

Grande galerie photo premium.

Contenu : portraits, moments spontanés, moments heureux.

Format :
- Layout masonry (grille asymétrique) ou grille 2 colonnes avec variation de tailles
- Au tap sur une photo : ouverture plein écran avec animation `scaleIn`
- Lightbox : fond noir 95% opacité, photo centrée, swipe gauche/droite pour naviguer
- Animations : zoom doux au hover/touch (scale 1 → 1.03), parallax léger
- Transition entre photos : slide horizontal fluide
- Expérience type galerie Apple Photos

### 4.11 Chapitre 7 — Bibliothèque de souvenirs

**Section la plus importante du projet.**

Concept : un musée numérique de souvenirs. Chaque souvenir est une carte.

Structure d'une carte souvenir :
```
┌─────────────────────────────────┐
│  [Image ou miniature vidéo]     │
│                                 │
│  Titre du souvenir              │
│  Date (optionnel)               │
│  Aperçu du message (2 lignes)   │
└─────────────────────────────────┘
```

- Carte : glassmorphism, border-radius 20px, ombre card
- Layout : scroll horizontal (carousel) ou grille 2 colonnes
- Au tap → animation d'ouverture immersive :
  - La carte grandit et se transforme en vue plein écran
  - Révèle : photo/vidéo en grand + message complet + anecdote
  - Fond : overlay sombre avec glassmorphism
  - Bouton fermer (X) en haut à droite
- Chaque carte peut contenir : une photo, une vidéo, un message texte, une anecdote

Structure de données pour un souvenir :
```typescript
interface Souvenir {
  id: string;
  title: string;
  date?: string;
  image?: string;        // chemin vers l'image
  video?: string;        // chemin vers la vidéo
  message?: string;      // texte du souvenir
  anecdote?: string;     // anecdote courte
}
```

### 4.12 Chapitre 8 — L'empreinte qu'elle laisse

Montrer l'impact positif de Samira sur les autres.

Règles :
- Aucune exagération
- Aucune déclaration romantique excessive
- Ton mature et sincère
- Format : texte éditorial, éventuellement des "témoignages" stylisés (citations avec attribution)

### 4.13 Écran de fin

Plein écran (100vh).

- Fond : dégradé violet vers rose `linear-gradient(160deg, #34117E 0%, #6631DB 50%, #B8508F 100%)`
- Centre : grande photo de Samira (border-radius 20px, ombre card)
- Sous la photo : "Merci d'être toi." en Cormorant Garamond, display-chapter, weight 300, blanc
- Minimaliste. Rien d'autre.
- Légère animation de respiration sur le texte (scale 1 → 1.01 → 1, durée 4s, infini)
- Fleurs violettes et roses très subtiles dans les coins (opacité 0.1)

---

## 5. STACK TECHNIQUE

```
FRAMEWORK & OUTILS :
┌────────────────────┬──────────────────────────────┐
│ Catégorie          │ Technologie                  │
├────────────────────┼──────────────────────────────┤
│ Framework          │ Next.js (App Router)          │
│ Langage            │ TypeScript                   │
│ Style              │ Tailwind CSS                 │
│ Animations         │ Framer Motion + GSAP         │
│ Icônes             │ Lucide React                 │
│ PWA                │ next-pwa (ou @ducanh2912)    │
│ Images             │ next/image (optimisation)    │
│ Fonts              │ next/font/google             │
│ Linting            │ ESLint + Prettier            │
└────────────────────┴──────────────────────────────┘
```

### 5.1 Structure de fichiers

```
le-livre-samira/
├── public/
│   ├── images/
│   │   ├── samira/           # Photos de Samira
│   │   ├── souvenirs/        # Photos des souvenirs
│   │   ├── cuisine/          # Photos cuisine
│   │   └── decorations/      # SVG fleurs, éléments décoratifs
│   ├── videos/               # Vidéos (souvenirs, cuisine)
│   ├── manifest.json
│   ├── sw.js
│   ├── icon-192.png
│   ├── icon-512.png
│   └── splash.png
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx          # Point d'entrée (lock → main)
│   │   └── globals.css
│   ├── components/
│   │   ├── LockScreen.tsx
│   │   ├── UnlockSequence.tsx
│   │   ├── Hero.tsx
│   │   ├── ChapterHeader.tsx
│   │   ├── Chapter1.tsx
│   │   ├── Chapter2.tsx
│   │   ├── Chapter3.tsx
│   │   ├── Chapter4.tsx
│   │   ├── Chapter5.tsx
│   │   ├── Chapter6.tsx      # Galerie
│   │   ├── Chapter7.tsx      # Bibliothèque souvenirs
│   │   ├── Chapter8.tsx
│   │   ├── EndScreen.tsx
│   │   ├── ChapterNav.tsx    # Menu chapitres (overlay)
│   │   ├── Lightbox.tsx
│   │   ├── SouvenirCard.tsx
│   │   ├── SouvenirModal.tsx
│   │   ├── VideoPlayer.tsx
│   │   └── ui/
│   │       ├── FloralDecor.tsx
│   │       ├── ScrollIndicator.tsx
│   │       ├── GlassCard.tsx
│   │       └── AnimatedText.tsx
│   ├── data/
│   │   └── content.ts        # Tous les textes éditables
│   ├── hooks/
│   │   ├── useScrollProgress.ts
│   │   └── useInView.ts
│   ├── lib/
│   │   └── animations.ts     # Variants Framer Motion réutilisables
│   └── styles/
│       └── fonts.ts          # Configuration next/font
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

### 5.2 Configuration Tailwind

```typescript
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0A0515',
          800: '#120926',
        },
        purple: {
          1: '#34117E',
          2: '#491AB1',
          3: '#6631DB',
          4: '#7B45F0',
          5: '#A981FF',
          6: '#B796FE',
          7: '#D0BCFC',
        },
        rose: {
          1: '#F4A6C6',
          2: '#E8729F',
          3: '#D6488A',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Josefin Sans', 'sans-serif'],
      },
      borderRadius: {
        'card': '20px',
        'card-lg': '24px',
      },
      backdropBlur: {
        'glass': '20px',
      },
    },
  },
};
```

### 5.3 Configuration des fonts

```typescript
// src/styles/fonts.ts
import { Cormorant_Garamond, Josefin_Sans } from 'next/font/google';

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

export const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});
```

### 5.4 Variants d'animation réutilisables

```typescript
// src/lib/animations.ts
export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export const blurIn = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8 } },
};

export const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};
```

---

## 6. EXIGENCES PWA

> **RAPPEL CRITIQUE — Pourquoi un PWA n'est PAS fullscreen si l'un de ces 3 points manque** (peu importe le framework utilisé) :
> 1. `manifest.json` avec `"display": "standalone"` (jamais `"browser"` ni `"minimal-ui"`)
> 2. Meta tags HTML obligatoires, surtout pour iOS qui ignore en partie le manifest : `viewport-fit=cover`, `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`, `apple-touch-icon`, `apple-touch-startup-image`
> 3. CSS avec `env(safe-area-inset-top)`, `env(safe-area-inset-bottom)` etc. sur tous les écrans plein écran — sans ça, contenu coupé par l'encoche/home indicator ou espace mort visible
>
> **Piège fréquent** : iOS met en cache la config au moment de l'ajout à l'écran d'accueil. Si le manifest est modifié après installation, il faut **supprimer l'app de l'écran d'accueil et la réinstaller** — un simple refresh ne suffit pas.

### 6.1 Manifest

```json
{
  "name": "Le Livre, Samira",
  "short_name": "Samira",
  "description": "Un livre numérique dédié à Samira",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#0A0515",
  "theme_color": "#34117E",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### 6.2 Exigences PWA strictes

- Installation sur Android ET iPhone
- Mode plein écran (`display: standalone`)
- Aucun élément de navigateur visible après installation
- Splash screen : fond `#0A0515`, icône centrée
- Icône d'app : fond `#34117E`, lettre "S" en Cormorant Garamond blanc, ou motif floral abstrait violet
- Navigation fluide type application mobile
- Animations 60 FPS obligatoire
- Gestion tactile optimale (touch events, swipe natif)
- Responsive mobile-first STRICT
- Optimisation smartphone prioritaire

Le sentiment recherché : "Samira possède sa propre application personnelle."

---

## 7. GESTION DES MÉDIAS

### 7.1 Images

```
FORMAT : WebP (avec fallback JPEG)
QUALITÉ : 80% pour WebP
TAILLES :
- Hero / plein écran : max 1920px de large
- Galerie : max 1200px de large
- Miniatures : max 600px de large
- Cartes souvenirs : max 800px de large

CHARGEMENT :
- Lazy loading pour tout sauf hero
- Placeholder blur (blurDataURL via next/image)
- Priority loading pour la première image visible

TRAITEMENT :
- Aucun filtre de couleur global
- Overlay violet UNIQUEMENT sur le hero (gradient par-dessus)
- Photos affichées dans leur couleur naturelle partout ailleurs
```

### 7.2 Vidéos

```
FORMAT : MP4 (H.264)
LECTEUR : custom minimaliste (bouton play, barre de progression, pas de contrôles natifs)
CHARGEMENT : lazy, poster image obligatoire
AUTOPLAY : non
MUTED par défaut : non (sauf si autoplay activé)
```

---

## 8. PERFORMANCE

```
OBJECTIFS LIGHTHOUSE :
- Performance : > 90
- Accessibilité : > 90
- Best Practices : > 90
- SEO : > 80

OPTIMISATIONS OBLIGATOIRES :
- Code splitting par chapitre (dynamic import)
- Images optimisées next/image
- Fonts preload
- CSS minimal (Tailwind purge)
- Pas de librairie lourde inutile
- Service Worker pour cache offline
- Intersection Observer pour animations (pas de scroll listener brut)
```

---

## 9. ACCESSIBILITÉ

```
- Contrast ratio texte/fond : minimum 4.5:1 (AA)
- Focus visible sur tous les éléments interactifs
- Alt text sur toutes les images
- Rôles ARIA sur les composants custom (modal, lightbox, carousel)
- Navigation clavier fonctionnelle
- Reduced motion : désactiver animations si prefers-reduced-motion
- Semantic HTML (sections, headings hiérarchiques, nav)
```

---

## 10. CONTENU ÉDITORIAL

Tous les textes du site sont centralisés dans `src/data/content.ts`. Ce fichier est la seule source de vérité pour le contenu. Structure :

```typescript
export const content = {
  lock: {
    title: "Le Livre, Samira",
    subtitle: "Entre ton mot de passe",
    button: "Entrer",
    password: "sogbe",
  },
  unlock: {
    line1: "Bienvenue, Samira.",
    line2: "Ce livre parle de toi.",
  },
  hero: {
    name: "Samira",
    tagline: "Une âme rare dans un monde ordinaire.",
  },
  chapters: [
    {
      number: 1,
      title: "Qui est Samira ?",
      content: "...",  // À rédiger
    },
    {
      number: 2,
      title: "Une belle âme",
      keywords: ["Bienveillante", "Généreuse", "Inspirante", "Rayonnante", "Attentionnée", "Authentique", "Respectueuse", "Sincère"],
      content: "...",
    },
    {
      number: 3,
      title: "Ses valeurs",
      content: "...",
    },
    {
      number: 4,
      title: "Ses talents",
      content: "...",
    },
    {
      number: 5,
      title: "Sa force",
      content: "...",
    },
    {
      number: 6,
      title: "Galerie immersive",
      // Pas de contenu texte, uniquement des images
    },
    {
      number: 7,
      title: "Bibliothèque de souvenirs",
      souvenirs: [],  // Array de Souvenir[]
    },
    {
      number: 8,
      title: "L'empreinte qu'elle laisse",
      content: "...",
    },
  ],
  end: {
    message: "Merci d'être toi.",
  },
};
```

---

## 11. PHOTOS DISPONIBLES

Photos de Samira fournies :
1. **Selfie voiture** — Samira en tenue magenta/rose avec foulard noir, dans une voiture (intérieur cuir). Usage : écran d'entrée (photo floutée puis révélée).
2. **Assise canapé** — Samira en tenue kaki/olive avec turban noir, assise sur un canapé à motifs noir et blanc. Usage : hero section ou galerie.

D'autres photos seront ajoutées par le créateur du projet dans les dossiers appropriés (`public/images/samira/`, `public/images/souvenirs/`, `public/images/cuisine/`).

---

## 12. RÉFÉRENCES VISUELLES

Les images Pinterest suivantes ont été fournies comme inspiration :

1. **Hero section immersive** — Photo plein écran avec texte overlay, style portfolio créatif
2. **Présentation cartes empilées** — Cartes inclinées avec overlap, style marketing premium
3. **Galerie filtrable** — "My Visual Diary", galerie avec filtres par tags et carousel horizontal
4. **Menu glassmorphism** — Navigation en verre dépoli, style iOS/visionOS
5. **Typographie bold + photo** — Grand texte avec photo intégrée, style éditorial
6. **Onboarding mobile** — Écrans d'onboarding avec photos circulaires/ovales, dégradé pastel
7. **Hero avec objet 3D** — Landing page avec élément central proéminent, style sombre violet
8. **Silhouette cinématique** — Photo avec rétroéclairage, galerie en arrière-plan, style musée/expo
9. **Bento card** — Carte unique avec photo immersive et CTA, coins arrondis, style Apple
10. **Cartes empilées produit** — Photos empilées avec rotation, style e-commerce premium
11. **Galerie cartes dark** — Disposition en éventail sur fond noir, style showroom

---

## 13. RÈGLES IMPÉRATIVES

1. **Mobile-first absolu** — Toute décision de design commence par le mobile 390px. Le desktop est un bonus.
2. **Aucune surcharge** — Si un élément n'apporte pas de valeur, il n'existe pas.
3. **60 FPS** — Toute animation qui drop en dessous est un bug.
4. **Pas de déclaration romantique excessive** — Ton mature, élégant, respectueux.
5. **Contenu éditable** — Tous les textes dans `content.ts`, jamais hardcodés dans les composants.
6. **Composants autonomes** — Chaque chapitre est un composant indépendant.
7. **Aucune dépendance inutile** — Chaque package ajouté doit être justifié.
8. **Touch-first** — Tous les événements sont pensés pour le tactile d'abord.
9. **Progressive enhancement** — Le site fonctionne sans JS pour le contenu de base.
10. **Pas d'effet kitsch** — Les fleurs sont des accents subtils, pas des décorations.

---

## 14. CHECKLIST DE LIVRAISON

```
[ ] Écran d'entrée avec mot de passe fonctionnel
[ ] Séquence de déverrouillage cinématique complète
[ ] Hero section avec photo et parallax
[ ] 8 chapitres implémentés avec contenu placeholder
[ ] Galerie immersive avec lightbox
[ ] Bibliothèque de souvenirs avec cartes interactives
[ ] Écran de fin "Merci d'être toi."
[ ] Menu chapitres fonctionnel
[ ] PWA installable (Android + iOS)
[ ] Manifest et Service Worker configurés
[ ] Responsive mobile (390px) → desktop (1440px)
[ ] Animations Framer Motion + GSAP fonctionnelles
[ ] Performance Lighthouse > 90
[ ] Toutes les images en lazy loading
[ ] Touch/swipe natif sur galerie et souvenirs
[ ] Fleurs violettes subtiles sur sections 2, 3 et fin
[ ] Accent rose intégré (tags chapitre 2, cartes souvenirs, écran de fin) — Chapitre 3 reste 100% violet
[ ] Typographies Cormorant Garamond + Josefin Sans chargées
[ ] Palette violette uniformément appliquée
[ ] Aucun élément de navigateur visible en mode PWA
```
