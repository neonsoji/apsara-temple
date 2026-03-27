const { createClient } = require('@supabase/supabase-js');
const { products } = require('./koi_products.js');

const supabase = createClient(
  'https://gabbrrwyxccfgwrmmndc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhYmJycnd5eGNjZmd3cm1tbmRjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzY4MjA2OSwiZXhwIjoyMDg5MjU4MDY5fQ.Hs9gr_VzHEK9q2famA1usSV6g8r0rqXdzTNzP6NpSqY'
);

async function testOne() {
  const p = products[0];
  const updateData = {
      description: p.descriptions?.fr || '',
      name_en: p.names?.en || '',
      material_fr: p.details?.material?.fr || '',
      material_en: p.details?.material?.en || '',
      size_fr: p.details?.size?.fr || '',
      size_en: p.details?.size?.en || '',
      protection_fr: p.details?.protection?.fr || '',
      protection_en: p.details?.protection?.en || ''
  };

  const { error } = await supabase.from('products').update(updateData).eq('slug', p.slug);
  console.log('Error details:', JSON.stringify(error, null, 2));
}

testOne();
