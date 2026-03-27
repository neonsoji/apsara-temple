import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

console.log('🔌 [SUPABASE] CONNEXION :', supabaseUrl);
console.log('🔑 [SUPABASE] SERVICE ROLE DETECTED:', supabaseKey ? 'YES (Ends with ' + supabaseKey.slice(-5) + ')' : 'NO');

const supabase = createClient(supabaseUrl, supabaseKey);

export interface DBProduct {
  id: string;
  name: string;
  name_en: string;
  slug: string;
  description: string;
  description_en: string;
  image: string;
  price: number;
  category_id: string; // Utilisation de l'ID relationnel
  stock: number;
  reserved_stock: number;
  low_stock_threshold: number;
  active: boolean;
}

export async function getProductsByCategory(categorySlug: string): Promise<DBProduct[]> {
  console.log(`🔍 [SUPABASE] Requête produits pour slug catégorie: ${categorySlug}`);
  
  // 1. Récupérer l'ID de la catégorie d'abord
  // MAPPING FINAL RÉEL :
  let dbSlug = categorySlug;
  if (categorySlug === 'pendentifs' || categorySlug === 'talismans') {
    dbSlug = 'pendentifs-talismans';
  } else if (categorySlug === 'bracelets') {
    dbSlug = 'richesse-prosperite';
  }

  const { data: catData, error: catError } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', dbSlug)
    .single();

  if (catError || !catData) {
    console.error(`❌ [SUPABASE] Catégorie introuvable : ${dbSlug}`);
    return [];
  }

  // 2. Récupérer les produits liés à cet ID
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', catData.id)
    .eq('active', true)
    .order('name');

  if (error) {
    console.error(`❌ [SUPABASE] Erreur produits pour ${categorySlug} :`, error.message);
    return [];
  }

  console.log(`✅ [SUPABASE] ${data?.length || 0} produits trouvés pour ${categorySlug}`);
  return data || [];
}

export async function getProductBySlug(slug: string): Promise<DBProduct | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single();

  if (error) {
    console.error(`❌ [SUPABASE] Erreur slug ${slug} :`, error.message);
    return null;
  }

  return data;
}

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('active', true);

  if (error) {
    console.error('SUPABASE ERROR:', error);
    return [];
  }

  return data;
}

export async function createProduct(productData: any) {
  // Mapping category name to UUID
  let dbSlug = productData.category;
  if (dbSlug === 'pendentifs' || dbSlug === 'talismans') {
    dbSlug = 'pendentifs-talismans';
  } else if (dbSlug === 'bracelets') {
    dbSlug = 'richesse-prosperite';
  }

  // Find category ID
  const { data: catData } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', dbSlug)
    .single();

  const { data, error } = await supabase
    .from('products')
    .insert([
      {
        ...productData,
        category_id: catData?.id || null,
        // Ensure price and stock are numbers
        price: Number(productData.price),
        stock: Number(productData.stock),
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getAllSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('products')
    .select('slug');

  if (error) return [];
  return data.map(p => p.slug);
}
