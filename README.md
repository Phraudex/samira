# Le Livre, Samira

> Une œuvre numérique interactive, immersive et hautement sécurisée dédiée à Samira.

Ce projet est une application web moderne conçue comme un livre interactif, optimisée pour mobile et configurée pour être installée comme une **Progressive Web App (PWA)** en plein écran.

---

## 🚀 Fonctionnalités Clés

1. **Écran de Verrouillage Premium (Lock Screen)** :
   - Effet de bordure lumineuse tournante asymétrique de type "Liquid Glass" accélérée par le GPU.
   - Sécurisation du mot de passe par hachage **SHA-256** côté client (Web Crypto API).
   - Protection anti-brute force : blocage de 5 minutes après 5 échecs consécutifs, avec persistance dans le stockage de l'appareil.

2. **Configuration PWA Plein Écran** :
   - Intégration du mode standalone natif masquant le cadre du navigateur.
   - Rendu d'arrière-plan transparent derrière la barre d'état iOS (`black-translucent`) avec gestion des zones sûres de l'appareil (`safe-area-insets`).
   - Bandeau d'installation personnalisé (verre dépoli) qui guide l'utilisateur sur Android et iOS (panneau d'instructions Safari).

3. **Interactions Cinématiques (Chapitres)** :
   - **Chapitre 2** : Nuage de mots-clés en apesanteur avec micro-animations de flottement désynchronisées et effets ressort au toucher.
   - **Chapitre 3** : Deck circulaire snappy à 4 cartes permanentes utilisant le chevauchement d'animations de glisse (Framer Motion).
   - **Chapitre 6** : Galerie immersive optimisée avec préchargement réseau agressif (prefetching des images adjacentes).

4. **Bibliothèque de Souvenirs & Lecteur Vidéo (Chapitre 7)** :
   - Grille dynamique extrayant automatiquement le premier frame des vidéos comme vignettes d'aperçu.
   - Lecteur vidéo vertical sur mesure avec contrôle de défilement (scrubbing) découplé du rendu React (120 FPS).
   - Système de verrouillage des requêtes de défilement (`requestAnimationFrame` et seek-locking) pour éviter les gels matériels sur mobile.

---

## 🛠️ Stack Technique

- **Framework** : [Next.js 15](https://nextjs.org/) (App Router)
- **Bibliothèque** : [React 19](https://react.dev/)
- **Styles** : [Tailwind CSS 3](https://tailwindcss.com/)
- **Animations** : [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **PWA** : [@ducanh2912/next-pwa](https://github.com/ducanh2912/next-pwa)
- **Icônes** : [Lucide React](https://lucide.dev/)

---

## 💻 Installation & Lancement Local

### Prérequis
Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé sur votre machine.

### 1. Installation des dépendances
```bash
npm install
```

### 2. Lancement du serveur de développement
Pour tester l'application localement sur votre machine :
```bash
npm run dev
```
Le site sera accessible sur `http://localhost:3000`.

### 3. Test sur appareil mobile (Même réseau Wi-Fi)
Pour visualiser et installer la PWA en conditions réelles sur votre smartphone, exposez le serveur local sur votre réseau Wi-Fi :
```bash
npm run dev -- --hostname 0.0.0.0
```
Puis, ouvrez le navigateur de votre téléphone (Safari sur iPhone) et tapez :
`http://<IP_DE_VOTRE_MAC>:3000` (ex: `http://192.168.41.31:3000`).

### 4. Compilation de production
Pour valider le build de production et générer le service worker PWA :
```bash
npm run build
npm run start
```
