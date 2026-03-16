import { supabase } from "../lib/supabase";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  stock: number;
  category: string;
  active: boolean;
  created_at: string;
  images?: ProductImage[];
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  position: number;
}

export const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*, product_images(*)")
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const getProductBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("*, product_images(*)")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data;
};

export const createProduct = async (productData: Partial<Product>) => {
  const { data, error } = await supabase
    .from("products")
    .insert([productData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateProduct = async (id: string, productData: Partial<Product>) => {
  const { data, error } = await supabase
    .from("products")
    .update(productData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};
