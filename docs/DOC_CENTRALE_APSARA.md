# 📜 APSARA TEMPLE — DOCUMENTATION CENTRALE ET SYSTÈME

> **Document Master unique.** Il regroupe l'architecture, le design system, la ligne éditoriale, et les procédures (pipeline de produits) du projet APSARA TEMPLE. Ce document sert de référentiel absolu pour toute IA ou développeur intervenant sur le code.

---

## 🎐 1. ADN DE MARQUE ET POSITIONNEMENT

### Univers & Ton
- **Univers** : Sanctuaire spirituel, Asie mystique (temple), joaillerie sacrée, atmosphère de nuit, cinéma.
- **Ton** : Solennel, initiatique, luxueux, rassurant, calme et élégant.
- **Mots-clés** : Relique, Intention, Équilibre, Protection, Rituel, Alliage Sacré, Artisanat.
- **Positionnement complet** : Premium accessible (fourchette de 29€ à 45€). Le prix est toujours justifié par le storytelling, le visuel et la perception de la relique (écrin, certificat).

### Règles Strictes (Interdits)
- **Matériaux** : ❌ INTERDICTION stricte d'utiliser les mots "Argent" ou "Silver". Obligation de dire : *Alliage Sacré, Aspect Argenté, Finition Haute Joaillerie*.
- **Marketing** : ❌ Pas de vocabulaire "cheap" (promo, pas cher), pas d'urgence agressive (fake scarcity), pas de design orienté "dropshipping".

---

## 🎨 2. DESIGN SYSTEM ET UI

### Couleurs
- `--deep-red` : `#3a0101`
- `--dark-red` / `--black-red` : `#2a0101` (Évite le noir absolu)
- `--ivory` : `#fdfaf1` (Texte principal)
- `--turquoise` : `#40e0d0` (Accent principal, lueur/glow)
- `--gold-glow` : `rgba(229, 193, 88, 0.15)`

### Typographies & Effets
- **Titres (h1, h2)** : `font-cinzel, serif` (Uppercase). Effet **.title-sacred** avec masque de gradient or/argent animé (`shinePatina`).
- **Corps de texte** : `font-playfair, serif`.
- **Ambiance Visuelle (Glassmorphism & Overlay)** :
  - Overlay de grain (`noise.svg` opacity `0.08`).
  - Brume animée flottante (`mist.png`).
  - Fonds sombres translucides : `rgba(13,0,0,0.4)` avec `backdrop-filter: blur(20px)`.
  - Ombres d'images produits : `.product-card-shadow-refined`.

### Composants Clés
- **Navbar** : Navigation globale, sticky transparente avec effets de flou et icônes SVG custom.
- **Hero** : Immersion avec background `.hero-bg`.
- **Button CTA (`.btn-sacred`)** : Bouton majeur d'Add to Cart. Utilise une cascade complexe de `filter` (invert/sepia/hue-rotate) sur l'image `bouton01.webp` pour texturiser le bouton de façon artisanale "liquide turquoise", et un `.btn-aura` au hover.

---

## 🏛️ 3. ARCHITECTURE DU SITE

**Pages publiques & E-commerce :**
- `/` → Homepage (Hero immersif + sélection produits)
- `/about` → Présentation du temple et de la philosophie
- `/products` → Catalogue complet
- `/products/[slug]` → Fiche produit détaillée (Bypass cache, fetch Supabase)
- `/bracelets` & `/talismans` → Collections spécifiques
- `/search` → Recherche avec filtres
- `/journal` & `/journal/[slug]` → Blog et articles
- `/cart` → Panier
- `/checkout` → Paiement express (intégration PayPal Live)
- `/account` → Compte client
- `/contact` → Formulaire de contact

**Admin & Pages Légales :**
- Légal : `/cgu`, `/cgv`, `/livraison`, `/mentions-legales`
- Admin : `/admin/dashboard`, `/admin/login`, `/admin/products`, `/admin/products/new`, `/admin/orders`, `/admin/stock`

---

## 📦 4. NORME D'UNE FICHE PRODUIT

L'objectif est la cohérence maximale. Une fiche produit complète respecte cet **ordre immutable** :

1. **HERO** : Split 50/50. 
   - Gauche : `ProductImageGallery`
   - Droite : Badge ("RELIQUE DISPONIBLE"), Titre du produit (Cinzel), Prix, Courte Intro, CTA (`.btn-sacred` avec "S'UNIR À CETTE RELIQUE"), Mention "Expédition rituelle", Quick Specs (Matière, Dimensions, Protection).
2. **STORY (Signification)** : 
   - Div sombre avec `story-glow`, explique l'origine, la symbolique et le bénéfice profond pour celui qui la porte.
