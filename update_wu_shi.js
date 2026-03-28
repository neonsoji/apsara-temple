const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://gabbrrwyxccfgwrmmndc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhYmJycnd5eGNjZmd3cm1tbmRjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzY4MjA2OSwiZXhwIjoyMDg5MjU4MDY5fQ.Hs9gr_VzHEK9q2famA1usSV6g8r0rqXdzTNzP6NpSqY'
);

async function updateTalisman() {
  const updateData = {
      material_fr: 'Alliage sacré — Patine argentée & poli rituel',
      material_en: 'Sacred Alloy — Silver patina & ritual polish',
      size_fr: '44,5 × 24,6 mm — Profil de 2,5 mm (Léger et équilibré)',
      size_en: '44.5 × 24.6 mm — 2.5 mm profile (Light and balanced)',
      protection_fr: 'Protection spirituelle & apaisement intérieur',
      protection_en: 'Spiritual protection & inner peace'
  };

  const slugToUpdate = 'talisman-wu-shi-plaque-paix-protection-argent-apsara-temple';

  console.log(`Updating ${slugToUpdate}...`);
  const { data, error } = await supabase.from('products').update(updateData).eq('slug', slugToUpdate);
  
  if (error) {
    console.log('❌ Error:', error);
  } else {
    console.log('✅ Successfully updated! Data:', updateData);
  }
}

updateTalisman();
