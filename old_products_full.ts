/**
 * ⚠️ DEPRECATED - DO NOT USE
 * La source de vérité est désormais uniquement Supabase.
 * Utilisez @/services/products pour récupérer les données produits.
 */

export interface Product {
    id: string;
    slug: string;
    price: string;
    image: string;
    category: string;
    stock: number;
    names: { fr: string; en: string; };
    descriptions: { fr: string; en: string; };
    details?: any;
    altText?: any;
    images?: string[];
}

export const products: Product[] = [];

export function getProductBySlug(slug: string): Product | undefined {
  return undefined;
}
