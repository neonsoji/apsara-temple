const { createClient } = require('@supabase/supabase-js');
const { products } = require('./koi_products.js');

const supabase = createClient(
  'https://gabbrrwyxccfgwrmmndc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhYmJycnd5eGNjZmd3cm1tbmRjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzY4MjA2OSwiZXhwIjoyMDg5MjU4MDY5fQ.Hs9gr_VzHEK9q2famA1usSV6g8r0rqXdzTNzP6NpSqY'
);

async function syncDescriptions() {
  console.log('Synchronizing "description" field to DB...');
  for (const p of products) {
    const descText = p.descriptions?.fr || '';
    if (!descText) continue;

    const { error } = await supabase
      .from('products')
      .update({ description: descText })
      .eq('slug', p.slug);

    if (error) {
      console.log(`❌ Error for ${p.slug}:`, error.message);
    } else {
      console.log(`✅ Restored description for ${p.slug}`);
    }
  }
}

syncDescriptions();
