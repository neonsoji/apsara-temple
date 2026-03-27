const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://gabbrrwyxccfgwrmmndc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhYmJycnd5eGNjZmd3cm1tbmRjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzY4MjA2OSwiZXhwIjoyMDg5MjU4MDY5fQ.Hs9gr_VzHEK9q2famA1usSV6g8r0rqXdzTNzP6NpSqY'
);

async function sync() {
  console.log('🚀 Synchronisation ULTRA-FIABLE (Lookup dynamically)...');
  
  // 1. Fetch live IDs
  const { data: cats } = await supabase.from('categories').select('id, slug');
  const catMap = {};
  cats.forEach(c => catMap[c.slug] = c.id);
  console.log('CAT MAP FOUND:', catMap);

  const itmMap = {
    'pendentifs': catMap['pendentifs-talismans'] || catMap['pendentifs'],
    'talismans': catMap['pendentifs-talismans'] || catMap['pendentifs'],
    'bracelets': catMap['richesse-prosperite'] || catMap['bracelets'] || catMap['chance-destin']
  };

  const items = [
    { slug: "sutra-of-the-silent-heart", cat: "pendentifs" },
    { slug: "pixiu-celestial-prosperity", cat: "pendentifs" },
    { slug: "pixiu-rotating-destiny", cat: "pendentifs" },
    { slug: "pixiu-imperial-seal", cat: "pendentifs" },
    { slug: "woofo-silent-shield", cat: "pendentifs" },
    { slug: "pixiu-two-faces-fortune", cat: "pendentifs" },
    { slug: "koi-flow-abundance-red-string", cat: "bracelets" },
    { slug: "koi-balance-red-turquoise", cat: "bracelets" },
    { slug: "koi-transformation-red-pink", cat: "bracelets" },
    { slug: "chinese-luck-bracelet-red-knot-fu-symbol", cat: "bracelets" },
    { slug: "lucky-coin-wealth-bracelet-red-beads-feng-shui", cat: "bracelets" },
    { slug: "bagua-protection-bracelet-red-feng-shui", cat: "bracelets" }
  ];

  for (const item of items) {
    const cid = itmMap[item.cat];
    if (!cid) {
       console.log('⚠️ No ID for', item.cat);
       continue;
    }
    const { error } = await supabase.from('products').update({ category_id: cid, active: true }).eq('slug', item.slug);
    if (error) console.log('❌ Error on', item.slug, ':', error.message);
    else console.log('✅ OK', item.slug);
  }
}

sync();
