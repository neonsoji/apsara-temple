export interface Product {
  id: string;
  slug: string;
  price: string;
  image: string;
  category: 'pendentifs' | 'bracelets' | 'bagues';
  names: {
    fr: string;
    en: string;
  };
  descriptions: {
    fr: string;
    en: string;
  };
  details?: {
    material: { fr: string; en: string };
    size: { fr: string; en: string };
    protection: { fr: string; en: string };
  };
}

export const products: Product[] = [
  {
    id: "1",
    slug: "sutra-of-the-silent-heart",
    price: "45.00 €", // Prix initial cohérent avec la grille
    image: "/images/products/pendentifs/pendentif-bouddha-sutra-coeur-rotatif-protection.webp",
    category: "pendentifs",
    names: {
      fr: "SUTRA DU CŒUR SILENCIEUX",
      en: "SUTRA OF THE SILENT HEART"
    },
    descriptions: {
      fr: "Un compagnon pour le chercheur moderne. Ce talisman sert d'ancre silencieuse, une manifestation physique du calme intérieur par le mouvement perpétuel. Gravé des caractères anciens du Sutra du Cœur.",
      en: "A companion for the modern seeker. This talisman serves as a silent anchor, a physical manifestation of inner calm through perpetual motion. Engraved with the ancient characters of the Heart Sutra."
    },
    details: {
      material: { fr: "Argent de haute qualité / Finition Vieillie", en: "High-quality Silver / Antique Finish" },
      size: { fr: "Diamètre 42 mm", en: "Diameter 42 mm" },
      protection: { fr: "Sagesse et Éveil spirituel", en: "Wisdom and Spiritual Awakening" }
    }
  },
  {
    id: "2",
    slug: "pixiu-celestial-prosperity",
    price: "39.00 €",
    image: "/images/products/pendentifs/talisman-pixiu-prosperite-sacree.webp",
    category: "pendentifs",
    names: {
      fr: "PIXIU : LA PROSPÉRITÉ CÉLESTE",
      en: "PIXIU : THE CELESTIAL PROSPERITY"
    },
    descriptions: {
      fr: "Le Pixiu est le gardien céleste de la richesse et de l'abondance. Cette relique invoque les énergies de la prospérité tout en offrant une protection contre les influences négatives.",
      en: "The Pixiu is the celestial guardian of wealth and abundance. This relic invokes the energies of prosperity while providing protection against negative influences."
    },
    details: {
      material: { fr: "Alliage Sacré / Patine Sombre", en: "Sacred Alloy / Dark Patina" },
      size: { fr: "Hauteur 35 mm", en: "Height 35 mm" },
      protection: { fr: "Abondance et Gardien du Foyer", en: "Abundance and Household Guardian" }
    }
  },
  {
    id: "3",
    slug: "pixiu-rotating-destiny",
    price: "29.00 €",
    image: "/images/products/pendentifs/talisman-pixiu-roue-destinees.webp",
    category: "pendentifs",
    names: {
      fr: "PIXIU : LA ROUE DES DESTINÉES",
      en: "PIXIU : THE ROTATING DESTINY"
    },
    descriptions: {
      fr: "Une roue rotative symbolisant le cycle du karma et du destin, protégée par la figure mythique du Pixiu. Chaque rotation purifie le chemin de vie du porteur.",
      en: "A rotating wheel symbolizing the cycle of karma and destiny, protected by the mythical figure of the Pixiu. Each rotation purifies the wearer's life path."
    },
    details: {
      material: { fr: "Métal Antique", en: "Antique Metal" },
      size: { fr: "Diamètre 30 mm", en: "Diameter 30 mm" },
      protection: { fr: "Chance et Alignement Karmique", en: "Luck and Karmic Alignment" }
    }
  },
  {
    id: "4",
    slug: "pixiu-imperial-seal",
    price: "29.00 €",
    image: "/images/products/pendentifs/talisman-pixiu-sceau-imperial.webp",
    category: "pendentifs",
    names: {
      fr: "PIXIU : LE SCEAU IMPÉRIAL",
      en: "PIXIU : THE IMPERIAL SEAL"
    },
    descriptions: {
      fr: "Inspiré des sceaux ancestraux, ce talisman impose l'autorité spirituelle et la stabilité. Le Pixiu veille sur les secrets et la force intérieure de son possesseur.",
      en: "Inspired by ancestral seals, this talisman imposes spiritual authority and stability. The Pixiu watches over the secrets and inner strength of its owner."
    },
    details: {
      material: { fr: "Finition Bronze Impérial", en: "Imperial Bronze Finish" },
      size: { fr: "Largeur 38 mm", en: "Width 38 mm" },
      protection: { fr: "Autorité et Ancrage", en: "Authority and Grounding" }
    }
  },
  {
    id: "5",
    slug: "woofo-silent-shield",
    price: "35.00 €",
    image: "/images/products/pendentifs/talisman-wu-shi-plaque-paix-protection-argent-apsara-temple.webp",
    category: "pendentifs",
    names: {
      fr: "WOOFO : LE BOUCLIER SILENCIEUX",
      en: "WOOFO : THE SILENT SHIELD"
    },
    descriptions: {
      fr: "Une plaque protectrice de style 'Wu Shi', signifiant l'absence de conflit. Un bouclier spirituel pour ceux qui cherchent la paix dans le chaos du monde moderne.",
      en: "A protective plaque in the 'Wu Shi' style, meaning the absence of conflict. A spiritual shield for those seeking peace in the chaos of the modern world."
    },
    details: {
      material: { fr: "Étain Noble / Finition Argent", en: "Noble Tin / Silver Finish" },
      size: { fr: "50mm x 30mm", en: "50mm x 30mm" },
      protection: { fr: "Paix intérieure et Bouclier Énergétique", en: "Inner Peace and Energy Shield" }
    }
  },
  {
    id: "6",
    slug: "pixiu-two-faces-fortune",
    price: "39.00 €",
    image: "/images/products/pendentifs/talisman-pixiu-double-face-protection.webp",
    category: "pendentifs",
    names: {
      fr: "PIXIU : LES DEUX VISAGES DE LA FORTUNE",
      en: "PIXIU : THE TWO FACES OF FORTUNE"
    },
    descriptions: {
      fr: "Un talisman double face représentant la dualité de la fortune : attirer la richesse et protéger l'acquis. Un équilibre parfait pour la prospérité durable.",
      en: "A double-sided talisman representing the duality of fortune: attracting wealth and protecting assets. A perfect balance for sustainable prosperity."
    },
    details: {
      material: { fr: "Laiton Sacré Vieilli", en: "Sacred Aged Brass" },
      size: { fr: "Diamètre 32 mm", en: "Diameter 32 mm" },
      protection: { fr: "Équilibre et Richesse", en: "Balance and Wealth" }
    }
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}
