import { supabaseAdmin } from './supabaseServer';

export interface Product {
    id: string;
    slug: string;
    price: string;
    image: string;
    category_id?: string;
    stock: number;
    name?: string;
    name_en?: string;
    description?: string;
    description_en?: string;
    // On garde names/descriptions pour la compatibilité avec le reste du code local
    names: { fr: string; en: string; };
    descriptions: { fr: string; en: string; };
}

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('active', true);

  if (error) {
    console.error("❌ [SUPABASE ERROR] getAllProducts:", error);
    return [];
  }

  // Transformation pour compatibilité avec l'ancien format 'Product'
  return (data || []).map((p: any) => ({
    ...p,
    names: { fr: p.name, en: p.name_en || p.name },
    descriptions: { fr: p.description, en: p.description_en || p.description },
    price: `${p.price.toFixed(2)} €` // On garde le format string pour le front
  }));
}
