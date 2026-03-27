const { createClient } = require('@supabase/supabase-js');
const { products } = require('./koi_products.js');

const supabase = createClient(
  'https://gabbrrwyxccfgwrmmndc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhYmJycnd5eGNjZmd3cm1tbmRjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzY4MjA2OSwiZXhwIjoyMDg5MjU4MDY5fQ.Hs9gr_VzHEK9q2famA1usSV6g8r0rqXdzTNzP6NpSqY'
);

(async () => {
  const p = products[0];
  const keys = ['description', 'name_en', 'material_fr', 'material_en', 'size_fr', 'size_en', 'protection_fr', 'protection_en'];
  
  for (const k of keys) {
    const { error } = await supabase.from('products').update({ [k]: 'Test' }).eq('slug', p.slug);
    if (error) console.log(`Error for ${k}:`, error.message);
    else console.log(`Success for ${k}`);
  }
})();
