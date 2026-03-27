import { supabaseAdmin } from './supabaseServer';

export interface Product {
    id: string;
    slug: string;
    price: string;
    image: string;
    category: string;
    stock: number;
    names: { fr: string; en: string; };
    descriptions: { fr: string; en: string; };
}

export async function getAllProducts() {
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*');

  console.log('📦 [SUPABASE] ALL PRODUCTS FOUND:', data?.length || 0);
  
  if (error) {
    console.error('❌ [SUPABASE] Error fetching products:', error);
    return [];
  }

  return data || [];
}
