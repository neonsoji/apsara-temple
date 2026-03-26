# 📋 APSARA TEMPLE — Journal de Suivi Produits

> Dernière mise à jour : 26 mars 2026

---

## 🏛️ Procédure Standard d'Intégration Produit

### Vue d'ensemble

Chaque produit suit un cycle d'intégration complet : **image → catalogue → SEO → fiche**.
La procédure ci-dessous est la référence opérationnelle à appliquer à chaque nouvelle fiche.

---

## 📸 Convention des Images

### Règle de nommage

| Fichier | Rôle |
|---|---|
| `nom-seo-du-produit.png` / `.webp` | Image principale (sur bois, présentation studio) |
| `nom-seo-du-produit2.png` / `.webp` | Image secondaire (portée au poignet, en situation) |

> **Le nom SEO est identique pour les 2 images.** Seul le suffixe `2` distingue l'image secondaire.
> **Ex :** `lucky-coin-wealth-bracelet-red-beads-feng-shui.webp` + `lucky-coin-wealth-bracelet-red-beads-feng-shui2.webp`

### Emplacement
```
public/images/products/
  ├── bracelets/
  ├── pendentifs/
  └── talismans/
```

---

## ⚙️ Étapes d'intégration

### Étape 1 — Déposer les images PNG dans le bon dossier

Placer les fichiers dans `public/images/products/[categorie]/`

### Étape 2 — Convertir en WebP

Modifier `scripts/transmute-to-webp.mjs` pour pointer vers le bon dossier :
```js
const dir = 'g:/APSARA/apsara-temple/public/images/products/bracelets'; // adapter
```
Puis lancer :
```bash
node scripts/transmute-to-webp.mjs
```
Le script :
- Convertit tous les `.png` / `.jpg` en `.webp` (qualité 82)
- Supprime les fichiers sources après conversion

### Étape 3 — Ajouter le produit dans le catalogue

Fichier : `src/lib/products.ts`

```ts
{
  id: "XX",
  slug: "nom-seo-du-produit",
  price: "XX.00 €",
  image: "/images/products/[cat]/nom-seo-du-produit.webp",  // image principale uniquement
  category: "bracelets" | "pendentifs" | "talismans",
  stock: 3,
  names: { fr: "NOM FRANÇAIS", en: "ENGLISH NAME" },
  descriptions: { fr: "...", en: "..." },
  details: {
    material: { fr: "...", en: "..." },
    size: { fr: "...", en: "..." },
    protection: { fr: "...", en: "..." }
  },
  altText: { fr: "Alt text SEO FR", en: "Alt text SEO EN" }
}
```

> ✨ **Le champ `images[]` n'est plus nécessaire.**
> Le système détecte automatiquement toutes les variantes (`nom2.webp`, `nom3.webp`…) au moment du rendu.
> Il suffit de déposer les fichiers dans le bon dossier avec le bon nom.

### Étape 4 — Ajouter les traductions

Fichier `src/dictionaries/fr.json` → section `products.names` :
```json
"nom-seo-du-produit": "NOM FRANÇAIS"
```

Fichier `src/dictionaries/en.json` → section `products.names` :
```json
"nom-seo-du-produit": "ENGLISH NAME"
```

### Étape 5 — Vérification

- [ ] Image(s) WebP présente(s) dans `public/images/products/[cat]/`
- [ ] Produit visible dans la grille homepage (catégorie correcte)
- [ ] Fiche produit accessible sur `/fr/products/[slug]`
- [ ] Galerie fonctionnelle si 2 images (défilement auto + vignettes)
- [ ] Alt text correct dans le HTML (vérifier dans DevTools)
- [ ] Traductions FR et EN présentes

---

## 📦 Catalogue Actuel

| # | Slug | Nom FR | Prix | Catégorie | Images |
|---|---|---|---|---|---|
| 1 | `sutra-of-the-silent-heart` | SUTRA DU CŒUR SILENCIEUX | 45 € | pendentifs | 1 |
| 2 | `pixiu-celestial-prosperity` | PIXIU : LA PROSPÉRITÉ CÉLESTE | 39 € | pendentifs | 1 |
| 3 | `pixiu-rotating-destiny` | PIXIU : LA ROUE DES DESTINÉES | 29 € | pendentifs | 1 |
| 4 | `pixiu-imperial-seal` | PIXIU : LE SCEAU IMPÉRIAL | 29 € | pendentifs | 1 |
| 5 | `woofo-silent-shield` | WOOFO : LE BOUCLIER SILENCIEUX | 35 € | pendentifs | 1 |
| 6 | `pixiu-two-faces-fortune` | PIXIU : LES DEUX VISAGES DE LA FORTUNE | 39 € | pendentifs | 1 |
| 7 | `koi-flow-abundance-red-string` | KOI — BRACELET CORDON ROUGE FLUX D'ABONDANCE | 29 € | bracelets | 1 |
| 8 | `koi-balance-red-turquoise` | KOI D'ÉQUILIBRE — PERSÉVÉRANCE & MAÎTRISE | 29 € | bracelets | 1 |
| 9 | `koi-transformation-red-pink` | KOI DE TRANSFORMATION — ÉNERGIE & OUVERTURE | 29 € | bracelets | 1 |
| 10 | `chinese-luck-bracelet-red-knot-fu-symbol` | BRACELET FU DE PROTECTION — CHANCE & ANCRAGE | 29 € | bracelets | 1 |
| 11 | `lucky-coin-wealth-bracelet-red-beads-feng-shui` | BRACELET PIÈCE DE VIE — PROSPÉRITÉ & FENG SHUI | 29 € | bracelets | **2** 🖼️ |
| 12 | `bagua-protection-bracelet-red-feng-shui` | BRACELET BAGUA DE PROTECTION — ÉQUILIBRE & DÉFENSE | 29 € | bracelets | 1 |

---

## 🔄 Historique des sessions

### 26 mars 2026
- ✅ Intégration **Bracelet Fu** (#10) — 1 image, altText SEO
- ✅ Intégration **Bracelet Pièce de Vie** (#11) — 2 images (bois + poignet)
- ✅ Intégration **Bracelet Bagua de Protection** (#12) — 1 image, storytelling enrichi
- ✅ Création du composant `ProductImageGallery` (carousel auto + vignettes + dots)
- ✅ **Système de détection automatique** des images (`getProductImages.ts`) — plus besoin de renseigner `images[]` manuellement, il suffit de déposer `nom2.webp`, `nom3.webp` dans le dossier
- ✅ Mise en place du champ `altText` bilingue sur toutes les nouvelles fiches
- ✅ Section storytelling rendue dynamique (vraie description produit par page)
- ✅ Correction du path image Bagua (`/images/products/bracelets/` au lieu de `/images/`)
- ✅ Journal de suivi `JOURNAL_PRODUITS.md` créé

---

## 📐 Règles légales à respecter

- ❌ Ne jamais écrire **"argent"** ou **"silver"** comme matière réelle
- ✅ Utiliser : `Aspect Argenté`, `Alliage Sacré`, `Finition Argentée`, `Étain Noble / Aspect Argenté`
- Les bijoux sont en **alliage**, les finitions sont des **aspects visuels**

---

*Document maintenu par l'IA Antigravity — APSARA TEMPLE*
