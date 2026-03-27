const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://gabbrrwyxccfgwrmmndc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhYmJycnd5eGNjZmd3cm1tbmRjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzY4MjA2OSwiZXhwIjoyMDg5MjU4MDY5fQ.Hs9gr_VzHEK9q2famA1usSV6g8r0rqXdzTNzP6NpSqY'
);

// Map business categories to DB category_id
const CATEGORY_MAP = {
  'pendentifs': '78a9d14e-68c6-4cc0-8215-587df083788c', // pendentifs-talismans
  'bracelets': '960149b7-638a-495f-aabb-60c7df194411', // chance-destin
};

const siteProducts = [
  { slug: "sutra-of-the-silent-heart", price: 45.0, image: "/images/products/pendentifs/pendentif-bouddha-sutra-coeur-rotatif-protection.webp", category: "pendentifs", name_fr: "SUTRA DU CŒUR SILENCIEUX", name_en: "SUTRA OF THE SILENT HEART", desc_fr: "Un compagnon...", desc_en: "A companion..." },
  { slug: "pixiu-celestial-prosperity", price: 39.0, image: "/images/products/pendentifs/talisman-pixiu-prosperite-sacree.webp", category: "pendentifs", name_fr: "PIXIU : LA PROSPÉRITÉ CÉLESTE", name_en: "PIXIU : THE CELESTIAL PROSPERITY", desc_fr: "Le Pixiu est...", desc_en: "The Pixiu is..." },
  { slug: "pixiu-rotating-destiny", price: 29.0, image: "/images/products/pendentifs/talisman-pixiu-roue-destinees.webp", category: "pendentifs", name_fr: "PIXIU : LA ROUE DES DESTINÉES", name_en: "PIXIU : THE ROTATING DESTINY", desc_fr: "Une roue rotative...", desc_en: "A rotating wheel..." },
  { slug: "pixiu-imperial-seal", price: 29.0, image: "/images/products/pendentifs/talisman-pixiu-sceau-imperial.webp", category: "pendentifs", name_fr: "PIXIU : LE SCEAU IMPÉRIAL", name_en: "PIXIU : THE IMPERIAL SEAL", desc_fr: "Inspiré des sceaux...", desc_en: "Inspired by..." },
  { slug: "woofo-silent-shield", price: 35.0, image: "/images/products/pendentifs/talisman-wu-shi-plaque-paix-protection-argent-apsara-temple.webp", category: "pendentifs", name_fr: "WOOFO : LE BOUCLIER SILENCIEUX", name_en: "WOOFO : THE SILENT SHIELD", desc_fr: "Une plaque protectrice...", desc_en: "A protective plaque..." },
  { slug: "pixiu-two-faces-fortune", price: 39.0, image: "/images/products/pendentifs/talisman-pixiu-double-face-protection.webp", category: "pendentifs", name_fr: "PIXIU : LES DEUX VISAGES DE LA FORTUNE", name_en: "PIXIU : THE TWO FACES OF FORTUNE", desc_fr: "Un talisman double face...", desc_en: "A double-sided..." },
  { slug: "koi-flow-abundance-red-string", price: 29.0, image: "/images/products/bracelets/red-string-bracelet-koi-fish-abundance-luck-talisman.webp", category: "bracelets", name_fr: "KOI — BRACELET CORDON ROUGE FLUX D’ABONDANCE", name_en: "KOI — FLOW OF ABUNDANCE RED STRING BRACELET", desc_fr: "Un délicat bracelet...", desc_en: "A delicate red..." },
  { slug: "koi-balance-red-turquoise", price: 29.0, image: "/images/products/bracelets/koi-balance-bracelet-red-turquoise-feng-shui-talisman.webp", category: "bracelets", name_fr: "KOI D'ÉQUILIBRE — PERSÉVÉRANCE & MAÎTRISE", name_en: "BALANCE KOI — PERSEVERANCE & MASTERY", desc_fr: "L'alliance sacré...", desc_en: "The sacred union..." },
  { slug: "koi-transformation-red-pink", price: 29.0, image: "/images/products/bracelets/koi-transformation-bracelet-red-pink-feng-shui.webp", category: "bracelets", name_fr: "KOI DE TRANSFORMATION — ÉNERGIE & OUVERTURE", name_en: "TRANSFORMATION KOI — ENERGY & OPENNESS", desc_fr: "Un talisman...", desc_en: "A talisman..." },
  { slug: "chinese-luck-bracelet-red-knot-fu-symbol", price: 29.0, image: "/images/products/bracelets/chinese-luck-bracelet-red-knot-fu-symbol.webp", category: "bracelets", name_fr: "BRACELET FU DE PROTECTION — CHANCE & ANCRAGE", name_en: "FU PROTECTION BRACELET — LUCK & GROUNDING", desc_fr: "Un talisman traditionnel...", desc_en: "A traditional..." },
  { slug: "lucky-coin-wealth-bracelet-red-beads-feng-shui", price: 29.0, image: "/images/products/bracelets/lucky-coin-wealth-bracelet-red-beads-feng-shui.webp", category: "bracelets", name_fr: "BRACELET PIÈCE DE VIE — PROSPÉRITÉ & FENG SHUI", name_en: "WEALTH COIN BRACELET — ABUNDANCE & FENG SHUI", desc_fr: "Ce talisman arbore...", desc_en: "This talisman..." },
  { slug: "bagua-protection-bracelet-red-feng-shui", price: 29.0, image: "/images/products/bracelets/bagua-protection-bracelet-red-feng-shui.webp", category: "bracelets", name_fr: "BRACELET BAGUA DE PROTECTION — ÉQUILIBRE & DÉFENSE", name_en: "BAGUA PROTECTION BRACELET — BALANCE & DEFENSE", desc_fr: "Le Bagua (八卦)...", desc_en: "The Bagua (八卦)..." }
];

async function runFullSync() {
  console.log('🚀 Synchronisation des produits avec CATEGORY_ID...');

  for (const p of siteProducts) {
    const { error } = await supabase
      .from('products')
      .upsert({
        slug: p.slug,
        name: p.name_fr,
        name_en: p.name_en,
        description: p.desc_fr,
        description_en: p.desc_en,
        price: p.price,
        image: p.image,
        category_id: CATEGORY_MAP[p.category] || null, // On lie via UUID
        active: true,
        track_stock: true,
        low_stock_threshold: 1
      }, { onConflict: 'slug' });

    if (error) console.error(`❌ Erreur sur ${p.slug}:`, error.message);
    else console.log(`✅ ${p.slug} synchronisé avec category_id.`);
  }
  
  console.log('✅ Synchronisation finie.');
}

runFullSync();
