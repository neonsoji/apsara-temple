export interface Product {
  id: string;
  slug: string;
  price: string;
  image: string;
  category: 'pendentifs' | 'bracelets' | 'bagues';
  stock: number; // Nouveau champ pour gérer la quantité
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
  altText?: {
    fr: string;
    en: string;
  };
  images?: string[];
}

export const products: Product[] = [
  {
    id: "1",
    slug: "sutra-of-the-silent-heart",
    price: "45.00 €",
    image: "/images/products/pendentifs/pendentif-bouddha-sutra-coeur-rotatif-protection.webp",
    category: "pendentifs",
    stock: 3, // Quantité disponible
    names: {
      fr: "SUTRA DU CŒUR SILENCIEUX",
      en: "SUTRA OF THE SILENT HEART"
    },
    descriptions: {
      fr: "Un compagnon pour le chercheur moderne. Ce talisman sert d'ancre silencieuse, une manifestation physique du calme intérieur par le mouvement perpétuel. Gravé des caractères anciens du Sutra du Cœur.",
      en: "A companion for the modern seeker. This talisman serves as a silent anchor, a physical manifestation of inner calm through perpetual motion. Engraved with the ancient characters of the Heart Sutra."
    },
    details: {
      material: { fr: "Alliage Sacré / Aspect Argent Vieilli", en: "Sacred Alloy / Aged Silver Finish" },
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
    stock: 3,
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
    stock: 3, // Article en rupture pour test
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
    stock: 3,
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
    stock: 3, // Stock faible pour test
    names: {
      fr: "WOOFO : LE BOUCLIER SILENCIEUX",
      en: "WOOFO : THE SILENT SHIELD"
    },
    descriptions: {
      fr: "Une plaque protectrice de style 'Wu Shi', signifiant l'absence de conflit. Un bouclier spirituel pour ceux qui cherchent la paix dans le chaos du monde moderne.",
      en: "A protective plaque in the 'Wu Shi' style, meaning the absence of conflict. A spiritual shield for those seeking peace in the chaos of the modern world."
    },
    details: {
      material: { fr: "Étain Noble / Aspect Argenté", en: "Noble Tin / Silver-like Finish" },
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
    stock: 3,
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
  },
  {
    id: "7",
    slug: "koi-flow-abundance-red-string",
    price: "29.00 €",
    image: "/images/products/bracelets/red-string-bracelet-koi-fish-abundance-luck-talisman.webp",
    category: "bracelets",
    stock: 3,
    names: {
      fr: "KOI — BRACELET CORDON ROUGE FLUX D’ABONDANCE",
      en: "KOI — FLOW OF ABUNDANCE RED STRING BRACELET"
    },
    descriptions: {
      fr: "Un délicat bracelet en cordon rouge orné de la carpe koï, symbole intemporel d'abondance et de persévérance. Une invitation à laisser couler la chance dans votre vie.",
      en: "A delicate red string bracelet featuring the koi fish, a timeless symbol of abundance, perseverance and flowing prosperity."
    },
    details: {
      material: { fr: "Cordon en soie rouge / Finition argentée", en: "Red silk cord / Silver-plated finish" },
      size: { fr: "Ajustable par nœuds coulissants", en: "Adjustable sliding knots" },
      protection: { fr: "Chance, Abondance et Évolution", en: "Luck, Abundance and Evolution" }
    }
  },
  {
    id: "8",
    slug: "koi-balance-red-turquoise",
    price: "29.00 €",
    image: "/images/products/bracelets/koi-balance-bracelet-red-turquoise-feng-shui-talisman.webp",
    category: "bracelets",
    stock: 3,
    names: {
      fr: "KOI D'ÉQUILIBRE — PERSÉVÉRANCE & MAÎTRISE",
      en: "BALANCE KOI — PERSEVERANCE & MASTERY"
    },
    descriptions: {
      fr: "L'alliance sacré du rouge et du turquoise. Ce talisman rappelle que la carpe koi ne remonte pas le courant par la force, mais par une constance inébranlable.",
      en: "The sacred union of red and turquoise. This talisman serves as a reminder that the koi fish masters the current not through force, but through unwavering consistency."
    },
    details: {
      material: { fr: "Perles mates / Talisman doré poli", en: "Matte beads / Polished gold-toned talisman" },
      size: { fr: "Standard ajustable (16-21cm)", en: "Standard adjustable (16-21cm)" },
      protection: { fr: "Équilibre, Concentration et Maîtrise", en: "Balance, Focus and Mastery" }
    }
  },
  {
    id: "9",
    slug: "koi-transformation-red-pink",
    price: "29.00 €",
    image: "/images/products/bracelets/koi-transformation-bracelet-red-pink-feng-shui.webp",
    category: "bracelets",
    stock: 3,
    names: {
      fr: "KOI DE TRANSFORMATION — ÉNERGIE & OUVERTURE",
      en: "TRANSFORMATION KOI — ENERGY & OPENNESS"
    },
    descriptions: {
      fr: "Un talisman pour les phases de transition. L'alliance vibrante du rouge et la douceur du rose translucide évoquent l'élan nécessaire pour traverser le flux sans se durcir.",
      en: "A talisman for phases of transition. The vibrant union of red and the softness of translucent pink evoke the momentum needed to cross the flow without hardening."
    },
    details: {
      material: { fr: "Perles rouges et translucides / Talisman doré", en: "Red and translucent beads / Gold-toned talisman" },
      size: { fr: "Ajustable 16-20cm", en: "Adjustable 16-20cm" },
      protection: { fr: "Transformation et Équilibre Émotionnel", en: "Transformation and Emotional Balance" }
    }
  },
  {
    id: "10",
    slug: "chinese-luck-bracelet-red-knot-fu-symbol",
    price: "29.00 €",
    image: "/images/products/bracelets/chinese-luck-bracelet-red-knot-fu-symbol.webp",
    category: "bracelets",
    stock: 3,
    names: {
      fr: "BRACELET FU DE PROTECTION — CHANCE & ANCRAGE",
      en: "FU PROTECTION BRACELET — LUCK & GROUNDING"
    },
    descriptions: {
      fr: "Un talisman traditionnel inspiré des symboles chinois de chance. Le cordon rouge et le sceau Fu incarnent protection, prospérité et stabilité. Le caractère Fu (福) représente la chance, la prospérité et la bénédiction. Porté au poignet, il devient une présence protectrice discrète et constante.",
      en: "A traditional talisman inspired by Chinese symbols of luck. The red string and the Fu seal embody protection, prosperity, and stability. The Fu (福) character represents luck, prosperity and blessing. Worn on the wrist, it becomes a discreet and constant protective presence."
    },
    details: {
      material: { fr: "Cordon rouge noué / Symbole Fu doré", en: "Knotted red string / Gold-toned Fu symbol" },
      size: { fr: "Ajustable par nœuds coulissants", en: "Adjustable sliding knots" },
      protection: { fr: "Chance, Prospérité et Ancrage", en: "Luck, Prosperity and Grounding" }
    },
    altText: {
      fr: "Bracelet cordon rouge avec symbole Fu doré, représentant la chance et la protection, présenté sur bois sombre dans une ambiance chaleureuse.",
      en: "Red string bracelet with gold-toned Fu symbol, representing luck and protection, displayed on dark wood in a warm atmosphere."
    }
  },
  {
    id: "11",
    slug: "lucky-coin-wealth-bracelet-red-beads-feng-shui",
    price: "29.00 €",
    image: "/images/products/bracelets/lucky-coin-wealth-bracelet-red-beads-feng-shui.webp",
    category: "bracelets",
    stock: 3,
    names: {
      fr: "BRACELET PIÈCE DE VIE — PROSPÉRITÉ & FENG SHUI",
      en: "WEALTH COIN BRACELET — ABUNDANCE & FENG SHUI"
    },
    descriptions: {
      fr: "Ce talisman arbore une pièce ancienne symbolisant la prospérité selon les principes du Feng Shui. Monté sur un bracelet tressé rouge avec des perles protectrices, il canalise la chance matérielle et repousse les énergies contraires. Parfaitement ajusté, il agit comme un point de focalisation discret pour appeler l'abondance dans votre vie quotidienne.",
      en: "This talisman features an ancient coin symbolizing prosperity according to Feng Shui principles. Mounted on a red woven bracelet with protective beads, it channels material luck and repels adverse energies. Perfectly fitted, it acts as a discreet focal point to call abundance into your daily life."
    },
    details: {
      material: { fr: "Cordon tissé rouge / Perles / Pièce en alliage", en: "Red woven cord / Beads / Alloy coin" },
      size: { fr: "Taille ajustable par nœuds coulissants", en: "Adjustable size via sliding knots" },
      protection: { fr: "Prospérité financière et Abondance matérielle", en: "Financial prosperity and Material abundance" }
    },
    altText: {
       fr: "Bracelet composé d'un cordon rouge, de perles et d'une pièce chinoise de prospérité, présenté sur bois sombre et porté au poignet.",
       en: "Red string bracelet with prosperity coin and beads, displayed on dark wood and worn on wrist for Feng Shui."
    }
  },
  {
    id: "12",
    slug: "bagua-protection-bracelet-red-feng-shui",
    price: "29.00 €",
    image: "/images/products/bracelets/bagua-protection-bracelet-red-feng-shui.webp",
    category: "bracelets",
    stock: 3,
    names: {
      fr: "BRACELET BAGUA DE PROTECTION — ÉQUILIBRE & DÉFENSE",
      en: "BAGUA PROTECTION BRACELET — BALANCE & DEFENSE"
    },
    descriptions: {
      fr: "Le Bagua (八卦) représente les huit forces fondamentales du monde dans la tradition taoïste. Ce symbole ancestral est utilisé depuis des millénaires pour équilibrer les flux d'énergie et dresser un rempart contre les influences extérieures. Monté sur un cordon rouge — couleur de protection et de vitalité — rehaussé d'éléments dorés discrets, ce talisman s'intègre naturellement au quotidien. Porté au poignet, il devient un point d'ancrage silencieux, une armure invisible.",
      en: "The Bagua (八卦) represents the eight fundamental forces of the world in Taoist tradition. This ancestral symbol has been used for millennia to balance energy flows and ward off adverse influences. Mounted on a red cord — color of protection and vitality — adorned with discreet gold-toned elements, this talisman blends naturally into everyday life. Worn on the wrist, it becomes a silent anchor, an invisible armor."
    },
    details: {
      material: { fr: "Cordon rouge / Médaillon Bagua en alliage doré", en: "Red cord / Gold-toned Bagua alloy medallion" },
      size: { fr: "Ajustable par nœuds coulissants", en: "Adjustable sliding knots" },
      protection: { fr: "Équilibre énergétique et Bouclier spirituel", en: "Energetic balance and Spiritual shield" }
    },
    altText: {
      fr: "Bracelet cordon rouge avec médaillon Bagua doré, symbole feng shui de protection et d'équilibre, présenté sur bois sombre.",
      en: "Red string bracelet with gold-toned Bagua medallion, feng shui symbol of protection and balance, displayed on dark wood."
    }
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}
