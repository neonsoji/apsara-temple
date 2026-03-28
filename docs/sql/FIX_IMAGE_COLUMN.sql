-- Ajout d'une colonne image directe dans la table products
-- Cela évite les jointures avec product_images qui semblent poser problème (cache PostgREST)

ALTER TABLE public.products ADD COLUMN IF NOT EXISTS image TEXT;

-- On en profite pour s'assurer que toutes les colonnes nécessaires sont là
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;