3. **FEATURES (Réassurance)** :
   - Liste à puces de haute valeur ajoutée (Finition artisanale, Écrin de velours, Rituel avant expédition, Certificat d'authenticité).

**Naming & Convention :**
- Nom marketing brut (ex: *SUTRA DU CŒUR SILENCIEUX*)
- Slug SEO standardisé en minuscules et tirets (ex: `sutra-of-the-silent-heart`)
- SEO généré dynamiquement via `generateMetadata` (Titre coupé, alt automatique).

---

## ⚙️ 5. PIPELINE & PROCESSUS D'INTÉGRATION (USINE)

**Source :** Fournisseurs asiatiques de bijoux traditionnels (Type 1688 / Taobao).  
**Objectif de performance :** 1 produit = 5 minutes de traitement maximum.

### Étape 1 : Préparation des Images
Les règles d'images sont strictes :
- **Image principale** : `nom-du-produit.webp` (Sur bois ou fond de présentation APSARA)
- **Image secondaire** : `nom-du-produit2.webp` (Portée au poignet/cou pour contexte)
- *(L'application détecte intelligemment le suffixe "2" pour la galerie).*

**Action manuelle** :
- Déposer les images brutes `.png` ou `.jpg` dans le dossier local `/public/images/products/[categorie]/`.
- Lancer la commande Node.js pour la conversion automatique (nettoie les sources et crée des webp optimisés) :
  ```bash
  node scripts/transmute-to-webp.mjs
  ```

### Étape 2 : Données & Traductions
- Définition des traductions dans `src/dictionaries/fr.json` & `en.json`.
- Insertion des données techniques et storytelling (Titre, prix, matière, dimensions, légende) en base de données Supabase.

### Étape 3 : Vérification
- WebP présent.
- Page accessible via `/products/[slug]`.
- Alt texts valides et galerie fonctionnelle.

---

## 📚 6. CATALOGUE ACTUEL (Référence)

Les catégories (Bracelets, Pendentifs, Talismans) structurent le catalogue. 

**Catalogue Supabase (Extrait) :**
- `sutra-of-the-silent-heart` | Pendentif (45€)
- `pixiu-celestial-prosperity` | Pendentif (39€)
- `pixiu-rotating-destiny` | Pendentif (29€)
- `pixiu-imperial-seal` | Pendentif (29€)
- `woofo-silent-shield` | Pendentif (35€)
- `pixiu-two-faces-fortune` | Pendentif (39€)
- `koi-flow-abundance-red-string` | Bracelet (29€)
- `koi-balance-red-turquoise` | Bracelet (29€)
- `koi-transformation-red-pink` | Bracelet (29€)
- `chinese-luck-bracelet-red-knot-fu-symbol` | Bracelet (29€)
- `lucky-coin-wealth-bracelet-red-beads-feng-shui` | Bracelet (29€)
- `bagua-protection-bracelet-red-feng-shui` | Bracelet (29€)

---

## 🛠️ 7. STACK TECHNIQUE

- **Framework :** Next.js 16.1.6 (App Router + i18n locales, Tailwind CSS v4)
- **DB / Backend :** Supabase (PostgreSQL, row level security, Stock atomique géré par RPC)
- **Paiements :** PayPal Checkout Component (`@paypal/react-paypal-js`), live et synchronisé avec webhooks/API.
- **Emails Transactionnels :** Resend (Envoyés en background post-commande HTML).
- **Hébergement & Perf :** Vercel (Analytics, optimisations balises Image `next/image`).
- **Autres outils :** Sharp (Génération locale d'images en WebP).

---

## 🚨 8. DÉFIS ET CHANTIERS EN COURS

1. **Migration des Données (Hybride vers Supabase) :** 
   - Problèmes fréquents de désynchronisation entre les anciens fichiers locaux statiques et la Base de données temps réel Supabase. Des scripts de nettoyage locaux (`sync_products_to_db.js`, `update_descriptions_only.js`) sont massivement convoqués pour assainir cela.
2. **Performance Image :**
   - Remplacement progressif des assets lourds par WebP via `next/image` pour réduire la charge globale et passer les tests Core Web Vitals.
3. **Optimisation Workflow :** 
   - Le pipeline d'upload des assets est encore hybride (fichier local statique + DB en remote). Le passage à `Supabase Storage` est envisagé pour unifier totalement le Back-Office (voir `SUPABASE_STORAGE_SETUP.txt`).
4. **Cohérence d'Interface :** 
   - Ne plus dupliquer les boutons custom en CSS. `.btn-sacred` est l'unique référence. Régler les défauts de Layout comme la "Search bar stretched" sur desktop.

---
*Ce document compile d'anciennes versions (Master Context, System, Projet Structure IA, Journal) pour n'en former qu'une, servant de fondation de connaissance de tous les instants.*
