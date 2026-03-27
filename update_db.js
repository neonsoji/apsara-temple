const { createClient } = require('@supabase/supabase-js');
const { products } = require('./koi_products.js');

const supabase = createClient(
  'https://gabbrrwyxccfgwrmmndc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhYmJycnd5eGNjZmd3cm1tbmRjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzY4MjA2OSwiZXhwIjoyMDg5MjU4MDY5fQ.Hs9gr_VzHEK9q2famA1usSV6g8r0rqXdzTNzP6NpSqY'
);

async function syncDescriptions() {
  console.log('Synchronizing product details to DB...');
  for (const product of products) {
    const updateData = {
      description: product.descriptions?.fr || '',
      // 'description_en' column is missing in DB schema, so omitted for now
      name_en: product.names?.en || '',
      material_fr: product.details?.material?.fr || '',
      material_en: product.details?.material?.en || '',
      size_fr: product.details?.size?.fr || '',
      size_en: product.details?.size?.en || '',
      protection_fr: product.details?.protection?.fr || '',
      protection_en: product.details?.protection?.en || ''
    };

    const { error } = await supabase
      .from('products')
      .update(updateData)
      .eq('slug', product.slug);

    if (error) {
      console.log(`❌ Error for ${product.slug}:`, error.message);
    } else {
      console.log(`✅ Synced details for ${product.slug}`);
    }
  }
}

syncDescriptions();
