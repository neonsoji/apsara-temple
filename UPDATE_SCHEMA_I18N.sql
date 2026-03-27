-- Modification de la table products pour supporter le multi-langue (FR/EN)
-- Cela permet de se passer totalement du fichier local lib/products.ts

ALTER TABLE public.products ADD COLUMN IF NOT EXISTS name_en TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS description_en TEXT;

-- On peut aussi ajouter les détails (matière, taille, protection)
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS material_fr TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS material_en TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS size_fr TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS size_en TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS protection_fr TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS protection_en TEXT;

-- Note: Les colonnes existantes 'name' et 'description' serviront pour le Français (par défaut).
